'use client'

import { useObterMangas } from "@/api/controllers/manga";
import { decodificarString, obterCapituloSelecionado, obterMangaSelecionado } from "@/lib/utils";
import Image from "next/image";

export default function Page(
    { params }: { params: { nomeManga: string, capitulo: string[] } }
) {

    const {
        data: mangas,
        isLoading
    } = useObterMangas()

    const mangaSelecionado = obterMangaSelecionado(mangas, decodificarString(params.nomeManga))
    const capituloSelecionado = obterCapituloSelecionado(mangaSelecionado, decodificarString(params.capitulo[0]))

    return (
        <div className="flex justify-center max-w-[760px] mx-auto mt-4">
            {isLoading ? (
                <p>carregando...</p>
            ) : (
                mangaSelecionado && mangaSelecionado.capitulos && mangaSelecionado.nome ? (
                    <div className="flex flex-col items-start gap-4 w-full">
                        <h1
                            className="font-bold text-2xl"
                        >
                            {mangaSelecionado.nome} - {capituloSelecionado?.nomeCapitulo}
                        </h1>

                        <div className="flex flex-col gap-5 p-3 rounded-md bg-slate-800">
                            {capituloSelecionado?.paginas.map((pagina) => {
                                return (
                                    <Image
                                        key={pagina}
                                        className="w-full h-auto"
                                        src={pagina}
                                        alt="Página do capítulo"
                                        width={859}
                                        height={1260}
                                    />
                                )
                            })}
                        </div>


                    </div>
                ) : (
                    <h1>Capítulo não encontrado!</h1>
                )
            )}
        </div>
    )
}