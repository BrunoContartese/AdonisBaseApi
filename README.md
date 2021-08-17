# baseline rest api

### Instalación de paquetes necesarios

```
$ npm install
```

## Configuración de variables de entorno

En todas las configuraciónes se debe modificar el archivo `.env`. Si el archivo `.env` no se encuentra presente en la carpeta raíz, simplemente hacer una copia del archivo `.env.example` y renombrarla a `.env`.
Llenar el archivo con la información requerida.

### Base de datos

Para la conexión con la base de datos se deben establecer las siguiente variables:

```
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=db_user
MYSQL_PASSWORD=db_password
MYSQL_DB_NAME=adonisjs_db
```

### Configuración de email

Para el envío de email primero se deben establecer las siguientes variables:

```
SMTP_HOST=
SMTP_PORT=465
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_FROM_EMAIL="bruno.a.contartese@gmail.com"
```

## Cargar esquema de la base de datos

Para cargar todas las tablas y sus respectivos seeds se deben ejecutar los siguientes comandos:

```
$ node ace migration:run
$ node ace db:seed
```

## Vistas

Las vistas se encuentran en la carpeta `resources/views`.

### Vistas email

-   **Reset Password** : `emails/auth/reset_password.edge`


### Correr la aplicación localmente y hacer que observe los cambios
```
$ node ace serve --watch
```

### Tips
- **Archivo de rutas**: `start/routes`
- **Archivo de permisos**: `start/bouncer`
- **Carpeta de controladores**: `app/Controllers/Http`
- **Carpeta de servicios**: `app/Services`
- **Carpeta de validadores de requests**: `app/Validators`
- **Carpeta de middlewares**: `app/middlewares`
- **Carpeta de mailers**: `app/Mailers`
- **Carpeta de modelos**: `app/Models`
- **Carpeta de Policies**: `app/Policies`
- **Carpeta de migraciones**: `database/migrations`
- **Carpeta de seeders**: `database/seeders`

### Comandos utiles
```
$ node ace make:controller nombre_modulo/nombre_de_controlador
$ node ace make:migration nombre_modulo/nombre_de_migration
$ node ace make:seeder nombre_modulo/nombre_de_seeder
$ node ace make:validator nombre_modulo/nombre_de_validator
$ node ace make:view nombre_modulo/nombre_de_vista
$ node ace make:mailer nombre_modulo/nombre_de_mailer
```
```
$ node ace list:routes Devuelve una lista de las rutas declaradas en la aplicación
```

### Links de utilidad
[Página web oficial de AdonisJS](https://adonisjs.com/)