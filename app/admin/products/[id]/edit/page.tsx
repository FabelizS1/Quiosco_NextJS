import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
//import Link from "next/link"
import { notFound } from "next/navigation"  ///  import { notFound, redirect } 

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if(!product) {
        notFound()  // Con esta funcion se invoca al archivo de not-found.tsx
    }

    return product
}

export default async function EditProductsPage({ params }: { params: { id: string } }) {

    console.log(typeof params.id)

    const product = await getProductById(+params.id)

    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>

            <GoBackButton />

            <EditProductForm>
                <ProductForm 
                    product={product}
                />
            </EditProductForm>



        </>
    )
}
