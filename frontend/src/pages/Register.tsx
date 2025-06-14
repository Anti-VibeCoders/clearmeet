import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    repeat_password: z.string()
})

function Register() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            repeat_password: ""
        }
    })

    return (
        <>
            <div className="w-full">
                <div className="form-container w-full my-auto h-[85dvh] flex flex-col gap-4 justify-center items-center">
                    <h2 className="text-4xl font-bold text-center">Crear cuenta</h2>
                    <div className="des-login">
                        <p className="text-center text-neutral-400">Ingresa tus datos para unirte a Vibe</p>
                    </div>
                    <div className="login-container w-full flex justify-center items-center mt-4">
                        <Form {...form}>
                            <form className="flex flex-col gap-4">
                                
                            <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Nombre de usuario" {...field} className="w-md h-12 max-sm:w-xs" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                >
                                </FormField>
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
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" {...field} className="h-12 max-sm:w-xs" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                                <FormField
                                    control={form.control}
                                    name="repeat_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Confirmar Contraseña" {...field} className="h-12 max-sm:w-xs" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                                <div className="te flex gap-2 items-center ml-0.5">
                                <Checkbox id="terms" className="cursor-pointer"></Checkbox>
                                <label htmlFor="terms">Acepto los <Link to="/terms" className="text-blue-400 hover:underline">términos y condiciones</Link></label>
                                </div>
                                <Button className="w-md bg-black dark:bg-white font-semibold cursor-pointer h-10 max-sm:w-xs" onClick={() => {
                                    navigate('/login')
                                }}>Crear Cuenta</Button>
                                <p className="text-center">¿Ya tienes cuenta? <Link to="/" className="text-blue-400 hover:underline">Inicia sesión</Link></p>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register