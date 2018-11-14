declare var require;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const opcionesMenu = require('./opciones-menu')
const funciones = require('./funciones')
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
                                        // const leerArchivo$ = rxjs.from(funciones.leerArchivo())
                                        // leerArchivo$.subscribe(respuesta => {
                                        //     console.log(respuesta)
                                        // if (respuesta.existe) {
                                        const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(JSON.stringify(comic), "DC.txt"))
                                        escribirArchivo$.subscribe(respuesta => {
                                            console.log(respuesta)
                                        })
                                        // }
                                        // else {
                                        //     misComics.push(respuesta)
                                        //     const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(misComics))
                                        //     escribirArchivo$.subscribe(respuesta => {
                                        //         console.log(respuesta)
                                        //     })
                                        // }
                                        // })
                                    })
                                break;
                            case 'Listar Comic':
                                const leerArchivo$ = rxjs.from(funciones.leerArchivo("DC.txt"))
                                leerArchivo$.subscribe(respuesta => {
                                    const nombreComic = JSON.parse(respuesta.contenido)["Nombre Comic"]
                                    const fechaPublicacion = JSON.parse(respuesta.contenido)["Fecha Publicacion"]
                                    const genero = JSON.parse(respuesta.contenido)["Genero"]
                                    console.log(`Nombre Comic: ${nombreComic}, Genero Comic: ${genero}, Fecha de publicacion: ${fechaPublicacion}`)
                                })
                                break;
                            case 'Modificar Comic':
                                break;
                            case 'Eliminar Comic':
                                break;
                        }
                    })
                break;
            case 'Marvel':
                inquirer.prompt([opcionesMenu.menuComicSecundario])
                    .then(opcion => {
                        switch (opcion.opcionesMenuSecundario) {
                            case 'Ingresar Comic':
                                inquirer.prompt(opcionesMenu.atributosComic)
                                    .then(comic => {
                                        // const leerArchivo$ = rxjs.from(funciones.leerArchivo())
                                        // leerArchivo$.subscribe(respuesta => {
                                        //     console.log(respuesta)
                                        // if (respuesta.existe) {
                                        const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(JSON.stringify(comic), "Marvel.txt"))
                                        escribirArchivo$.subscribe(respuesta => {
                                            console.log(respuesta)
                                        })
                                        //}
                                        // else {
                                        //     //misComics.push(respuesta)
                                        //     const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(misComics))
                                        //     escribirArchivo$.subscribe(respuesta => {
                                        //         console.log(respuesta)
                                        //     })
                                        // }
                                        // })
                                    })
                                break;
                            case 'Listar Comic':
                                const leerArchivo$ = rxjs.from(funciones.leerArchivo("Marvel.txt"))
                                leerArchivo$.subscribe(respuesta => {
                                    const nombreComic = JSON.parse(respuesta.contenido)["Nombre Comic"]
                                    const fechaPublicacion = JSON.parse(respuesta.contenido)["Fecha Publicacion"]
                                    const genero = JSON.parse(respuesta.contenido)["Genero"]
                                    console.log(`Nombre Comic: ${nombreComic}, Genero Comic: ${genero}, Fecha de publicacion: ${fechaPublicacion}`)
                                })
                                break;
                            case 'Modificar Comic':
                                break;
                            case 'Eliminar Comic':
                                break;
                        }
                    })
                break;
        }
    })
