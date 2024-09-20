import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// Llamar este archivo en el package.json
async function main() {
    try {
        await prisma.category.createMany({  // Crear multiples registros 
            data: categories // va a ingresar las categorias en la tabla 
        })
        await prisma.product.createMany({
            data: products
        })
    } catch (error) {
        console.log(error)
    }
}

main()  // ejecutar main
    .then( async () => {    /// y si todo sale bien cuando se ejecuta el main
        await prisma.$disconnect() // Desconecta la conexion a la base de datos
    })
    .catch( async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)  // Para el error pasar el process con el caso 1
    })