import { SelectedGoods } from "../models/GoodsModel"

// Поиск индекса товара в масиве, чтобы в дальнейшем получать сам объект и взаимодействовать с ним и с самим массивом. 
// Вынесено отдельно, дабы не повторять одну и ту же длинную строчку
const getProductIndex = (products: SelectedGoods[], id: number): number => {
    return products.findIndex((item: SelectedGoods) => item.product.id === id)
}

export default {
    namespaced: true,
    state: {
        products: []
    },
    getters: {
        products: (state: any) => state.products
    },
    actions: {
        //Так как не имеем дело с ассинхронными запросами, то можем обойтись мутациями
    },
    mutations: {
        addProduct(state: any, newProduct: SelectedGoods) {
            const productIndex: number = getProductIndex(state.products, newProduct.product.id)

            //Если такого товара в корзине не найдено, то добавляем его. Если он уже имеется, то инкрементируем его количество
            if(productIndex === -1) {
                state.products.push(newProduct)
            } else {
                const foundProduct:SelectedGoods = state.products[productIndex]
                foundProduct.count += newProduct.count
                state.products = [...state.products.slice(0, productIndex), foundProduct, ...state.products.slice(productIndex + 1)]
            }
        },
        removeProduct(state: any, productId: number) {
            const productIndex: number = getProductIndex(state.products, productId)
            
            //Обновляем корзину, без учета удаленного товара
            state.products = [...state.products.slice(0, productIndex), ...state.products.slice(productIndex + 1)]
        },

    }
}