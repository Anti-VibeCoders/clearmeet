import { useState } from 'react'
import { FileText, FileVolume, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea'
import { useNavigate } from 'react-router'

export function InputFile() {
    const [fileName, setFileName] = useState<string | null>(null);
    const navigate = useNavigate()

    return (
        <div className="flex w-full h-[85dvh] max-2xl:h-[88dvh] justify-center items-center flex-col gap-6">
            <h2 className="text-4xl font-bold text-center">Analizar reunión</h2>
            <Tabs defaultValue="text" className="border border-neutral-400/50 rounded-xl w-2xl p-6 max-md:w-lg max-sm:w-md ">
                <h3 className="text-2xl font-semibold max-sm:text-xl">Sube tu reunión</h3>
                <p className="mb-2 max-sm:text-sm">Suba un archivo de texto o audio de tu reunión para analizarlo</p>
                <TabsList className='w-full'>
                    <TabsTrigger value="text" className="cursor-pointer"><FileText /> Texto</TabsTrigger>
                    <TabsTrigger value="audio" className="cursor-pointer"><FileVolume /> Audio</TabsTrigger>
                </TabsList>
                <TabsContent value="text">
                    <Card>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Textarea placeholder="Pega aquí la transcripción de tu reunión." className="w-full h-30" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full cursor-pointer">Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="audio">
                    <Card>
                        <CardContent className="grid gap-6">
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 dark:bg-neutral-800 dark:border-neutral-900">
                                <div className="flex flex-col items-center justify-center mb-4">
                                    <div className="dark:bg-neutral-600 dark:text-white bg-gray-200 rounded-full p-3 mb-2">
                                        <Upload />
                                    </div>
                                    <span className="text-center text-gray-700 dark:text-neutral-200">Arrastra y suelta o haz clic para subir</span>
                                    <span className="text-xs text-gray-500 mt-1 dark:text-neutral-200">MP3, WAV, M4A (max. 500MB)</span>
                                </div>
                                <label htmlFor="file" className="w-full flex justify-center">
                                    <Input id="file" type="file" className="hidden" onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                            setFileName(e.target.files[0].name);
                                        } else {
                                            setFileName(null);
                                        }
                                    }} />
                                        <span className="w-full text-center underline cursor-pointer">Seleccionar archivo</span>
                                </label>
                                {fileName && (
                                    <span className="mt-2 text-sm text-gray-700 dark:text-neutral-300 font-semibold">Archivo: {fileName}</span>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full cursor-pointer" onClick={() => {
                                navigate('/results/2')
                            }}>Subir archivo</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default InputFile