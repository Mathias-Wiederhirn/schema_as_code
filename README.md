# Firewall Atlas

Live site:

[https://mathias-wiederhirn.github.io/schema_as_code/](https://mathias-wiederhirn.github.io/schema_as_code/)

Firewall Atlas is a static website that turns trigram-based firewall YAML files into an interactive network policy map.

## What the site does

- Shows the full firewall library as an interactive topology
- Lets you search an application by trigram
- Filters rules by `All`, `Allow`, or `Deny`
- Shows rule details on hover
- Lets you click source or destination nodes to move into the connected policy

## How to use the site

1. Open the live site or open `index.html` locally in a browser.
2. In `Applications`, type or choose a trigram such as `ACM`, `API`, or `BUS`.
3. Use `All`, `Allow`, or `Deny` to focus the graph on the policy mode you want.
4. Hover a connection to see the underlying rules, including source, destination, direction, action, protocol, and ports.
5. Click a source or destination node to jump to that trigram and continue exploring the policy path.

## Project structure

- `index.html`
  Main website entrypoint used by GitHub Pages.
- `firewall-library.html`
  Redirect entry that points to `index.html`.
- `firewall-library.css`
  Shared visual styling for the website and topology.
- `firewall-library.js`
  Search, graph rendering, hover details, and navigation behavior.
- `data/firewall-library.js`
  Generated browser-ready dataset built from all YAML folders.
- `firewall-configs/*/insite.yaml`
  Source firewall configurations, one folder per trigram.
- `scripts/generate_firewall_folders.ps1`
  Regenerates the trigram firewall YAML library.
- `scripts/build_firewall_library.ps1`
  Rebuilds the atlas dataset from the YAML files.

## Update the data

If the YAML files change:

1. Run `scripts/generate_firewall_folders.ps1` if you want to regenerate the sample firewall folders.
2. Run `scripts/build_firewall_library.ps1` to rebuild `data/firewall-library.js`.
3. Refresh the website in the browser.

## Publish

The repository is configured to work with GitHub Pages from the repository root. The website entrypoint is `index.html`.
