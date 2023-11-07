import { ref } from "vue";

export default function detectDevice() {
  const innerWidth = window.innerWidth;
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);
    console.log("innerWidth", innerWidth);
    
  if (innerWidth < 768) {
    isMobile.value = true;
  } else if (innerWidth <= 1024) {
    isTablet.value = true;
  } else {
    isDesktop.value = true;
  }

  return { isMobile: isMobile.value, isTablet: isTablet.value, isDesktop: isDesktop.value };
}
