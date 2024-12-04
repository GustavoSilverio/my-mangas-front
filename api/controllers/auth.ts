import { useMutation } from "react-query"
import { api } from "../services/axios"
import { ValidateKeyRes } from "../models/auth"
import { CustomError } from "../models/custom-error"

export const useValidateKey = () => {
	return useMutation<ValidateKeyRes, CustomError, string>(async (key) => {
		const { data } = await api.post(
			`/validate`,
			{},
			{
				params: {
					key: key,
				},
			}
		)

		return data as ValidateKeyRes
	})
}
