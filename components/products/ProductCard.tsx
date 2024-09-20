import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product  // Se toma el type de Prisma
}

/*

Este pedazo se ejecuta en el cliente
            <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"      
        >Agregar</button>
entonces todo lo demas en el servidor por eso se toma esta porcion de codigo y se hace un 
nuevo componente para que se agregue la opcion de use client

*/

export default function ProductCard({product} : ProductCardProps) {

  const imagePath = getImagePath(product.image)

  return (
    <div className="border bg-white">
        <Image
            width={400}
            height={500}
            src={imagePath}
            alt={`Imagen platillo ${product.name}`}
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
            { formatCurrency( product.price )}
            </p>
            <AddProductButton 
              product={product}
            />
        </div>
    </div>
  )
}
