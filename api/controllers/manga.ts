import { useQuery } from "react-query"
import { Manga } from "../models/manga"
import { api } from "../services/axios"

export const useObterMangas = () => {
    return useQuery<Manga[]>(
        ["mangas"],

        async () => {
            const { data } = await api.get("/mangas")
            return data as Manga[]
        }
    )
}