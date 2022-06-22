const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const AXIOS = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// *** GET todos los juegos o por busqueda ***
const GET_API_GAMES = async (SEARCH, PAGE = 1) => {
    let apiInfo;
    if (SEARCH) {
        apiInfo = await AXIOS.get(`https://api.rawg.io/api/games?search=${SEARCH}&page=${PAGE}&key=${API_KEY}`);
    } else {
        apiInfo = await AXIOS.get(`https://api.rawg.io/api/games?page=${PAGE}&key=${API_KEY}`);
    };
    const API_INFO = await apiInfo.data.results.map(({ id, background_image, name, genres }) => {
        return {
            id,
            img: background_image,
            name,
            genres: genres.map(({ name }) => name),
        };
    });
    return API_INFO;
};

const GET_DB_GAMES = async (SEARCH) => {
    return await Videogame.findAll({
        [SEARCH && "where"]: {
            name: {
                [Op.like]: decodeURIComponent(SEARCH)
            },
        },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            },
        },
    });
};

const GET_ALL_GAMES = async (SEARCH) => {
    const API_INFO = await GET_API_GAMES(SEARCH);
    const DB_INFO = await GET_DB_GAMES(SEARCH);
    const GAMES = API_INFO.concat(DB_INFO);
    return GAMES;
};

// *** GET detalles de juego po ID ***
const GET_API_GAME_DETAILS = async (ID) => {
    const API_URL = await AXIOS.get(`https://api.rawg.io/api/games/${ID}?key=${API_KEY}`);
    const { id, background_image, name, description_raw, genres, rating, released, platforms } = await API_URL.data;
    const API_INFO = {
        id,
        img: background_image,
        name,
        description: description_raw,
        genres: genres.map(({ name }) => name),
        rating,
        released,
        platforms: platforms.map(({ platform: { name } }) => name),
    };
    return API_INFO;
};

const GET_DB_GAME_DETAILS = async (ID) => {
    return await Videogame.findByPk(ID, {
        include: [{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            },
        }, 
        {
            model: Platform,
            attributes: ['name'],
            through: {
                attributes: []
            },
        }]
    });
};

const GET_ALL_GAME_DETAILS = async (ID) => {
    if (!Number(ID)) {
        return await GET_DB_GAME_DETAILS(ID);
    } else {
        return await GET_API_GAME_DETAILS(ID);
    };
};

// *** POST juego a la DB ***
const POST_GAME = async (name, img, description, rating, released, createdInDb, genres, platforms) => {
    let gameCreated = await Videogame.create({
        name, 
        img, 
        description, 
        rating, 
        released,
        createdInDb
    });
    let genreDb = await Genre.findAll({ where: { name: genres }})
    gameCreated.addGenres(genreDb);
    let platformsDb = await Platform.findAll({ where: { name: platforms }})
    gameCreated.addPlatforms(platformsDb);
    return gameCreated;
};

// *** GET todos los generos ***
const GET_API_GENRES = async (PAGE = 1) => {
    const API_URL = await AXIOS.get(`https://api.rawg.io/api/genres?page=${PAGE}&key=${API_KEY}`);
    const API_INFO = await API_URL.data.results.map(({ name }) => name);
    API_INFO.forEach(gen => {
        Genre.findOrCreate({
            where: { name: gen }
        });
    });
    const GENRES = await Genre.findAll();
    return GENRES;
};

// *** GET todas las plataformas ***
const GET_API_PLATFORMS = async (PAGE = 1) => {  // si dejan usar la ruta de la API
    const API_URL = await AXIOS.get(`https://api.rawg.io/api/platforms?page=${PAGE}&key=${API_KEY}`);
    const API_INFO = await API_URL.data.results.map(({ name }) => name);
    API_INFO.forEach(platf => {
        Platform.findOrCreate({
            where: { name: platf }
        });
    });
    const PLATFORMS = await Platform.findAll();
    return PLATFORMS;
};



// *** RUTAS ***
router.get('/videogames', async (req, res) => {
    const { name } = req.query;
    try {
        const GAMES = await GET_ALL_GAMES(name);
        GAMES.length ?
        res.status(200).json(GAMES) :
        res.status(400).send('No se han encontrado resultados');
    } catch (error) {
        res.status(400).json(error);
    };
});

router.get('/videogame/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const GAME = await GET_ALL_GAME_DETAILS(id);
        Object.keys(GAME).length ?
        res.status(200).json(GAME) :
        res.status(400).send('No se ha encontrado el juego para el ID solicitado');
    } catch (error) {
        res.status(400).json(error);
    };
});

router.post('/videogame', async (req, res) => {
    const { name, img, description, rating, released, createdInDb, genres, platforms } = req.body;
    try {
        if (!name || !img || !description || !rating || !released || !genres.length || !platforms.length) throw new Error('No se han ingresado todos los datos');
        await POST_GAME(name, img, description, rating, released, createdInDb, genres, platforms);
        res.status(200).send(`Juego ${name} creado con exito`);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

router.get('/genres', async (req, res) => {
    try {
        const GENRES = await GET_API_GENRES();
        res.status(200).json(GENRES);
    } catch (error) {
        res.status(400).json(error);
    };
});

router.get('/platforms', async (req, res) => {
    try {
        const PLATFORMS = await GET_API_PLATFORMS();
        res.status(200).json(PLATFORMS);
    } catch (error) {
        res.status(400).json(error);
    };
});

module.exports = router;
