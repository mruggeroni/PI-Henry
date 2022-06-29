import AXIOS from 'axios'


export const GET_GAMES = "GET_GAMES",
  GET_GAMES_FOUND = "GET_GAMES_FOUND",
  GET_GAME_DETAIL = "GET_GAME_DETAIL",
  CREATE_GAME = "CREATE_GAME",
  GET_GENRES = "GET_GENRES",
  GET_PLATFORMS = "GET_PLATFORMS",
  /* DELETE_GAME = "DELETE_GAME",
  MODIFY_GAME = "MODIFY_GAME", */
  FILTERS_AND_SORTS = "FILTERS_AND_SORTS";


export function getGames() {
  return async function (dispatch) {
    try {
      const JSON = await AXIOS.get('http://localhost:3001/videogames');
      const GAMES = JSON.data;
      return dispatch({
        type: GET_GAMES,
        payload: GAMES
      });
    } catch(error) {
      return console.error(error.message);
    };
  };
};

export function getGamesFound(name) {
  return async function (dispatch) {
    try {
      const JSON = await AXIOS.get(`http://localhost:3001/videogames?name=${name}`);
      const GAMES = JSON.data;
      return dispatch({
        type: GET_GAMES_FOUND,
        payload: GAMES
      });
    } catch(error) {
      return console.error(error.message);
    };
  };
};

export function getGameDetail(id) {
  return async function (dispatch) {
    try {
      const JSON = await AXIOS.get(`http://localhost:3001/videogame/${id}`);
      const GAME = JSON.data;
      return dispatch({
        type: GET_GAME_DETAIL,
        payload: GAME
      });
    } catch(error) {
      return console.error(error.message);
    };
  };
};

export function createGame(game) {
  return async function () {
    try {
      await AXIOS.post('http://localhost:3001/videogame', game);
      return {
        type: CREATE_GAME,
        payload: {
          ...game
        },
      };
    } catch(error) {
      return console.error(error.message);
    };
  };
};

export function getGenres() {
  return async function (dispatch) {
    try {
      const JSON = await AXIOS.get('http://localhost:3001/genres');
      const GENRES = JSON.data;
      return dispatch({
        type: GET_GENRES,
        payload: GENRES
      });
    } catch(error) {
      return console.error(error.message);
    };
  };
};

export function getPlatforms() {
  return async function (dispatch) {
    try {
      const JSON = await AXIOS.get('http://localhost:3001/platforms');
      const PLATFORMS = JSON.data;
      return dispatch({
        type: GET_PLATFORMS,
        payload: PLATFORMS
      });
    } catch(error) {
      return console.error(error.message);
    };
  };
};


export function filtersAndSorts(payload) {
  return function (dispatch) {
    return dispatch({
      type: FILTERS_AND_SORTS,
      payload
    });
  };
};