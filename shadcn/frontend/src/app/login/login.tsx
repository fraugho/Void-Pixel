"use client"

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
import React, { useState, FormEvent } from "react";

export function Login() {
    const [responseMessage, setResponseMessage] = useState('');

    async function login_submit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const form_data = new FormData(event.currentTarget);
        const form_entries = Array.from(form_data.entries()).map(entry => [entry[0], entry[1].toString()]);
        const form_body = new URLSearchParams(form_entries as string[][]);

        const response = await fetch('http://127.0.0.1:8080/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: form_body,
        });

        const message = await response.text();

        setResponseMessage(message);
    }

    async function create_login_submit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const form_data = new FormData(event.currentTarget);
        const form_entries = Array.from(form_data.entries()).map(entry => [entry[0], entry[1].toString()]);
        const form_body = new URLSearchParams(form_entries as string[][]);
        const response = await fetch('http://127.0.0.1:8080/create_login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: form_body,
        });

        const message = await response.text();

        setResponseMessage(message);
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
                            Login To Your Account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form onSubmit={login_submit}>
                            <div className="space-y-1">
                                <Label htmlFor="login_username">Username</Label>
                                <Input id="login_username" name="username" placeholder="Username" />
                            </div>
                            <div className="space-y-1 pt-3">
                                <Label htmlFor="login_password">Password</Label>
                                <Input id="login_password" name="password" type="password" placeholder="Password" />
                            </div>
                            <Button type="submit" className="w-full mt-3">Sign In</Button>
                        </form>
                        <p className="text-center pt-4">{responseMessage}</p>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="Create Account">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Create Login</CardTitle>
                        <CardDescription className="text-center">
                            Create An Account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form onSubmit={create_login_submit}>
                            <div className="space-y-1">
                                <Label htmlFor="create_username">Username</Label>
                                <Input id="create_username" name="username" placeholder="Username" />
                            </div>
                            <div className="space-y-1 pt-3">
                                <Label htmlFor="create_password">Password</Label>
                                <Input id="create_password" name="password" type="password" placeholder="Password" />
                            </div>
                            <Button type="submit" className="w-full mt-3">Sign Up</Button>
                        </form>
                        <p className="text-center pt-4">{responseMessage}</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
