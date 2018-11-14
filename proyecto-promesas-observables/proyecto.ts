declare var require;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const opcionesMenu = require('./opciones-menu')
const funciones = require('./funciones')
const leerArchivo$ = rxjs.from(funciones.leerArchivo("DC"))
const leerArchivoMarvel$ = rxjs.from(funciones.leerArchivo("Marvel"))
let misComics = []
inquirer.prompt([opcionesMenu.menuComicPrincipal])
    .then(respuesta => {
        switch (respuesta.opcionesMenu) {
            case 'DC':
                inquirer.prompt([opcionesMenu.menuComicSecundario])
                    .then(opcion => {
                        switch (opcion.opcionesMenuSecundario) {
                            case 'Ingresar Comic':
                                inquirer.prompt(opcionesMenu.atributosComic)
                                    .then(comic => {
                                        const leerYEscribirArchivo$ = rxjs.from(funciones.leerYEscribir(JSON.stringify(comic), "DC"))
                                        leerYEscribirArchivo$
                                            .subscribe(respuesta => {
                                                console.log(respuesta)
                                            })
                                    })
                                break;
                            case 'Listar Comic':
                                leerArchivo$.subscribe(respuesta => {
                                    misComics = respuesta.contenido.split('-')
                                    misComics.forEach(value => {
                                        const nombreComic = JSON.parse(value)["Nombre Comic"]
                                        const fechaPublicacion = JSON.parse(value)["Fecha Publicacion"]
                                        const genero = JSON.parse(value)["Genero"]
                                        console.log(`Nombre Comic: ${nombreComic}, Genero Comic: ${genero}, Fecha de publicacion: ${fechaPublicacion}`)
                                    })
                                })
                                break;
                            case 'Modificar Comic':
                                inquirer.prompt(opcionesMenu.buscarComicNombre)
                                    .then(comic => {
                                        console.log(comic)
                                        leerArchivo$.subscribe(respuesta => {
                                            misComics = respuesta.contenido.split('-');
                                            const comics = misComics.map(miComic => {
                                                return JSON.parse(miComic)
                                            })
                                            console.log(comics)
                                        })
                                    })
                                break;
                            case 'Eliminar Comic':
                                inquirer.prompt(opcionesMenu.buscarComicNombre)
                                    .then(comic => {
                                        console.log(comic)
                                        leerArchivo$.subscribe(respuesta => {
                                            misComics = respuesta.contenido.split('-');
                                            // borrar archivo 
                                            fs.unlink('./DC', (err) => {                                                
                                                const comics = misComics.map(miComic => {
                                                    return JSON.parse(miComic)
                                                })
                                                comics.forEach((miComic, index) => {
                                                    const existeComic = miComic["Nombre Comic"] == comic["Nombre Comic"]
                                                    if (existeComic) {
                                                        const comicEliminado = comics.splice(index, 1)
                                                        return comicEliminado
                                                    }
                                                })
                                                comics.forEach(value => {
                                                    const leerYEscribirArchivo$ = rxjs.from(funciones.leerYEscribir(JSON.stringify(value), 'DC'))
                                                    leerYEscribirArchivo$
                                                        .subscribe(respuesta => {
                                                            
                                                        })
                                                })
                                            })

                                        });
                                    })
                                break;
                        }
                    })
                break;

            case 'Marvel':
                // inquirer.prompt([opcionesMenu.menuComicSecundario])
                //     .then(opcion => {
                //         switch (opcion.opcionesMenuSecundario) {
                //             case 'Ingresar Comic':
                //                 inquirer.prompt(opcionesMenu.atributosComic)
                //                     .then(comic => {
                //                         const leerYEscribirArchivo$ = rxjs.from(funciones.leerYEscribir(JSON.stringify(comic), "Marvel"))
                //                         leerYEscribirArchivo$
                //                             .subscribe(respuesta => {
                //                                 console.log(respuesta)
                //                             })
                //                     })
                //                 break;
                //             case 'Listar Comic':
                //                 leerArchivoMarvel$.subscribe(respuesta => {
                //                     misComics = respuesta.contenido.split('-')
                //                     misComics.forEach(value => {
                //                         const nombreComic = JSON.parse(value)["Nombre Comic"]
                //                         const fechaPublicacion = JSON.parse(value)["Fecha Publicacion"]
                //                         const genero = JSON.parse(value)["Genero"]
                //                         console.log(`Nombre Comic: ${nombreComic}, Genero Comic: ${genero}, Fecha de publicacion: ${fechaPublicacion}`)
                //                     })
                //                 })
                //                 break;
                //             case 'Modificar Comic':
                //                 inquirer.prompt(opcionesMenu.buscarComicNombre)
                //                     .then(comic => {
                //                         console.log(comic)
                //                         leerArchivoMarvel$.subscribe(respuesta => {
                //                             misComics = respuesta.contenido.split('-');
                //                             const comics = misComics.map(miComic => {
                //                                 return JSON.parse(miComic)
                //                             })
                //                             console.log(comics)
                //                         })
                //                     })
                //                 break;
                //             case 'Eliminar Comic':
                //                 inquirer.prompt(opcionesMenu.buscarComicNombre)
                //                     .then(comic => {
                //                         console.log(comic)
                //                         leerArchivoMarvel$.subscribe(respuesta => {
                //                             misComics = respuesta.contenido.split('-');
                //                             const comics = misComics.map(miComic => {
                //                                 return JSON.parse(miComic)
                //                             })
                //                             comics.forEach((miComic, index) => {
                //                                 const existeComic = miComic["Nombre Comic"] == comic["Nombre Comic"]
                //                                 if (existeComic) {
                //                                     const comicEliminado = comics.splice(index, 1)
                //                                     return comicEliminado
                //                                 }
                //                             })
                //                             comics.forEach(value => {
                //                                 const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(JSON.stringify(value), "Marvel"))
                //                                 escribirArchivo$.subscribe(respuesta => {
                //                                     console.log(respuesta)
                //                                 })
                //                             })
                //                         })
                //                     })
                //                 break;
                //         }
                //     })
                break;
        }
    })
