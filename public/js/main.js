$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});


function getMovies(searchText) {
  let url = 'http://www.omdbapi.com/?apikey=2dbd19be&s=' + searchText;
  axios.get(url).then((res) => {
      console.log(res);
      let movies = res.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
      <div class="col-md-3">
        <div class="well text-center">
          <img src="${movie.Poster}" alt="">
          <h5>${movie.Title}</h5>
          <a onclick = "movieSelected('${movie.imdbID}')" class = "btn btn-primary">Movie Details</a>
        </div>
      </div>
      `
      })
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    })
}


function movieSelected(id) {
  window.localStorage.setItem('movieID', id);
  window.location ='movie.html';
  return false;
}

function getMovie(){
  let id = localStorage.getItem('movieID');
  let url = 'http://www.omdbapi.com/?apikey=2dbd19be&i=' + id;

  axios.get(url).then((res) => {
      console.log(res);
      let movie = res.data;
      let output = `

      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" alt="" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
            <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
            <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
            <li class="list-group-item"><strong>ImDB Rating: </strong>${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
            <li class="list-group-item"><strong>Writer :</strong>${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" class="btn btn-primary">imdb</a>
          <a href="index.html" class ="btn btn-default">Go Back</a>
        </div>
      </div>

      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    })

  console.log(id);
}
