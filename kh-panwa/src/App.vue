<template class="body">
  <div class="container" :style="{ width: formWidth+'px' }">
    <nav class="navbar" :style="{ background: ssInfo.color, height: '65px' }">
      <div class="navbar-start">
        <b-button class="b-button" @click="onSubmit" icon-left="undo" size="is-medium">BACK</b-button>
      </div>
      <!-- <center> -->
      <p class="title" :style="{ color: 'white', margin: '10px' }">{{ssInfo.company}}</p>
      <!-- <p class="subtitle" :style="{ color: '#AAAAAA' }">{{formTitle}}</p> -->
      <!-- </center> -->
      <div class="navbar-end">
        <b-button class="b-button" @click="logout" icon-left="login" size="is-medium">LOGOUT</b-button>
      </div>
    </nav>

    <div class="container" :style="{ background: '#201020', height: formHeight+'px' }">
      <keep-alive>
        <div class="container" ref="mainComp" :is="mainForm" :params="params" @submit="onSubmit"></div>
      </keep-alive>
    </div>

    <div class="level" :style="{ background: 'lightgrey',  height: '35px' }">
      <div class="level-left">
        <b-icon icon="message-text"></b-icon>message
      </div>
      <div class="level-right">
        {{ssInfo.user}}
        <b-icon icon="account" v-if="ssInfo.user>''" />
        <b-icon icon="lock" v-else />
        {{ssInfo.today}}
        <b-icon icon="calendar" />
      </div>
    </div>
  </div>
</template>

<script>
import Components from "./components/components.js";
import { MxLibrary } from "./components/mxlibrary.js";

const Client = require("./client.js");

export default {
  name: "App",

  extends: MxLibrary,

  components: Components,

  data: function() {
    return {
      params: {},
      mainForm: "",
      formTitle: "",
      ssInfo: { comDB: "DB3", company: "? co.,ltd.", color: "lightgrey" }
    };
  },

  methods: {
    async setMainForm(component, params) {
      if (component != "DlgUserPwd") {
        this.ssInfo = await this.REST.post("connectServer", {
          caller: component
        }).then(response => response.data);

        Client.ssInfo = this.ssInfo;

        if (this.ssInfo.user == undefined || this.ssInfo.user == "") {
          component = "DlgUserPwd";
          params = { title: "LOGIN", user: "" };
        }
      }

      this.params = params;
      this.mainForm = component;

      // this.$nextTick(() => {
      //   this.formTitle = this.$refs.mainComp.title;
      //   document.title = this.ssInfo.company + " : " + this.formTitle;
      // });
    },

    onSubmit(params, form) {
      if (form != undefined) {
        this.setMainForm(form, params);
      } else {
        if (this.mainForm == "DlgUserPwd") this.login(params);
        else this.setMainForm("MainMenu");
      }
    },

    async login(userPwd) {
      if (userPwd) {
        let data = await this.REST.post("login", userPwd).then(
          response => response.data
        );
        if (data.user == undefined || data.user == "") {
          this.$buefy.dialog.alert({
            title: "Error",
            message: "User/Password Incorrect",
            type: "is-danger",
            hasIcon: true,
            icon: "close-circle"
          });
        }
      }
      this.setMainForm("MainMenu");
    },

    async logout() {
      await this.REST.post("logout").then();

      this.setMainForm("DlgUserPwd", { title: "LOGIN", user: "" });
    }
  },

  created: function() {
    this.setMainForm("MainMenu");
  }
};
</script>

<style>
.b-button {
  margin: 10px;
  width: 120px;
  min-height: 40px;
}
</style>