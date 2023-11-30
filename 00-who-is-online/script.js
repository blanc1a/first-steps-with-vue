Vue.createApp({
  data() {
    return {
      users: [
        {
          username: "Giuliano",
          status: "online",
          lastActivity: 10,
        },
        {
          username: "Paulina",
          status: "offline",
          lastActivity: 22,
        },
        {
          username: "Blanca",
          status: "online",
          lastActivity: 104,
        },
        {
          username: "Marijana",
          status: "online",
          lastActivity: 5,
        },
      ],
    };
  },
  methods: {
    recentActivity(user) {
      //user gilt als online, wenn lastActivity <= 10
      return user.status === "online" && user.lastActivity <= 10;
    },
    getStatus(user) {
      //variable zum speichern der farbe
      let color = "";

      if (user.status === "online" && this.recentActivity(user)) {
        //wenn user den status online hat && auch <= 10 als lastActivity hat => dann grün
        color = "green";
      } else if (user.status === "offline") {
        //wenn user den status offline hat => dann rot
        color = "grey";
      } else if (user.status === "online" && !this.recentActivity(user)) {
        //wenn user den status online hat && nicht <= 10 als lastActivity hat => dann rot
        color = "red";
      }
      //methode gibt obj mit der farbe zurück
      return { color };
    },
  },
}).mount("#app");
