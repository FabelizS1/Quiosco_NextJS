"use client"
import useSWR from 'swr'
//import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from '@/src/types';
//import { prisma } from "@/src/lib/prisma"
import Logo from "@/components/ui/Logo";
import OrderCard from "@/components/order/OrderCard";
//import { revalidatePath } from "next/cache";

/*
async function getPendingOrders(){
  const orders = await prisma.order.findMany({
    where: {
      status: false // Traer solo las ordenes en estatus false
    },
    include: {
      orderProducts: {  // Esta es la relacion que aparece con OrderProducts
        include: {  
          product: true  // Esta es una relacion que con products
        }
      }   
    }
  })

  return orders
}*/


export default function OrdersPage() {

  //const orders = await getPendingOrders()

  //console.log(JSON.stringify(orders, null, 2)) // Trae la informacion de las ordenes

  //const url = '/admin/orders/api'

  //const fetcher = () => fetch(url).then(res => res.json()).then(data => data) // Para consultar la data de la API

  /*const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {  // Para traer los datos de la API
    refreshInterval: 1000, // El tiempo de refresh es de 1 minuto para que aparezca la informacion
    revalidateOnFocus: false, // tiempo de espera
  })*/

  /*const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
      refreshInterval: 1000,
      revalidateOnFocus: false,
  })*/


    const url = '/admin/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data } = useSWR<OrderWithProducts[]>(url, fetcher, {  // const { data, error, isLoading }
        refreshInterval: 1000,
        revalidateOnFocus: false,
    })

  //if(isLoading) return <p>Cargando...</p>
  
  console.log("data:",data)

/*
  const refreshOrders = async() => {
    "use server"
    revalidatePath('/admin/orders')
  }

  <form action={refreshOrders}>
  </form>
*/

  if (data) return (
    <>
      
      <Heading>Administrar Ordenes</Heading>
    
      <Logo />

      {data.length ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
              {data.map(order => (
                <OrderCard 
                key={order.id}
                order={order}
              />
              ))}
          </div>
      ) : <p className="text-center my-10">No hay ordenes listas</p>}

    </>
  )
}
