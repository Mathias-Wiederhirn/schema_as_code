$ErrorActionPreference = "Stop"

$root = "C:\Scripts\Projects\schema_as_code\firewall-configs"

$apps = @(
  @{ trigram = "ACM"; app = "Access Management"; tier = "identity"; src = "corp-users"; dst = "idm-cluster"; ports = @("443", "636"); allow = @("443/tcp", "636/tcp"); deny = @("23/tcp") },
  @{ trigram = "API"; app = "Public API"; tier = "edge"; src = "internet"; dst = "api-gateway"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("22/tcp") },
  @{ trigram = "APP"; app = "Application Core"; tier = "app"; src = "web-tier"; dst = "app-tier"; ports = @("8080", "8443"); allow = @("8080/tcp", "8443/tcp"); deny = @("21/tcp") },
  @{ trigram = "ATH"; app = "Auth Service"; tier = "identity"; src = "app-tier"; dst = "auth-service"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("80/tcp") },
  @{ trigram = "AUD"; app = "Audit Platform"; tier = "ops"; src = "ops-admin"; dst = "audit-store"; ports = @("443", "9200"); allow = @("443/tcp", "9200/tcp"); deny = @("25/tcp") },
  @{ trigram = "BIL"; app = "Billing Engine"; tier = "finance"; src = "app-tier"; dst = "billing-db"; ports = @("443", "5432"); allow = @("443/tcp", "5432/tcp"); deny = @("3389/tcp") },
  @{ trigram = "BKP"; app = "Backup Control"; tier = "ops"; src = "backup-agents"; dst = "backup-vault"; ports = @("443", "8200"); allow = @("443/tcp", "8200/tcp"); deny = @("25/tcp") },
  @{ trigram = "BUS"; app = "Business Portal"; tier = "web"; src = "internet"; dst = "portal-frontends"; ports = @("80", "443"); allow = @("80/tcp", "443/tcp"); deny = @("22/tcp") },
  @{ trigram = "CAD"; app = "Card Services"; tier = "finance"; src = "payment-tier"; dst = "card-core"; ports = @("443", "1521"); allow = @("443/tcp", "1521/tcp"); deny = @("5900/tcp") },
  @{ trigram = "CAS"; app = "Case Tracking"; tier = "app"; src = "corp-users"; dst = "case-api"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("445/tcp") },
  @{ trigram = "CHT"; app = "Chat Gateway"; tier = "collab"; src = "internet"; dst = "chat-hub"; ports = @("443", "5222"); allow = @("443/tcp", "5222/tcp"); deny = @("23/tcp") },
  @{ trigram = "CIC"; app = "CI Control"; tier = "devops"; src = "dev-vpn"; dst = "ci-runners"; ports = @("443", "22"); allow = @("443/tcp", "22/tcp"); deny = @("25/tcp") },
  @{ trigram = "CMP"; app = "Compliance Vault"; tier = "ops"; src = "audit-platform"; dst = "compliance-store"; ports = @("443", "9200"); allow = @("443/tcp", "9200/tcp"); deny = @("21/tcp") },
  @{ trigram = "CRM"; app = "CRM Platform"; tier = "app"; src = "corp-users"; dst = "crm-api"; ports = @("443", "5432"); allow = @("443/tcp", "5432/tcp"); deny = @("25/tcp") },
  @{ trigram = "CSH"; app = "Cash Ledger"; tier = "finance"; src = "finance-app"; dst = "cash-ledger-db"; ports = @("443", "1521"); allow = @("443/tcp", "1521/tcp"); deny = @("3389/tcp") },
  @{ trigram = "CTL"; app = "Control Plane"; tier = "platform"; src = "ops-admin"; dst = "control-plane"; ports = @("443", "6443"); allow = @("443/tcp", "6443/tcp"); deny = @("80/tcp") },
  @{ trigram = "CUS"; app = "Customer Hub"; tier = "web"; src = "internet"; dst = "customer-hub"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("22/tcp") },
  @{ trigram = "DAS"; app = "Data Science"; tier = "analytics"; src = "analytics-vpc"; dst = "ml-workbench"; ports = @("443", "8888"); allow = @("443/tcp", "8888/tcp"); deny = @("25/tcp") },
  @{ trigram = "DBA"; app = "Database Admin"; tier = "ops"; src = "dba-jump"; dst = "postgres-fleet"; ports = @("22", "5432"); allow = @("22/tcp", "5432/tcp"); deny = @("80/tcp") },
  @{ trigram = "DLP"; app = "Data Loss Prevention"; tier = "security"; src = "corp-egress"; dst = "dlp-cluster"; ports = @("443", "6514"); allow = @("443/tcp", "6514/tcp"); deny = @("23/tcp") },
  @{ trigram = "DNS"; app = "DNS Resolver"; tier = "core"; src = "all-zones"; dst = "resolver-pool"; ports = @("53"); allow = @("53/udp", "53/tcp"); deny = @("25/tcp") },
  @{ trigram = "DOC"; app = "Document Service"; tier = "app"; src = "corp-users"; dst = "doc-api"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("3389/tcp") },
  @{ trigram = "EAI"; app = "Enterprise Integration"; tier = "integration"; src = "app-tier"; dst = "esb-cluster"; ports = @("443", "5672"); allow = @("443/tcp", "5672/tcp"); deny = @("80/tcp") },
  @{ trigram = "ECM"; app = "Commerce Engine"; tier = "web"; src = "internet"; dst = "commerce-web"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("23/tcp") },
  @{ trigram = "EDI"; app = "EDI Gateway"; tier = "integration"; src = "partners"; dst = "edi-gateway"; ports = @("443", "22"); allow = @("443/tcp", "22/tcp"); deny = @("25/tcp") },
  @{ trigram = "ELK"; app = "Observability Stack"; tier = "ops"; src = "app-tier"; dst = "elk-stack"; ports = @("5044", "9200"); allow = @("5044/tcp", "9200/tcp"); deny = @("3389/tcp") },
  @{ trigram = "EML"; app = "Mail Relay"; tier = "messaging"; src = "app-tier"; dst = "smtp-relay"; ports = @("587"); allow = @("587/tcp"); deny = @("25/tcp") },
  @{ trigram = "ERP"; app = "ERP Core"; tier = "finance"; src = "corp-users"; dst = "erp-core"; ports = @("443", "1521"); allow = @("443/tcp", "1521/tcp"); deny = @("5900/tcp") },
  @{ trigram = "ETL"; app = "ETL Pipeline"; tier = "analytics"; src = "data-lake"; dst = "etl-workers"; ports = @("443", "9092"); allow = @("443/tcp", "9092/tcp"); deny = @("23/tcp") },
  @{ trigram = "EVT"; app = "Event Bus"; tier = "integration"; src = "app-tier"; dst = "event-brokers"; ports = @("5672", "9092"); allow = @("5672/tcp", "9092/tcp"); deny = @("21/tcp") },
  @{ trigram = "EXP"; app = "Export Service"; tier = "batch"; src = "ops-admin"; dst = "export-runners"; ports = @("443", "22"); allow = @("443/tcp", "22/tcp"); deny = @("80/tcp") },
  @{ trigram = "FED"; app = "Federation Hub"; tier = "identity"; src = "partners"; dst = "federation-hub"; ports = @("443"); allow = @("443/tcp"); deny = @("23/tcp") },
  @{ trigram = "FIL"; app = "File Transfer"; tier = "integration"; src = "partners"; dst = "mft-gateway"; ports = @("22", "443"); allow = @("22/tcp", "443/tcp"); deny = @("25/tcp") },
  @{ trigram = "FIN"; app = "Finance API"; tier = "finance"; src = "corp-users"; dst = "finance-api"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("3389/tcp") },
  @{ trigram = "FRA"; app = "Fraud Engine"; tier = "security"; src = "payment-tier"; dst = "fraud-core"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("80/tcp") },
  @{ trigram = "GAT"; app = "Gateway Mesh"; tier = "edge"; src = "internet"; dst = "gateway-mesh"; ports = @("443"); allow = @("443/tcp"); deny = @("22/tcp") },
  @{ trigram = "GIT"; app = "Git Service"; tier = "devops"; src = "dev-vpn"; dst = "git-service"; ports = @("22", "443"); allow = @("22/tcp", "443/tcp"); deny = @("25/tcp") },
  @{ trigram = "GOV"; app = "Governance API"; tier = "ops"; src = "ops-admin"; dst = "governance-api"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("23/tcp") },
  @{ trigram = "GRF"; app = "Graph Service"; tier = "analytics"; src = "app-tier"; dst = "graph-db"; ports = @("443", "7687"); allow = @("443/tcp", "7687/tcp"); deny = @("3389/tcp") },
  @{ trigram = "HCM"; app = "Human Capital"; tier = "corp"; src = "corp-users"; dst = "hcm-suite"; ports = @("443", "1521"); allow = @("443/tcp", "1521/tcp"); deny = @("23/tcp") },
  @{ trigram = "HLP"; app = "Helpdesk"; tier = "corp"; src = "corp-users"; dst = "helpdesk-web"; ports = @("443"); allow = @("443/tcp"); deny = @("22/tcp") },
  @{ trigram = "HRM"; app = "HR Manager"; tier = "corp"; src = "corp-users"; dst = "hrm-core"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("80/tcp") },
  @{ trigram = "IAM"; app = "Identity Access"; tier = "identity"; src = "corp-users"; dst = "iam-core"; ports = @("443", "636"); allow = @("443/tcp", "636/tcp"); deny = @("25/tcp") },
  @{ trigram = "IDS"; app = "Intrusion Detection"; tier = "security"; src = "tap-network"; dst = "ids-sensors"; ports = @("443", "514"); allow = @("443/tcp", "514/udp"); deny = @("23/tcp") },
  @{ trigram = "IMG"; app = "Image Service"; tier = "app"; src = "web-tier"; dst = "image-renderer"; ports = @("443", "9000"); allow = @("443/tcp", "9000/tcp"); deny = @("3389/tcp") },
  @{ trigram = "IMP"; app = "Import Pipeline"; tier = "batch"; src = "partners"; dst = "import-workers"; ports = @("443", "22"); allow = @("443/tcp", "22/tcp"); deny = @("25/tcp") },
  @{ trigram = "INS"; app = "Insights Engine"; tier = "analytics"; src = "analytics-vpc"; dst = "insight-cluster"; ports = @("443", "9092"); allow = @("443/tcp", "9092/tcp"); deny = @("80/tcp") },
  @{ trigram = "INV"; app = "Inventory"; tier = "app"; src = "corp-users"; dst = "inventory-api"; ports = @("443", "5432"); allow = @("443/tcp", "5432/tcp"); deny = @("3389/tcp") },
  @{ trigram = "IOT"; app = "IoT Hub"; tier = "edge"; src = "internet"; dst = "iot-broker"; ports = @("443", "8883"); allow = @("443/tcp", "8883/tcp"); deny = @("23/tcp") },
  @{ trigram = "KAF"; app = "Kafka Cluster"; tier = "stream"; src = "analytics-vpc"; dst = "kafka-brokers"; ports = @("9092", "9093"); allow = @("9092/tcp", "9093/tcp"); deny = @("25/tcp") },
  @{ trigram = "KEY"; app = "Key Vault"; tier = "security"; src = "app-tier"; dst = "key-vault"; ports = @("443", "8200"); allow = @("443/tcp", "8200/tcp"); deny = @("80/tcp") },
  @{ trigram = "KUB"; app = "Kubernetes API"; tier = "platform"; src = "ops-admin"; dst = "k8s-control-plane"; ports = @("443", "6443"); allow = @("443/tcp", "6443/tcp"); deny = @("23/tcp") },
  @{ trigram = "LAB"; app = "Lab Platform"; tier = "dev"; src = "dev-vpn"; dst = "lab-platform"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("25/tcp") },
  @{ trigram = "LDP"; app = "LDAP Service"; tier = "identity"; src = "corp-users"; dst = "ldap-cluster"; ports = @("389", "636"); allow = @("389/tcp", "636/tcp"); deny = @("80/tcp") },
  @{ trigram = "LEG"; app = "Legacy Bridge"; tier = "integration"; src = "app-tier"; dst = "legacy-bridge"; ports = @("443", "1521"); allow = @("443/tcp", "1521/tcp"); deny = @("3389/tcp") },
  @{ trigram = "LOG"; app = "Log Collector"; tier = "ops"; src = "all-zones"; dst = "log-collector"; ports = @("514", "6514"); allow = @("514/udp", "6514/tcp"); deny = @("23/tcp") },
  @{ trigram = "LON"; app = "London Hub"; tier = "regional"; src = "corp-users"; dst = "lon-hub"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("80/tcp") },
  @{ trigram = "LST"; app = "Listing API"; tier = "web"; src = "internet"; dst = "listing-api"; ports = @("443"); allow = @("443/tcp"); deny = @("22/tcp") },
  @{ trigram = "MAI"; app = "Mail API"; tier = "messaging"; src = "app-tier"; dst = "mail-api"; ports = @("443", "587"); allow = @("443/tcp", "587/tcp"); deny = @("25/tcp") },
  @{ trigram = "MDM"; app = "Master Data"; tier = "data"; src = "corp-users"; dst = "mdm-core"; ports = @("443", "1521"); allow = @("443/tcp", "1521/tcp"); deny = @("23/tcp") },
  @{ trigram = "MED"; app = "Media Pipeline"; tier = "app"; src = "cdn-edge"; dst = "media-pipeline"; ports = @("443", "9000"); allow = @("443/tcp", "9000/tcp"); deny = @("3389/tcp") },
  @{ trigram = "MES"; app = "Messaging Core"; tier = "messaging"; src = "app-tier"; dst = "message-core"; ports = @("443", "5672"); allow = @("443/tcp", "5672/tcp"); deny = @("80/tcp") },
  @{ trigram = "MET"; app = "Metrics Gateway"; tier = "ops"; src = "monitoring"; dst = "metrics-gateway"; ports = @("9100", "9200"); allow = @("9100/tcp", "9200/tcp"); deny = @("25/tcp") },
  @{ trigram = "MFA"; app = "MFA Service"; tier = "identity"; src = "internet"; dst = "mfa-gateway"; ports = @("443"); allow = @("443/tcp"); deny = @("23/tcp") },
  @{ trigram = "MLP"; app = "ML Platform"; tier = "analytics"; src = "data-science"; dst = "ml-platform"; ports = @("443", "8888"); allow = @("443/tcp", "8888/tcp"); deny = @("80/tcp") },
  @{ trigram = "MON"; app = "Monitoring Suite"; tier = "ops"; src = "ops-admin"; dst = "monitoring-suite"; ports = @("443", "9090"); allow = @("443/tcp", "9090/tcp"); deny = @("23/tcp") },
  @{ trigram = "MQS"; app = "Queue Service"; tier = "messaging"; src = "app-tier"; dst = "queue-service"; ports = @("5672", "15672"); allow = @("5672/tcp", "15672/tcp"); deny = @("25/tcp") },
  @{ trigram = "NAT"; app = "NAT Gateway"; tier = "network"; src = "private-subnets"; dst = "nat-gateway"; ports = @("443", "80"); allow = @("443/tcp", "80/tcp"); deny = @("23/tcp") },
  @{ trigram = "NET"; app = "Network Core"; tier = "network"; src = "ops-admin"; dst = "network-core"; ports = @("443", "161"); allow = @("443/tcp", "161/udp"); deny = @("25/tcp") },
  @{ trigram = "NTP"; app = "Time Service"; tier = "core"; src = "all-zones"; dst = "time-servers"; ports = @("123"); allow = @("123/udp"); deny = @("80/tcp") },
  @{ trigram = "OBS"; app = "Observability"; tier = "ops"; src = "app-tier"; dst = "obs-stack"; ports = @("4317", "4318"); allow = @("4317/tcp", "4318/tcp"); deny = @("23/tcp") },
  @{ trigram = "OMS"; app = "Order Service"; tier = "commerce"; src = "web-tier"; dst = "order-service"; ports = @("443", "5432"); allow = @("443/tcp", "5432/tcp"); deny = @("3389/tcp") },
  @{ trigram = "OPS"; app = "Operations Hub"; tier = "ops"; src = "ops-admin"; dst = "operations-hub"; ports = @("443", "22"); allow = @("443/tcp", "22/tcp"); deny = @("25/tcp") },
  @{ trigram = "ORC"; app = "Orchestration"; tier = "platform"; src = "ops-admin"; dst = "orchestration-api"; ports = @("443", "6443"); allow = @("443/tcp", "6443/tcp"); deny = @("80/tcp") },
  @{ trigram = "PAY"; app = "Payments"; tier = "finance"; src = "internet"; dst = "payments-api"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("23/tcp") },
  @{ trigram = "PDF"; app = "PDF Renderer"; tier = "app"; src = "app-tier"; dst = "pdf-renderer"; ports = @("443", "8081"); allow = @("443/tcp", "8081/tcp"); deny = @("25/tcp") },
  @{ trigram = "PIM"; app = "Product Info"; tier = "commerce"; src = "corp-users"; dst = "pim-api"; ports = @("443", "5432"); allow = @("443/tcp", "5432/tcp"); deny = @("3389/tcp") },
  @{ trigram = "PKI"; app = "PKI Services"; tier = "security"; src = "corp-users"; dst = "pki-service"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("80/tcp") },
  @{ trigram = "PLT"; app = "Platform Core"; tier = "platform"; src = "ops-admin"; dst = "platform-core"; ports = @("443", "6443"); allow = @("443/tcp", "6443/tcp"); deny = @("23/tcp") },
  @{ trigram = "PRC"; app = "Pricing Engine"; tier = "commerce"; src = "web-tier"; dst = "pricing-engine"; ports = @("443", "8080"); allow = @("443/tcp", "8080/tcp"); deny = @("25/tcp") },
  @{ trigram = "PRD"; app = "Product API"; tier = "commerce"; src = "internet"; dst = "product-api"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("80/tcp") },
  @{ trigram = "PRX"; app = "Proxy Fleet"; tier = "edge"; src = "internet"; dst = "proxy-fleet"; ports = @("80", "443"); allow = @("80/tcp", "443/tcp"); deny = @("22/tcp") },
  @{ trigram = "QAS"; app = "QA Services"; tier = "qa"; src = "qa-lab"; dst = "qa-services"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("25/tcp") },
  @{ trigram = "QRY"; app = "Query Engine"; tier = "analytics"; src = "bi-tools"; dst = "query-engine"; ports = @("443", "8123"); allow = @("443/tcp", "8123/tcp"); deny = @("3389/tcp") },
  @{ trigram = "QUE"; app = "Queue Adapter"; tier = "integration"; src = "app-tier"; dst = "queue-adapter"; ports = @("443", "5672"); allow = @("443/tcp", "5672/tcp"); deny = @("80/tcp") },
  @{ trigram = "RAB"; app = "Rabbit Cluster"; tier = "messaging"; src = "app-tier"; dst = "rabbit-brokers"; ports = @("5672", "15672"); allow = @("5672/tcp", "15672/tcp"); deny = @("23/tcp") },
  @{ trigram = "REC"; app = "Recommendation"; tier = "analytics"; src = "web-tier"; dst = "recommendation-api"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("25/tcp") },
  @{ trigram = "REG"; app = "Registry"; tier = "devops"; src = "dev-vpn"; dst = "container-registry"; ports = @("443", "5000"); allow = @("443/tcp", "5000/tcp"); deny = @("80/tcp") },
  @{ trigram = "REP"; app = "Reporting"; tier = "analytics"; src = "corp-users"; dst = "reporting-hub"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("3389/tcp") },
  @{ trigram = "RISK"; app = "Risk Engine"; tier = "security"; src = "payment-tier"; dst = "risk-engine"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("80/tcp") }
)

