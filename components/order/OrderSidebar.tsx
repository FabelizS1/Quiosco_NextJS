//import { PrismaClient} from '@prisma/client'
import { prisma } from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'


//const prismaClient = new PrismaClient()

async function getCategories() {
  return await prisma.category.findMany()
  //return await prismaClient.category.findMany()  // Este trae todas las categorias
  //console.log(categories)
}



export default async function OrderSidebar() {
  const categories = await getCategories()

  console.log(categories)

  return (
    <aside className="md:w-72 md:h-screen bg-white">

        <Logo/>
        <nav className='mt-10'>
            {categories.map(category => (
              <CategoryIcon 
                key={category.id}
                category={category}
              />
            ))}
        </nav>

    </aside>
  )
}
