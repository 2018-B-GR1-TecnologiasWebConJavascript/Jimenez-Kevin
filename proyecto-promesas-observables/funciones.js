const fs = require('fs');

module.exports.escribirArchivo = (comic,nombreArchivo) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            nombreArchivo, comic,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ 
                        mesaje: "Ingresado correctamente",
                        comic
                    });
                }
            })
    })
}

module.exports.leerArchivo = (nombreArchivo) => {
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8',
            (err, misComics) => {
                if (err) {
                    reject({
                        existe: false
                    });
                } else {
                    resolve({
                        existe: true,
                        contenido: misComics
                    })
                }

            }
        )
    })
}
