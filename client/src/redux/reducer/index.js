import { GET_GAMES, GET_GAMES_FOUND, GET_GAME_DETAIL, POST_GAME, GET_GENRES, GET_PLATFORMS, DELETE_GAME, PUT_GAME, FILTERS_AND_SORTS } from "../actions";


export const Origin_Filter = "OriginFilter",
  Genre_Filter = "GenreFilter",
  Sort = "Sort";

const initialState = {
  games: [],
  gameDetail: {},
  genres: [],
  platforms: [],
  allGames: [],
  filterSort: {
    [Origin_Filter]: "All",
    [Genre_Filter]: "All",
    [Sort]: "none",
  },
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES: 
      return {
        ...state,
        games: action.payload,
        allGames: action.payload,
      };

    case GET_GAMES_FOUND: 
      return {
        ...state,
        games: action.payload,
        allGames: action.payload,
      };

    case GET_GAME_DETAIL: 
      return {
        ...state,
        gameDetail: action.payload,
      };

    case POST_GAME: 
      const GAMES_POST = [...state.games, action.payload.game];
      return {
        ...state,
        games: GAMES_POST,
        allGames: GAMES_POST,
      };

    case PUT_GAME: 
      const GAMES_PUT = [...state.games.map(game => 
        game.id === action.payload.game.id ? 
        action.payload.game : 
        game
      )];
      return {
        ...state,
        games: GAMES_PUT,
        allGames: GAMES_PUT,
      };

    case DELETE_GAME: 
      const GAMES_DELETE = [...state.games.filter(game => 
        game.id !== action.payload.id
      )];
      return {
        ...state,
        games: GAMES_DELETE,
        allGames: GAMES_DELETE,
      };

    case GET_GENRES: 
      return {
        ...state,
        genres: action.payload,
      };

    case GET_PLATFORMS: 
      return {
        ...state,
        platforms: action.payload,
      };


    // Filtros y Ordenamientos:
    case FILTERS_AND_SORTS: 
      const filterByOrigin = (games, valueActive) => {
        return valueActive === 'All' ? 
        games : 
        games.filter(game => String(game.createdInDb) === valueActive);
      };
      const filterByGenre = (games, valueActive) => {
        return valueActive === 'All' ? 
        games : 
        games.filter(game => game.genres.includes(valueActive));
      };
      const sort = (games, valueActive) => {
        switch (valueActive) {
          case "Ascending_Alphabetic_Sort":
            games.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "Descending_Alphabetic_Sort":
            games.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "Ascending_Rating_Sort":
            games.sort((a, b) => a.rating - b.rating);
            break;
          case "Descending_Rating_Sort":
            games.sort((a, b) => b.rating - a.rating);
            break;
          default:
            break;
        };
        return games;
      };

      const { e_target_id, e_target_value } = action.payload,
        Sort_VALUE = state.filterSort[Sort],
        Genre_Filter_VALUE = state.filterSort[Genre_Filter],
        Origin_Filter_VALUE = state.filterSort[Origin_Filter];
      let games = state.games,
        allGames = JSON.parse(JSON.stringify(state.allGames));


      switch (e_target_id) {
        case Origin_Filter:
          games = filterByOrigin(allGames, e_target_value);
          games = filterByGenre(games, Genre_Filter_VALUE);
          games = sort(games, Sort_VALUE);
          break;

        case Genre_Filter:
          games = filterByGenre(allGames, e_target_value);
          games = filterByOrigin(games, Origin_Filter_VALUE);
          games = sort(games, Sort_VALUE);
          break;

        case Sort:
          games = sort(games, e_target_value);
          break;

        default:
          break;
      };

      return {
        ...state,
        games,
        filterSort: {
          ...state.filterSort,
          [e_target_id]: e_target_value,
        },
      };

    default: return {...state};
  };
};
