export interface Manga {
	_id: string
	nome: string
	capitulos: Capitulo[]
	imgCapa: string
}

export interface Capitulo {
	nomeCapitulo: string
	paginas: string[]
}
