'use client'

import { useObterResumoMangas } from "@/api/controllers/manga";
import { MangaItem } from "@/components/manga-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuth } from "@/lib/reducers/auth";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
    const [search, setSearch] = useState("");

    const { token } = useSelector(getAuth)
    const router = useRouter()

    const {
        data: obterMangasData,
        isSuccess,
        isLoading: isObtendoMangas,
        refetch
    } = useObterResumoMangas(
        search,
        !!token
    )

    const mangas = useMemo(() => {
        return obterMangasData
    }, [obterMangasData])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        refetch()
    }

    useEffect(() => {
        if (!token)
            router.push("/")
    }, [token, router])

    return (
        <div className="flex justify-center items-center">
            {
                isObtendoMangas ? (
                    <p>carregando...</p>
                ) : (
                    <div className="flex flex-col w-full justify-center items-center">
                        <div className="flex flex-col gap-2 max-w-80">
                            <form
                                onSubmit={handleSearch}
                                className="flex gap-2 relative"
                            >
                                <Input
                                    className="pr-[52px] placeholder:font-semibold placeholder:text-slate-400"
                                    name="search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                    placeholder="Search"
                                />

                                <Button
                                    className="absolute right-0 max-w-12"
                                    variant="secondary"
                                    type="submit"
                                >
                                    <Search
                                        className="w-[18px]"
                                    />
                                </Button>
                            </form>
                        </div>

                        {
                            isSuccess && mangas && mangas.length ? (
                                <div className="flex flex-col justify-center gap-8 md:grid md:grid-cols-3 lg:grid-cols-5 w-full mt-4">
                                    {
                                        mangas.map(manga => {
                                            return (
                                                <MangaItem
                                                    key={manga._id}
                                                    {...manga}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className="mt-2">
                                    sem mangas 😭
                                </p>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}