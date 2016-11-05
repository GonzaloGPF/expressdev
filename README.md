# ExpressDev

ExpressDev es un proyecto creado a modo de Tutorial con la intención de enseñar a construir una Aplicación Web con ExpressJS y MongoDB. Algunos de los puntos tratados son:

  - Organización y estructuración de archivos front-end, back-end y de BBDD.
  - Uso de ExpressJS para servir peticiones de Cliente.
  - Integración de MongoDB con Mongoose.
  - Motor de plantillas Pug.
  - Desarrollo de Tareas Gulp.
  - Sistema de Login y Registro de Usuarios con Passport y Express-Session.
  - Estilos con Sass.
  - Desarrollo Javascript usando ES6.
  - Y más!

## Autor
Todo este contenido ha sido producido por Gonzalo Pabón para [ZaloSpace](http://zalospace.com).

## Licencia
Todo el proyecto se encuentra bajo una licencia MIT.

## Requisitos
- Node y Npm.
- MongoDB.
- Gulp.

## Instalación
Una vez clonado el repositorio, lo único que hay que hacer es:

```
$ npm install
$ gulp
```

## Iniciar Servidor
Para iniciar el Servidor:

- Crear un archivo **.env** usando como plantilla el **.env.example**
- Editar el archivo **.env** con los valores correspondientes del entorno.
- Lanzar la aplicación con:

```
$ gulp nodemon
```
Se iniciará un servidor Node en localhost:3000
- **Nota:** Será necesario tener una instancia de **MongoDB** en ejecución.

