import store from "@/store";

export function updateThemeColor() {
  const isDarkMode = store.getters.getIsDark;

  if (isDarkMode) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (isDarkMode) {
        metaThemeColor.setAttribute("content", "#181A1B");
      } else {
        metaThemeColor.setAttribute("content", "#ffffff");
      }
    }
  }
}
