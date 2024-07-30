<template>
    <a href="#" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500" @click.prevent="handleClick">
      Forgot Password?
    </a>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  const emit = defineEmits(['click']);
  
  const handleClick = () => {
    emit('click');
  };
  </script>
  