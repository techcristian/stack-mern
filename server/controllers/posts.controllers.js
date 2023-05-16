import { connect } from '../db.js'
import {
  uploadImage, deleteImage
} from '../libs/cloudinary.js'
import fs from 'fs-extra';

// get all posts
export const getPosts = async (req, res) => {
  try {
    const connection = await connect()
    console.log('Conexión a la base de datos establecida correctamente')

    const [result] = await connection.query('SELECT * FROM posts');
    res.json(result)
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message })
  }

}
// create posts
export const createPost = async (req, res) => {

  try {

    const { title, description } = req.body;
    //verificacion si hay req.body de la solicitud!
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: 'debe proporcionar informacion del post' })
    }

    //console.log(req.files)
    // Lógica principal para crear el post

    if (!req.files) {
      const newPost = { title, description }
      const connection = await connect()
      const results = await connection.query('INSERT INTO posts SET ?', [newPost])

      const id = results[0].insertId;
      const [result_id] = await connection.query('SELECT * FROM posts WHERE id=?', [id]);

      return res.json(result_id[0])
    }
    if (req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      const image_url = result.secure_url
      const image_public_id = result.public_id

      const newPost = { title, description, image_url, image_public_id };
      const connection = await connect();
      const results = await connection.query('INSERT INTO posts SET ?', [newPost]);

      const id = results[0].insertId;
      const [result_id] = await connection.query('SELECT * FROM posts WHERE id=?', [id]);

      return res.json(result_id[0]);
    }



  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
//update posts
export const updatePost = async (req, res) => {
 console.log(req.files)
 
  try {

  
    if (!req.params.id) {
      return res.sendStatus(404);
    }
    
    // actualizamos si desde el front viene con una imagen para actualizar!!
    if (req.files.image) {
      const connection = await connect();
      await deleteImage(req.body.image_public_id) // borramos en cloudinary la imagen anterior en cludinary(no se como pero esto me funciono)
      const result = await uploadImage(req.files.image.tempFilePath);// cargamos en cloudinary la nueva imagen
      await fs.remove(req.files.image.tempFilePath);
      const image_url = result.secure_url
      const image_public_id = result.public_id

      //obtenido los nuevos datos de la nueva imagen desde result, actualizamos pasando a la db los parametros.
     const results = await connection.query('UPDATE posts SET title=?,description=?,image_url=?, image_public_id=? WHERE id = ?', [
        req.body.title,
        req.body.description,
        image_url,
        image_public_id,
        req.params.id]);

      const id = results[0].insertId;// obtenemos desde los datos nuevos que actualizamos del arreglo su propiedad inserId, la guardamos como id para buscar los nuevos datos en db y retornarlos como un objeto json.
      const [result_id] = await connection.query('SELECT * FROM posts WHERE id=?', [id]);
console.log([result_id])
      return res.json(result_id[0]);
    } 
      const connection = await connect();
      await connection.query('UPDATE posts SET title=?,description=? WHERE id = ?', [
       req.body.title,
       req.body.description,
       req.params.id]);
     const [result_up] = await connection.query('SELECT * FROM posts WHERE id=?', [req.params.id]);
     console.log(result_up[0])


     return res.json(result_up[0])
     ;
    }catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message })
  }
}



//delete posts

export const deletePost = async (req, res) => {
  try {// buscamos primeramente por id y traemos todos lo datos para luego borrar.
    const connection = await connect();
    const [result_table] = await connection.query('SELECT * FROM posts WHERE id=?', [req.params.id]);

    if (!result_table || result_table.length === 0) {// validamos si no viene la peticion con id, osea si no tenemos respuesta al buscar datos por id || o si dentro del arreglo no exite ningun objeto buscado.
      return res.sendStatus(404);
    }

    const result_public = result_table[0].image_public_id;//del arreglo que obtuvimos de la busqueda , obtenemos su primer objeto y su image_public_id, para luego borrar en cludinary y db.

    if (result_public) { //valida si exite imagen y borrar primero en cloudinary y luego en db.
      await deleteImage(result_public);
      const postRemove = await connection.query('DELETE FROM posts WHERE id = ?', [req.params.id]);

      if (postRemove[0].affectedRows === 0) {
        return res.sendStatus(404);
      } else {
        return res.sendStatus(204);
      }
    } else {// en caso contario si no viene con imagen pero si con titulo y description borrar en db.
      const postRemove = await connection.query('DELETE FROM posts WHERE id = ?', [req.params.id]);

      if (postRemove[0].affectedRows === 0) {//validamos si no se afectaron filas, es porque no exite nibngun objeto para borrar.
        return res.sendStatus(404);
      } else {// en caso contrario se retorna un mensaje 204, de que todo salio bien!
        return res.sendStatus(204);
      }
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
}

//get one posts
export const getPost = async (req, res) => {
  try {

    const connection = await connect();
    const [rows] = await connection.execute('SELECT * FROM posts WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).send('No se encontró ningún post con el ID proporcionado');
    }
    return res.json(rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
}

/*export const deletePost = async (req, res) => {
  try {
    const connection = await connect();
    const [result_table] = await connection.query('SELECT * FROM posts WHERE id=?', [req.params.id]);
    const result_public = result_table[0].image_public_id;

    if(result_public){ 
      await deleteImage(result_public);
      const postRemove = await connection.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
      console.log(postRemove);
      if (postRemove[0].affectedRows === 0) {
        return res.sendStatus(404);
      } else {
        return res.sendStatus(204);
      }

    } else  {
      
        const connection = await connect();
        const postRemove2 = await connection.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
       console.log(postRemove2[0]);
       if (postRemove2[0].affectedRows === 0) {
         return res.sendStatus(404);
       } else {
        return res.sendStatus(204); 
        
       }
      }
    
    } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }

}*/