import Hero from '@/components/Hero'

function Home() {
    return (
        <>
        <div className="home-container flex flex-col w-full h-full items-center">
            <div className="hero w-full h-[85dvh] flex flex-col items-center justify-center">
                <Hero />
            </div>
        </div>
        </>
    )
}

export default Home