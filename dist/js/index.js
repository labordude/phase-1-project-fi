addEventListener('DOMContentLoaded', () => {
  /**********DELIVERABLES START*****************/

  /**********DELIVERABLES END*******************/

  /**********VARIABLE DECLARATION START*********/

  const endpoints = {
    users: 'users',
    games: 'games',
    platforms: 'platforms',
    genres: 'genres',
    developers: 'developers',
    favorites: 'favorites',
    collections: 'collections',
  };
  
  const rawgUrl = `https://api.rawg.io/api/`;
  
  const gamesList = document.querySelector('#games-list');
  const gameDetails = document.querySelector('#game-details');
  let currentGame;
  /**********VARIABLE DECLARATION END***********/

  /**********FETCH REQUESTS START***************/
  const rover = {
    get: function getJSON(url) {
      return fetch(url)
        .then((response) => {
          if (response.ok) {
            // console.log(response.json());
            return response.json();
          } else {
            throw response.statusText;
          }
        })
        .catch((error) => console.log(error.message));
    },

    patch: function postJSON(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.statusText;
          }
        })
        .catch((error) => console.log(error.message));
    },
  };
  /**********FETCH REQUESTS END*****************/

  /**********EVENT LISTENERS START**************/

  /**********EVENT LISTENERS END****************/

  /**********FORM PROCESSING START**************/
  //handle input from search form
  function handleForm(event) {
    event.preventDefault();
    console.log(event);
  }

  function handleClick(event) {
    console.log(event);
  }
  /**********FORM PROCESSING END****************/

  /**********DOM RENDER FUNCTIONS START*********/
  function renderAllImages(characters) {
    characters.data.results.forEach((character) => renderImage(character));
  }

  function renderImage(game) {
    //create elements
    let gameImage = document.createElement('img');

    //populate attributes, classes, and text

    gameImage.src = game.background_image;
    console.log(gameImage.src);
    //append to DOM
    gamesList.append(gameImage);
  }

  /**********DOM RENDER FUNCTIONS END***********/

  /***********GENERAL FUNCTIONS START***********/
  function getAll() {
    rover
      .get(
        `${rawgUrl}${endpoints.users}/${config.me}/${endpoints.games}?statuses=playing&key=${config.apikey}`
      )
      .then((games) => {
        console.log(games);
        games.results.map((game) => {
          renderImage(game);
        });
      });
  }

  function getOne() {
    getJSON;
  }
  getAll();

  function my(section = '') {}
  /***********GENERAL FUNCTIONS END*************/
});
