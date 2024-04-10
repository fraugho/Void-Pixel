import Image from "next/image"


export default function Page(){
    return(
        <div>
            <Image 
                src={"/static/Images/1.jpg"} 
                width={250} 
                height={125} 
                alt="thing" 
            />
        </div>
    )
}
