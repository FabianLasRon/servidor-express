import crypto from "crypto";


class ProductManager {


    constructor() {
        this.products = [];
    }

    create(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los parámetros son obligatorios");
        }

        const productExists = this.products.findIndex(
            (product) => product.code === code
        );

        if (productExists !== -1) {
            throw new Error("El código del producto ya está en uso");
        }

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: crypto.randomBytes(12).toString("hex"),
        };
        this.products.push(product);

    }

    read() {
        console.log(this.products);
        return this.products;
    }

    readOne(id) {
        const productExists = this.products.findIndex(
            (product) => product.id === id
        );

        if (productExists === -1) {
            throw new Error("Producto no encontrado");
        }

        const productoBuscadoPorId = this.products[productExists];
        console.log("--Producto encontrado:--", productoBuscadoPorId);
        return productoBuscadoPorId;
    }

    destroy(id) {
        if (!id) {
            throw new Error("Por favor ingresar un ID válido");
        }

        const productIndex = this.products.findIndex((p) => p.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }
        console.log(`Producto: "${this.products[productIndex].title}" eliminado`)
        this.products.splice(productIndex, 1);

    }
}



/*****
// Crear una instancia de ProductManager con el nombre 'manager'
const manager = new ProductManager();

// Instanciar dos productos usando todos los métodos
try {
    manager.create("Producto 1", "Descripción 1", 19.99, "thumb1.jpg", "001", 50);
    manager.create("Producto 2", "Descripción 2", 29.99, "thumb2.jpg", "002", 30);

    // Leer todos los productos
    const allProducts = manager.read();

    // Encontrar y mostrar información de un producto por su ID
    const productIdToFind = allProducts[0].id;

    // Eliminar un producto por su ID
    manager.destroy(productIdToFind);

} catch (error) {
    console.error(error.message);
}
******/