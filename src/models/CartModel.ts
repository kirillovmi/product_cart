import { SelectedGoods } from "./GoodsModel"

export class Cart {
    private _products: SelectedGoods[] = []

    constructor(products: SelectedGoods[]) {
        this._products = products
    }

    set products(products: SelectedGoods[]) {
        this._products = products
    }
    get products(): SelectedGoods[] {
        return this._products
    }
    //Общая сумма товаров в корзине
    get sum() {
        return this._products.reduce((sum: number, item: SelectedGoods) => {
            return sum + item.product.price * item.count
        }, 0)
    }
    //Общее количество товаров в корзине
    get productCount() {
        return this._products.length
    }
}