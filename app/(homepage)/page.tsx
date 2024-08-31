'use client'

import { useValidateKey } from "@/api/controllers/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { setToken } from "@/lib/reducers/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {

	const [key, setKey] = useState("");

	const { toast } = useToast()
	const dispatch = useDispatch()
	const router = useRouter()

	const {
		mutateAsync,
		data: validatedKey,
		isLoading: isValidatingKey,
		isSuccess: isValidatingKeySuccess
	} = useValidateKey()

	const validateKey = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await mutateAsync(key)
	}

	useEffect(() => {
		if (isValidatingKeySuccess && validatedKey.token) {
			toast({ title: "Key valid, loging..." })
			dispatch(setToken({
				token: validatedKey.token
			}))

			router.push("/home")
		}
		else
			toast({
				title: "Key not valid, try again!",
				variant: "destructive",
			})
	}, [isValidatingKeySuccess, validatedKey, dispatch, router, toast])

	return (
		<div className="flex justify-center items-center">
			<form
				className="flex flex-col gap-3"
				onSubmit={validateKey}
			>
				<Label htmlFor="key">
					Put your key
				</Label>

				<Input
					onChange={(e) => setKey(e.target.value)}
					value={key}
					disabled={isValidatingKey}
					name="key"
					placeholder="my key..."
				/>

				<Button
					type="submit"
					variant="secondary"
				>
					submit
				</Button>
			</form>
		</div>
	);
}
