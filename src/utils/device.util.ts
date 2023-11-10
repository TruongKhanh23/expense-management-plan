import { ref } from "vue";

export default function detectDevice() {
  const innerWidth = window.innerWidth;
  const isMobile = ref(false);
  const isTabletVertical = ref(false);
  const isTabletHorizontal = ref(false);
  const isDesktop = ref(false);

  if (innerWidth < 768) {
    isMobile.value = true;
  } else if (innerWidth < 1024) {
    if (innerWidth < innerHeight) {
      isTabletVertical.value = true;
    } else {
      isTabletHorizontal.value = true;
    }
  } else {
    isDesktop.value = true;
  }

  return {
    isMobile: isMobile.value,
    isTabletVertical: isTabletVertical.value,
    isTabletHorizontal: isTabletHorizontal.value,
    isDesktop: isDesktop.value,
  };
}