# Normalize the one trigram that is four chars.
$apps = $apps | ForEach-Object {
  if ($_.trigram.Length -gt 3) {
    $_.trigram = $_.trigram.Substring(0, 3)
  }
  $_
}

$moreApps = @(
  @{ trigram = "RPT"; app = "Report Builder"; tier = "analytics"; src = "corp-users"; dst = "report-builder"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("23/tcp") },
  @{ trigram = "SAP"; app = "SAP Gateway"; tier = "erp"; src = "corp-users"; dst = "sap-gateway"; ports = @("443", "3200"); allow = @("443/tcp", "3200/tcp"); deny = @("25/tcp") },
  @{ trigram = "SCH"; app = "Scheduler"; tier = "batch"; src = "ops-admin"; dst = "scheduler-core"; ports = @("443", "22"); allow = @("443/tcp", "22/tcp"); deny = @("80/tcp") },
  @{ trigram = "SCM"; app = "Source Manager"; tier = "devops"; src = "dev-vpn"; dst = "scm-service"; ports = @("22", "443"); allow = @("22/tcp", "443/tcp"); deny = @("23/tcp") },
  @{ trigram = "SDP"; app = "Service Desk"; tier = "corp"; src = "corp-users"; dst = "service-desk"; ports = @("443"); allow = @("443/tcp"); deny = @("25/tcp") },
  @{ trigram = "SEC"; app = "Security Hub"; tier = "security"; src = "ops-admin"; dst = "security-hub"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("80/tcp") },
  @{ trigram = "SEM"; app = "SIEM"; tier = "security"; src = "all-zones"; dst = "siem-core"; ports = @("443", "6514"); allow = @("443/tcp", "6514/tcp"); deny = @("23/tcp") },
  @{ trigram = "SHP"; app = "Shipping API"; tier = "commerce"; src = "web-tier"; dst = "shipping-api"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("25/tcp") },
  @{ trigram = "SIG"; app = "Signing Service"; tier = "security"; src = "app-tier"; dst = "signing-service"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("80/tcp") },
  @{ trigram = "SOC"; app = "SOC Console"; tier = "security"; src = "ops-admin"; dst = "soc-console"; ports = @("443"); allow = @("443/tcp"); deny = @("23/tcp") },
  @{ trigram = "SQL"; app = "SQL Warehouse"; tier = "data"; src = "bi-tools"; dst = "sql-warehouse"; ports = @("443", "1433"); allow = @("443/tcp", "1433/tcp"); deny = @("25/tcp") },
  @{ trigram = "SRE"; app = "SRE Toolkit"; tier = "ops"; src = "ops-admin"; dst = "sre-toolkit"; ports = @("443", "22"); allow = @("443/tcp", "22/tcp"); deny = @("80/tcp") },
  @{ trigram = "SSO"; app = "Single Sign-On"; tier = "identity"; src = "internet"; dst = "sso-gateway"; ports = @("443"); allow = @("443/tcp"); deny = @("23/tcp") },
  @{ trigram = "STG"; app = "Storage Grid"; tier = "data"; src = "app-tier"; dst = "storage-grid"; ports = @("443", "9000"); allow = @("443/tcp", "9000/tcp"); deny = @("25/tcp") },
  @{ trigram = "SUP"; app = "Support Portal"; tier = "corp"; src = "internet"; dst = "support-portal"; ports = @("443"); allow = @("443/tcp"); deny = @("80/tcp") },
  @{ trigram = "SYS"; app = "System Core"; tier = "platform"; src = "ops-admin"; dst = "system-core"; ports = @("443", "6443"); allow = @("443/tcp", "6443/tcp"); deny = @("23/tcp") },
  @{ trigram = "TAX"; app = "Tax Engine"; tier = "finance"; src = "erp-core"; dst = "tax-engine"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("25/tcp") },
  @{ trigram = "TEL"; app = "Telemetry"; tier = "ops"; src = "all-zones"; dst = "telemetry-gateway"; ports = @("4317", "4318"); allow = @("4317/tcp", "4318/tcp"); deny = @("80/tcp") },
  @{ trigram = "TRD"; app = "Trade Engine"; tier = "finance"; src = "corp-users"; dst = "trade-engine"; ports = @("443", "9443"); allow = @("443/tcp", "9443/tcp"); deny = @("23/tcp") },
  @{ trigram = "TRN"; app = "Training Portal"; tier = "corp"; src = "corp-users"; dst = "training-portal"; ports = @("443"); allow = @("443/tcp"); deny = @("25/tcp") },
  @{ trigram = "USR"; app = "User Profile"; tier = "app"; src = "web-tier"; dst = "user-profile"; ports = @("443", "5432"); allow = @("443/tcp", "5432/tcp"); deny = @("3389/tcp") },
  @{ trigram = "UTL"; app = "Utility Services"; tier = "core"; src = "all-zones"; dst = "utility-services"; ports = @("443", "53"); allow = @("443/tcp", "53/udp"); deny = @("80/tcp") },
  @{ trigram = "VAU"; app = "Vault"; tier = "security"; src = "app-tier"; dst = "vault-cluster"; ports = @("443", "8200"); allow = @("443/tcp", "8200/tcp"); deny = @("23/tcp") },
  @{ trigram = "VID"; app = "Video Platform"; tier = "media"; src = "internet"; dst = "video-platform"; ports = @("443", "1935"); allow = @("443/tcp", "1935/tcp"); deny = @("25/tcp") },
  @{ trigram = "VPN"; app = "VPN Gateway"; tier = "network"; src = "internet"; dst = "vpn-gateway"; ports = @("500", "4500"); allow = @("500/udp", "4500/udp", "esp"); deny = @("80/tcp") },
  @{ trigram = "WAF"; app = "Web Application Firewall"; tier = "edge"; src = "internet"; dst = "waf-cluster"; ports = @("80", "443"); allow = @("80/tcp", "443/tcp"); deny = @("22/tcp") },
  @{ trigram = "WEB"; app = "Web Frontend"; tier = "web"; src = "internet"; dst = "web-frontend"; ports = @("80", "443"); allow = @("80/tcp", "443/tcp"); deny = @("23/tcp") },
  @{ trigram = "WMS"; app = "Warehouse Mgmt"; tier = "commerce"; src = "corp-users"; dst = "wms-core"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("25/tcp") },
  @{ trigram = "WRK"; app = "Worker Pool"; tier = "batch"; src = "scheduler-core"; dst = "worker-pool"; ports = @("443", "22"); allow = @("443/tcp", "22/tcp"); deny = @("80/tcp") },
  @{ trigram = "XDR"; app = "Extended Detection"; tier = "security"; src = "all-zones"; dst = "xdr-hub"; ports = @("443", "6514"); allow = @("443/tcp", "6514/tcp"); deny = @("23/tcp") },
  @{ trigram = "XML"; app = "XML Gateway"; tier = "integration"; src = "partners"; dst = "xml-gateway"; ports = @("443", "8443"); allow = @("443/tcp", "8443/tcp"); deny = @("25/tcp") },
  @{ trigram = "ZTP"; app = "Zero Trust Proxy"; tier = "security"; src = "internet"; dst = "ztp-gateway"; ports = @("443"); allow = @("443/tcp"); deny = @("80/tcp") }
)

