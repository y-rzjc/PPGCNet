(() => {
  "use strict";

  const config = window.SITE_CONFIG;
  if (!config) {
    document.body.innerHTML = "<p style='padding:24px'>未找到 SITE_CONFIG，请检查 config.js 是否正确加载。</p>";
    return;
  }

  const $ = (id) => document.getElementById(id);
  const text = (value) => document.createTextNode(value ?? "");

  document.title = config.pageTitle || config.title || "Academic Project Page";

  if (config.venue) {
    $("venue").hidden = false;
    $("venue").textContent = config.venue;
  }

  $("title").textContent = config.title || "Untitled Project";
  $("subtitle").textContent = config.subtitle || "";
  $("subtitle").hidden = !config.subtitle;

  renderAuthors();
  renderAffiliations();
  renderLinks();
  renderAbstract();
  renderOverview();
  renderComparisons();
  renderBibtex();

  function renderAuthors() {
    const root = $("authors");
    const authors = config.authors || [];

    authors.forEach((author, index) => {
      const wrapper = document.createElement("span");
      const nameNode = author.url ? document.createElement("a") : document.createElement("span");

      nameNode.className = author.url ? "author-link" : "author-name";
      nameNode.textContent = author.name;

      if (author.url) {
        nameNode.href = author.url;
        nameNode.target = "_blank";
        nameNode.rel = "noopener noreferrer";
      }

      wrapper.appendChild(nameNode);

      if (Array.isArray(author.affiliations) && author.affiliations.length) {
        const sup = document.createElement("sup");
        sup.textContent = author.affiliations.join(",");
        wrapper.appendChild(sup);
      }

      if (index < authors.length - 1) wrapper.appendChild(text(","));
      root.appendChild(wrapper);
    });
  }

  function renderAffiliations() {
    const root = $("affiliations");
    (config.affiliations || []).forEach((item) => {
      const span = document.createElement("span");
      span.className = "affiliation-item";
      span.innerHTML = `<sup>${escapeHtml(String(item.id))}</sup> ${escapeHtml(item.name)}`;
      root.appendChild(span);
    });
  }

  function renderLinks() {
    const root = $("resourceLinks");
    (config.links || []).forEach((item) => {
      const a = document.createElement("a");
      a.className = "resource-button" + (item.enabled === false ? " is-disabled" : "");
      a.textContent = item.label;
      a.href = item.enabled === false ? "#" : item.url;

      if (item.enabled !== false && item.url && !item.url.startsWith("#")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }

      if (item.enabled === false) {
        a.setAttribute("aria-disabled", "true");
        a.title = "Coming soon";
      }
      root.appendChild(a);
    });
  }

  function renderAbstract() {
    const root = $("abstract");
    const paragraphs = Array.isArray(config.abstract) ? config.abstract : [config.abstract];
    paragraphs.filter(Boolean).forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      root.appendChild(p);
    });
  }

  function renderOverview() {
    const overview = config.overview || {};
    if (!overview.image) {
      $("datasetSection").hidden = true;
      return;
    }

    $("datasetHeading").textContent = overview.heading || "Overview";
    $("teaserImage").src = overview.image;
    $("teaserImage").alt = overview.alt || "Project overview";
    $("teaserCaption").textContent = overview.caption || "";
  }

  function renderComparisons() {
    const comparison = config.comparison || {};
    const samples = comparison.samples || [];

    if (!samples.length) {
      $("comparisonSection").hidden = true;
      return;
    }

    $("comparisonHeading").textContent = comparison.heading || "Visual Comparisons";
    $("comparisonHint").textContent = comparison.hint || "";
    $("comparisonHint").hidden = !comparison.hint;

    const labels = comparison.labels || [];
    const folders = comparison.folders || [];
    const root = $("comparisonGrid");

    samples.forEach((sample, sampleIndex) => {
      const card = document.createElement("article");
      card.className = "sample-card";

      if (sample.title) {
        const title = document.createElement("p");
        title.className = "sample-title";
        title.textContent = sample.title;
        card.appendChild(title);
      }

      const row = document.createElement("div");
      row.className = "video-row";
      const videos = [];

      (sample.files || []).forEach((file, columnIndex) => {
        const column = document.createElement("div");
        column.className = "video-column";

        const label = document.createElement("span");
        label.className = "video-label";
        label.textContent = labels[columnIndex] || `Video ${columnIndex + 1}`;

        const video = document.createElement("video");
        video.controls = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = "metadata";
        video.setAttribute("aria-label", `${sample.title || `Sample ${sampleIndex + 1}`} - ${label.textContent}`);

        const source = document.createElement("source");
        source.src = `${folders[columnIndex] || ""}${file}`;
        source.type = "video/mp4";
        video.appendChild(source);

        const error = document.createElement("div");
        error.className = "video-error";
        error.textContent = `视频加载失败：${source.src}。请检查 config.js 中的文件名和目录。`;

        video.addEventListener("error", () => {
          video.style.display = "none";
          error.style.display = "flex";
        });

        column.append(label, video, error);
        row.appendChild(column);
        videos.push(video);
      });

      card.appendChild(row);
      root.appendChild(card);
      attachSynchronizedPlayback(videos);
    });
  }

  function attachSynchronizedPlayback(videos) {
    if (videos.length < 2) return;

    let locked = false;
    let unlockTimer = null;

    const syncFrom = (source, eventType) => {
      if (locked) return;
      locked = true;
      window.clearTimeout(unlockTimer);

      videos.forEach((target) => {
        if (target === source) return;

        if (eventType === "play" && target.paused) {
          target.play().catch(() => {});
        } else if (eventType === "pause" && !target.paused) {
          target.pause();
        }

        if (["play", "pause", "seeking", "seeked"].includes(eventType)) {
          const difference = Math.abs((target.currentTime || 0) - (source.currentTime || 0));
          if (difference > 0.08 && Number.isFinite(source.currentTime)) {
            try { target.currentTime = source.currentTime; } catch (_) {}
          }
        }
      });

      unlockTimer = window.setTimeout(() => { locked = false; }, 80);
    };

    ["play", "pause", "seeking", "seeked"].forEach((eventType) => {
      videos.forEach((video) => {
        video.addEventListener(eventType, () => syncFrom(video, eventType));
      });
    });
  }

  function renderBibtex() {
    $("bibtex").textContent = config.bibtex || "";
    const button = $("copyBibtex");

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(config.bibtex || "");
        button.textContent = "已复制";
      } catch (_) {
        button.textContent = "复制失败，请手动选择";
      }
      window.setTimeout(() => { button.textContent = "复制 BibTeX"; }, 1800);
    });
  }

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    })[character]);
  }
})();
