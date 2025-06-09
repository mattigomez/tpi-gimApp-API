
# GimApp API - Backend

GimApp API es el backend para la gestión de socios, rutinas, ejercicios y usuarios de un gimnasio. Provee endpoints REST para la administración y consulta de datos desde el frontend.

## Tecnologías

- **Backend:** Node.js, Express, Sequelize, SQLite
- **Autenticación:** JWT
- **Encriptación:** bcrypt

## Instalación

1. **Clonar el repositorio**

```sh
git clone https://github.com/mattigomez/tpi-gimApp-api.git
```


2. **Instalar dependencias**

```sh
npm install
```

4. **Iniciar la API**

```sh
npm start
```


## Estructura del proyecto (Backend)

```
src/
│   index.js
│   db.js
│
├── model/
│   User.js
│   Routine.js
│   Exercise.js
│   associations.js
│
├── services/
│   user.service.js
│   routine.service.js
│   exercise.service.js
│
├── routes/
│   user.routes.js
│   routine.routes.js
│   exercise.routes.js
│
└── utils/
    validations.js
```

## Endpoints principales

- **Usuarios:**  
  - `POST /partners` - Crear usuario (socio/profesor/admin)
  - `POST /login` - Login de usuario
  - `GET /partners` - Listar usuarios
  - `GET /partners/:id` - Obtener usuario por ID
  - `PUT /partners/:id` - Actualizar usuario
  - `DELETE /partners/:id` - Eliminar usuario

- **Rutinas:**  
  - `POST /routines` - Crear rutina
  - `GET /routines` - Listar rutinas
  - `GET /routines/:id` - Obtener rutina por ID
  - `PUT /routines/:id` - Actualizar rutina
  - `DELETE /routines/:id` - Eliminar rutina

- **Ejercicios:**  
  - `POST /exercises` - Crear ejercicio
  - `GET /exercises` - Listar ejercicios
  - `GET /exercises/:id` - Obtener ejercicio por ID
  - `PUT /exercises/:id` - Actualizar ejercicio
  - `DELETE /exercises/:id` - Eliminar ejercicio


## Integrantes

- Matias Gomez
- Juan Manuel Lantermo
- Juan Pablo Fernandez
- Santiago Oller
