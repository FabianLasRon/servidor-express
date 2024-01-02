import crypto from "crypto";


class UserManager {



    constructor() {
        this.users = [];
    }

    create(name, photo, email, id) {
        if (!name || !photo || !email) {
            throw new Error("Todos los parámetros son obligatorios!");
        }

        const user = {
            name,
            photo,
            email,
            id: crypto.randomBytes(12).toString("hex"),
        }

        this.users.push(user);

    }

    read() {
        if (this.users.length === 0) {
            throw new Error("La lista de usuarios está vacía");
        }
        console.log("Lista de usuarios:");
        console.log(this.users);
        return this.users;
    }

    readOne(id) {
        const idFound = this.users.findIndex(
            (user) => user.id === id
        )

        if (idFound === -1) {
            throw new Error("El id no existe en la lista");
        }

        const usuarioBuscadoPorId = this.users[idFound];
        console.log("--usuario encontrado:--", usuarioBuscadoPorId);
        return usuarioBuscadoPorId;
    }

    destroy(id) {
        if (!id) {
            throw new Error("Por favor ingresar un ID válido");
        }

        const userIndex = this.users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            throw new Error("Usuario no encontrado");
        }
        console.log(`Usuario: "${this.users[userIndex].name}" eliminado`);
        this.users.splice(userIndex, 1);
    }
}

/***
// Crear una instancia de UserManager
const userManager = new UserManager();
// Instanciar dos usuarios usando todos los métodos
try {
    userManager.create("Usuario 1", "imagen1.jpg", "usuario1@example.com");
    console.log("Usuario 1 creado correctamente");

    userManager.create("Usuario 2", "imagen2.jpg", "usuario2@example.com");
    console.log("Usuario 2 creado correctamente");

    // Leer todos los usuarios
    const allUsers = userManager.read();

    // Encontrar y mostrar información de un usuario por su ID
    const userIdToFind = allUsers[0].id;
    userManager.readOne(userIdToFind);

    // Eliminar un usuario por su ID
    userManager.destroy(userIdToFind);

} catch (error) {
    console.error(error.message);
}
*/