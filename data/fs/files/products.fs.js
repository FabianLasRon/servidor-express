
import fs from "fs";
import crypto from "crypto";

class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async create(name, description, price, thumbnail, code, quantity) {
        if (!name || !description || !price || !thumbnail || !code || !quantity) {
            throw new Error("Todos los parametros son obligatorios.");
        }

        const product = {
            name,
            description,
            price,
            thumbnail,
            code,
            quantity,
            id: crypto.randomBytes(12).toString("hex"),
        };

        // ver si un producto con el mismo codigo existe
        const existingProduct = this.products.find((p) => p.code === code);
        if (existingProduct) {
            throw new Error("A product with the same code already exists.");
        }

        this.products.push(product);

        //ver si el archivo JSON ya esta creado 
        try {
            let existingProducts = [];
            try {
                const existingData = await fs.promises.readFile(this.path, "utf-8");
                existingProducts = JSON.parse(existingData);
            } catch (readErr) {

            }

            existingProducts.push(product);

            const newData = JSON.stringify(existingProducts, null, 2);
            await fs.promises.writeFile(this.path, newData, "utf-8");

            return "Producto Agregado correctamente.";
        } catch (err) {
            throw err;
        }

    }

    async read() {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            if (contenido === "") {
                console.log("La lista de productos está vacía");
                return [];
            }
            const products = JSON.parse(contenido)
            console.log("Lista de productos:");
            console.log(JSON.stringify(products, null, 2));
            return products
        } catch (err) {
            console.log("Error al leer los productos");
        }

    }



    async readOne(id) {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(contenido);

            const product = products.find((p) => p.id === id);

            if (!product) {
                throw new Error(`Producto con ID ${id} no encontrado.`);
            }

            console.log("Producto encontrado:");
            console.log(JSON.stringify(product, null, 2));
            return product;
        } catch (err) {
            console.log(`Error al buscar el producto por ID ${id}`);
            throw err;
        }
    }

    async destroy(id) {
        try {
            const contenido = await fs.promises.readFile(this.path, 'utf-8');
            let products = JSON.parse(contenido);

            const index = products.findIndex((p) => p.id === id);

            if (index === -1) {
                throw new Error(`Producto con ID ${id} no encontrado.`);
            }

            // Elimina el producto de la lista
            const deletedProduct = products.splice(index, 1)[0];

            // Actualiza el archivo JSON
            const newData = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(this.path, newData, 'utf-8');

            console.log('Producto eliminado:');
            console.log(JSON.stringify(deletedProduct, null, 2));
            return deletedProduct;
        } catch (err) {
            console.log(`Error al destruir el producto con ID ${id}`);
            throw err;
        }
    }

}



export default ProductManager;


/*
const productManager = new ProductManager("./data/fs/files/productos.json");

(async () => {
    try {
        await productManager.create(
            "Producto 1",
            "Descripción 1",
            10.99,
            "thumbnail1.jpg",
            "CODE1",
            100
        );
        await productManager.create(
            "Producto 2",
            "Descripción 2",
            19.99,
            "thumbnail2.jpg",
            "CODE2",
            50
        );
    } catch (error) {
        console.error(error);
    }
})();

*/

