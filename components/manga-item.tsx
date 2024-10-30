'use client'

import { codificarString } from "@/lib/utils"
import { MangaItemProps } from "@/types/manga-item"
import Image from "next/image"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

export const MangaItem = ({
    ...manga
}: MangaItemProps) => {

    return (
        <Link
            href={`/manga/${codificarString(manga.nome)}`}
            className="flex flex-col gap-2 max-w-44 rounded-sm px-4 py-6 border border-slate-700 transition duration-300 hover:bg-slate-900"
        >
            <Image
                src={manga.imgCapa}
                alt="Imagem do primeiro capítulo do mangá"
                className="w-[142px] h-[207px] rounded-md"
                width={150}
                height={230}
            />

            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                        <h3
                            className="font-semibold truncate"
                        >
                            {manga.nome}
                        </h3>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>{manga.nome}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Link>
    )
}