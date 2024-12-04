import { AxiosError } from "axios"

export type CustomError = AxiosError<{
    detail: ErrorDetail
}>

interface ErrorDetail {
    message: string
    type: string
}