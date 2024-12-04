"use client"

import axios, { AxiosError } from "axios"
import { ValidateKeyRes } from "../models/auth"
import { decodeToken } from "react-jwt"
import { TokenPayload } from "@/types/auth"
import { store } from "@/lib/store"
import { logout, setToken } from "@/lib/reducers/auth"
import { CustomError } from "../models/custom-error"

let isRefreshing = false

let failedRequestsQueue: {
	onSuccess: (token: string) => void
	onFailure: (error: AxiosError) => void
}[] = []

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
})

api.interceptors.response.use(
	(response) => response,
	(error: CustomError) => {
		if (error.response?.status === 401) {
			if (
				error.response.data.detail.type === "token.expired" &&
				typeof window !== "undefined"
			) {
				const token = localStorage.getItem("token") as string

				const payload = decodeToken(token) as TokenPayload

				const originalConfig = error.config

				if (!isRefreshing) {
					isRefreshing = true
					api.post<ValidateKeyRes>(
						"/validate",
						{},
						{
							params: {
								key: payload.key,
							},
						}
					)
						.then(({ data }) => {
							const { isValid, token } = data

							if (!isValid || !token)
								return (window.location.href = "/")

							localStorage.setItem("token", token)

							store.dispatch(setToken({ token }))

							api.defaults.headers.Authorization = `Bearer ${token}`

							failedRequestsQueue.forEach((request) => {
								request.onSuccess(token)
							})
							failedRequestsQueue = []
						})
						.catch((err: unknown) => {
							failedRequestsQueue.forEach((request) => {
								request.onFailure(err as AxiosError)
							})
							failedRequestsQueue = []
							store.dispatch(logout())
						})
						.finally(() => {
							isRefreshing = false
						})
				}

				return new Promise((resolve, reject) => {
					failedRequestsQueue.push({
						onSuccess: (token: string) => {
							if (!originalConfig) return
							originalConfig.headers.Authorization = `Bearer ${token}`

							resolve(api(originalConfig))
						},
						onFailure: (error: AxiosError) => {
							reject(error)
						},
					})
				})
			}
		}

		return Promise.reject(error)
	}
)
