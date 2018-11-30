const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;

const tiposPokemon = []
const abilitiesPokemons = []
const movePokemons = []
const clasificacionPokemonsTipos = []
const clasificacionPokemonsMove = []
const valores: any = {}
const speedValores = []
const specialDefenseValores = []
let acum:any = 0

function inicialiarBDD() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'data.json',
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {
                        reject({
                            mensaje: 'esta mal leido'
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    )
};
const iniciarBDD$ = rxjs.from(inicialiarBDD())
async function main() {
    iniciarBDD$
        .subscribe(res => {
            res.bdd.forEach(element => {
                element.types.forEach(tipo => {
                    const typePokemon = {
                        tipo: tipo.type.name
                    }
                    tiposPokemon.push(typePokemon)

                })
            })
            // console.log(tiposPokemon)
        })

    iniciarBDD$
        .subscribe(res => {
            res.bdd.forEach(element => {
                element.abilities.forEach(abilidad => {
                    const abilidadPokeomes = {
                        nombre: abilidad.ability.name
                    }
                    abilitiesPokemons.push(abilidadPokeomes)
                })
            })
            // console.log(abilitiesPokemons)
        })

    iniciarBDD$
        .subscribe(res => {
            res.bdd.forEach(element => {
                // console.log(element.moves)
                element.moves.forEach(movimiento => {
                    //console.log(movimiento.move.name)
                    const movimientosPokeomes = {
                        nombre: movimiento.move.name
                    }
                    movePokemons.push(movimientosPokeomes)
                })
            })
            //console.log(abilitiesPokemons)
        })

    iniciarBDD$
        .subscribe(res => {
            res.bdd.forEach(element => {
                //console.log(element.name)
                element.types.forEach(tipo => {
                    // console.log(element.id)
                    const typePokemon = {
                        nombre: tipo.type.name,
                        pokemons: [
                            {
                                id: element.id,
                                nombre: element.name
                            }
                        ]
                    }
                    clasificacionPokemonsTipos.push(typePokemon)
                })
            })
            // console.log(clasificacionPokemonsTipos)
        })

    iniciarBDD$
        .subscribe(res => {
            res.bdd.forEach(element => {
                //console.log(element.name)
                element.moves.forEach(movimiento => {
                    //console.log(movimiento.move.name)                    
                    const movimientosPokeomes = {
                        nombre: movimiento.move.name,
                        pokemons: [
                            {
                                id: element.id,
                                nombre: element.name
                            }
                        ]
                    }
                    clasificacionPokemonsMove.push(movimientosPokeomes)
                })
            })
            // console.log(clasificacionPokemonsMove)
        })

    iniciarBDD$
        .subscribe(res => {
            const resultado: any = {}
            res.bdd.forEach(pokemon => {
                //console.log(pokemon.stats)
                pokemon.stats.map(valor => {
                    if (valor.stat.name === 'speed') {
                        const speedTotal = pokemon.stats.reduce((acum, valor) => {
                            acum += valor.base_stat
                            return acum
                        }, 0)
                        resultado.speedTotal = speedTotal
                    }
                    if (valor.stat.name === 'special-defense') {
                        const specialDefenseTotal = pokemon.stats.reduce((acum, valor) => {
                            acum += valor.base_stat
                            return acum
                        }, 0)
                        resultado.defenceTotal = specialDefenseTotal
                    }
                })

            })
            console.log(resultado)
        })

    // held_items
    iniciarBDD$
        .subscribe(res => {
            res.bdd.forEach(pokemon => {
                if (pokemon.held_items.length > 0) {
                    return 'si tiene'
                } else {
                    return 'no tiene'
                }

            })

        })

    iniciarBDD$
        .subscribe(res => {
            
            res.bdd.forEach(element => {
                element.abilities.forEach(abilidad => {
                    acum +=1
                    const abilidadPokeomes = {
                        nombre: abilidad.ability.name,
                        numeroPokemonUsanHabilidad: acum
                    }
                    console.log(abilidadPokeomes)
                })
            })
            console.log()
        })

}

function todosTieneHelpItem(valor) {
    return valor.lenth > 0
}

main()
