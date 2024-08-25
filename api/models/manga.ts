export interface Manga {
    _id: string
    nome: string
    capitulos: Capitulo[]
}

export interface ValidateKeyRes {
    isValid: boolean
}

interface Capitulo {
    nomeCapitulo: string
    paginas: string[]
}