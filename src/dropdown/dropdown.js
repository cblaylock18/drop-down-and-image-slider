export default function dropdownCreator(
  unorderedListContainingDropDownItems = {},
) {
  unorderedListContainingDropDownItems.style.listStyleType = "none";

  // this function assumes the first item in the list is what should show when the dropdown items are hidden,
  //   and the rest are the content items
  const [dropdownIcon, ...dropdownOptions] = [
    ...unorderedListContainingDropDownItems.querySelectorAll("li"),
  ];

  // function to hide dropdown on leave hover
  const toggleOptions = function toggleDropDownOptionsVisibilityOnClickEvent() {
    dropdownOptions.forEach((option) => {
      option.style.display = option.style.display === "none" ? "block" : "none";
    });
  };

  // initially, show only the top level icon and hide other options
  dropdownOptions.forEach((option) => {
    option.style.display = "none";
    option.addEventListener("click", toggleOptions);
  });

  dropdownIcon.addEventListener("click", toggleOptions);
}
