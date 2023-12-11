Vue.createApp({
  created() {
    //created nutzen, um beim aufruf der seite die daten der API zu ziehen
    this.getToDos();
  },
  data() {
    return {
      apiURL: "http://localhost:4730/todos",
      filter: "all",
      stateToDos: [],
      newTodo: "",
    };
  },
  computed: {
    //wird verwendet, um abgeleitete daten/eigenschaften zu definieren, die auf anderen daten/eigenschaften in der komponente basieren
    //werden nur neu berechnet, wenn ihre abhängigen daten sich ändern
    filteredTodos() {
      if (this.filter === "open") {
        return this.stateToDos.filter((todo) => !todo.done);
      } else if (this.filter === "done") {
        return this.stateToDos.filter((todo) => todo.done);
      } else {
        return this.stateToDos;
      }
    },
  },
  methods: {
    //wird verwendet, um functions und methods zu definieren und in der vue instanz aufzurufen
    //enthalten code, der auf ereignisse reagiert
    //werden bei bedarf aufgerufen und bei jeder ausführung neu berechnet
    getToDos() {
      fetch(this.apiURL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not OK");
          }
        })
        .then((jsonData) => {
          this.stateToDos = jsonData;
        });
    },
    addToDoItem() {
      if (this.newTodo.trim() === "") return; //trim() entfernt Leerzeichen vor und hinter dem eingegebenen text => verhindert das eingeben leerer todos

      const newToDos = { description: this.newTodo, done: false };
      this.checkDuplicates();

      fetch(this.apiURL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newToDos),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not OK");
          }
        })
        .then((jsonData) => {
          this.getToDos(); //state synchronisieren
        });

      this.newTodo = ""; //todo aus dem input-feld löschen, placeholder wieder sichtbar
    },
    checkDuplicates() {
      const isDuplicate = this.stateToDos.some(
        (todo) => todo.description === this.newTodo
      ); //array.prototype.some method, um zu prüfen, ob im state-array die selbe description 2x vorhanden ist

      if (isDuplicate) {
        alert("No Duplicates allowed");
        return false;
      }
      return true;
    },
    checkedToDos(todo) {
      todo.done = !todo.done;

      // const todoID = todo.id;
      fetch(this.apiURL + "/" + todo.id, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          done: todo.done,
          description: todo.description,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not OK");
          }
        })
        .then((jsonData) => {
          console.log(jsonData);
        });
    },
    removeToDoItem() {
      const doneTodos = this.stateToDos.filter((todo) => todo.done);

      const deleteRequests = doneTodos.map((todo) =>
        fetch(this.apiURL + "/" + todo.id, {
          method: "DELETE",
        })
      );

      Promise.all(deleteRequests)
        .then(() => {
          this.getToDos();
        })
        .catch((error) => console.error("Error deleting todos:", error));

      //   const fetches = [];
      //   //let openTodos = this.stateToDos.filter((todo) => !todo.done);
      //   for (const deletedToDo of this.stateToDos) {
      //     if (deletedToDo.done) {
      //       const todoID = deletedToDo.id;
      //       fetches.push(this.removeFromAPI(todoID));
      //     }
      //   }

      //   Promise.all(fetches).then((values) => {
      //     if (values.indexOf(undefined) != -1) {
      //       console.log(values);
      //       this.stateToDos = this.stateToDos.filter((todo) => !todo.done);
      //     }
      //   });
      // },
      // removeFromAPI(todoID) {
      //   fetch(this.apiURL + todoID, {
      //     method: "DELETE",
      //   })
      //     .then((response) => {
      //       if (!response.ok) {
      //         return response.json();
      //       } else {
      //         throw new Error("Network response was not OK");
      //       }
      //     })
      //     .then(() => {
      //       this.getToDos();
      //     })
      //     .catch((error) => {
      //       alert(error.message);
      //     });
    },
  },
}).mount("#app");
