'use client'

import { useObterMangas, useValidateKey } from "@/api/controllers/manga";
import { MangaItem } from "@/components/manga-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useMemo, useState } from "react";

export default function Home() {

	const [key, setKey] = useState("");

	const { toast } = useToast()

	const {
		data: mangas,
		isSuccess,
		isLoading: isObtendoMangas,
	} = useObterMangas()

	const {
		mutateAsync,
		data,
		isLoading: isValidatingKey
	} = useValidateKey()

	const isValid = useMemo(() => {
		return data?.isValid || false
	}, [data?.isValid])

	const fetch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await mutateAsync(key)
	}

	useEffect(() => {
		if (data?.isValid)
			toast({ title: "Key valid, loging..." })
		else
			toast({
				title: "Key not valid, try again!",
				variant: "destructive",
			})
	}, [data?.isValid, toast])

	return (
		<div className="flex flex-wrap justify-center gap-8 mt-4">
			{isValid ? (
				isObtendoMangas ? (
					<p>carregando...</p>
				) : (
					isSuccess && mangas && mangas.length ? (
						mangas.map(manga => {
							return (
								<MangaItem
									key={manga._id}
									{...manga}
								/>
							)
						})
					) : (
						<p>sem mangas 😭</p>
					)
				)
			) : (
				<>
					<form
						className="flex flex-col gap-3"
						onSubmit={fetch}
					>
						<Label htmlFor="key">
							Put your key
						</Label>

						<Input
							onChange={(e) => setKey(e.target.value)}
							value={key}
							disabled={isValidatingKey}
							name="key"
						/>

						<Button
							type="submit"
							variant="secondary"
						>
							submit
						</Button>
					</form>
				</>
			)}
		</div>
	);
}
