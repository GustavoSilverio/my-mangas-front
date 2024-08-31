import Link from "next/link"

export const Header = () => {
    return (
        <header className="p-6 flex justify-center">
            <Link
                href="/home"
            >
                <h1 className="text-3xl font-bold">
                    My mangas 🥭
                </h1>
            </Link>
        </header>
    )
}