<template>
  <div class="flex flex-col md:flex-row md:space-x-4">
    <div class="flex md:flex-col items-center justify-center mb-2">
      <div class="md:w-full w-3/4">
        <label for="Necessity">Input 1</label>
      </div>
      <div class="md:w-full w-1/4">
        <input
          id="input1"
          v-model="input1"
          type="number"
          class="w-full border border-gray-300 rounded p-2"
          placeholder="Input 1"
        />
      </div>
    </div>
    <div class="flex md:flex-col items-center justify-center mb-2">
      <div class="md:w-full w-3/4">
        <label for="input2">Input 2</label>
      </div>
      <div class="md:w-full w-1/4">
        <input
          id="input2"
          v-model="input2"
          type="number"
          class="w-full border border-gray-300 rounded p-2"
          placeholder="Input 2"
        />
      </div>
    </div>
    <div class="flex md:flex-col items-center justify-center mb-2">
      <div class="md:w-full w-3/4">
        <label for="input3">Input 3</label>
      </div>
      <div class="md:w-full w-1/4">
        <input
          id="input3"
          v-model="input3"
          type="number"
          class="w-full border border-gray-300 rounded p-2"
          placeholder="Input 3"
        />
      </div>
    </div>
    <div class="flex md:flex-col items-center justify-center mb-2">
      <div class="md:w-full w-3/4">
        <label for="input4">Input 4</label>
      </div>
      <div class="md:w-full w-1/4">
        <input
          id="input4"
          v-model="input4"
          type="number"
          class="w-full border border-gray-300 rounded p-2"
          placeholder="Input 4"
        />
      </div>
    </div>
    <div class="flex md:flex-col items-center justify-center mb-2">
      <div class="md:w-full w-3/4">
        <label for="input5">Input 5</label>
      </div>
      <div class="md:w-full w-1/4">
        <input
          id="input5"
          v-model="input5"
          type="number"
          class="w-full border border-gray-300 rounded p-2"
          placeholder="Input 5"
        />
      </div>
    </div>
    <div class="flex md:flex-col items-center justify-center mb-2">
      <div class="md:w-full w-3/4">
        <label for="input6">Input 6</label>
      </div>
      <div class="md:w-full w-1/4">
        <input
          id="input6"
          v-model="input6"
          type="number"
          class="w-full border border-gray-300 rounded p-2"
          placeholder="Input 6"
        />
      </div>
    </div>
  </div>
  <button type="danger" @click="onClick">Calculate</button>
</template>

<script>
import { ref, computed, watch } from "vue";

export default {
  setup() {
    const input1 = ref(0);
    const input2 = ref(0);
    const input3 = ref(0);
    const input4 = ref(0);
    const input5 = ref(0);
    const input6 = ref(0);
    function onClick() {
      console.log(
        "message",
        input1.value +
          input2.value +
          input3.value +
          input4.value +
          input5.value +
          input6.value,
      );
    }
    return { input1, input2, input3, input4, input5, input6, onClick };
  },
};
</script>
