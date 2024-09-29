<template>
  <div @click="toggleChat" class="chat-icon">
    <img
      src="/favicons/android-chrome-512x512.png"
      class="w-12 h-12"
      alt="Chat"
    />
    <div v-if="isChatOpen" class="chat-popup">
      <!-- Nội dung chat sẽ nằm ở đây -->
      <iframe
        src="https://www.messenger.com/plugins/chat.php?app_id=445956808501659&href=https://www.facebook.com/expenseManagementPlan/&locale=en_US"
        width="400"
        height="500"
        style="border: none; overflow: hidden"
        scrolling="no"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChatOpen: false,
    };
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
  },
};
</script>

<style>
.chat-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}
.chat-popup {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 400px;
  border: 1px solid #ccc;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
