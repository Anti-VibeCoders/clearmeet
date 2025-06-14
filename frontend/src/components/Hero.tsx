import { Link } from 'react-router'
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

function Hero() {
    return (
        <>
            <div className="hero-container max-sm:px-4">
                <h2 className="text-6xl font-bold text-center leading-normal hero-title max-md:text-4xl max-sm:text-3xl">Analiza tus reuniones con IA</h2>
                <p className="max-w-[70ch] mx-auto text-center text-neutral-400 text-xl max-md:text-[16px] max-sm:text-sm">Obtén insights valiosos de tus reuniones. Analiza sentimientos, puntos clave y momentos importantes con inteligencia artificial.</p>
                <div className="buttons flex justify-center items-center mt-4 gap-4">
                    <Link to="/upload"><Button className="text-white bg-black stroke-black dark:text-black cursor-pointer dark:bg-white dark:stroke-white">Comenzar Ahora <ArrowRight /></Button></Link>
                </div>
            </div>
        </>
    )
}

export default Hero