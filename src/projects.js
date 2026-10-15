// Añade un objeto por proyecto con sus enlaces y una captura en previewImage.
const projects = [
    {
      title: "Mi portfolio",
      description: "Codigo disponible en GitHub",
      technologies: ["React", "Node.js"],
      demoUrl: "https://adrian-dev-one.vercel.app",
      repoUrl: "https://github.com/KnightZ993/Mi-portfolio",
      previewImage: "3-portfolio-preview.webp",
      previewAlt: "Vista previa de la página de inicio de mi portfolio"
    }
];

const projectsContainer = document.querySelector("#project-grid");
const emptyState = document.querySelector("#empty-state");

const createProjectCard = (project, index) => {
  const card = document.createElement("article");
  card.className = "project-card";

  const info = document.createElement("div");
  info.className = "project-info";

  const meta = document.createElement("div");
  meta.className = "project-card-top";
  meta.textContent = `Proyecto ${String(index + 1).padStart(2, "0")}`;

  const title = document.createElement("h2");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  info.append(meta, title, description);

  if (project.technologies?.length) {
    const tags = document.createElement("div");
    tags.className = "project-tags";
    project.technologies.forEach((technology) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = technology;
      tags.append(tag);
    });
    info.append(tags);
  }

  const actions = document.createElement("div");
  actions.className = "project-actions";
  [["Ver proyecto", project.demoUrl], ["Código fuente", project.repoUrl]].forEach(([label, url]) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${label} ↗`;
    actions.append(link);
  });
  if (actions.childElementCount) info.append(actions);

  // La captura queda junto a la información y abre la web del proyecto.
  const preview = document.createElement(project.demoUrl ? "a" : "div");
  preview.className = "project-preview";
  if (project.demoUrl) {
    preview.href = project.demoUrl;
    preview.target = "_blank";
    preview.rel = "noopener noreferrer";
    preview.setAttribute("aria-label", `Abrir ${project.title} (nueva pestaña)`);
  }

  const previewLabel = document.createElement("span");
  previewLabel.className = "project-preview-label";
  previewLabel.textContent = "Vista previa";
  preview.append(previewLabel);

  if (project.previewImage) {
    const image = document.createElement("img");
    image.src = project.previewImage;
    image.alt = project.previewAlt || `Vista previa de ${project.title}`;
    image.loading = "lazy";
    image.width = 1440;
    image.height = 900;
    preview.append(image);
  } else {
    const placeholder = document.createElement("p");
    placeholder.textContent = "Vista previa no disponible";
    preview.append(placeholder);
  }

  card.append(info, preview);

  return card;
};

if (projects.length) {
  emptyState.hidden = true;
  projects.forEach((project, index) => projectsContainer.append(createProjectCard(project, index)));
} else {
  emptyState.hidden = false;
}
