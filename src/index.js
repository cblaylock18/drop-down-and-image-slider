import "./style.css";
import dropdownCreator from "./dropdown/dropdown.js";
import imageSliderCreator from "./imgSlider/imgSlider.js";

const dropdownMenus = document.querySelectorAll("ul");
const images = document.querySelector(".img-slider-container");

dropdownMenus.forEach((menu) => {
  dropdownCreator(menu);
});

imageSliderCreator(images, 400);
