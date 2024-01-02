import express from "express";
import ProductManager from './data/fs/files/products.fs.js';
import UserManager from './data/fs/files/users.fs.js';

const server = express();
const PORT = 8080;

server.listen(PORT, () => {
    console.log("estoy escuchando!");
})



server.get("/", (req, res) => {
    res.send("Home")
})



server.get("/api/products", async (req, res) => {
    try {
        const products = await productManager.read();

        if (products.length > 0) {
            res.json({
                success: true,
                response: products,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No se encontraron productos.",
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error al obtener productos.",
        });
    }
});

server.get("/api/users", async (req, res) => {
    try {
        const users = await userManager.read();

        if (users.length > 0) {
            res.json({
                success: true,
                response: users,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No se encontraron usuarios.",
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Error al obtener usuarios.",
        });
    }
});





server.get("/api/products/:pid", async (req, res) => {
    try {
        res.json({
            success: true,
            response: await productManager.readOne(req.params.pid)
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message || "not found!",
        });
    }
})

server.get("/api/users/:uid", async (req, res) => {
    try {
        res.json({
            success: true,
            response: await userManager.readOne(req.params.uid)
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message || "not found!",
        });
    }
})







const productManager = new ProductManager("./data/fs/files/productos.json");
const userManager = new UserManager("./data/fs/files/usuarios.json");



/*                                     ///lo comento por que si no nodemon no para de crearme productos y usuarios
(async () => {
    try {
        // Crear un producto
        await productManager.create(
            "Producto 1",
            "Descripción 1",
            10.99,
            "thumbnail1.jpg",
            "CODE1",
            100
        );

        // Crear un usuario
        await userManager.create("Juan", "foto1.jpg", "juan@example.com");
    } catch (err) {
        console.log(err);
    }
})()
*/