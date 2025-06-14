import { Link } from 'react-router'

function Footer() {
    return (
        <>
        <footer className="flex max-sm:text-xs h-10 w-full justify-between px-8 text-neutral-400 text-sm items-center">
            <p className="max-sm:w-[30ch]">&copy; 2025 ClearMeet. Todos los derechos reservados.</p>
            <div className="flex gap-4">
                <Link to="/about-us" className="hover:underline text-center">Nosotros</Link>
                <Link to="/about" className="hover:underline text-center">Acerca de</Link>
                <Link to="/" className="hover:underline text-center">Términos</Link>
            </div>
        </footer>
        </>
    )
}

export default Footer