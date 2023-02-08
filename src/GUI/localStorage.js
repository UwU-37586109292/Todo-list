import { projectFactory, projectList } from "../Model/project";
import taskFactory from "../Model/task";

export default (() => {
  function isAvailable() {
    let storage;
    try {
      storage = window.localStorage;
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }
  function initializeData() {
    const defaultProject = projectFactory("Home");
    defaultProject.addTask(
      taskFactory(
        "Do the laundry",
        "Remember to take out coins from pockets!",
        "high",
        "2023-01-01",
        "to do"
      )
    );
    defaultProject.addTask(
      taskFactory("Wash the windows", "", "medium", "", "to do")
    );
    const anotherProject = projectFactory("School");
    anotherProject.addTask(
      taskFactory("Study for algebra test", "", "high", "2023-02-13", "to do")
    );
    projectList.addProjectToList(defaultProject);
    projectList.setProjectAsCurrent(defaultProject);
    projectList.addProjectToList(anotherProject);
    localStorage.setItem("projectList", JSON.stringify(projectList));
  }
  return { isAvailable, initializeData };
})();
