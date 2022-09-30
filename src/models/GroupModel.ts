import {Goods} from "./GoodsModel"

export class Section {
    private _id: number = 0
    private _title: string = ""
    private _products: Goods[] = []

    constructor({id, title, products}:{id: number, title: string, products: Goods[]}) {
        this._id = id
        this._title = title
        this._products = products
    }

    set id(value: number) {
        this._id = value
    }
    get id(): number {
        return this._id
    }
    set title(value: string) {
        this._title = value
    }
    get title(): string {
        return this._title
    }
    set products(value: Goods[]) {
        this._products = value
    }
    get products(): Goods[] {
        return this._products
    }
}