Vue.createApp({
  created() {
    this.getData();
  },
  methods: {
    getData() {
      fetch(this.apiURL + "8")
        .then((response) => response.json())
        .then((jsonData) => {
          this.persons = jsonData.map((person) => {
            return { ...person, connectionStatus: "Connect" };
          });
        });
    },
    getSingleData() {
      return fetch(this.apiURL + "1")
        .then((response) => response.json())
        .then((jsonData) => jsonData[0]);
    },
    changeContact(person) {
      const indexToRemove = this.persons.indexOf(person);
      if (indexToRemove != -1) {
        //abfrage, ob der index an gefragter position steht
        this.persons.splice(indexToRemove, 1);
        this.getSingleData().then((newContact) => {
          this.persons.push({
            ...newContact,
            connectionStatus: "Connect",
          });
        });
      }
    },
    connect(person) {
      if (person.connectionStatus === "Connect") {
        person.connectionStatus = "Pending";
        this.count++;
      } else if (person.connectionStatus === "Pending") {
        person.connectionStatus = "Connect";
        this.count--;
      }
    },
  },
  data() {
    return {
      apiURL: "https://dummy-apis.netlify.app/api/contact-suggestions?count=",
      persons: [],
      count: 0,
    };
  },
}).mount("#app");
