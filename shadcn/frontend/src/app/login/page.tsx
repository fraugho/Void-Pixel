import "@/app/globals.css";
import { Login } from "@/app/login/login";

export default function Page() {
    return (
        <body className="overflow-hidden flex justify-center items-center min-h-screen bg-black">
            <div className="flex flex-col justify-center items-center min-h-screen">
                <img src="http://127.0.0.1:8080/static/SVG/void_pixel.svg" className="min-h-20 mb-3" />
                <Login />
            </div>
        </body>
    );
}
