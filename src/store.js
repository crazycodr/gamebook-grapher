import Vue from 'vue'
import Vuex from 'vuex'

import p1 from './fixtures/1.json'
import p130 from './fixtures/130.json'
import p300 from './fixtures/300.json'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentItem: null,
        name: "L'héritier perdu",
        series: "Sherlock Holmes",
        items: [p1, p130, p300]
    },
    getters: {
        currentItem(state){
            return state.currentItem
        },
        items(state) {
            return state.items
        },
        item: (state) => (number) => {
            return state.items.filter((item) => item.number == number)[0]
        },
        originsOf: (state) => (number) => {
            return state.items.filter(item => {
                return item.choices.filter(choice => choice.target == number).length > 0
            })
        }
    },
    mutations: {
        setCurrentItemByNumber (state, number) {
            state.currentItem = state.items.filter(element => element.number == number)[0]
        }
    }
})

export default store