"use client"   // Se le agrega el use client porque se va a usar   useParams<{category: string}>() 
import Image from "next/image"
import Link from "next/link"
import { useParams } from 'next/navigation'
import { Category } from "@prisma/client"

type CategoryIconProps = {
    category: Category  // Este Category viene de los types de prisma
}


/*

                <Image    este es el componente imagen de next
                    fill     con este se pone el width y el height
                    src={`/icon_${category.slug}.svg`}
                    alt="Imagen Categoria"
                />

*/

export default function CategoryIcon({ category }: CategoryIconProps) {

    const params = useParams<{category: string}>()  // Se usa este hook para poder tomar los datos del parametro porque este no usa un params
    // aqui se muestra que el parametro es category y que va a ser un string

    /*
    El parametro de params se ve en:
    layout.tsx
    page.tsx
    route.tsx
    generateMetadata


    Next.js va cacheando la informacion para que no haga los select de nuevo
    
    */

    return (
        <div
            className={`${category.slug === params.category ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="w-16 h-16 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt="Imagen Categoria"
                />
            </div>

            <Link
                className="text-xl font-bold"
                href={`/order/${category.slug}`}
            >{category.name}</Link>
        </div>
    )
}
