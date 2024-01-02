import fs from "fs";
import crypto from "crypto";

class UserManager {
    constructor(path) {
        this.users = [];
        this.path = path;
    }

    async create(name, photo, email) {
        if (!name || !photo || !email) {
            throw new Error("Todos los parametros son obligatorios.");
        }

        const user = {
            name,
            photo,
            email,
            id: crypto.randomBytes(12).toString("hex"),
        };

        // Verificar si un usuario con el mismo correo electrónico ya existe
        const existingUser = this.users.find((u) => u.email === email);
        if (existingUser) {
            throw new Error("A user with the same email already exists.");
        }

        this.users.push(user);

        // Verificar si el archivo JSON ya está creado
        try {
            let existingUsers = [];
            try {
                const existingData = await fs.promises.readFile(this.path, "utf-8");
                existingUsers = JSON.parse(existingData);
            } catch (readErr) {
            }

            existingUsers.push(user);

            const newData = JSON.stringify(existingUsers, null, 2);
            await fs.promises.writeFile(this.path, newData, "utf-8");

            return "Usuario agregado correctamente.";
        } catch (err) {
            throw err;
        }
    }

    async read() {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            if (contenido === "") {
                console.log("La lista de usuarios está vacía");
                return [];
            }
            const users = JSON.parse(contenido);
            console.log("Lista de usuarios:");
            console.log(JSON.stringify(users, null, 2));
            return users;
        } catch (err) {
            console.log("Error al leer los usuarios");
        }
    }

    async readOne(id) {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            const users = JSON.parse(contenido);

            const user = users.find((u) => u.id === id);

            if (!user) {
                throw new Error(`Usuario con ID ${id} no encontrado.`);
            }

            console.log("Usuario encontrado:");
            console.log(JSON.stringify(user, null, 2));
            return user;
        } catch (err) {
            console.log(`Error al buscar el usuario por ID ${id}`);
            throw err;
        }
    }

    async destroy(id) {
        try {
            const contenido = await fs.promises.readFile(this.path, 'utf-8');
            let users = JSON.parse(contenido);

            const index = users.findIndex((u) => u.id === id);

            if (index === -1) {
                throw new Error(`Usuario con ID ${id} no encontrado.`);
            }

            // Elimina el usuario de la lista
            const deletedUser = users.splice(index, 1)[0];

            // Actualiza el archivo JSON
            const newData = JSON.stringify(users, null, 2);
            await fs.promises.writeFile(this.path, newData, 'utf-8');

            console.log('Usuario eliminado:');
            console.log(JSON.stringify(deletedUser, null, 2));
            return deletedUser;
        } catch (err) {
            console.log(`Error al destruir el usuario con ID ${id}`);
            throw err;
        }
    }
}


export default UserManager;


/*
const userManager = new UserManager("./data/fs/files/usuarios.json");

try {
    await userManager.create("Juan", "foto1.jpg", "juan@example.com");
    await userManager.create("Maria", "foto2.jpg", "maria@example.com");
} catch (err) {
    console.log("Error al crear los usuarios:", err);
}
*/