'use client'

import { queryClient } from "@/api/services/queryClient"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { Analytics } from "@vercel/analytics/react"
import { Provider } from 'react-redux'
import { store } from "@/lib/store"
import { AuthProvider } from "./authProvider"
import { Toaster } from "./ui/toaster"

export const Providers = ({
    children
}: React.PropsWithChildren) => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {children}
                    <Toaster />
                    <Analytics />

                    {process.env.NODE_ENV === "development" && (
                        <ReactQueryDevtools />
                    )}
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
    )
}