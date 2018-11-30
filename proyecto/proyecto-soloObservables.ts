const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
// preguntas
const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};

const preguntaPersonaje = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es tu id'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es tu nombre'
    },
    {
        type: 'input',
        name: 'poder',
        message: 'Cual es tu poder'
    },
];

const preguntaPersonajeBusquedaPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe el nombre del Personaje a buscar'
    }
];


const preguntaPersonajeNuevoNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe tu nuevo nombre'
    }
];
// leer archivo y crear
function inicialiarBDD() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {
                        fs.writeFile(
                            'bdd.json',
                            '{"personaje":[],"comics":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando'
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"personaje":[],"comics":[]}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );

}

function opcinonesMenu() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            return rxjs
                .from(
                    inquirer.prompt(preguntaMenu)
                )
                .pipe(
                    map(
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta
                            console.log(respuestaBDD, 'hahahahahah')
                            return respuestaBDD
                        }
                    )
                )
        })
}

function menuSeleccionado() {
    return mergeMap(
        (respuesta: RespuestaBDD) => {
            console.log('hahahaha', respuesta.opcionMenu.opcionMenu)
            const respuestaPregunta = respuesta.opcionMenu.opcionMenu
            switch (respuestaPregunta) {
                case 'Crear':
                    console.log(1)
                    return rxjs
                        .from(
                            inquirer.prompt(preguntaPersonaje)
                        )
                        .pipe(
                            map(
                                (personaje: Personaje) => {
                                    respuesta.personaje = personaje
                                    return respuesta
                                }
                            )
                        )
                case 'Buscar':
                    console.log(2)
                    break;
                case 'Actualizar':
                    console.log(3)
                    break;
                case 'Borrar':
                    console.log(4)
                    break;
            }
        }
    )
}

const ejecutarAcccion = () => {
    return map(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            console.log(respuestaBDD, 'siiii')
            switch (opcion) {
                case 'Crear':
                    const personaje = respuestaBDD.personaje
                    respuestaBDD.bdd.personaje.push(personaje)
                    return respuestaBDD
                case 'Actualizar':
                case 'Borrar':
                case 'Buscar':
            }
        }
    )
}

function guardarBaseDeDatos() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            console.log(respuestaBDD)
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}

function guardarBDD(bdd: BDD) {
    console.log(bdd)
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}


// funcion principal 

async function main() {
    const iniciarBDD$ = rxjs.from(inicialiarBDD())
    iniciarBDD$
        .pipe(
            opcinonesMenu(),
            menuSeleccionado(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        )
        .subscribe(bdd => {
            console.log(bdd)
        })
}


// 
main()

// interface
interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;

    indicePersonaje?: number;
    personaje?: Personaje;
    facultad?: Facultad;
}

interface BDD {
    personaje: Personaje[] | any;
    facultades: Facultad[] | any;
}


interface Personaje {
    id: number;
    nombre: string;
    poder: string;
    //idFacu: number;
}

interface Facultad {
    id: number;
    nombre: string;

}

interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar' | 'Agregar Facultad';
}

interface BuscarPersonajePorId {
    idPersonaje: string;
}
interface VerificarIdFacu {
    idFacu: number;
}