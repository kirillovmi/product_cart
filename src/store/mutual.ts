export default {
    namespaced: true,
    state: {
        usdPrice: 58,
        isPriceGrow: null,
    },
    getters: {
        usdPrice: (state: any) => state.usdPrice,
        isPriceGrow: (state: any) => state.isPriceGrow,
    },
    actions: {

    },
    mutations: {
        updatePrice(state: any, newPrice: number) {
            const oldPrice = state.usdPrice
            state.usdPrice = newPrice

            if(newPrice > oldPrice) {
                state.isPriceGrow = true
            } else if (newPrice < oldPrice) {
                state.isPriceGrow = false
            }
        }
    }
}