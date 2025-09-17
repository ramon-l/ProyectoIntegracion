**Configuraciones de backend**

1. Descargar el .zip o clonar el repositorio

2. Instalar dependencias con el comando \
`npm install`

3. En la raíz del proyecto backend crear manualmente un archivo .env y dentro del arhivo realiza lo siguiente:
* Ingresa la siguiente configuración de conexión al backend. [cambiar usuario y password por la conexión a tu backend] \
`DATABASE_URL="postgresql://usuario:password@localhost:5432/db_user"`
* Ingresar la siguiente configuración de clave secreta para cifrar las contraseñas \
`JWT_SECRET="reemplaza este contenido por tu clave secreta"`

4. Ejecutar migraciones de Prisma para crear tablas: \
`npx prisma migrate dev --name init`

5. Levantar el servidor: \
`npm run dev`

6. Ejecutar el siguiente insert, para generar los primeros datos de roles:
    ```
    INSERT INTO public."Roles" (nombre, descripcion)
    VALUES ('cliente2', 'es un cliente'), ('admin2', 'es un admin'); 
    ```

**Configuraciones de frontend**

1. Descargar el .zip o clonar el repositorio

2. Se recomienda utilizar el IDE `vscode` e instalar la extensión `liveServer`

3. Una vez instalado hacer click derecho sobre el archivo `index.html` ubicado en `src-> html -> index.html` y seleccionar la opción `Open with Live Server` para levantar el proyecto y probar las funcionalidades.

**Funcionalidades disponibles** 
* login \
POST http://localhost:3000/api/login
* crear, modificar, eliminar y obtener datos de una cuenta de usuario \
GET http://localhost:3000/api/usuarios/:id \
POST http://localhost:3000/api/usuarios \
PUT http://localhost:3000/api/usuarios/:id \
DELETE http://localhost:3000/api/usuarios/:id

* ver datos de enlace externo, clima en la sección de reservas \
GET http://localhost:3000/api/clima?ciudad=ASUNCION&fecha=2025-09-17