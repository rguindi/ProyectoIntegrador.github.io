const db = require ('../database/db'); //No requiere extension js

//Funcion para obtener equipo
const getEquipos = (req,res)=>{         //localhost:3000/equipo
    db.query('SELECT * FROM equiposelectronicos', (err, resultados)=>{
        if(err){
            console.error('Error al obtener los datos', err);
        }else{
            res.json(resultados);
        }
    });

};

const getEquipoById = (req, res) => { //http://localhost:3000/equipo/registro/3
    const idRegistro = req.params.id;
 
    // Consulta a la base de datos para obtener el registro por ID
    db.query('SELECT * FROM equiposelectronicos WHERE id_equipo = ?', [idRegistro], (err, resultados) => {
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

//Funcion insertar equipo
const crearEquipo = (req,res)=>{
const {nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, ano_adquisicion, ultima_actualizacion, codigo} = req.body;
const imagen_producto = req.files[0].originalname;
const qr_code = req.files[1].originalname;
db.query( 'INSERT INTO equiposelectronicos (nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, codigo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',[nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, codigo],(err,resultado)=>{
    if(err){
        console.error('Error al guardar los datos', err);
        res.status(500).json({error:'Error interno en el servidor'});
    } else{
        res.json({recibido:true, nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, codigo, id: resultado.insertid})
    }
});
};



//modificar equipo
const putEquipo = (req,res)=>{
    const idRegistro = req.params.id;
    const {nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria,  ano_adquisicion, ultima_actualizacion, codigo} = req.body;
    const imagen_producto = req.files[0].originalname;
    const qr_code = req.files[1].originalname;
    const sql = 'UPDATE equiposelectronicos SET nombre=?, descripcion=?, marca=?, modelo=?, numero_de_serie=?, estado=?, id_aula=?, id_categoria=?, imagen_producto=?, qr_code=?, ano_adquisicion=?, ultima_actualizacion=?, codigo=? WHERE id_equipo = ?';
    db.query(sql, [nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, codigo, idRegistro], (err, resultado)=>{
        if(err){
            console.error('Error al guardar los datos', err);
            res.status(500).json({error:'Error interno en el servidor'});
        } else{
            res.json({recibido:true, nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, codigo, id: resultado.idRegistro})

        }
    });
}

//modificar equipo
const actualizarEquipo = (req,res)=>{  //http://localhost:3000/equipo/3
    const idRegistro = req.params.id;
    const {nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, ano_adquisicion, ultima_actualizacion, codigo} = req.body;
    const imagen_producto = req.files[0].originalname;
    const qr_code = req.files[1].originalname;
    const updatedFields = [];
    const updatedValues = [];
    if (nombre!=undefined) {
        updatedValues.push(nombre);
        updatedFields.push('nombre =?');
    }
    if (descripcion!=undefined) {
        updatedValues.push(descripcion);
        updatedFields.push('descripcion =?');
    }
    if (marca!=undefined) {
        updatedValues.push(marca);
        updatedFields.push('marca =?');
    }
    if (modelo!=undefined) {
        updatedValues.push(modelo);
        updatedFields.push('modelo =?');
    }
    if (numero_de_serie!=undefined) {
        updatedValues.push(numero_de_serie);
        updatedFields.push('numero_de_serie =?');
    }
    if (estado!=undefined) {
        updatedValues.push(estado);
        updatedFields.push('estado =?');
    }
    if (id_aula!=undefined) {
        updatedValues.push(id_aula);
        updatedFields.push('id_aula =?');
    }
    if (id_categoria!=undefined) {
        updatedValues.push(id_categoria);
        updatedFields.push('id_categoria =?');
    }
    if (imagen_producto!=undefined) {
        updatedValues.push(imagen_producto);
        updatedFields.push('imagen_producto =?');
    }
    if (qr_code!=undefined) {
        updatedValues.push(qr_code);
        updatedFields.push('qr_code =?');
    }
    if (ano_adquisicion!=undefined) {
        updatedValues.push(ano_adquisicion);
        updatedFields.push('ano_adquisicion =?');
    }
    if (ultima_actualizacion!=undefined) {
        updatedValues.push(ultima_actualizacion);
        updatedFields.push('ultima_actualizacion =?');
    }
    if (codigo!=undefined) {
        updatedValues.push(codigo);
        updatedFields.push('codigo =?');
    }


    const sql = `UPDATE equiposelectronicos SET ${updatedFields.join(', ')} WHERE id_equipo =?`;
    const queryValues = [...updatedValues, idRegistro];

    db.query(sql, queryValues, (err, resultado)=>{
        if(err){
            console.error('Error al guardar los datos', err);
        } else{
            res.json({recibido:true, nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, codigo, id: resultado.idRegistro})

        }
    });
}

//borrar equipo
const deleteEquipo = (req,res)=>{
    const idRegistro = req.params.id;
    db.query('DELETE FROM equiposelectronicos WHERE id_equipo = ?', [idRegistro], (err, resultado)=>{
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
    getEquipos,
    crearEquipo,
    getEquipoById,
    putEquipo,
    actualizarEquipo,
    deleteEquipo
};