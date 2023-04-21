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

  //   <div className="game-card">
  let gameCard = document.createElement('div');
  gameCard.classList.add('game-card');
  //   <img src="https://media.rawg.io/media/games/bf7/bf73b105ccbba42107986bbcd96fcada.jpg" />
  let gameImage = document.createElement('img');
  gameImage.classList.add('game-card-image');
  gameImage.src = game.background_image;
  //   <h3 className="game-card-title">Horizon Forbidden West</h3>
  let gameCardTitle = document.createElement('h3');
  gameCardTitle.textContent = game.name;
  //   <div className="card-bottom">
  let gameCardBottom = document.createElement('div');
  gameCardBottom.classList.add('card-bottom');
  //     <div className="card-bottom-left">
  let gameCardBottomLeft = document.createElement('div');
  gameCardBottomLeft.classList.add('card-bottom-left');
  //       <div className="info-group">
  let gameCardBottomLeftRating = document.createElement('div');
  gameCardBottomLeftRating.classList.add('info-group');
  //         <FontAwesomeIcon icon={faStar} className="icon" />
  let gameCardRatingIcon = document.createElement('i');
  gameCardRatingIcon.classList.add('fa-solid', 'fa-star');
  //         <p>4.75 / 5</p>
  let gameCardRating = document.createElement('p');
  gameCardRating.textContent = `Rating: ${game.rating} / ${game.rating_top}`;
  //       </div>
  //       <div className="info-group">
  let gameCardBottomLeftGenre = document.createElement('div');
  gameCardBottomLeftGenre.classList.add('info-group');
  //         <FontAwesomeIcon icon={faGamepad} className="icon" />
  let gameCardGenreIcon = document.createElement('i');
  gameCardGenreIcon.classList.add('fa-solid', 'fa-gamepad');
  //         <p>Action Action RPG</p>
  let gameCardGenres = document.createElement('p');
  gameCardGenres.classList.add('game-card-genres');
  let gameCardGenresList = document.createElement('ul');
  game.genres.forEach((genre) => {
    createLinkList(genre, gameCardGenresList);
  });
  //       </div>
  //     </div>
  //     <div className="card-bottom-right">
  let gameCardBottomRight = document.createElement('div');
  gameCardBottomRight.classList.add('card-bottom-right');
  //       <div className="info-group">
  let gameCardBottomRightMyRating = document.createElement('div');
  gameCardBottomRightMyRating.classList.add('info-group');
  gameCardBottomRightMyRating.textContent = ``;
  //         <FontAwesomeIcon icon={faStar} className="icon" />
  // let gameCardRatingIcon = document.createElement('i');
  // gameCardRatingIcon.classList.add('fa-solid', 'fa-star');
  //         <p>4.75 / 5</p>
  // let gameCardRating = document.createElement('p');
  // gameCardRating.textContent = `Rating: ${game.rating} / ${game.rating_top} | My rating:${game.user_rating}`;
  //       </div>
  //       <div className="info-group">
  let gameCardBottomRightGenre = document.createElement('div');
  gameCardBottomRightGenre.classList.add('info-group');
  //         <FontAwesomeIcon icon={faGamepad} className="icon" />
  // let gameCardGenreIcon = document.createElement('i');
  // gameCardGenreIcon.classList.add('fa-solid', 'fa-gamepad');
  //         <p>Action Action RPG</p>
  // let gameCardGenres = document.createElement('p');
  // let gameCardGenresList = document.createElement('ul');
  // game.genres.forEach((genre) => {
  //   createLinkList(genre, gameCardGenresList);
  // });
  // </div>
  //populate attributes, classes, and text

  currentGame = game;

  gameCardBottomRight.append(
    gameCardBottomRightMyRating,
    gameCardBottomRightGenre
  );
  gameCardGenres.append(gameCardGenresList);
  gameCardBottomLeftGenre.append(gameCardGenreIcon, gameCardGenres);
  gameCardBottomLeftRating.append(gameCardRatingIcon, gameCardRating);
  gameCardBottomLeft.append(gameCardBottomLeftRating, gameCardBottomLeftGenre);
  gameCardBottom.append(gameCardBottomLeft, gameCardBottomRight);
  gameCard.append(gameImage, gameCardTitle, gameCardBottom);
  //append to DOM
  // gameCardGenresDiv.append(gameCardGenresList);
  // gameCardRatingDiv.append(gameMyRatingDiv);
  // gameCardSubDetailsDiv.append(gameCardRatingDiv, gameCardGenresDiv);
  // gameCardTitleAnchor.append(gameCardTitle);
  // gameCardDetailsDiv.append(gameCardTitleAnchor, gameCardSubDetailsDiv);
  // gameCardImageAnchor.append(gameImage);
  // gameCardDiv.append(gameCardImageAnchor, gameCardDetailsDiv);
  gamesList.appendChild(gameCard);
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
      `${rawgUrl}${endpoints.users}/${config.me}/${endpoints.games}?page_size=20&key=${config.apikey}`
    )
    .then((games) => {
      let gamesArray = games.results.sort((a, b) => a.playtime - b.playtime);
      gamesArray.map((game) => {
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
