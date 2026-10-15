// Añade un objeto por proyecto y completa demoUrl y repoUrl con sus enlaces.
const projects = [
  // {
  //   title: "Nombre del proyecto",
  //   description: "Qué hace el proyecto y qué parte desarrollaste.",
  //   technologies: ["React", "Node.js"],
  //   demoUrl: "https://enlace-a-la-demo",
  //   repoUrl: "https://github.com/usuario/repositorio"
  // }
];

const projectsContainer = document.querySelector("#project-grid");
const emptyState = document.querySelector("#empty-state");

const createProjectCard = (project, index) => {
  const card = document.createElement("article");
  card.className = "project-card";

  const meta = document.createElement("div");
  meta.className = "project-card-top";
  meta.textContent = `Proyecto ${String(index + 1).padStart(2, "0")}`;

  const title = document.createElement("h2");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  card.append(meta, title, description);

  if (project.technologies?.length) {
    const tags = document.createElement("div");
    tags.className = "project-tags";
    project.technologies.forEach((technology) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = technology;
      tags.append(tag);
    });
    card.append(tags);
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
  if (actions.childElementCount) card.append(actions);

  return card;
};

if (projects.length) {
  emptyState.hidden = true;
  projects.forEach((project, index) => projectsContainer.append(createProjectCard(project, index)));
} else {
  emptyState.hidden = false;
}
