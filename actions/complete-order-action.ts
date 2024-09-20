"use server"
import { revalidatePath} from 'next/cache'  // Revalidar toda una url completa 
import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"

export async function completeOrder(formData: FormData) {


    const data = {
        orderId : formData.get('order_id')  // Id de  formData.get('order_id')!   es el valor para que acepte tambien null      
    }

    const result = OrderIdSchema.safeParse(data)

    if(result.success) {
        try {
            await prisma.order.update({  // Aqui se ejecuta el update 
                where: {    ///   
                    id: result.data.orderId   // Este es el valor del id, tambien puede ser el valor 
                },
                data: { // datos a actualizar
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })

            revalidatePath('/admin/orders') // Para actualizar el path, esto es un reflesh
        } catch (error) {
            console.log(error)
        }
    }

    

}