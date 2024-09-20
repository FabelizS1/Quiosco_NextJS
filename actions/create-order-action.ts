"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

export async function createOrder(data: unknown) {  // Se le pasa el tipo de unknown porque no se sabe el tipo
    
    const result = OrderSchema.safeParse(data)

    if(!result.success) {
        return {
            errors: result.error.issues  // Para retornar los errores
        }
    }

    try {
        await prisma.order.create({   // order para escribir en ese modelo
            data: {  // Esta es la data que se va a ingresar 
                name: result.data.name,
                total: result.data.total,
                orderProducts: { // OrderProducts es la tabla pivote y estaria ingresando aqui en Order y en OrderProducts
                    create: result.data.order.map(product => ({  // itera los order y se le debe pasar productId y quantity, y el orderId no se le pasa porque se sobreentiende
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}