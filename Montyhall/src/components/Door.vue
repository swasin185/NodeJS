<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["selected"]);

const prop =
  defineProps<{ id: string; isOpened: boolean; haveCoin: boolean }>();

function select(): void {
  if (!prop.isOpened || prop.haveCoin) emit("selected", prop.id);
}
</script>

<template >
  <button class="door" @click="select()">
    <div v-if="isOpened">
      <img v-if="haveCoin" src="/coin.svg" class="logo" alt="Coin" />
      <img v-else src="/goat.svg" class="logo vue" alt="Goat" />
    </div>
    <div v-if="!isOpened">
      <img src="/question.svg" class="logo" alt="question" />
    </div>
    <h1>{{ id }}</h1>
  </button>
</template>
<style scoped>
.door:focus {
  background: white;
  color: #770000;
}
.door {
  margin: 0.2em;
  height: 20em;
  width: 10em;
  background: #770000;
  color: white;
  border-width: 0.2em;
  border-color: darkgrey;
  outline-color: red;
}

.logo {
  height: 5em;
  padding: 0em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 1em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 1em #42b883aa);
}
</style>
