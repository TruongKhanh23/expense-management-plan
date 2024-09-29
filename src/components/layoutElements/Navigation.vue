<template>
  <nav class="bg-white border-gray-200 dark:bg-[#181A1B]">
    <div
      class="max-w-screen flex flex-wrap items-center justify-between mx-auto md:mx-32 p-4"
    >
      <a href="/home" class="flex items-center">
        <img
          src="/logo-transparent.png"
          class="h-12 mr-3"
          alt="Flowbite Logo"
        />
        <span
          class="hidden md:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >
          Expense Management Plan
        </span>
        <span
          class="md:hidden self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >
          EMP
        </span>
      </a>
      <SignOut />
    </div>
  </nav>
</template>

<script setup>
import SignOut from "@/components/layoutElements/SignOut.vue"; // Import component
</script>

<style></style>
