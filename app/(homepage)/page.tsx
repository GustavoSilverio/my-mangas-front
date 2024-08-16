'use client'

import { useObterMangas } from "@/api/controllers/manga";
import { MangaItem } from "@/components/manga-item";

export default function Home() {

	const {
		data: mangas,
		isSuccess,
		isLoading
	} = useObterMangas()

	return (
		<div className="flex flex-wrap justify-center gap-8 mt-4">
			{isLoading ? (
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
			)}
		</div>
	);
}
