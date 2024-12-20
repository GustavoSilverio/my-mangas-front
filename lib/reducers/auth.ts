import { api } from "@/api/services/axios"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface Auth {
	token: string
}

const getInitialToken = (): string => {
	if (typeof window !== "undefined") {
		return localStorage.getItem("token") || ""
	}
	return ""
}

const initialState: Auth = {
	token: getInitialToken(),
}

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, { payload }: PayloadAction<Auth>) => {
			api.defaults.headers.Authorization = `Bearer ${payload.token}`
			state.token = payload.token
		},
		logout(state) {
			state.token = ""
		},
	},
})

export const { setToken, logout } = slice.actions

export default slice.reducer

//getters
export const getAuth = (state: RootState) => state.auth
