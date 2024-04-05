import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import "@/app/globals.css";
import { FormEvent } from 'react'

export default function Page() {
    return (
        <body>
            <h1 className="text-center p-4">Void Pixel</h1>
            <div className="flex justify-center items-center min-h-screen">
                <Login />
            </div>
        </body>
    );
}

export function Login() {

    async function login_submit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const form_data = new FormData(event.currentTarget)
        const response = await fetch('127.0.0.1:8080/login',{
            method: 'POST',
            body: form_data,
        })
    }

    async function create_login_submit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const form_data = new FormData(event.currentTarget)
        const response = await fetch('127.0.0.1:8080/create_login',{
            method: 'POST',
            body: form_data,
        })
    }

    return (
        <Tabs defaultValue="Login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Login">Login</TabsTrigger>
                <TabsTrigger value="Create Account">Create Account</TabsTrigger>
            </TabsList>
            <TabsContent value="Login">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Login</CardTitle>
                        <CardDescription className="text-center">
                            Make changes to your account here. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form onSubmit={login_submit}>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="Username" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Password" />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Sign In</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="Create Account">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Create Login</CardTitle>
                        <CardDescription className="text-center">
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form onSubmit={create_login_submit}>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="Username" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Password" />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Sign Up</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
