function init() {

new Vue ({

  el: '#app',

  data:  {

    filmCollection: [],
    serieCollection: [],
    filmSearching: "",
    filmSearchingConfirmed: "",
    showInfo: {
      id:0,
      show:false
    },
  },

  methods: {
    validateSearch: function() {

      this.filmSearchingConfirmed = this.filmSearching;

      axios.get('https://api.themoviedb.org/3/search/movie', {
                  params: {
                      'api_key': 'e4b6ba88120ccc405197c3cde27ac782',
                      'query': this.filmSearchingConfirmed
                  }
              })

            .then(data => {
              this.filmCollection = [];
              const movie = data.data.results;
              for (var i = 0; i < movie.length; i++) {
                this.filmCollection.push(movie[i]);
                this.getActors(movie[i].id);
              }
            })

            .catch(() => console.log("error"));

            // SERIE TV

      axios.get('https://api.themoviedb.org/3/search/tv', {
                  params: {
                      'api_key': 'e4b6ba88120ccc405197c3cde27ac782',
                      'query': this.filmSearchingConfirmed
                  }
              })

            .then(data => {
              this.serieCollection = [];
              const movie = data.data.results;
              for (var i = 0; i < movie.length; i++) {
                this.serieCollection.push(movie[i]);
              this.getSerieActors(movie[i].id);
              };
            })

            .catch(() => console.log("error"));
      },
    // Generatore di stelle
    starGenerator : function(voto) {
      let totStar = [];
      let pentaVoto = Math.floor(voto / 2);
      for (var i = 0; i < pentaVoto; i++) {
        totStar.push(i);
      }
      return totStar;
    },
    // Mostrare le info del film onHover
    showInfoFilm: function (film) {
      this.showInfo.id = film.id;
      this.showInfo.show = true;
    },
    // Tornare alla visualizzazione del poster
    hideInfoFilm: function (film) {
      this.showInfo.id = film.id;
      this.showInfo.show = false;
    },

    // Recuperare gli attori nei film
    getActors: function(filmId) {

      axios.get('https://api.themoviedb.org/3/movie/' + filmId + '/credits?api_key=e4b6ba88120ccc405197c3cde27ac782', {

      })

      .then(data => {
        let actors = [];
        let cast = data.data.cast;
        for (var i = 0; i < 5; i++) {
          actors.push(cast[i].name);
          }
          let index = this.filmCollection.findIndex(item => item.id == filmId);
          this.filmCollection[index].actors = actors;
      })
    },

    // Recuperare gli attori nelle serie TV
    getSerieActors: function(filmId) {

      axios.get('https://api.themoviedb.org/3/movie/' + filmId + '/credits?api_key=e4b6ba88120ccc405197c3cde27ac782', {

      })

      .then(data => {
        let actors = [];
        let cast = data.data.cast;
        for (var i = 0; i < 5; i++) {
          actors.push(cast[i].name);
          }
          let index = this.serieCollection.findIndex(item => item.id == filmId);
          this.serieCollection[index].actors = actors;
      })
    }


  },


  // fine VUE
  })


// fine init
}



$(init);
