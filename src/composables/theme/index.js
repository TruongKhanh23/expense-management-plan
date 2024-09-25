import store from "@/store";

export function updateThemeColor() {
  const isDarkMode = store.getters.getIsDark;
  console.log("isDarkMode", isDarkMode);

  if (isDarkMode) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    console.log("metaThemeColor", metaThemeColor);
    if (metaThemeColor) {
      if (isDarkMode) {
        metaThemeColor.setAttribute("content", "#181A1B");
      } else {
        metaThemeColor.setAttribute("content", "#ffffff");
      }
    }
  }
}
