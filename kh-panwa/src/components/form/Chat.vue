<template>
  <div class="container">
    <!-- <b-table :data="data" :columns="columns" /> -->

    <b-button @click="getSessions()">Get Sessions</b-button>
    <!-- class="ag-theme-balham" -->
    <!-- :defaultColDef="defaultColDef" -->
    <ag-grid-vue
      style="width: 600px; height: 300px;"
      class="ag-theme-balham"
      :columnDefs="columns"
      :rowData="data"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { MxLibrary } from "../mxlibrary.js";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: "Chat",

  extends: MxLibrary,

  components: {
    AgGridVue
  },

  data: function() {
    return {
      records: [],
      data: [{ title: "ฝ่ายขาย", icon: "lklk" }],
      columns: [
        {
          headerName: "TITLE",
          width: 100,
          field: "title",
          editable: false,
          resizable: false,
          cellStyle: {color: 'blue', 'background-color': 'yellow'}
        },
        {
          headerName: "ICON",
          width: 120,
          field: "icon",
          editable: true,
          resizable: true,
          cellStyle: {color: 'green'}
        }
      ]
    };
  },

  props: {
    title: { type: String, default: "ข้อมูล Sessions" }
  },

  methods: {
    async getSessions() {
      this.data = await this.REST.post("getAllSessions").then(
        response => response.data
      );
      console.log(this.data);
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

