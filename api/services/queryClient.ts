import { QueryClient } from "react-query"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 600000, // 10 min
		},
	},
})
