import { useQuery } from "react-query"
import { Manga } from "../models/manga"
import { api } from "../services/axios"

export const useObterResumoMangas = (
	query: string | null = null,
	enabled: boolean = true
) => {
	return useQuery<Manga[]>(
		["mangas"],

		async () => {
			const { data } = await api.get<Manga[]>("/mangas-summary", {
				params: {
					q: query,
				},
			})

			return data
		},
		{
			enabled: enabled,
		}
	)
}

export const useObterMangaPorId = (id: string) => {
	return useQuery<Manga>(
		["manga", id],

		async () => {
			const { data } = await api.get<Manga>(`/manga/${id}`)
			return data
		}
	)
}