$apps = @($apps + $moreApps)
$apps = $apps | Select-Object -First 100

function Format-Endpoint {
  param(
    [string]$Trigram,
    [string]$Name
  )

  $normalized = ($Name -replace '[^A-Za-z0-9_-]', '-').ToLower()
  return ("{0}_{1}" -f $Trigram.ToUpper(), $normalized)
}

function Get-ReciprocalPairIndex {
  param(
    [int]$Index,
    [int]$Count
  )

  if ($Index % 2 -eq 0) {
    return ($Index + 1) % $Count
  }

  return $Index - 1
}

function Get-OppositeHalfIndex {
  param(
    [int]$Index,
    [int]$Count
  )

  return ($Index + ($Count / 2)) % $Count
}

New-Item -ItemType Directory -Force -Path $root | Out-Null

for ($i = 0; $i -lt $apps.Count; $i++) {
  $item = $apps[$i]
  $folder = Join-Path $root $item.trigram.ToLower()
  New-Item -ItemType Directory -Force -Path $folder | Out-Null

  $priorityBase = 100 + ($i * 10)
  $metricPort = 9100 + ($i % 5)
  $egressProto = if ($i % 4 -eq 0) { "udp" } else { "tcp" }
  $egressPort = switch ($i % 6) {
    0 { "53" }
    1 { "123" }
    2 { "443" }
    3 { "514" }
    4 { "587" }
    default { "9092" }
  }
  $egressTarget = switch ($item.tier) {
    "identity" { "directory-core" }
    "finance" { "audit-ledger" }
    "security" { "siem-core" }
    "analytics" { "lakehouse-bus" }
    "edge" { "origin-cluster" }
    "network" { "core-services" }
    default { "shared-services" }
  }
  $adminSource = if ($i % 3 -eq 0) { "ops-admin" } elseif ($i % 3 -eq 1) { "dev-vpn" } else { "corp-admin" }
  $syncDirection = if ($i % 2 -eq 0) { "egress" } else { "ingress" }
  $syncProtocol = if ($i % 5 -eq 0) { "udp" } else { "tcp" }
  $syncPort = switch ($i % 7) {
    0 { "161" }
    1 { "443" }
    2 { "8443" }
    3 { "8200" }
    4 { "4317" }
    5 { "5060" }
    default { "1521" }
  }
  $syncPeer = switch ($item.tier) {
    "ops" { "monitoring-hub" }
    "messaging" { "message-backbone" }
    "platform" { "control-plane" }
    "corp" { "corp-services" }
    "commerce" { "order-mesh" }
    default { "integration-bus" }
  }
  $allowPeer = $apps[(Get-ReciprocalPairIndex -Index $i -Count $apps.Count)]
  $denyPeer = $apps[(Get-OppositeHalfIndex -Index $i -Count $apps.Count)]
  $primarySource = Format-Endpoint -Trigram $item.trigram -Name $item.src
  $primaryDestination = Format-Endpoint -Trigram $item.trigram -Name $item.dst
  $adminSourceName = Format-Endpoint -Trigram $item.trigram -Name $adminSource
  $monitoringSource = Format-Endpoint -Trigram "MON" -Name "monitoring"
  $egressDestination = Format-Endpoint -Trigram $item.trigram -Name $egressTarget
  $syncPeerName = Format-Endpoint -Trigram $item.trigram -Name $syncPeer
  $allowPeerSource = Format-Endpoint -Trigram $allowPeer.trigram -Name $allowPeer.app
  $allowPeerDestination = Format-Endpoint -Trigram $item.trigram -Name $item.app
  $denyPeerSource = Format-Endpoint -Trigram $denyPeer.trigram -Name $denyPeer.app
  $denyPeerDestination = Format-Endpoint -Trigram $item.trigram -Name $item.app
  $anySource = "ANY_any"
  $peerAllowPort = switch ($i % 5) {
    0 { "443" }
    1 { "8443" }
    2 { "5432" }
    3 { "5672" }
    default { "9092" }
  }
  $peerDenyPort = switch ($i % 4) {
    0 { "3306" }
    1 { "3389" }
    2 { "22" }
    default { "25" }
  }
  $yaml = @"
application:
  trigram: $($item.trigram)
  name: $($item.app)
  tier: $($item.tier)
firewall:
  policy_set: $($item.trigram.ToLower())-default
  default_action: deny
  rules:
    - name: allow-primary
      source: $primarySource
      destination: $primaryDestination
      direction: ingress
      protocol: tcp
      ports:
$(($item.ports | ForEach-Object { "        - $_" }) -join "`r`n")
      action: allow
      priority: $priorityBase
      enabled: true
    - name: allow-ops
      source: $adminSourceName
      destination: $primaryDestination
      direction: ingress
      protocol: tcp
      ports:
        - 22
        - 443
      action: allow
      priority: $($priorityBase + 1)
      enabled: true
    - name: allow-observability
      source: $monitoringSource
      destination: $primaryDestination
      direction: ingress
      protocol: tcp
      ports:
        - $metricPort
      action: allow
      priority: $($priorityBase + 2)
      enabled: true
    - name: allow-egress-service
      source: $primaryDestination
      destination: $egressDestination
      direction: egress
      protocol: $egressProto
      ports:
        - $egressPort
      action: allow
      priority: $($priorityBase + 3)
      enabled: true
    - name: allow-sync
      source: $syncPeerName
      destination: $primaryDestination
      direction: $syncDirection
      protocol: $syncProtocol
      ports:
        - $syncPort
      action: allow
      priority: $($priorityBase + 4)
      enabled: $(if ($i % 8 -eq 0) { 'false' } else { 'true' })
    - name: allow-trigram-peer
      source: $allowPeerSource
      destination: $allowPeerDestination
      direction: ingress
      protocol: tcp
      ports:
        - $peerAllowPort
      action: allow
      priority: $($priorityBase + 5)
      enabled: true
    - name: allow-outbound-trigram
      source: $allowPeerDestination
      destination: $allowPeerSource
      direction: egress
      protocol: tcp
      ports:
        - $peerAllowPort
      action: allow
      priority: $($priorityBase + 6)
      enabled: true
    - name: deny-trigram-peer
      source: $denyPeerSource
      destination: $denyPeerDestination
      direction: ingress
      protocol: tcp
      ports:
        - $peerDenyPort
      action: deny
      priority: $($priorityBase + 7)
      enabled: true
    - name: deny-outbound-trigram
      source: $denyPeerDestination
      destination: $denyPeerSource
      direction: egress
      protocol: tcp
      ports:
        - $peerDenyPort
      action: deny
      priority: $($priorityBase + 8)
      enabled: true
    - name: deny-legacy
      source: $anySource
      destination: $primaryDestination
      direction: ingress
      protocol: any
      ports:
$(($item.deny | ForEach-Object { "        - $_" }) -join "`r`n")
      action: deny
      priority: $($priorityBase + 9)
      enabled: true
"@

  Set-Content -LiteralPath (Join-Path $folder "insite.yaml") -Value $yaml -Encoding UTF8
}

Write-Output "Generated $($apps.Count) firewall configuration folders in $root"
