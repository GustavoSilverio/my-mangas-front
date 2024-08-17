import { Manga } from "@/api/models/manga"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const codificarString = (nomeManga: string) => {
	return encodeURIComponent(nomeManga.replace(/ /g, "-"))
}

export const decodificarString = (nomeManga: string) => {
	return decodeURIComponent(nomeManga.replace(/-/g, " "))
}

export const obterMangaSelecionado = (mangas: Manga[] | undefined, nomeManga: string) => {
	let mangaSelecionado = mangas?.find(m => m.nome === nomeManga)

	if (mangaSelecionado)
		mangaSelecionado.capitulos = mangaSelecionado?.capitulos.sort((a, b) => extrairNumeroCapitulo(a.nomeCapitulo) - extrairNumeroCapitulo(b.nomeCapitulo))


	return mangaSelecionado
}

export const obterCapituloSelecionado = (manga: Manga | undefined, capitulo: string) => {

	const indiceAtual = encontrarIndiceCapituloAtual(capitulo, manga?.capitulos.map(c => c.nomeCapitulo) as string[]);
	const { anterior, proximo } = obterCapitulosAdjacentes(indiceAtual, manga?.capitulos.map(c => c.nomeCapitulo) as string[]);

	return {
		capituloSelecionado: manga?.capitulos.find(c => c.nomeCapitulo === capitulo),
		capituloAnterior: anterior,
		capituloProximo: proximo,
	}
}

const extrairNumeroCapitulo = (capitulo: string) => {
	const regex = /Capítulo (\d+(\.\d+)?)/
	const match = capitulo.match(regex)
	return match ? parseFloat(match[1]) : 0
}

const encontrarIndiceCapituloAtual = (capituloAtual: string, listaCapitulos: string[] | undefined) => {
	if (!listaCapitulos) return 0
	return listaCapitulos.findIndex(capitulo => capitulo === capituloAtual);
}

const obterCapitulosAdjacentes = (indiceAtual: number, listaCapitulos: string[] | undefined) => {
	let anterior: string | undefined;
	let proximo: string | undefined;

	if (indiceAtual > 0) {
		anterior = listaCapitulos?.[indiceAtual - 1];
	}

	if (indiceAtual < (listaCapitulos ?? [])?.length - 1) {
		proximo = listaCapitulos?.[indiceAtual + 1];
	}

	return { anterior, proximo };
}