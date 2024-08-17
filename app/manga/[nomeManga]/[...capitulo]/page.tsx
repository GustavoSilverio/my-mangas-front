'use client'

import { useObterMangas } from "@/api/controllers/manga";
import { Button } from "@/components/ui/button";
import { codificarString, decodificarString, obterCapituloSelecionado, obterMangaSelecionado } from "@/lib/utils";
import { Menu, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page(
    { params }: { params: { nomeManga: string, capitulo: string[] } }
) {

    const {
        data: mangas,
        isLoading
    } = useObterMangas()

    const router = useRouter()

    const mangaSelecionado = obterMangaSelecionado(mangas, decodificarString(params.nomeManga))
    const {
        capituloAnterior,
        capituloSelecionado,
        capituloProximo
    } = obterCapituloSelecionado(mangaSelecionado, decodificarString(params.capitulo[0]))

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
                                    />
                                )
                            })}
                        </div>

                        <div className="flex w-full gap-4">
                            <Button
                                className="w-full flex gap-2"
                                variant="outline"
                                onClick={() => router.push(`/manga/${codificarString(mangaSelecionado.nome)}/${codificarString(capituloAnterior as string)}`)}
                                disabled={!capituloAnterior}
                            >
                                <SkipBack className="w-4" />

                                Capítulo anterior
                            </Button>

                            <Button
                                className="w-full flex gap-2"
                                variant="outline"
                                onClick={() => router.push(`/manga/${codificarString(mangaSelecionado.nome)}`)}
                            >
                                <Menu className="w-4" />

                                Todos os capítulos
                            </Button>

                            <Button
                                className="w-full flex gap-2"
                                variant="outline"
                                onClick={() => router.push(`/manga/${codificarString(mangaSelecionado.nome)}/${codificarString(capituloProximo as string)}`)}
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