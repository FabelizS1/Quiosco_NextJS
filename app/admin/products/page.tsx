import React from 'react'
import {prisma} from "@/src/lib/prisma"
import ProductTable from '@/components/products/ProductsTable'
import Heading from "@/components/ui/Heading";
import ProductsPagination from '@/components/products/ProductsPagination';
import { redirect } from 'next/navigation'
import Link from 'next/link';
import ProductSearchForm from '@/components/products/ProductSearchForm';


async function productCount(){
  return await prisma.product.count()
}


async function getProducts(page: number, pageSize: number){

  const skip = (page - 1) * pageSize
  
  const products = await prisma.product.findMany({
    take: pageSize,  // Esto toma 10 registro
    skip: skip,   // No saltarse ninguno, si pongo un skip de 10 quiere decir que se los va a traer del 10 al 20
    include: {
      category: true   ///  Es para agregar la categoria
    }
  })


  return products
}

/*

Agregar un querystring a la url  produts?page=1

*/

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>   // Retorna todo el tipo del getProducts


export default async function ProductsPage({searchParams} : {searchParams : {page : string}}) {
 
  const page = +searchParams.page || 1  // Se convierte en numero con un +, si no existe se esta en la pagina 1
  const pageSize = 10



  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()

  const [ products, totalProducts] = await Promise.all([productsData, totalProductsData]) // Estas consultas se realizan en paralelo

  if(page < 0) redirect('/admin/products')  // Si la pagina es menor a 0

  console.log("Products: ", productsData)
  console.log("searchParams: ", searchParams)

  const totalPages = Math.ceil(totalProducts / pageSize)

  
  if(page > totalPages) redirect('/admin/products')  // Si la pagina tiene un valor mayor al total se redirecciona



  return (
    <>
        <Heading>
          Administrar Productos
        </Heading>

        <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
            <Link
            href={'/admin/products/new'}
            className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
            >Crear Producto</Link>

            <ProductSearchForm/>
        </div>

        <ProductTable
        products = {products}
        />

        <ProductsPagination
          page={page}
          totalPages={totalPages}
        />

    </>
  )
}
