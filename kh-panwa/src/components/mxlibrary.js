import axios from "axios";
const Client = require("../client.js")

export const MxLibrary = {
  data: function () {
    return {
      formWidth: 1000,
      formHeight: 550,
      REST: undefined,
      title: { type: String, default: "Form Title" }
    }
  },
  props: {
    params: { type: Object }
  },
  methods: {
    mxCallForm(callForm, params) {
      this.$emit("submit", params, callForm)
    }, 
    mxNextFocus() {
      let elems = document.getElementsByTagName("input")
      let idx = (event.target.tabIndex % elems.length) + 1
      for (let i = 0; i < elems.length; i++) {
        if (elems[i].tabIndex == idx) elems[i].focus()
      }
    },
    mxFormatDate(d) {
      Client.formatDate(d)
    },
    mxFormatTime(d) {
      Client.formatTime(d)
    }
  },

  created: function () {
    this.REST = axios.create({
      // แปลง URL services server จาก 80xx เป็น 90xx
      // baseURL: window.location.href.replace("80", "90") + "api/",
      baseURL: window.location.href + "api/",
      method: "post",
      timeout: 10000,
      withCredentials: true,
      responseType: "json",
      responseEncoding: "utf8"
    });
    this.REST.interceptors.response.use(config => {
      // perform a task before the request is sent
      return config;
    }, error => {
      // handle the error
      location.reload();
      return Promise.reject(error);
    });
  },

  activated: async function () {
    console.log('activate ' + this.title)
  }
};