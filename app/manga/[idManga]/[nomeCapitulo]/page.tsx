'use client'

import { useObterMangaPorId } from "@/api/controllers/manga";
import { Button } from "@/components/ui/button";
import { blurMangaDataURL, codificarString, decodificarString, obterCapituloSelecionado } from "@/lib/utils";
import { ChevronLeft, Menu, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page(
    { params }: { params: { idManga: string, nomeCapitulo: string } }
) {
    const router = useRouter()

    const {
        data: mangaSelecionado,
        isLoading,
    } = useObterMangaPorId(params.idManga)

    const {
        capituloAnterior,
        capituloSelecionado,
        capituloProximo
    } = obterCapituloSelecionado(mangaSelecionado, decodificarString(params.nomeCapitulo))

    return (
        <div className="flex justify-center max-w-[760px] mx-auto mt-4">
            {isLoading ? (
                <p>carregando...</p>
            ) : (
                mangaSelecionado && mangaSelecionado.capitulos && mangaSelecionado.nome ? (
                    <div className="flex flex-col items-start gap-4 w-full">
                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={() => router.push(`/manga/${mangaSelecionado._id}`)}
                                className="flex gap-1 w-min px-2 py-1"
                                variant="secondary"
                            >
                                <ChevronLeft />

                                voltar
                            </Button>

                            <h1
                                className="font-bold text-2xl"
                            >
                                {mangaSelecionado.nome} - {capituloSelecionado?.nomeCapitulo}
                            </h1>
                        </div>

                        <div className="w-full flex flex-col gap-5 p-3 rounded-md bg-slate-800">
                            {capituloSelecionado?.paginas.map((pagina) => {
                                return (
                                    <Image
                                        key={pagina}
                                        className="w-full h-auto"
                                        src={pagina}
                                        alt="Página do capítulo"
                                        width={859}
                                        height={1260}
                                        loading="lazy"
                                        blurDataURL={blurMangaDataURL}
                                        placeholder="blur"
                                        quality={100}
                                    />
                                )
                            })}
                        </div>

                        <div className="flex flex-col sm:flex-row w-full gap-4">
                            <Button
                                className="w-full flex gap-2"
                                variant="outline"
                                onClick={() => router.push(`/manga/${mangaSelecionado._id}/${codificarString(capituloAnterior as string)}`)}
                                disabled={!capituloAnterior}
                            >
                                <SkipBack className="w-4" />

                                Capítulo anterior
                            </Button>

                            <Button
                                className="w-full flex gap-2"
                                variant="outline"
                                onClick={() => router.push(`/manga/${mangaSelecionado._id}`)}
                            >
                                <Menu className="w-4" />

                                Todos os capítulos
                            </Button>

                            <Button
                                className="w-full flex gap-2"
                                variant="outline"
                                onClick={() => router.push(`/manga/${mangaSelecionado._id}/${codificarString(capituloProximo as string)}`)}
                                disabled={!capituloProximo}
                            >
                                Próximo capítulo

                                <SkipForward className="w-4" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <h1>Capítulo não encontrado!</h1>
                )
            )}
        </div>
    )
}