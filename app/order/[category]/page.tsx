import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
//import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"


/*

Como este archivo esta dentro de [category] quiere decir que va a usar routing dinamico

*/


async function getProducts(category: string) { // toma la category
  const products = await prisma.product.findMany({  // Buscar por los productos 
    where: {  // Se agrega un where 
      category: { // donde category
        slug: category  //y el slug toma la category que tenga la misma category
      }
    }
  })
  return products
}


export default async function OrderPage({params} : {params:{category :string}}) {

  console.log(params.category)

  const products = await getProducts(params.category)
  
  return (
    <>
      
      <Heading>
        Elige y personaliza tu pedido a continuación
      </Heading>

      
    
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
          {products.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </>
  )
}
