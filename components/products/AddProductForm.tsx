"use client"

import { createProduct } from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
//import ProductForm from "./ProductForm"

export default function AddProductForm({children}: {children : React.ReactNode}) {

    const router = useRouter()  // Con la informacion del Router para redireccionar

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: 'imagen.jpg'//formData.get('image')
        }

        const result = ProductSchema.safeParse(data)
         
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }


        const response = await createProduct(result.data)
        if(response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }


        toast.success('Producto Creado correctamente')
        router.push('/admin/products')  // Para redireccionar
    }


/*

Este es un componente de Cliente y para poder pasarle un componente de Servidor le pasamos
children con este children se le puede pasar un componente de servidor

Con children se ocupa un lugar de espacio, esto es un composition parent

*/


    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                className="space-y-5"
                action={handleSubmit}
            >

                {children}

                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Registrar Producto'
                />
            </form>
        </div>
    )
}
