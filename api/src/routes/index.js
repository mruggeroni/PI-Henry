const { Router } = require('express');
const AXIOS = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// *** GET todos los juegos o por busqueda ***
const GET_API_GAMES = async (SEARCH) => {
    const API_INFO = [],
        PROMISES = [],
        PAGES = [1, 2, 3, 4, 5];
    PAGES.forEach((page) => PROMISES.push(
        AXIOS.get(`https://api.rawg.io/api/games?${SEARCH ? `search=${SEARCH}&` : ""}page=${page}&key=${API_KEY}`)
            .then(res => res.data.results)
            .then(games => games.map(({ id, name, background_image, rating, genres }) => {
                return {
                    id,
                    name,
                    img: background_image,
                    rating,
                    genres: genres.map(({ name }) => name),
                    createdInDb: false,
                };
            }))
            .then(games => API_INFO.push(...games))
            .catch(error => error.message)
    ));
    await Promise.all(PROMISES);
    let games = JSON.parse(JSON.stringify(API_INFO));
    return games;
};

const GET_DB_GAMES = async (SEARCH) => {
    const GAMES = await Videogame.findAll({
        [SEARCH && "where"]: {
            name: {
                [Op.substring]: decodeURIComponent(SEARCH).toLowerCase()
            },
        },
        attributes: ['id', 'name', 'img', 'rating', 'createdInDb'],
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            },
        },
    });
    let games = JSON.parse(JSON.stringify(GAMES));
    games = games.map(game => {
        game.genres = game.Genres.map(({ name }) => name);
        delete game.Genres;
        return game;
    });
    return games;
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
    const { id, background_image, name, description_raw, genres, rating, released, platforms } = API_URL.data;
    const API_INFO = {
        id,
        img: background_image,
        name,
        description: description_raw,
        genres: genres.map(({ name }) => name),
        rating,
        released,
        platforms: platforms.map(({ platform: { name } }) => name),
        createdInDb: false,
    };
    let game = JSON.parse(JSON.stringify(API_INFO));
    return game;
};

