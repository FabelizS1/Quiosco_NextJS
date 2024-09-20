import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({ // se escribe set para guardar en el store, con get obtiene unas funciones del store
    order: [], // Inicia en un arreglo vacio
    addToOrder: (product) => {

        const {...data} = product  //copia del resto de los atributos que es data   const {categoryId, image, ...data}

        let order : OrderItem[] = []  // Un arreglo vacio

        if(get().order.find( item => item.id === product.id)) {  // Con get().order se manda a llamar la order, aqui se valida si existe en el carrito de compras
            order = get().order.map( item => item.id === product.id ? {
                ...item, // copia de item
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        } else {
            order = [...get().order, {   // [...state.order, {  Toma el order  con get item toma la orden, aqui se iguala la orden a ese valor
                ...data, // Toma la copia de data
                quantity: 1, // coloca la cantidad en 1
                subtotal: 1 * product.price  // Toma el subtotal de 1 * price
            }]
        }
        /*set((state) => ({
            order: [...state.order, {  // se toma una copia de state.order
                ...data, // Toma la copia de data
                quantity: 1, // coloca la cantidad en 1
                subtotal: 1 * product.price  // Toma el subtotal de 1 * price
            }]
        }))*/       
        set(() => ({
            order   // Aqui no se tiene valor por 
        }))

        console.log('Agregando ...', product)
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map( item => item.id === id ? {  // state.order es igual a tener get().order
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map( item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item )

        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id) // Traer todos los registros que son diferentes
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []  // order es un arreglo vacio
        }))
    }
}))