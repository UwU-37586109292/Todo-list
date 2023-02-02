import closeIcon from "../assets/close.png";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/pencil.png";
import saveIcon from "../assets/save.png";
import checkIcon from "../assets/tick.png";

export function getMainElement() {
  return document.getElementById("content");
}
export function createEditIcon() {
  return createIcon(editIcon);
}
export function createDeleteIcon() {
  return createIcon(deleteIcon);
}
export function createSaveIcon() {
  return createIcon(saveIcon);
}
export function createCheckIcon() {
  return createIcon(checkIcon);
}
export function createCloseIcon() {
  return createIcon(closeIcon);
}

export function createLabelElement(textContent) {
  const label = document.createElement("label");
  label.classList.add("label");
  label.innerText = textContent;
  return label;
}

function createIcon(path) {
  const icon = new Image();
  icon.src = path;
  icon.style.display = "block";
  icon.classList.add("icon");
  return icon;
}
