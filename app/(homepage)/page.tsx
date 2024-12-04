'use client'

import { useValidateKey } from "@/api/controllers/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setToken } from "@/lib/reducers/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
	const [key, setKey] = useState("");

	const { toast } = useToast()
	const dispatch = useDispatch()
	const router = useRouter()

	const {
		mutateAsync: validateKey,
		data: validatedKey,
		isLoading: isValidatingKey,
		isSuccess: isValidatingKeySuccess,
		isError: isValidatingKeyError,
		error: validatedKeyError
	} = useValidateKey()

	const handleValidateKey = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await validateKey(key)
	}

	useEffect(() => {
		if (isValidatingKeySuccess && validatedKey.token) {
			toast({ title: "Key valid, loging..." })

			localStorage.setItem("token", validatedKey.token)
			dispatch(setToken({
				token: validatedKey.token
			}))

			router.push("/home")
		}
	}, [isValidatingKeySuccess, validatedKey, dispatch, router, toast])

	useEffect(() => {
		if (isValidatingKeyError && validatedKeyError.response?.data.detail.type === "key.not-valid")
			toast({
				title: "Key not valid, try again!",
				variant: "destructive",
			})
	}, [isValidatingKeyError, toast, validatedKeyError])

	return (
		<div className="flex justify-center items-center">
			<form
				className="flex flex-col gap-3"
				onSubmit={handleValidateKey}
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
