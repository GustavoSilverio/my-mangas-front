
export interface Manga {
    _id: string
    nome: string
    capitulos: Capitulo[]
}

interface Capitulo {
    nomeCapitulo: string
    paginas: string[]
}