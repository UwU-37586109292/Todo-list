import appController from "../controller/app";
import * as common from "./common";
import sidebar from "./sidebar";

export default (() => {
  function showAddProjectForm() {
    if (!document.getElementById("projectForm_add")) {
      const form = createProjectForm("add");

      const saveButton = document.createElement("button");
      saveButton.setAttribute("type", "submit");
      saveButton.appendChild(common.createSaveIcon());
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        appController.addProjectFromForm(
          new FormData(form).get("projectTitle_add")
        );
        form.remove();
      });

      const discardButton = document.createElement("button");
      discardButton.setAttribute("type", "reset");
      discardButton.appendChild(common.createDeleteIcon());
      form.addEventListener("reset", () => {
        form.remove();
      });

      const buttonsWrapper = document.createElement("div");
      buttonsWrapper.classList.add("flex");
      buttonsWrapper.appendChild(saveButton);
      buttonsWrapper.appendChild(discardButton);

      form.appendChild(buttonsWrapper);

      if (document.getElementById("projects-list"))
        document.getElementById("projects-list").appendChild(form);
      else {
        document.getElementById("projects-empty-state").replaceWith(form);
      }
    }
  }

  function showEditProjectForm(event, project) {
    if (document.getElementById("projectForm_edit")) {
      document.getElementById("projectForm_edit").reset();
    }

    const projectItemWrapper = event.target.closest("li");
    const form = createProjectForm("edit");

    const saveButton = document.createElement("button");
    saveButton.setAttribute("type", "submit");
    saveButton.appendChild(common.createSaveIcon());
    form.addEventListener("submit", (submitEvent) => {
      submitEvent.preventDefault();
      appController.editProjectFromForm(
        project,
        new FormData(form).get("projectTitle_edit")
      );
      form.replaceWith(sidebar.createProjectListElement(project));
    });

    const discardButton = document.createElement("button");
    discardButton.setAttribute("type", "reset");
    discardButton.appendChild(common.createCloseIcon());
    form.addEventListener("reset", () => {
      form.replaceWith(projectItemWrapper);
    });
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("flex");
    buttonsWrapper.appendChild(saveButton);
    buttonsWrapper.appendChild(discardButton);

    form.appendChild(buttonsWrapper);
    form.getElementsByTagName("input")[0].value = project.getTitle();
    projectItemWrapper.replaceWith(form);
  }

  function createProjectForm(formType) {
    const form = document.createElement("form");
    form.name = `projectForm_${formType}`;
    form.id = `projectForm_${formType}`;
    form.classList.add("flex", "justify-space-between");

    const inputProjectName = document.createElement("input");
    inputProjectName.setAttribute("type", "text");
    inputProjectName.setAttribute("id", `projectTitle_${formType}`);
    inputProjectName.setAttribute("name", `projectTitle_${formType}`);
    inputProjectName.placeholder = "Project name";
    inputProjectName.required = "true";
    form.appendChild(inputProjectName);
    return form;
  }

  function hideAddProjectForm() {
    if (document.getElementById("projectForm_add"))
      document.getElementById("projectForm_add").remove();
  }
  function hideEditProjectForm() {
    if (document.getElementById("projectForm_edit"))
      document.getElementById("projectForm_edit").remove();
  }

  return {
    showAddProjectForm,
    hideAddProjectForm,
    showEditProjectForm,
    hideEditProjectForm,
    createProjectForm,
  };
})();
