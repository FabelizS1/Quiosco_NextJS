import { prisma } from "@/src/lib/prisma";

export const dynamic = 'force-dynamic'

export async function GET() {
    const orders = await prisma.order.findMany({
        take: 5,
        where: {
            orderReadyAt: { // Las que no tengan null
                not: null
            }
        },
        orderBy: {
            orderReadyAt: 'desc'  // Ordenar desc o asc
        },
        include: { // Incluir los orderProducts y los Productos en true
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return Response.json(orders)
}   