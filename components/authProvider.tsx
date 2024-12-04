"use client"

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuth, logout, setToken } from "@/lib/reducers/auth";
import { useRouter } from "next/navigation";
import { isExpired } from "react-jwt";
import { useToast } from "@/hooks/use-toast";

export const AuthProvider = ({
    children
}: React.PropsWithChildren) => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const router = useRouter()

    const { token } = useSelector(getAuth)

    useEffect(() => {
        if (isExpired(token)) {
            localStorage.removeItem("token")
            dispatch(logout())

            router.push("/")
        } else {
            dispatch(setToken({
                token: token
            }))

            if (window.location.pathname === "/")
                router.push("/home")

            toast({ title: "Key valid, loging..." })
        }
    }, [dispatch, toast, token, router])

    return <> {children} </>
}