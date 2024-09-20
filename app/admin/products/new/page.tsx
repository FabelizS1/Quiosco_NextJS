import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";

export default function CreateProductPage() {

/*

      <AddProductForm>
        <ProductForm />  Este es un componente hijo para poder usar prisma en el  y que no sea del cliente
      </AddProductForm>

*/


  return (
    <>
      <Heading>Nuevo Producto</Heading>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>

    
    </>
  )
}
