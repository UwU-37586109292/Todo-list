import { appController } from "../controller/app";
import * as common from "./common";

export const projectForm = (() => {
  function showAddProjectForm() {
    if (!document.getElementById("projectForm_add")) {
      const form = createProjectForm("add");

      const saveButton = document.createElement("button");
      saveButton.setAttribute("type", "submit");
      saveButton.appendChild(common.createSaveIcon());
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        appController.addProjectFromForm(
          new FormData(form).get("projectTitle_add")
        );
        form.remove();
      });

      const discardButton = document.createElement("button");
      discardButton.setAttribute("type", "reset");
      discardButton.appendChild(common.createDeleteIcon());
      form.addEventListener("reset", function () {
        form.remove();
      });

      const buttonsWrapper = document.createElement("div");
      buttonsWrapper.classList.add("flex");
      buttonsWrapper.appendChild(saveButton);
      buttonsWrapper.appendChild(discardButton);

      form.appendChild(buttonsWrapper);

      document.getElementById("project-list").appendChild(form);
    }
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

  return {
    showAddProjectForm,
    hideAddProjectForm,
    createProjectForm,
  };
})();
