$ErrorActionPreference = "Stop"

$sourceRoot = "C:\Scripts\Projects\schema_as_code\firewall-configs"
$outputPath = "C:\Scripts\Projects\schema_as_code\data\firewall-library.js"

function Parse-InsiteYaml {
  param(
    [string]$Path
  )

  $lines = Get-Content -LiteralPath $Path
  $app = [ordered]@{
    trigram = ""
    name = ""
    tier = ""
    folder = Split-Path (Split-Path $Path -Parent) -Leaf
    rules = @()
  }

  $defaultAction = ""
  $policySet = ""
  $rule = $null
  $inPorts = $false

  foreach ($rawLine in $lines) {
    $line = $rawLine.TrimEnd()
    if (-not $line.Trim()) { continue }

    if ($line -match '^  trigram:\s+(.+)$') { $app.trigram = $Matches[1].Trim(); continue }
    if ($line -match '^  name:\s+(.+)$') { $app.name = $Matches[1].Trim(); continue }
    if ($line -match '^  tier:\s+(.+)$') { $app.tier = $Matches[1].Trim(); continue }
    if ($line -match '^  policy_set:\s+(.+)$') { $policySet = $Matches[1].Trim(); continue }
    if ($line -match '^  default_action:\s+(.+)$') { $defaultAction = $Matches[1].Trim(); continue }

    if ($line -match '^    - name:\s+(.+)$') {
      if ($null -ne $rule) {
        $app.rules += [pscustomobject]$rule
      }
      $rule = [ordered]@{
        name = $Matches[1].Trim()
        source = ""
        destination = ""
        direction = ""
        protocol = ""
        ports = @()
        action = ""
        priority = 0
        enabled = $true
      }
      $inPorts = $false
      continue
    }

    if ($null -eq $rule) { continue }

    if ($line -match '^      source:\s+(.+)$') { $rule.source = $Matches[1].Trim(); $inPorts = $false; continue }
    if ($line -match '^      destination:\s+(.+)$') { $rule.destination = $Matches[1].Trim(); $inPorts = $false; continue }
    if ($line -match '^      direction:\s+(.+)$') { $rule.direction = $Matches[1].Trim(); $inPorts = $false; continue }
    if ($line -match '^      protocol:\s+(.+)$') { $rule.protocol = $Matches[1].Trim(); $inPorts = $false; continue }
    if ($line -match '^      action:\s+(.+)$') { $rule.action = $Matches[1].Trim(); $inPorts = $false; continue }
    if ($line -match '^      priority:\s+(.+)$') { $rule.priority = [int]$Matches[1].Trim(); $inPorts = $false; continue }
    if ($line -match '^      enabled:\s+(.+)$') { $rule.enabled = [System.Convert]::ToBoolean($Matches[1].Trim()); $inPorts = $false; continue }
    if ($line -match '^      ports:\s*$') { $inPorts = $true; continue }
    if ($inPorts -and $line -match '^        -\s+(.+)$') { $rule.ports += $Matches[1].Trim(); continue }
  }

  if ($null -ne $rule) {
    $app.rules += [pscustomobject]$rule
  }

  [pscustomobject]@{
    trigram = $app.trigram
    name = $app.name
    tier = $app.tier
    folder = $app.folder
    policy_set = $policySet
    default_action = $defaultAction
    rules = $app.rules
  }
}

$apps = Get-ChildItem -LiteralPath $sourceRoot -Directory |
  Sort-Object Name |
  ForEach-Object {
    Parse-InsiteYaml -Path (Join-Path $_.FullName "insite.yaml")
  }

$sourceGroups = @{}
$destinationGroups = @{}
$actionCounts = @{}

foreach ($app in $apps) {
  foreach ($rule in $app.rules) {
    $sourceGroups[$rule.source] = $true
    $destinationGroups[$rule.destination] = $true
    if (-not $actionCounts.ContainsKey($rule.action)) {
      $actionCounts[$rule.action] = 0
    }
    $actionCounts[$rule.action]++
  }
}

$payload = [ordered]@{
  generated_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
  summary = [ordered]@{
    applications = $apps.Count
    rules = @($apps | ForEach-Object { $_.rules.Count } | Measure-Object -Sum).Sum
    sources = $sourceGroups.Keys.Count
    destinations = $destinationGroups.Keys.Count
    actions = $actionCounts
  }
  applications = $apps
}

$json = $payload | ConvertTo-Json -Depth 8
$content = "window.FIREWALL_LIBRARY = $json;"
Set-Content -LiteralPath $outputPath -Value $content -Encoding UTF8

Write-Output "Built firewall library dataset at $outputPath"
