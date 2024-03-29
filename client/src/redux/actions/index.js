import AXIOS from 'axios';


const URL = process.env.REACT_APP_ONLINE_SERVER || `http://localhost:3001`;

export const GET_GAMES = "GET_GAMES",
  GET_GAMES_FOUND = "GET_GAMES_FOUND",
  GET_GAME_DETAIL = "GET_GAME_DETAIL",
  POST_GAME = "POST_GAME",
  PUT_GAME = "PUT_GAME",
  DELETE_GAME = "DELETE_GAME",
  GET_GENRES = "GET_GENRES",
  GET_PLATFORMS = "GET_PLATFORMS",
  FILTERS_AND_SORTS = "FILTERS_AND_SORTS";


export function getGames() {
  return async function (dispatch) {
    try {
      const JSON = await AXIOS.get(`${URL}/videogames`);
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
      const JSON = await AXIOS.get(`${URL}/videogames?name=${name}`);
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
      const JSON = id ? await AXIOS.get(`${URL}/videogame/${id}`) : { data: {} };
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

export function postGame(game) {
  return async function (dispatch) {
    try {
      const MESSAGE = await AXIOS.post(`${URL}/videogame`, game);
      return dispatch({
        type: POST_GAME,
        payload: {
          MESSAGE,
          game,
        },
      });
    } catch(error) {
      return console.error(error.message);
    };
  };
};

export function putGame(game) {
  return async function (dispatch) {
    try {
      const MESSAGE = await AXIOS.put(`${URL}/videogame/${game.id}`, game);
      return dispatch({
        type: PUT_GAME,
        payload: {
          MESSAGE,
          game,
        },
      });
    } catch(error) {
      return console.error(error.message);
    };
  };
};

export function deleteGame(id) {
  return async function (dispatch) {
    try {
      const MESSAGE = await AXIOS.delete(`${URL}/videogame/${id}`);
      return dispatch({
        type: DELETE_GAME,
        payload:{
          MESSAGE,
          id,
        },
      });
    } catch(error) {
      return console.error(error.message);
    };
  };
};

export function getGenres() {
  return async function (dispatch) {
    try {
      const JSON = await AXIOS.get(`${URL}/genres`);
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
      const JSON = await AXIOS.get(`${URL}/platforms`);
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