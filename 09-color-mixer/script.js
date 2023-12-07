Vue.createApp({
  created() {
    this.getData();
  },
  data() {
    return {
      apiURL: "https://dummy-apis.netlify.app/api/color",
      state: {
        color: [],
        clrR: [],
        clrG: [],
        clrB: [],
      },
    };
  },
  computed: {
    hexCode() {
      const r = Number(this.state.clrR).toString(16).padStart(2, "0"); //stellt sicher, dass jede Hexadezimalzahl immer mindestens 2 Zeichen lang ist => sorgt dafür, dass Hexcode nicht zu kurz oder zu lang wird
      const g = Number(this.state.clrG).toString(16).padStart(2, "0");
      const b = Number(this.state.clrB).toString(16).padStart(2, "0");
      return "#" + r + g + b;
    },
  },
  methods: {
    getData() {
      const bod = document.querySelector("body");
      fetch(this.apiURL)
        .then((response) => response.json())
        .then((jsonData) => {
          console.log(jsonData);
          this.state.color = jsonData.color;
          this.state.clrR = jsonData.rgb.r;
          this.state.clrG = jsonData.rgb.g;
          this.state.clrB = jsonData.rgb.b;
          bod.style.backgroundColor =
            "rgb(" +
            [this.state.clrR, this.state.clrG, this.state.clrB].join(",") +
            ")";
        });
    },
    updateColorValue() {
      document.body.style.backgroundColor =
        "rgb(" +
        this.state.clrR +
        "," +
        this.state.clrG +
        "," +
        this.state.clrB +
        ")";
    },
  },
}).mount("#app");
