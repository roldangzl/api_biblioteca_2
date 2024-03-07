const express = require("express");
const router = express.Router();

const { getAllLibros, getLibroById, createLibro, updateLibro, deleteLibro} = require("../controllers/libroController");

// Datos de ejemplo para simular una base de datos de usuarios
let users = [
    { id: 1, name: 'Usuario 1' },
    { id: 2, name: 'Usuario 2' },
    { id: 3, name: 'Usuario 3' }
  ];

// Importamos la libreria para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");

// Ruta para obtener todos los libros
router.get("/", requiredScopes("read:libros"), getAllLibros);

// Ruta para obtener un libro por id
router.get("/:id", requiredScopes("read:libros"), getLibroById);

// Ruta para crear un nuevo Libro
router.post("/", requiredScopes("write:libros"), createLibro);

// Ruta para actualizar un Libro existente
router.put("/:id", requiredScopes("write:libros"), updateLibro);

// Ruta para eliminar un Libro
router.delete("/:id", requiredScopes("write:libros"), deleteLibro);

// Ruta para obtener la lista completa de usuarios
router.get('/', (req, res) => {
    res.json(users);
  });
  
// Ruta para obtener los detalles de un usuario específico por su ID
router.get('/:id', (req, res) => {
const id = parseInt(req.params.id);
const user = users.find(user => user.id === id);
if (user) {
    res.json(user);
} else {
    res.status(404).json({ message: 'Usuario no encontrado' });
}
});

// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
const newUser = req.body;
users.push(newUser);
res.status(201).json(newUser);
});

// Ruta para actualizar la información de un usuario específico por su ID
router.put('/:id', (req, res) => {
const id = parseInt(req.params.id);
const updateUser = req.body;
users = users.map(user => (user.id === id ? { ...user, ...updateUser } : user));
res.json(users.find(user => user.id === id));
});

// Ruta para eliminar un usuario específico por su ID
router.delete('/:id', (req, res) => {
const id = parseInt(req.params.id);
users = users.filter(user => user.id !== id);
res.status(204).send();
});


module.exports = router;

