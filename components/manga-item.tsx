'use client'

import { codificarString } from "@/lib/utils"
import { MangaItemProps } from "@/types/manga-item"
import Image from "next/image"
import Link from "next/link"

export const MangaItem = ({
    ...manga
}: MangaItemProps) => {

    return (
        <Link
            href={`/manga/${codificarString(manga.nome)}`}
            className="flex flex-col gap-2 max-w-44 rounded-sm px-4 py-6 border border-slate-700"
        >
            <Image
                src={manga.capitulos[0].paginas[0]}
                alt="Imagem do primeiro capítulo do mangá"
                className="w-[142px] h-[207px] rounded-md"
                width={150}
                height={230}
            />

            <h3
                className="font-semibold truncate"
            >
                {manga.nome}
            </h3>
        </Link>
    )
}