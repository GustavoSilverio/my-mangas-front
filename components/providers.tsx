'use client'

import { queryClient } from "@/api/services/queryClient"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from "./ui/toaster"

export const Providers = ({
    children
}: React.PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />

            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools />
            )}
        </QueryClientProvider>
    )
}