import { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { Button } from "./ui/button"
import { Sun, Moon } from 'lucide-react'

function Header() {
    const [darkMode, setDarkMode] = useState(true)
    const navigate = useNavigate()

    return (
        <>
        <header className="flex justify-between w-full h-15 items-center px-8">
            <div className="header-left">
                <h1 className="text-3xl font-bold cursor-pointer" onClick={() => {
                    navigate('/')
                }}>ClearMeet</h1>
            </div>
            <div className="header-right flex items-center gap-4 max-sm:gap-2">
                <Button variant="ghost" className="border border-gray-400/50 cursor-pointer" onClick={() => {
                    setDarkMode(!darkMode)
                    document.body.classList.toggle('dark')
                }}>
                    {darkMode ? (
                        <Sun/>
                    ) : (
                        <Moon />
                    )}
                </Button>
                <Link to="/login"><Button variant="ghost" className="border max-sm:hidden border-gray-400/50 cursor-pointer">Iniciar sesión</Button></Link>
                <Link to="/register"><Button className="bg-black text-white cursor-pointer dark:bg-white dark:text-black">Registrarse</Button></Link>
            </div>
        </header>
        </>
    )
}

export default Header