(function () {
  const state = {
    action: "all",
    search: "",
    selectedTrigram: null,
    selectedEdgeKey: null,
    focusEndpoint: null
  };

  let focusResetTimer = null;

  const heroStats = document.getElementById("hero-stats");
  const graph = document.getElementById("atlas-graph");
  const trigramSearch = document.getElementById("trigram-search");
  const trigramOptions = document.getElementById("trigram-options");
  const graphTooltip = document.getElementById("graph-tooltip");

  function init() {
    state.selectedTrigram = window.FIREWALL_LIBRARY.applications[0]?.trigram || null;
    renderHero();
    render();

    trigramSearch.addEventListener("input", (event) => {
      const query = event.target.value.trim().toLowerCase();
      state.search = query;
      const exactMatch = findExactMatch(query);
      if (exactMatch) {
        state.selectedTrigram = exactMatch.trigram;
        state.selectedEdgeKey = null;
      } else {
        const prefixMatch = findPrefixMatch(query);
        if (prefixMatch) {
          state.selectedTrigram = prefixMatch.trigram;
          state.selectedEdgeKey = null;
        }
      }
      render();
    });

    trigramSearch.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      const query = event.target.value.trim().toLowerCase();
      const exactMatch = findExactMatch(query);
      if (exactMatch) {
        state.search = query;
        state.selectedTrigram = exactMatch.trigram;
        state.selectedEdgeKey = null;
        render();
      } else {
        const prefixMatch = findPrefixMatch(query);
        if (prefixMatch) {
          state.search = query;
          state.selectedTrigram = prefixMatch.trigram;
          state.selectedEdgeKey = null;
          render();
        }
      }
    });

    document.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        state.action = chip.dataset.filterValue;
        document.querySelectorAll(".chip").forEach((item) => item.classList.toggle("is-active", item === chip));
        render();
      });
    });
  }

  function renderHero() {
    const summary = window.FIREWALL_LIBRARY.summary;
    heroStats.innerHTML = `
      <div class="stat"><span>Applications</span><strong>${summary.applications}</strong></div>
      <div class="stat"><span>Rules</span><strong>${summary.rules}</strong></div>
      <div class="stat"><span>Sources</span><strong>${summary.sources}</strong></div>
      <div class="stat"><span>Destinations</span><strong>${summary.destinations}</strong></div>
    `;
  }

  function getFilteredApps() {
    return window.FIREWALL_LIBRARY.applications.filter((app) => {
      const matchingRules = app.rules.filter((rule) => state.action === "all" || rule.action === state.action);
      if (!matchingRules.length) return false;
      if (!state.search) return true;
      const combinedLabel = `${app.trigram} - ${app.name}`.toLowerCase();
      const haystack = [
        app.trigram,
        app.name,
        combinedLabel,
        app.tier,
        app.folder,
        ...matchingRules.flatMap((rule) => [rule.name, rule.source, rule.destination, rule.action, rule.direction, ...rule.ports])
      ].join(" ").toLowerCase();
      return app.trigram.toLowerCase().includes(state.search) || combinedLabel.includes(state.search) || haystack.includes(state.search);
    });
  }

  function render() {
    const apps = getFilteredApps();
    if (!apps.some((app) => app.trigram === state.selectedTrigram)) {
      state.selectedTrigram = apps[0]?.trigram || null;
      state.selectedEdgeKey = null;
    }
    renderSearchOptions(apps);
    renderGraph(apps);
  }

  function renderSearchOptions(apps) {
    trigramOptions.innerHTML = apps
      .map((app) => `<option value="${escapeHtml(app.trigram)} - ${escapeHtml(app.name)}"></option>`)
      .join("");
    const selectedApp = apps.find((app) => app.trigram === state.selectedTrigram);
    if (selectedApp && document.activeElement !== trigramSearch) {
      trigramSearch.value = `${selectedApp.trigram} - ${selectedApp.name}`;
    }
  }

  function renderGraph(apps) {
    const width = graph.clientWidth || 900;
    const height = graph.clientHeight || 720;
    const selectedApp = apps.find((app) => app.trigram === state.selectedTrigram);
    const knownTrigrams = new Set(window.FIREWALL_LIBRARY.applications.map((app) => app.trigram));
    if (!selectedApp) {
      graph.innerHTML = `<p class="subtle">No connected policy to show.</p>`;
      return;
    }
    const sourceMap = new Map();
    const appMap = new Map();
    const destinationMap = new Map();
    const edges = [];

    appMap.set(selectedApp.trigram, {
      id: selectedApp.trigram,
      label: selectedApp.trigram,
      kind: "app",
      subStrong: "",
      subText: selectedApp.name,
      action: "neutral"
    });
    const filteredRules = selectedApp.rules.filter((rule) => state.action === "all" || rule.action === state.action);

    filteredRules.forEach((rule) => {
      const sourceId = `src:${rule.source}`;
      const destinationId = `dst:${rule.destination}`;

      if (!sourceMap.has(sourceId)) {
        const sourceParts = splitEndpointName(rule.source);
        sourceMap.set(sourceId, {
          id: sourceId,
          label: rule.source,
          kind: "source",
          trigram: sourceParts.trigram || deriveTrigram(rule.source, knownTrigrams, selectedApp.trigram),
          displayName: sourceParts.name || rule.source,
          actions: new Set()
        });
      }
      if (!destinationMap.has(destinationId)) {
        const destinationParts = splitEndpointName(rule.destination);
        destinationMap.set(destinationId, {
          id: destinationId,
          label: rule.destination,
          kind: "destination",
          trigram: destinationParts.trigram || deriveTrigram(rule.destination, knownTrigrams, selectedApp.trigram),
          displayName: destinationParts.name || rule.destination,
          actions: new Set()
        });
      }

      sourceMap.get(sourceId).actions.add(rule.action);
      destinationMap.get(destinationId).actions.add(rule.action);
    });

    [...sourceMap.values()].forEach((node) => {
      node.action = resolveActionSet(node.actions);
      delete node.actions;
      edges.push({
        from: node.id,
        to: selectedApp.trigram,
        action: node.action,
        trigram: selectedApp.trigram,
        rules: filteredRules.filter((rule) => rule.source === node.label),
        edgeKey: `source:${selectedApp.trigram}:${node.label}`,
        side: "source"
      });
    });

    [...destinationMap.values()].forEach((node) => {
      node.action = resolveActionSet(node.actions);
      delete node.actions;
      edges.push({
        from: selectedApp.trigram,
        to: node.id,
        action: node.action,
        trigram: selectedApp.trigram,
        rules: filteredRules.filter((rule) => rule.destination === node.label),
        edgeKey: `destination:${selectedApp.trigram}:${node.label}`,
        side: "destination"
      });
    });

    const sources = [...sourceMap.values()].sort((a, b) => a.label.localeCompare(b.label));
    const destinations = [...destinationMap.values()].sort((a, b) => a.label.localeCompare(b.label));
    const appsVisible = [...appMap.values()];
    const visibleIds = new Set([...sources, ...destinations, ...appsVisible].map((node) => node.id));
    const visibleEdges = edges.filter((edge) => visibleIds.has(edge.from) && visibleIds.has(edge.to));

    const positions = {};
    const place = (nodes, x, gap) => nodes.forEach((node, index) => { positions[node.id] = { x, y: 30 + index * gap }; });
    place(sources, 36, Math.max(28, Math.floor((height - 60) / Math.max(sources.length, 1))));
    place(appsVisible, Math.round((width - 126) / 2), Math.max(28, Math.floor((height - 60) / Math.max(appsVisible.length, 1))));
    place(destinations, width - 176, Math.max(28, Math.floor((height - 60) / Math.max(destinations.length, 1))));

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    visibleEdges.forEach((edge) => {
      const a = positions[edge.from];
      const b = positions[edge.to];
      if (!a || !b) return;
      const d = `M ${a.x + 126} ${a.y + 26} C ${(a.x + 126 + b.x) / 2} ${a.y + 26}, ${(a.x + 126 + b.x) / 2} ${b.y + 26}, ${b.x} ${b.y + 26}`;
      const hit = document.createElementNS("http://www.w3.org/2000/svg", "path");
      hit.setAttribute("d", d);
      hit.setAttribute("class", "edge-hit");
      hit.addEventListener("mouseenter", (event) => showGraphTooltip(event, edge));
      hit.addEventListener("mousemove", (event) => moveGraphTooltip(event));
      hit.addEventListener("mouseleave", hideGraphTooltip);
      hit.addEventListener("click", () => {
        state.selectedEdgeKey = edge.edgeKey;
        render();
      });
      svg.appendChild(hit);

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      const selectedClass = edge.edgeKey === state.selectedEdgeKey ? " is-selected" : "";
      path.setAttribute("class", `edge ${edge.action} active${selectedClass}`);
      path.dataset.edgeKey = edge.edgeKey;
      svg.appendChild(path);
    });

    [...sources, ...appsVisible, ...destinations].forEach((node) => {
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const focusClass = shouldFocusNode(node) ? " is-jump-focus" : "";
      group.setAttribute("class", `node ${node.kind} ${node.kind === "app" ? "neutral" : node.action} active${focusClass}`);
      group.setAttribute("transform", `translate(${positions[node.id].x}, ${positions[node.id].y})`);
      group.style.cursor = "pointer";
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", "126");
      rect.setAttribute("height", "54");
      rect.setAttribute("rx", "14");
      rect.setAttribute("ry", "14");
      rect.setAttribute("fill", getNodeFill(node.kind === "app" ? "neutral" : node.action));
      if (node.kind === "app") {
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", "12");
        label.setAttribute("y", "20");
        label.setAttribute("class", "node-label");
        label.textContent = shorten(node.label, 14);
        const sub = document.createElementNS("http://www.w3.org/2000/svg", "text");
        sub.setAttribute("x", "12");
        sub.setAttribute("y", "36");
        sub.setAttribute("class", "node-sub");
        sub.textContent = shorten(node.subText || "", 18);
        group.append(rect, label, sub);
      } else {
        const topLine = node.trigram || "";
        const secondLine = node.displayName || node.label || "";
        const trigram = document.createElementNS("http://www.w3.org/2000/svg", "text");
        trigram.setAttribute("x", "12");
        trigram.setAttribute("y", "15");
        trigram.setAttribute("class", "node-label");
        trigram.textContent = shorten(topLine, 10);
        const nameLine = document.createElementNS("http://www.w3.org/2000/svg", "text");
        nameLine.setAttribute("x", "12");
        nameLine.setAttribute("y", "30");
        nameLine.setAttribute("class", "node-rule-label");
        nameLine.textContent = shorten(secondLine, 16);
        group.append(rect, trigram, nameLine);
      }
      group.addEventListener("mouseenter", () => highlightNodeLinks(node, selectedApp, true));
      group.addEventListener("mouseleave", () => highlightNodeLinks(node, selectedApp, false));
      group.addEventListener("click", () => handleNodeClick(node, selectedApp));
      svg.appendChild(group);
    });

    graph.replaceChildren(svg);
  }

  function shorten(value, max) {
    return value.length > max ? `${value.slice(0, max - 1)}...` : value;
  }

  function handleNodeClick(node, selectedApp) {
    if (!selectedApp) return;

    if (node.kind === "app") {
      selectApplication(node.id);
      return;
    }

    const endpointParts = splitEndpointName(node.label);
    const nextTrigram = endpointParts.trigram || node.trigram;
    const nextApp = window.FIREWALL_LIBRARY.applications.find((app) => app.trigram === nextTrigram);

    if (nextApp) {
      selectApplication(nextApp.trigram, node.label);
    }
  }

  function showGraphTooltip(event, edge) {
    if (!edge.rules?.length) return;
    graphTooltip.innerHTML = edge.rules.map((rule) => `
      <p class="tooltip-rule ${escapeHtml(rule.action)}"><strong>${escapeHtml(rule.name)}</strong><br>Source: ${escapeHtml(formatEndpoint(rule.source))}<br>Destination: ${escapeHtml(formatEndpoint(rule.destination))}<br>${escapeHtml(getDirectionLabel(rule.direction))} · ${escapeHtml(rule.action)} · ${escapeHtml(rule.protocol)} · ${escapeHtml(rule.ports.join(", "))}</p>
    `).join("");
    graphTooltip.hidden = false;
    moveGraphTooltip(event);
  }

  function moveGraphTooltip(event) {
    if (graphTooltip.hidden) return;
    const rect = graph.getBoundingClientRect();
    const left = event.clientX - rect.left + 14;
    const top = event.clientY - rect.top + 14;
    graphTooltip.style.left = `${left}px`;
    graphTooltip.style.top = `${top}px`;
  }

  function hideGraphTooltip() {
    graphTooltip.hidden = true;
  }

  function getDirectionLabel(direction) {
    if (direction === "ingress") return "incoming";
    if (direction === "egress") return "outgoing";
    return direction;
  }

  function highlightNodeLinks(node, selectedApp, active) {
    if (node.kind === "app") return;
    const relevantRules = selectedApp.rules.filter((rule) => {
      if (state.action !== "all" && rule.action !== state.action) return false;
      if (node.kind === "source") return rule.source === node.label;
      return rule.destination === node.label;
    });

    const edgeKeys = new Set();
    relevantRules.forEach((rule) => {
      edgeKeys.add(`source:${selectedApp.trigram}:${rule.source}`);
      edgeKeys.add(`destination:${selectedApp.trigram}:${rule.destination}`);
    });

    edgeKeys.forEach((edgeKey) => {
      const edge = graph.querySelector(`[data-edge-key="${CSS.escape(edgeKey)}"]`);
      if (edge) {
        edge.classList.toggle("is-hovered", active);
      }
    });
  }

  function getNodeFill(action) {
    if (action === "allow") return "rgba(46,155,117,0.22)";
    if (action === "deny") return "#8b0000";
    if (action === "mixed") return "rgba(255,149,0,0.24)";
    return "rgba(37,99,235,0.22)";
  }

  function resolveActionSet(actions) {
    if (actions.has("allow") && actions.has("deny")) return "mixed";
    if (actions.has("deny")) return "deny";
    if (actions.has("allow")) return "allow";
    return "neutral";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function findExactMatch(query) {
    return window.FIREWALL_LIBRARY.applications.find((app) => {
      const combined = `${app.trigram} - ${app.name}`.toLowerCase();
      return app.trigram.toLowerCase() === query || app.name.toLowerCase() === query || combined === query;
    });
  }

  function findPrefixMatch(query) {
    if (!query) return null;
    return window.FIREWALL_LIBRARY.applications.find((app) => {
      const combined = `${app.trigram} - ${app.name}`.toLowerCase();
      return app.trigram.toLowerCase().startsWith(query) || app.name.toLowerCase().startsWith(query) || combined.startsWith(query);
    });
  }

  function selectApplication(trigram, focusEndpoint = null) {
    clearFocusPulse();
    state.selectedTrigram = trigram;
    state.selectedEdgeKey = null;
    state.search = trigram.toLowerCase();
    state.focusEndpoint = focusEndpoint;
    render();
    if (focusEndpoint) {
      focusResetTimer = window.setTimeout(() => {
        state.focusEndpoint = null;
        render();
      }, 2200);
    }
  }

  function clearFocusPulse() {
    if (focusResetTimer) {
      window.clearTimeout(focusResetTimer);
      focusResetTimer = null;
    }
    state.focusEndpoint = null;
  }

  function shouldFocusNode(node) {
    return Boolean(state.focusEndpoint) && node.label === state.focusEndpoint;
  }

  function deriveTrigram(value, knownTrigrams, fallback) {
    if (knownTrigrams.has(value)) return value;
    const compact = String(value || "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (compact.length >= 3) return compact.slice(0, 3);
    return fallback;
  }

  function splitEndpointName(value) {
    const raw = String(value || "");
    const underscore = raw.indexOf("_");
    if (underscore > 0) {
      return {
        trigram: raw.slice(0, underscore),
        name: raw.slice(underscore + 1)
      };
    }
    return {
      trigram: raw.slice(0, 3).toUpperCase(),
      name: raw
    };
  }

  function formatEndpoint(value) {
    const parts = splitEndpointName(value);
    return `${parts.name} (${parts.trigram})`;
  }

  init();
}());
