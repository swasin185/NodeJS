<template>
  <b-tabs type="is-boxed" :style="{ height:formHeight+'px' }">
    <b-tab-item v-for="item in items" :key="item.name" :label="item.name" :icon="item.icon">
      <b-button
        class="b-button"
        @click="mxCallForm(pgm.name)"
        v-for="pgm in item.programs"
        :key="pgm.name"
        :icon-left="pgm.icon"
        size="is-medium"
      >{{ pgm.title }}</b-button>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import { MxLibrary } from "./mxlibrary.js";

export default {
  name: "MainMenu",

  mixins: [MxLibrary],

  props: {
    title: { type: String, default: "Menu" }
  },

  data: function() {
    return {
      tabTitleWidth: 150,
      items: []
    };
  },

  created: async function() {
    this.items = await this.REST.post("getPermissions", {}).then(
      response => response.data
    );
  }
};
</script>

<style scoped>
.b-button {
  /* background-color: lightblue;  */
  margin-top: 20px;
  margin-left: 30px;
  width: 195px;
  min-height: 65px;
}
</style>