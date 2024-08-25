import { useMutation, useQuery } from "react-query"
import { Manga, ValidateKeyRes } from "../models/manga"
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

export const useValidateKey = () => {
    return useMutation<ValidateKeyRes, undefined, string>(
        async (key) => {
            const { data } = await api.post(
                `/validate`,
                {

                },
                {
                    params: {
                        key: key,
                    }
                }
            )

            return data as ValidateKeyRes
        }
    )
}