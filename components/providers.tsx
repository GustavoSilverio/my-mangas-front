'use client'

import { queryClient } from "@/api/services/queryClient"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { Analytics } from "@vercel/analytics/react"

export const Providers = ({
    children
}: React.PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Analytics />

            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools />
            )}
        </QueryClientProvider>
    )
}