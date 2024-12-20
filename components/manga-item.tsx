'use client'

import { MangaItemProps } from "@/types/manga-item"
import Image from "next/image"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

export const MangaItem = ({
    ...manga
}: MangaItemProps) => {

    return (
        <Link
            href={`/manga/${manga._id}`}
            className="flex flex-col items-center gap-2 w-full rounded-sm px-4 py-6 border border-slate-700 transition duration-300 hover:bg-slate-900"
        >
            <Image
                src={manga.imgCapa}
                alt="Imagem do primeiro capítulo do mangá"
                className="w-[142px] h-auto rounded-md"
                width={150}
                height={230}
            />

            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                        <h3
                            className="font-semibold w-full text-center"
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