import { ref, onMounted } from "vue";
// popupHandler.js
export default function handlePopup() {
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
