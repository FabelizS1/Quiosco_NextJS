import Link from "next/link";

type ProductsPaginationProps = {
    page: number
    totalPages: number
}

export default function ProductsPagination({ page, totalPages }: ProductsPaginationProps) {

    // Con esta funcion se hace un array y length ès el valor de maximo, donde i es la variable de iteracion
    // imprimir las paginas, es un arreglo de paginas
    const pages = Array.from({length: totalPages}, (_, i) => i + 1 )

    /*

        <Link       En esta opcion se va incrementando la opcion {page + 1}
            href={`/admin/products?page=${page + 1}`}
            className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >&raquo;</Link>




        <Link
            href={`/admin/products?page=${page - 1}`}    En esta opcion se le resta 1 para pasar de pagina
            className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >&laquo;</Link>



    */



    return (
        <nav className='flex justify-center py-10'>

            {page > 1 && (
                <Link
                    href={`/admin/products?page=${page - 1}`}
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >&laquo;</Link>
            )}

            {pages.map(currentPage => (
                <Link
                    key={currentPage}
                    href={`/admin/products?page=${currentPage}`}
                    className={`${page === currentPage && 'font-black'}  bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                >{currentPage}</Link>
            ))}

            {page < totalPages && (   /// Si la pagina es menor al total que muestre el boton
                <Link
                    href={`/admin/products?page=${page + 1}`}
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >&raquo;</Link>
            )}

        </nav>
    )
}
