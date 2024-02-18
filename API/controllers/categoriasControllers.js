const db = require ('../database/db'); //No requiere extension js

//Funcion para obtener categorias
const getCategorias = (req,res)=>{         //localhost:3000/categorias
    db.query('SELECT * FROM categorias', (err, resultados)=>{
        if(err){
            console.error('Error al obtener los datos', err);
        }else{
            res.json(resultados);
        }
    });

};

const getCategoriaById = (req, res) => { //http://localhost:3000/categorias/registro/3
    const idRegistro = req.params.id;
 
    // Consulta a la base de datos para obtener el registro por ID
    db.query('SELECT * FROM categorias WHERE id_categoria = ?', [idRegistro], (err, resultados) => {
      if (err) {
        console.error('Error al obtener el registro desde la base de datos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        // Verifica si se encontró un registro
        if (resultados.length > 0) {
          res.json(resultados[0]); // Devuelve el primer resultado encontrado (debería ser único)
        } else {
          res.status(404).json({ error: 'Registro no encontrado' });
        }
      }
    });
  };

//Funcion insertar categorias
const crearCategoria = (req,res)=>{
const {nombre} = req.body;
db.query( 'INSERT INTO categorias (nombre) VALUES (?)',[nombre],(err,resultado)=>{
    if(err){
        console.error('Error al guardar los datos', err);
        res.status(500).json({error:'Error interno en el servidor'});
    } else{
        res.json({recibido:true, nombre, id: resultado.insertid})
    }
});
};


//modificar ciudad
const putCategoria = (req,res)=>{
    const idRegistro = req.params.id;
    const {nombre} = req.body;
    const sql = 'UPDATE categorias SET nombre = ? WHERE id_categoria = ?';
    db.query(sql, [nombre, idRegistro], (err, resultado)=>{
        if(err){
            console.error('Error al guardar los datos', err);
            res.status(500).json({error:'Error interno en el servidor'});
        } else{
            res.json({recibido:true, nombre, id: resultado.idRegistro})

        }
    });
}



//borrar ciudad
const deleteCategoria = (req,res)=>{
    const idRegistro = req.params.id;
    db.query('DELETE FROM categorias WHERE id_categoria = ?', [idRegistro], (err, resultado)=>{
        if(err){
            console.error('Error al eliminar de la base de datos', err);
            res.status(500).json({error:'Error interno en el servidor'});
        } else{
            //Verificamos si se encontro un registro
            if(resultado.affectedRows>0){
                res.json({mensaje: `Registro con id ${idRegistro} se eliminó correctamente.`});
            }else{
                res.status(404).json({error:  `No se encontró el registro con id ${idRegistro}.`});
            }

        }
    });
}





module.exports={
    getCategorias,
    crearCategoria,
    getCategoriaById,
    putCategoria,
    deleteCategoria
};