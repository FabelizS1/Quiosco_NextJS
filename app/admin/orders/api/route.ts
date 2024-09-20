import { prisma } from "@/src/lib/prisma";

export const dynamic = 'force-dynamic'



// Este archivo se tiene que llamar route para poder generar una api con SWR
// En automatico se genera la api en admin/orders/api
export async function GET() {  // Usando el metodo get retornamos una respuesta
    const orders = await prisma.order.findMany({
        where: {       
            status: false
        },
        orderBy: {
            orderReadyAt: 'desc'
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return Response.json(orders)
}  


/*

    const orders = await prisma.order.findMany({
        take: 5,
        where: {
            orderReadyAt: {
                not: null
            }
        },
        orderBy: {
            orderReadyAt: 'desc'
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })

*/
