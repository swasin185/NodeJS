<template>
  <div class="container">
    <b-button @click="getSessions()">Get Sessions</b-button>
  </div>
</template>

<script>
import { MxLibrary } from "../mxlibrary.js";

export default {
  name: "Form02",

  extends: MxLibrary,

  props: {
    title: { type: String, default: "ฟอร์มตัวอย่าง 2" }
  },

  methods: {
    async getSessions() {
      let sessions = await this.REST.post("getAllSessions").then(
        response => response.data
      );
      console.log(sessions);
    }
  }
};
</script>

<style scoped>
.b-button {
  width: "400px";
  height: "100px";
}
</style>

