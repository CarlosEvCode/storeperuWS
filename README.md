# Web Service con Express
## Instalación

1. Clonar el repositorio
2. Restaurar carpeta node_modules: **npm install**
3. Abrir la terminal CTRL + Ñ (VSCode)
4. Ejecutar node index.js
5. Verificar funcionalidad desde Postman, ThunderClient,etc

## Configuración de variables de entorno (.env)

1. Crear un archivo `.env` en la raíz del proyecto (al mismo nivel que `index.js`).
2. Puedes usar `.env.example` como base y copiar su contenido.
3. Completar estos datos:
   - `PORT`: puerto del servidor (ejemplo: `3000`)
   - `DB_HOST`: host de MySQL (ejemplo: `localhost`)
   - `DB_USER`: usuario de MySQL
   - `DB_PASSWORD`: clave de MySQL
   - `DB_NAME`: nombre de la base de datos (ejemplo: `storeperu`)
