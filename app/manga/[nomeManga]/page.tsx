'use client'

import { useObterMangas } from "@/api/controllers/manga";
import { codificarString, decodificarString, obterMangaSelecionado } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Page(
    { params }: { params: { nomeManga: string } }
) {

    const {
        data: mangas,
        isLoading
    } = useObterMangas()

    const mangaSelecionado = obterMangaSelecionado(mangas, decodificarString(params.nomeManga))

    return (
        <div className="flex justify-center max-w-[760px] mx-auto mt-4">
            {isLoading ? (
                <p>carregando...</p>
            ) : (
                mangaSelecionado && mangaSelecionado.capitulos && mangaSelecionado.nome ? (
                    <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
                        <Image
                            src={mangaSelecionado.capitulos[0].paginas[0]}
                            alt="Imagem do primeiro capítulo do mangá"
                            className="w-[142px] h-[207px] rounded-md"
                            width={150}
                            height={230}
                        />

                        <div className="flex flex-col gap-3 w-full">
                            <h1
                                className="font-bold text-lg"
                            >
                                {decodificarString(params.nomeManga)}
                            </h1>

                            <div className="flex">
                                <ul className="w-full flex flex-col gap-[3px] overflow-y-auto h-[calc(100dvh-183px)]">
                                    {mangaSelecionado.capitulos.map((capitulo) => {
                                        return (
                                            <li
                                                key={capitulo.nomeCapitulo}
                                                className="px-4 py-2 rounded-md bg-slate-800"
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