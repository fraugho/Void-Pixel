import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { Suspense } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio"


const inter = Inter({ subsets: ["latin"] });


const Bar = (): JSX.Element => {
    return (
        <div>
            <div className="flex items-center overflow-hidden justify-between m-4 max-w-screen">
                <div className="flex items-center">
                    <Suspense>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Suspense>
                    <span className="ml-3">User</span> 
                </div>
                <div className="flex flex-grow justify-center">
                    <Input type="text" className="px-3 py-2 w-1/2" placeholder="Search..." />
                    <Button className="ml-2 px-3 py-2">Search</Button>
                </div>
                <div className="text-right">Void Pixel</div>
                <div className="pl-3">
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
}

export default Bar;
