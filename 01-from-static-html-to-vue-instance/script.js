//mount method sorgt dafür, dass HTML und Vue-JS verbunden sind => funktioniert wie querySelector
//VuecreateApp() => macht Instanz
Vue.createApp({
  //data ist der state
  data() {
    //== data: function () => data ist ein obj
    return {
      userName: ["Blanca"],
      //   currentDate: new Date().toDateString(),
      currentDate: new Date().toLocaleString("en-us"),
    };
  },
}).mount("#app");
