addEventListener('DOMContentLoaded', () => {
  /**********DELIVERABLES START*****************/

  /**********DELIVERABLES END*******************/

  /**********VARIABLE DECLARATION START*********/
  const baseUrl = `https://gateway.marvel.com/v1/public/`;
  const marvel = {
    characters: baseUrl + 'characters',
    comics: baseUrl + 'comics',
    creators: baseUrl + 'creators',
    events: baseUrl + 'events',
    series: baseUrl + 'series',
    stories: baseUrl + 'stories',
  };
  const characterList = document.querySelector('#character-list');
  const characterSection = document.querySelector('#characters');

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

  function renderImage(character) {
    //create elements
    let characterImage = document.createElement('img');

    //populate attributes, classes, and text
    characterImage.setAttribute('data-id', character.id);
    characterImage.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    console.log(characterImage.src);
    if (
      characterImage.src ===
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
      return false;
    } else {
      //append to DOM
      characterList.append(characterImage);
    }
  }
  function renderAllCharacters(characters) {
    characters.data.results.forEach((character) =>
      renderOneCharacter(character)
    );
  }

  function renderOneCharacter(character) {
    console.log(character);
    //create elements
    let characterCard = document.createElement('div');
    let characterImage = document.createElement('img');
    let characterName = document.createElement('h3');
    let characterSeries = document.createElement('p');
    let characterComics = document.createElement('p');
    let characterEvents = document.createElement('p');
    let characterStories = document.createElement('p');
    //populate
    characterCard.classList.add('character-card');
    characterCard.setAttribute('data-id', character.id);
    characterImage.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    characterName.classList.add('character-name')
    characterName.textContent = character.name;

    characterCard.append(characterImage, characterName);
    characterSection.appendChild(characterCard);
  }

  /**********DOM RENDER FUNCTIONS END***********/

  /***********GENERAL FUNCTIONS START***********/
  function getAll() {
    rover
      .get(marvel.characters + tsString + apikey + hashString)
      .then((characters) => renderAllCharacters(characters));
  }

  function getOne() {
    getJSON;
  }
  getAll();
  /***********GENERAL FUNCTIONS END*************/
});
