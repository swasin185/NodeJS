<script setup lang="ts">
import Door from "./components/Door.vue";
import { ref } from "vue";

const counter = ref(0);
const wincount = ref(0);
const winrate = ref(0);
const chip = ref(10);

const doors = ref([
  { id: "A", isOpened: true, haveCoin: false },
  { id: "B", isOpened: true, haveCoin: true },
  { id: "C", isOpened: true, haveCoin: false },
]);

let coin = 0;
let selected = ref(-1);
let confirmed = ref(0);

function reset(): void {
  if (chip.value == 0) {
    window.alert("คุณหมดตัวแล้ว");
    return;
  }
  if (chip.value == 100) {
    window.alert("เจ้ามือเจ๊งแล้วคร้าบบบ");
    return;
  }
  counter.value++;
  selected.value = -1;
  confirmed.value = -1;
  chip.value--;
  coin = Math.floor(Math.random() * doors.value.length);
  for (let door of doors.value) {
    door.haveCoin = false;
    door.isOpened = false;
  }
  doors.value[coin].haveCoin = true;
  (document.activeElement as HTMLElement).blur();
}

function confirmTheDoor(id: string): void {
  if (confirmed.value > -1) {
    reset();
    return;
  }
  let x = doors.value.length;
  for (let i = 0; i < x; i++) {
    const door = doors.value[i];
    if (door.id == id) {
      if (selected.value == -1) {
        selected.value = i;
        if (coin == selected.value) x--;
        else x -= 2;
        break;
      } else {
        confirmed.value = i;
        door.isOpened = true;
        if (door.haveCoin) {
          wincount.value++;
          chip.value += 2;
        }
        winrate.value =
          Math.round((wincount.value / counter.value) * 10000) / 100;
      }
    } else {
      door.isOpened = selected.value > -1;
    }
  }
  if (selected.value > -1 && confirmed.value == -1) {
    x =
      (selected.value + 1 + Math.floor(Math.random() * x)) % doors.value.length;
    while (x == selected.value || x == coin) x = (x + 1) % doors.value.length;
    doors.value[x].isOpened = true;
  }
}
</script>

<template>
  <img src="/coin.svg" style="height: 4em" alt="coin" />
  <label style="font-size: 6em; padding: 10px; color: goldenrod">{{
    chip
  }}</label>
  <hr />
  <h1 style="color: white" v-if="selected == -1">เลือกประตูที่มีเหรียญ</h1>
  <h1 style="color: bisque" v-else-if="selected > -1 && confirmed == -1">
    ยืนยันหรือสลับประตู ?
  </h1>
  <h1 style="color: greenyellow" v-else-if="confirmed == coin">
    ถูกต้องนะครับ!
  </h1>
  <h1 style="color: crimson" v-else>แพะๆๆๆๆๆๆๆๆๆๆ!</h1>
  <Door
    v-for="door in doors"
    :key="door.id"
    :id="door.id"
    :isOpened="door.isOpened"
    :haveCoin="door.haveCoin"
    @selected="confirmTheDoor(door.id)"
  />
  <hr />
  ครั้งที่ {{ counter }}
  <progress :value="winrate" max="100" />
  {{ winrate }}%
</template>

<style scoped>
</style>
