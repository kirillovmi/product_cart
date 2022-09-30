export class Goods {
    private _id: number = 0
    private _title: string = ""
    private _price: number = 0
    private _count: number = 0

    constructor({id, title, price, count}:{id: number, title: string, price: number, count: number}) {
        this._id = id
        this._title = title
        this._price = price
        this._count = count
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
    set price(value: number) {
        this._price = value
    }
    get price(): number {
        return this._price
    }
    set count(value: number) {
        this._count = value
    } 
    get count(): number {
        return this._count
    }
}

export interface SelectedGoods {
    product: Goods,
    count: number
}