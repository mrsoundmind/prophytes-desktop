export const getColorById = (id) => {
  switch (id) {
    case 2:
    case 8:
      return "#000000";

    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 9:
      return "#ffffff";
    default:
      return "white";
  }
};
