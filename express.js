import express from 'express';
import mysql from 'mysql2';
import cors from 'cors'; // Importa cors

const app = express();
const port = 3001;

app.use(cors()); 

app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear datos de formularios

try {
    const conexion = mysql.createConnection({
        host: 'localhost',
        database: 'moda',
        user: 'root',
        password: ''
    });

    conexion.connect(function(error) {
        if (error) {
            console.error('Error de conexión:', error);
            return;
        }
        console.log('Conexión exitosa');
    });

    app.get('/productos', (req, res) => {
        try {
            conexion.query('SELECT * FROM productos', function(error, results) {
                if (error) {
                    console.error('Error en la consulta:', error);
                    return res.status(500).json({ error: 'Error en la consulta' });
                }

                if (results.length === 0) {
                    return res.status(200).json({ message: 'No hay productos' });
                }

                res.json(results);
            });
        } catch (error) {
            console.error('Error en la ruta /productos:', error);
            res.status(500).json({ error: 'Error en la ruta /productos' });
        }
    });

    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });

} catch (error) {
    console.error('Error general:', error);
}

export default app;

