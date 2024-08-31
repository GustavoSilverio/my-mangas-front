import { useMutation } from "react-query"
import { api } from "../services/axios"
import { ValidateKeyRes } from "../models/auth"

export const useValidateKey = () => {
    return useMutation<ValidateKeyRes, undefined, string>(
        async (key) => {
            const { data } = await api.post(
                `/validate`,
                {},
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