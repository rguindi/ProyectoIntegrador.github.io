const express= require('express'); // npm -i express
const cors= require('cors');
const app=express();
const rutasAulas= require('./rutas/rutas_aulas');
const rutasCategorias= require('./rutas/rutas_categorias');
const rutasDetalles= require('./rutas/rutas_detalles');
const rutasEquipos= require('./rutas/rutas_equipos');
const rutasIncidencias= require('./rutas/rutas_incidencias');
const rutasUsuarios = require('./rutas/rutas_usuarios');
const puerto=3000;
const multer=require('multer');
app.use(cors());
// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Middleware para manejar datos codificados en formato x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads') // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Nombre original del archivo
    }
});
const upload = multer({ storage: multer.memoryStorage() });
 
// Middleware Multer para manejar archivos
app.use(upload.any());

app.use('/aulas', rutasAulas); 
app.use('/categorias', rutasCategorias); 
app.use('/detalles', rutasDetalles); 
app.use('/equipos', rutasEquipos); 
app.use('/incidencias', rutasIncidencias); 
app.use('/usuarios', rutasUsuarios); 

app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});
  