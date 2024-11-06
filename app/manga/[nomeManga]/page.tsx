'use client'

import { useObterMangas } from "@/api/controllers/manga";
import { Capitulo } from "@/api/models/manga";
import { Button } from "@/components/ui/button";
import { codificarString, decodificarString, obterMangaSelecionado } from "@/lib/utils";
import { ArrowDownAZ, ArrowUpAz } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function Page(
    { params }: { params: { nomeManga: string } }
) {

    const {
        data: mangas,
        isLoading
    } = useObterMangas()

    const [capitulos, setCapitulos] = useState<Capitulo[] | undefined>([]);
    const [order, setOrder] = useState<"asc" | "desc">("asc");

    const mangaSelecionado = useMemo(() => {
        const manga = obterMangaSelecionado(mangas, decodificarString(params.nomeManga))
        setCapitulos(manga?.capitulos)

        return manga
    }, [mangas, params.nomeManga])

    const handleReorderCapitulos = () => {
        setCapitulos(capitulos?.reverse())
        setOrder((old) => (old === "asc" ? "desc" : "asc"))
    }

    return (
        <div className="flex justify-center max-w-[760px] mx-auto mt-4">
            {isLoading ? (
                <p>carregando...</p>
            ) : (
                mangaSelecionado && capitulos && mangaSelecionado.nome ? (
                    <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
                        <Image
                            src={mangaSelecionado.imgCapa}
                            alt="Imagem da capa do mangá"
                            className="w-[142px] h-[207px] rounded-md"
                            width={150}
                            height={230}
                        />

                        <div className="flex flex-col gap-3 w-full">
                            <h1
                                className="font-bold text-lg"
                            >
                                {`Capítulos - ${mangaSelecionado.nome}`}
                            </h1>

                            <div className="flex gap-3">
                                <Button
                                    variant="secondary"
                                    onClick={handleReorderCapitulos}
                                >
                                    {order === "asc" ? (
                                        <ArrowDownAZ />
                                    ) : (
                                        <ArrowUpAz />
                                    )}
                                </Button>
                            </div>

                            <div className="flex">
                                <ul className="w-full flex flex-col sm:grid sm:grid-cols-3 md:grid-cols-4 gap-2 h-[calc(100dvh-183px)]">
                                    {capitulos.map((capitulo) => {
                                        return (
                                            <li
                                                key={capitulo.nomeCapitulo}
                                                className="flex items-center justify-center px-4 py-2 w-full rounded-md bg-slate-800"
                                            >
                                                <Link
                                                    href={`/manga/${codificarString(mangaSelecionado.nome as string)}/${codificarString(capitulo.nomeCapitulo)}`}
                                                    className="underline"
                                                >
                                                    {capitulo.nomeCapitulo}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>Manga não encontrado!</h1>
                )
            )}
        </div>
    )
}