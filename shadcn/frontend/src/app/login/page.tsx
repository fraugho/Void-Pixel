import "@/app/globals.css";
import { Login } from "@/app/login/login";

export default function Page() {
    return (
        <body className="overflow-hidden">
            <h1 className="text-center p-4">Void Pixel</h1>
            <div className="flex justify-center items-center min-h-screen">
                <Login />
            </div>
        </body>
    );
}

