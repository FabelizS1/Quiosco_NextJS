import Image from "next/image";

export default function Logo() {
/*

            <Image
                fill     Con fill se usa el valor que esta dividido por el padre
                alt="Logotipo Fresh Coffee"
                src='/logo.svg'
            />


*/

  return (
    <div className="flex justify-center mt-5">  
        <div className="relative w-40 h-40">
            <Image
                fill
                alt="Logotipo Fresh Coffee"
                src='/logo.svg'
            />
        </div>
    </div>
  )
}
