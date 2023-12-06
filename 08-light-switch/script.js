Vue.createApp({
  data() {
    return {
      isLight: true,
    };
  },
  methods: {
    toggleLight() {
      document.title = this.title;
      this.isLight = !this.isLight;
      this.updateLightState();
    },
    updateLightState() {
      const title = document.querySelector("title");
      const bod = document.querySelector("body");
      const btn = document.querySelector("button");

      btn.classList.toggle("buttonDark");
      bod.classList.toggle("bodyDark");

      if (this.isLight) {
        title.textContent = "Good Morning";
      } else {
        title.textContent = "Good Night";
      }
    },
  },
}).mount("#app");
