import { motion } from "framer-motion"
import { Github, Linkedin, FileText, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

function Contact() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    }

    return (
        <div className="min-h-[100dvh] flex flex-col">
            <motion.div className="flex-1 overflow-hidden" variants={containerVariants} initial="hidden" animate="visible">
                <motion.section
                    className="h-[95dvh] relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute -top-20 -left-20 w-40 h-40 bg-gray-700/20 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                        <motion.div
                            className="absolute top-1/3 -right-10 w-32 h-32 bg-gray-600/15"
                            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-20 left-1/4 w-24 h-24 bg-gray-500/10 rounded-lg"
                            animate={{
                                rotate: [0, 45, 0],
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    </div>

                    <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8">
                        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <div className="space-y-4">
                                    <motion.h1
                                        className="text-4xl md:text-6xl font-bold text-white"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                    >
                                        Santiago Parra
                                    </motion.h1>
                                    <motion.p
                                        className="text-xl md:text-2xl text-gray-300 font-medium"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9, duration: 0.6 }}
                                    >
                                        (lobosanplay)
                                    </motion.p>
                                    <motion.p
                                        className="text-lg text-gray-400 max-w-md leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1, duration: 0.6 }}
                                    >
                                        Soy una persona tranquila y relajado me gusta aprender y siempre estoy activo
                                    </motion.p>
                                </div>

                                <motion.div
                                    className="flex flex-wrap gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.3, duration: 0.6 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 cursor-pointer"
                                        onClick={() => {
                                            window.open('https://github.com/lobosanplay', '_blank')
                                        }}
                                    >
                                        <Github className="h-5 w-5 mr-2" />
                                        GitHub
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 cursor-pointer"
                                        onClick={() => {
                                            window.open('https://www.linkedin.com/in/santiago-miguel-parra-mar%C3%ADn-711422345/', '_blank')
                                        }}
                                    >
                                        <Linkedin className="h-5 w-5 mr-2" />
                                        LinkedIn
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 cursor-pointer"
                                        onClick={() => {
                                            window.open('mailto:parra.santiago2008@gmail.com', '_blank')
                                        }}
                                    >
                                        <Mail className="h-5 w-5 mr-2" />
                                        Contacto
                                    </Button>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="flex justify-center lg:justify-end"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                            >
                                <div className="relative">
                                    <motion.div
                                        className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-4 border-gray-500 shadow-2xl"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                                            <span className="text-lg font-medium">Imagen de Santiago</span>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="absolute -top-4 -right-4 w-8 h-8 bg-gray-500 rounded-full"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.7, 1, 0.7],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    className="h-[95dvh] relative overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, #040616 0%, #0a3d89 50%, #040616 100%)`,
                    }}
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute top-20 left-10 w-36 h-36 bg-blue-400/10 rounded-full"
                            animate={{
                                x: [0, 50, 0],
                                y: [0, -30, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 12,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-20 w-28 h-28 bg-blue-300/15"
                            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                            animate={{
                                rotate: [0, 90, 180, 270, 360],
                            }}
                            transition={{
                                duration: 18,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-500/10"
                            style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
                            animate={{
                                rotate: [0, -360],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                    </div>

                    <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8">
                        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <div className="space-y-4">
                                    <motion.h1
                                        className="text-4xl md:text-6xl font-bold text-white"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                    >
                                        Aram Musset
                                    </motion.h1>
                                    <motion.p
                                        className="text-xl md:text-2xl text-blue-200 font-medium"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9, duration: 0.6 }}
                                    >
                                        (RamCode)
                                    </motion.p>
                                    <motion.p
                                        className="text-lg text-blue-100 max-w-md leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1, duration: 0.6 }}
                                    >
                                        Soy un programador backend, que le gusta aprender nuevas cosas de manera autodidacta
                                    </motion.p>
                                </div>

                                <motion.div
                                    className="flex flex-wrap gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.3, duration: 0.6 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-blue-900/30 border-blue-400 text-white hover:bg-blue-800/40 hover:border-blue-300 transition-all duration-300 cursor-pointer"
                                        onClick={() => {
                                            window.open('https://github.com/CodeFoxZ37', '_blank')
                                        }}
                                    >
                                        <Github className="h-5 w-5 mr-2" />
                                        GitHub
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 cursor-pointer"
                                        onClick={() => {
                                            window.open('https://www.linkedin.com/in/aram-musset-245824369/', '_blank')
                                        }}
                                    >
                                        <Linkedin className="h-5 w-5 mr-2" />
                                        LinkedIn
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-blue-900/30 border-blue-400 text-white hover:bg-blue-800/40 hover:border-blue-300 transition-all duration-300 cursor-pointer"
                                        onClick={() => {
                                            window.open('mailto:arammusset7@gmail.com', '_blank')
                                        }}
                                    >
                                        <Mail className="h-5 w-5 mr-2" />
                                        Contacto
                                    </Button>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="flex justify-center lg:justify-end"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                            >
                                <div className="relative">
                                    <motion.div
                                        className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-blue-300 shadow-2xl"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-blue-100">
                                            <img src="/creators/ramcode_homo.png" className="rounded-full" />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="absolute -top-4 -right-4 w-8 h-8 bg-blue-300 rounded-full"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.7, 1, 0.7],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <motion.div
                                        className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-200 rounded-full"
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                            delay: 1,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    className="h-[100dvh] relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700"
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute top-1/4 left-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full"
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                                x: [0, 30, 0],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/3 right-10 w-40 h-40 bg-gradient-to-l from-orange-400/15 to-pink-400/15"
                            style={{
                                clipPath:
                                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                            }}
                            animate={{
                                rotate: [0, 180, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                        <motion.div
                            className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-300/10 to-orange-300/10"
                            style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}
                            animate={{
                                rotate: [0, -360],
                                y: [0, -40, 0],
                            }}
                            transition={{
                                duration: 12,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-20 left-1/2 w-16 h-16 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-lg"
                            animate={{
                                rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                    </div>

                    <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8">
                        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <div className="space-y-4">
                                    <motion.h1
                                        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 bg-clip-text text-transparent"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                    >
                                        Said Ruiz
                                    </motion.h1>
                                    <motion.p
                                        className="text-xl md:text-2xl text-purple-200 font-medium"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9, duration: 0.6 }}
                                    >
                                        (JunLovin)
                                    </motion.p>
                                    <motion.p
                                        className="text-lg text-purple-100 max-w-md leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1, duration: 0.6 }}
                                    >
                                        Desarrollador full-stack apasionado por crear experiencias digitales únicas y funcionales que
                                        impacten positivamente a los usuarios
                                    </motion.p>
                                </div>

                                <motion.div
                                    className="flex flex-wrap gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.3, duration: 0.6 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-300 text-white hover:from-purple-500/40 hover:to-pink-500/40 hover:border-purple-200 transition-all duration-300 cursor-pointer"
                                        onClick={() => {
                                            window.open('https://github.com/JunLovin', '_blank')
                                        }}
                                    >
                                        <Github className="h-5 w-5 mr-2" />
                                        GitHub
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-gradient-to-r from-pink-600/30 to-orange-600/30 border-pink-300 text-white hover:from-pink-500/40 hover:to-orange-500/40 hover:border-pink-200 transition-all duration-300 cursor-pointer"
                                        onClick={() => {
                                            window.open('https://www.linkedin.com/in/saidre20', '_blank')
                                        }}
                                    >
                                        <Linkedin className="h-5 w-5 mr-2" />
                                        LinkedIn
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-gradient-to-r from-orange-600/30 to-purple-600/30 border-orange-300 text-white hover:from-orange-500/40 hover:to-purple-500/40 hover:border-orange-200 transition-all duration-300 cursor-pointer"
                                        onClick={() => {
                                            window.open('https://said-portfolio-three.vercel.app', '_blank')
                                        }}
                                    >
                                        <FileText className="h-5 w-5 mr-2" />
                                        Portfolio
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-gradient-to-r from-purple-600/30 to-orange-600/30 border-purple-300 text-white hover:from-purple-500/40 hover:to-orange-500/40 hover:border-purple-200 transition-all duration-300 cursor-pointer"
                                        onClick={() => {
                                            window.open('mailto:mathiassaid7@gmail.com', '_blank')
                                        }}
                                    >
                                        <Mail className="h-5 w-5 mr-2" />
                                        Contacto
                                    </Button>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="flex justify-center lg:justify-end"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                            >
                                <div className="relative">
                                    <motion.div
                                        className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 border-4 border-purple-200 shadow-2xl"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white">
                                            <img src="/creators/said_ghibli.webp" className="rounded-full" />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            rotate: [0, 180, 360],
                                            opacity: [0.7, 1, 0.7],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <motion.div
                                        className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-300 to-purple-300"
                                        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                                        animate={{
                                            rotate: [0, 360],
                                            scale: [1, 1.3, 1],
                                            opacity: [0.6, 1, 0.6],
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                            delay: 1,
                                        }}
                                    />
                                    <motion.div
                                        className="absolute top-1/2 -left-8 w-6 h-6 bg-gradient-to-r from-pink-300 to-orange-300 rounded-lg"
                                        animate={{
                                            x: [0, -10, 0],
                                            y: [0, -15, 0],
                                            rotate: [0, 45, 0],
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                            delay: 2,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </div>
    )
}

export default  Contact