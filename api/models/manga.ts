export interface Manga {
	_id: string
	nome: string
	capitulos: Capitulo[]
	imgCapa: string
}

interface Capitulo {
	nomeCapitulo: string
	paginas: string[]
}
