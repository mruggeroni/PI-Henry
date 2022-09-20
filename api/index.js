//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {  // force: false para no resetear DB
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
  // try {
  //   await GET_ALL_GAMES();
  //   /* 
  //   Acciones asincronicas a ejecutar al levantar el servidor.
  //   Es más seguro que se ejecuten y no tener problemas de subida de información al comienzo, a diferencia del front donde puede existir interferencia con el 'force' en peticiones grandes de datos.
  //   */
  // console.log('Servidor Inicializado');
  // } catch (error) {
  //   console.log(error.message)
  // };
});
