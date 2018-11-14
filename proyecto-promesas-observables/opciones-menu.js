module.exports.menuComicPrincipal = {
    name: 'opcionesMenu',
    type: 'list',
    message: 'Escoja una opción',
    choices: [
        'DC',
        'Marvel'
    ],
    default: 0
};
module.exports.menuComicSecundario = {
    name: 'opcionesMenuSecundario',
    type: 'list',
    message: 'Escoja una opción',
    choices: [
        'Ingresar Comic',
        'Listar Comic',
        'Eliminar Comic',
        'Modificar Comic',
    ],
    default: 0
};

module.exports.atributosComic = [
    {
        name: 'Nombre Comic',
        type: 'input',
        message: 'Ingresar el nombre del comic'
    },

    {
        type: 'input',
        name: 'Fecha Publicacion',
        message: 'Ingresar fecha de publicacion'
    },

    {
        type: 'input',
        name: 'Genero',
        message: 'Ingresar el genero'
    }
]
