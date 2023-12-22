import { ref, onMounted } from "vue";
// popupHandler.js
export function handlePopup() {
  //Open popup - no scroll
  const isOpenLoadingModal = ref(true);
  document.body.style.overflow = "hidden";

  onMounted(() => {
    //Close popup
    setTimeout(() => {
      isOpenLoadingModal.value = false;
      document.body.style.removeProperty("overflow");
    }, 1500);
  });

  return {
    isOpenLoadingModal,
  };
}

export function open() {
  document.body.style.overflow = "hidden";
  return true;
}

export function close() {
  document.body.style.removeProperty("overflow");
  return false;
}
