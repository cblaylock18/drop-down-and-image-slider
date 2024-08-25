import "./style.css";
import dropdownCreator from "./dropdown/dropdown.js";

const dropdownMenus = document.querySelectorAll("ul");

dropdownMenus.forEach((menu) => {
  dropdownCreator(menu);
});
