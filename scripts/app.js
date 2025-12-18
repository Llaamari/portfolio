const $ = (sel, root = document) => root.querySelector(sel);

const els = {
  year: $("#year"),
  themeToggle: $("#themeToggle"),
  search: $("#search"),
  filter: $("#filter"),
  grid: $("#projectsGrid"),
  modal: $("#modal"),
  modalContent: $("#modalContent"),
  closeModal: $("#closeModal"),
  name: $("#name"),
  email: $("#email"),
  message: $("#message"),

  // Lightbox elements
  imageLightbox: $("#imageLightbox"),
  lightboxImage: $("#lightboxImage"),
  closeLightbox: $("#closeLightbox"),
};

const state = {
  projects: [],
  categories: new Set(["all"]),
  filter: "all",
  q: "",
};

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  const pressed = theme === "light";
  els.themeToggle.setAttribute("aria-pressed", String(pressed));
  els.themeToggle.querySelector(".icon").textContent =
    theme === "light" ? "☀" : "☾";
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return setTheme(saved);
  const prefersLight = window
    .matchMedia?.("(prefers-color-scheme: light)")?.matches;
  setTheme(prefersLight ? "light" : "dark");
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  }[m]));
}

function projectMatches(p, q) {
  if (!q) return true;
  const hay = [
    p.title,
    p.category,
    p.description,
    ...(p.tech || []),
    ...(p.highlights || []),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q.toLowerCase());
}

function getVisibleProjects() {
  return state.projects
    .filter((p) => (state.filter === "all" ? true : p.category === state.filter))
    .filter((p) => projectMatches(p, state.q));
}

function fillCategories() {
  const keep = els.filter.querySelector('option[value="all"]');
  els.filter.innerHTML = "";
  els.filter.appendChild(keep);

  [...state.categories]
    .filter((c) => c !== "all")
    .sort((a, b) => a.localeCompare(b, "fi"))
    .forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      els.filter.appendChild(opt);
    });
}

function render() {
  const visible = getVisibleProjects();
  els.grid.innerHTML = "";

  if (!visible.length) {
    els.grid.innerHTML = `
      <div class="panel" style="grid-column:1/-1">
        <h3>No results</h3>
        <p class="muted">Try another search term or change the filter.</p>
      </div>
    `;
    return;
  }

  for (const p of visible) {
    const el = document.createElement("article");
    el.className = "project";
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `Open project: ${p.title}`);

    const previewImage = p.images?.[0]
      ? `<img class="project__image" src="${p.images[0]}" alt="" loading="lazy" />`
      : "";

    el.innerHTML = `
      ${previewImage}

      <div class="project__top">
        <div>
          <h3 class="project__title">${escapeHtml(p.title)}</h3>
          <div class="muted small">${escapeHtml(p.category)}</div>
        </div>
        <span class="kbd">Enter</span>
      </div>

      <p class="muted">${escapeHtml(p.description)}</p>

      <div class="tagrow" aria-label="Technologies">
        ${(p.tech || [])
          .slice(0, 6)
          .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
          .join("")}
      </div>
    `;

    const open = () => openModal(p);
    el.addEventListener("click", open);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });

    els.grid.appendChild(el);
  }
}

// Lightbox open function
function openLightbox(src) {
  els.lightboxImage.src = src;
  els.imageLightbox.showModal();
}

function openModal(p) {
  const links = p.links || {};
  const repo = links.repo
    ? `<a class="btn btn--ghost btn--small" href="${links.repo}" target="_blank" rel="noreferrer">Repo</a>`
    : "";
  const demo = links.demo
    ? `<a class="btn btn--small" href="${links.demo}" target="_blank" rel="noreferrer">Live demo</a>`
    : "";

  const images = (p.images || []).length
    ? `
      <div class="modal__images">
        ${(p.images || [])
          .map(
            (src) =>
              `<img class="modal__image" src="${src}" alt="" loading="lazy" />`
          )
          .join("")}
      </div>
    `
    : "";

  els.modalContent.innerHTML = `
    ${images}

    <h3>${escapeHtml(p.title)}</h3>
    <p class="muted">${escapeHtml(p.description)}</p>

    <div class="tagrow" aria-label="Technologies">
      ${(p.tech || [])
        .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
        .join("")}
    </div>

    ${
      p.highlights?.length
        ? `<h4>Highlights</h4>
           <ul class="muted">
             ${p.highlights
               .map((h) => `<li>${escapeHtml(h)}</li>`)
               .join("")}
           </ul>`
        : ""
    }

    <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px">
      ${repo}
      ${demo}
    </div>
  `;

  if (typeof els.modal.showModal === "function") {
    els.modal.showModal();

    // Enable image click → lightbox
    els.modalContent
      .querySelectorAll(".modal__image")
      .forEach((img) => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => openLightbox(img.src));
      });
  } else {
    alert(`${p.title}\n\n${p.description}`);
  }
}

function closeModal() {
  if (els.modal.open) els.modal.close();
}

async function loadProjects() {
  const res = await fetch("data/projects.json", { cache: "no-store" });
  const data = await res.json();
  state.projects = data;

  for (const p of state.projects) {
    if (p.category) state.categories.add(p.category);
  }
  fillCategories();
  render();
}

function initHandlers() {
  els.themeToggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });

  els.search.addEventListener("input", (e) => {
    state.q = e.target.value.trim();
    render();
  });

  els.filter.addEventListener("change", (e) => {
    state.filter = e.target.value;
    render();
  });

  els.closeModal.addEventListener("click", closeModal);
  els.modal.addEventListener("click", (e) => {
    const rect = els.modalContent.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inside) closeModal();
  });

  // Lightbox close handlers
  els.closeLightbox.addEventListener("click", () => {
    if (els.imageLightbox.open) els.imageLightbox.close();
  });

  els.imageLightbox.addEventListener("click", (e) => {
    if (e.target === els.imageLightbox) {
      els.imageLightbox.close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (els.imageLightbox.open) els.imageLightbox.close();
      else closeModal();
    }
  });
}

function boot() {
  els.year.textContent = String(new Date().getFullYear());
  initTheme();
  initHandlers();
  loadProjects().catch(() => {
    els.grid.innerHTML = `
      <div class="panel" style="grid-column:1/-1">
        <h3>Project download failed</h3>
        <p class="muted">Check that <code>data/projects.json</code> exists and that the JSON is valid.</p>
      </div>
    `;
  });
}

boot();
