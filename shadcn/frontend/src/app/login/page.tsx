import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Login} from "@/components/login"
import { Inter } from "next/font/google";

import "@/app/globals.css";

export default function Page() {
    return (
        <body>
            <h1>Login</h1>
            <div className="absolute top-50 left-50">
                <Login />
            </div>
        </body>
    );
}
