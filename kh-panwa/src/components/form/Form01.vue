<template>
  <div class="container">
    <b-button @click="callReport">Call Report</b-button>
  </div>
</template>

<script>
import { MxLibrary } from "../mxlibrary.js";

export default {
  name : "Form01",

  extends: MxLibrary,

  props: {
    title: { type: String, default: "ฟอร์มตัวอย่าง 1" }
  },

  methods: {
    async callReport() {
      let file = await this.REST.post("createReport").then(
        response => response.data
      );

      console.log(file);
      window.open(
        file,
        "_blank",
        '"width=600,height=480,toolbar=no,menubar=no,resizable=yes'
      );
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