const GET_DB_GAME_DETAILS = async (ID) => {
    const GAME = await Videogame.findByPk(ID, {
        attributes: ['id', 'name', 'img', 'description', 'rating', 'released', 'createdInDb'],
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
    let game = JSON.parse(JSON.stringify(GAME));
    game.genres = game.Genres.map(({ name }) => name);
    game.platforms = game.Platforms.map(({ name }) => name);
    delete game.Genres;
    delete game.Platforms;
    return game;
};

const GET_ALL_GAME_DETAILS = async (ID) => {
    return !Number(ID) ? await GET_DB_GAME_DETAILS(ID) : await GET_API_GAME_DETAILS(ID);
};

// *** POST juego a la DB ***
const POST_GAME = async (name, img, description, rating, released, genres, platforms) => {
    let gameCreated = await Videogame.create({
        name, 
        img, 
        description, 
        rating, 
        released,
    });
    let genresDb = await Genre.findAll({ where: { name: genres }})
    let platformsDb = await Platform.findAll({ where: { name: platforms }})
    gameCreated.setGenres(genresDb);  // .addBars() hace lo mismo que .setBars() para un post, ya que inicialmente tiene la propiedad vacia
    gameCreated.setPlatforms(platformsDb);
    return "Successful game creation";
};

// *** PUT juego en la DB ***
const PUT_GAME = async (id, name, img, description, rating, released, genres, platforms) => {
    await Videogame.update({
        name, 
        img, 
        description, 
        rating, 
        released,
    }, {
        where: {
            id,
        }
    });
    let gameUpdated = await Videogame.findByPk(id);
    let genresDb = await Genre.findAll({ where: { name: genres }})
    let platformsDb = await Platform.findAll({ where: { name: platforms }})
    gameUpdated.setGenres(genresDb);  // .addGenres() agrega a los existente, .setGenres() los vuelve a setear
    gameUpdated.setPlatforms(platformsDb);
    return "Successful game update";
};

// *** DELETE juego en la DB ***
const DELETE_GAME = async (id) => {
    await Videogame.destroy({
        where: {
            id,
        }  // Borra tambien los datos de tablas intermedias ralacionados al elemento eliminado
    });
    return "Successful game delete";
};

// *** GET todos los generos ***
const GET_GENRES = async () => {
    const API_INFO = [],
    PROMISES = [],
    PAGES = [1, 2];
    PAGES.forEach((page) => PROMISES.push(
        AXIOS.get(`https://api.rawg.io/api/genres?page=${page}&key=${API_KEY}`)
            .then(res => res.data.results)
            .then(genres => genres.map(({ name }) => name))
            .then(genres => API_INFO.push(...genres))
            .catch(error => error)
    ));
    await Promise.all(PROMISES);
    await Promise.all(API_INFO.map(gen => {
        return Genre.findOrCreate({
            where: { name: gen }
        })
        .catch(err => console.log(err.message));
    }));
    const GENRES = await Genre.findAll();
    let genres = JSON.parse(JSON.stringify(GENRES));
    genres = genres.map(({ name }) => name);
    return genres;
};

// *** GET todas las plataformas ***
const GET_PLATFORMS = async () => {  // si dejan usar la ruta de la API
    const API_INFO = [],
    PROMISES = [],
    PAGES = [1, 2];
    PAGES.forEach((page) => PROMISES.push(
        AXIOS.get(`https://api.rawg.io/api/platforms?page=${page}&key=${API_KEY}`)
            .then(res => res.data.results)
            .then(platforms => platforms.map(({ name }) => name))
            .then(platforms => API_INFO.push(...platforms))
            .catch(error => error)
    ));
    await Promise.all(PROMISES);
    await Promise.all(API_INFO.map(platf => {
        return Platform.findOrCreate({
            where: { name: platf }
        })
        .catch(err => console.log(err.message));
    }));
    const PLATFORMS = await Platform.findAll();
    let platforms = JSON.parse(JSON.stringify(PLATFORMS));
    platforms = platforms.map(({ name }) => name);
    return platforms;
};



// *** RUTAS ***
router.get('/videogames', async (req, res) => {
    const { name } = req.query;
    try {
        const GAMES = await GET_ALL_GAMES(name);
        GAMES.length ?
        res.status(200).json(GAMES) :
        res.status(404).send('No se han encontrado resultados');
    } catch (error) {
        res.status(400).send(error.message);
    };
});

router.get('/videogame/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const GAME = await GET_ALL_GAME_DETAILS(id);
        Object.keys(GAME).length ?
        res.status(200).json(GAME) :
        res.status(404).send('No se ha encontrado el juego para el ID solicitado');
    } catch (error) {
        res.status(400).send(error.message);
    };
});

router.post('/videogame', async (req, res) => {
    const { name, img, description, rating, released, genres, platforms } = req.body;
    try {
        const messageResult = await POST_GAME(name, img, description, rating, released, genres, platforms);
        res.status(201).send(messageResult);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

router.put('/videogame/:id', async (req, res) => {
    const { id } = req.params;
    const { name, img, description, rating, released, genres, platforms } = req.body;
    try {
        const messageResult = await PUT_GAME(id, name, img, description, rating, released, genres, platforms);
        res.status(200).send(messageResult);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

router.delete('/videogame/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const messageResult = await DELETE_GAME(id);
        res.status(200).send(messageResult);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

router.get('/genres', async (req, res) => {
    try {
        const GENRES = await GET_GENRES();
        res.status(200).json(GENRES);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

router.get('/platforms', async (req, res) => {
    try {
        const PLATFORMS = await GET_PLATFORMS();
        res.status(200).json(PLATFORMS);
    } catch (error) {
        res.status(400).send(error.message);
    };
});

module.exports = router;
