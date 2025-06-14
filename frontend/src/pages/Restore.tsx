import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    email: z.string().email(),
})

function Restore() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    return (
        <>
            <div className="w-full">
                <div className="form-container w-full my-auto h-[85dvh] flex flex-col gap-4 justify-center items-center">
                    <h2 className="text-4xl font-bold text-center">Recupera tu contraseña</h2>
                    <div className="des-login">
                        <p className="text-center text-neutral-400 max-w-[50ch]">Ingresa tu dirección de correo electrónico para enviarte un correo de recuperación</p>
                    </div>
                    <div className="login-container w-full flex justify-center items-center mt-4">
                        <Form {...form}>
                            <form className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Correo electrónico" {...field} className="w-md h-12 max-sm:w-xs" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                                <Button className="w-md bg-black dark:bg-white font-semibold cursor-pointer h-10 max-sm:w-xs" onClick={() => {
                                    navigate('/login')
                                }}>Enviar Correo</Button>
                                <p className="text-center">¿No tienes cuenta? <Link to="/register" className="text-blue-500"> Regístrate</Link></p>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Restore