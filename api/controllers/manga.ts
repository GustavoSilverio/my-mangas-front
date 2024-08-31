import { useQuery } from "react-query"
import { Manga } from "../models/manga"
import { api } from "../services/axios"

export const useObterMangas = (
    query: string | null = null,
    enabled: boolean = true
) => {
    return useQuery<Manga[]>(
        ["mangas"],

        async () => {
            const { data } = await api.get(
                "/mangas",
                {
                    params: {
                        q: query
                    }
                }
            )
            return data as Manga[]
        },
        {
            enabled: enabled
        }
    )
}