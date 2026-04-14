# Firewall Atlas

This workspace is centered on the trigram-based firewall atlas.

## Main files

- `firewall-library.html`
  Main interactive viewer.
- `firewall-library.css`
  Shared visual style for the atlas.
- `firewall-library.js`
  Graph rendering, search, hover details, and interaction logic.
- `data/firewall-library.js`
  Generated browser-ready dataset built from all YAML folders.
- `firewall-configs/*/insite.yaml`
  Source firewall configurations, one folder per trigram.
- `scripts/generate_firewall_folders.ps1`
  Regenerates the trigram firewall YAML library.
- `scripts/build_firewall_library.ps1`
  Rebuilds the atlas dataset from the YAML files.

## Open the atlas

Open `firewall-library.html` in a browser.

## Refresh the dataset

If the YAML files change:

1. Run `scripts/generate_firewall_folders.ps1` if you want to regenerate the sample firewall folders.
2. Run `scripts/build_firewall_library.ps1` to rebuild `data/firewall-library.js`.
