import Home from '@/pages/Home'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useLocation, Outlet } from 'react-router'

function Layout() {
    const location = useLocation()
    const home = location.pathname === '/'

    return (
        <>
        <div className="main-container flex flex-col w-full min-h-dvh">
            <div className="header-container">
                <Header />
            </div>
            <div className="principal-container flex-1">
                {home ? (
                    <Home />
                ) : (
                    <Outlet />
                )}
            </div>
            <div className="footer-container">
                <Footer />
            </div>
        </div>
        </>
    )
}

export default Layout;