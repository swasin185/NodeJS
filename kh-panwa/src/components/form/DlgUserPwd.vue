<template>
  <div class="card" :style="{padding: '20px', margin: 'auto', width: '260px'}">
    <div class="card-header">
      <div v-if="params.title!=undefined">{{params.title}}</div>
      <div v-else>LOGIN</div>
    </div>

    <b-input
      @keydown.native.enter="mxNextFocus()"
      maxlength="16"
      ref="txtUser"
      icon="account"
      v-model="dataUser"
      tabindex="1"
    ></b-input>

    <b-input
      @keydown.native.enter="pressLogin()"
      type="password"
      maxlength="16"
      icon="lock"
      v-model="dataPwd"
      tabindex="2"
    ></b-input>

    <div class="container" :style="{margin: 'auto'}">
      <b-button in-danger class="b-button" name="btnOK" tabindex="3" @click="pressLogin">OK</b-button>
      <b-button class="b-button" name="btnCancel" tabindex="4" @click="pressCancel">Cancel</b-button>
    </div>
  </div>
</template>

<script>
import { MxLibrary } from "../mxlibrary.js";

export default {
  name: "DlgUserPwd",
  
  extends: MxLibrary,

  props: {
    // title: { type: String, default: "LOG-IN" }
  },
  data: function() {
    return { dataUser: "", dataPwd: "" };
  },

  methods: {
    pressLogin() {
      this.$emit("submit", { user: this.dataUser, password: this.dataPwd });
    },
    pressCancel() {
      this.$emit("submit");
    }
  },
  
  activated() {
    // รับค่าจาก properties มาใส่ใน data เพื่อทำการแก้ไข
    this.dataUser = this.params.user;
    this.dataPwd = "";

    // nextTick() จะทำงานเมื่อ component ทุกตัว render เสร็จเรียบร้อย
    this.$nextTick(() => {
      this.$refs.txtUser.focus();
    });
  }
};
</script>

<style scoped>
.b-button {
  margin-left: 15px;
  width: 80px;
  min-height: 25px;
}
</style>

      // เรียกใช้งาน DlgUserPwd แบบ Modal Dialog (VuetifyDialog)
      // this.mainParams = { title: "Login เข้าสู่ระบบ", user: uname };
      // let res = await this.$dialog.show(DlgUserPwd, {
      //   params: this.mainParams,
      //   width: 300,
      //   persistent: false,
      //   waitForResult: true
      // });
      // if (res) {
      //   this.login(res);
      // }
