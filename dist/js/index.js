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

function renderGameCards(game) {
  //create elements
  let gameCardDiv = document.createElement('div');
  let gameCardImageAnchor = document.createElement('a');
  let gameImage = document.createElement('img');
  let gameCardDetailsDiv = document.createElement('div');
  let gameCardTitleDiv = document.createElement('div');
  let gameCardTitleAnchor = document.createElement('a');
  let gameCardTitle = document.createElement('h5');
  let gameCardSubDetailsDiv = document.createElement('div');
  let gameMyRatingDiv = document.createElement('p');
  let gameCardRatingDiv = document.createElement('div');
  let gameCardBorderDiv = document.createElement('div');
  let gameCardGenresDiv = document.createElement('div');
  let gameCardGenresList = document.createElement('ul');

  //populate attributes, classes, and text
  gameCardDiv.classList.add('game-card-div');
  gameImage.classList.add('game-card-image');
  gameCardDetailsDiv.classList.add('game-card-details');
  gameCardSubDetailsDiv.classList.add('game-card-sub-details');
  gameMyRatingDiv.classList.add('game-card-rating');
  gameCardGenresDiv.classList.add('game-card-genres');
  gameImage.classList.add('game-card-image');
  gameImage.src = game.background_image;
  gameCardTitle.textContent = game.name;
  gameCardRatingDiv.textContent = `Rating: ${game.rating} / ${game.rating_top} | My rating:${game.user_rating}`;
  gameCardGenresDiv.textContent = 'Genres:';
  game.genres.forEach((genre) => {
    createLinkList(genre, gameCardGenresList);
  });

  currentGame = game;

  //append to DOM
  gameCardGenresDiv.append(gameCardGenresList);
  gameCardRatingDiv.append(gameMyRatingDiv);
  gameCardSubDetailsDiv.append(gameCardRatingDiv, gameCardGenresDiv);
  gameCardTitleAnchor.append(gameCardTitle);
  gameCardDetailsDiv.append(gameCardTitleAnchor, gameCardSubDetailsDiv);
  gameCardImageAnchor.append(gameImage);
  gameCardDiv.append(gameCardImageAnchor, gameCardDetailsDiv);
  gamesList.appendChild(gameCardDiv);
  gameImage.addEventListener('click', () => showGameDetails(game));
}

function showGameDetails(game) {
  // identify
  let gameImage = document.querySelector('#game-details #selected-game-image');
  let gameTitle = document.querySelector('#game-details #selected-game-title');
  let gameReleaseDate = document.querySelector(
    '#game-details #selected-game-release-date'
  );
  //create elements

  //populate data, text, classes, attributes
  gameImage.src = game.background_image;
  gameTitle.textContent = game.name;
  gameReleaseDate.textContent = game.released;

  //append elements to the DOM
}

/**********DOM RENDER FUNCTIONS END***********/

/***********GENERAL FUNCTIONS START***********/
function getMyCurrentGames() {
  rover
    .get(
      `${rawgUrl}${endpoints.users}/${config.me}/${endpoints.games}?statuses=playing&key=${config.apikey}`
    )
    .then((games) => {
      games.results.map((game) => {
        currentGame = game;
        renderGameCards(game);
      });
    });
}

function getOne() {
  getJSON;
}
getMyCurrentGames();

function my(section = '') {}

function createLinkList(input, appendTo) {
  let li = document.createElement('li');
  let link = document.createElement('a');
  link.href = '#genres';
  link.textContent = input.name;
  li.appendChild(link);
  li.addEventListener('click', () => console.log(input));
  appendTo.appendChild(li);
}
/***********GENERAL FUNCTIONS END*************/
