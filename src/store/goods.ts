import { Section } from "../models/GroupModel"
import { Goods } from "../models/GoodsModel"

export default {
    namespaced: true,
    state: {
        sections: []
    },
    getters: {
        sections: (state: any) => state.sections
    },
    actions: {
        getDataFromFiles({commit}: {commit: any}) {
            //Получим данные
            const data = require("../../data/data.json")
            const names = require("../../data/names.json")

            const goods = data.Value.Goods
            const sections: Section[] = []

            //Приведем данные к нужному нам и читабельному виду
            const formattedGoods = goods.map((product: any) => {
                return {
                    section: {id: product.G, title: names[product.G].G},
                    product: new Goods({
                        id: product.T,
                        price: product.C,
                        count: product.P,
                        title: names[product.G].B[product.T].N,
                    })
                }
            })

            //Сгрупируем отформатированные данные по группам и добавим товары в массив товаров той группы, к которой они относятся
            formattedGoods.map((item: any) => {
                const index: number = sections.findIndex((section: any) => section.id === item.section.id)

                //Если группы не найдено, то создаем ее. Если уже имеется, то дабавляем в нее товар
                if(index === -1) {
                    sections.push(new Section({
                        id: item.section.id,
                        title: item.section.title,
                        products: [item.product]
                    }))
                } else {
                    sections[index].products.push(item.product)
                }
            })

            commit("updateSections", sections)
        }
    },
    mutations: {
        updateSections(state: any, data: any) {
            state.sections = data
        },
    }
}