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
	return mangas?.find(m => m.nome === nomeManga)
}

export const obterCapituloSelecionado = (manga: Manga | undefined, capitulo: string) => {
	return manga?.capitulos.find(c => c.nomeCapitulo === capitulo)
}