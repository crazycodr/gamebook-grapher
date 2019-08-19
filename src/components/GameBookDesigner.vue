<template>
    <div class="gamebook-designer">
        <Browser
            class="browser"
            :items="items"
            :item="item"
            @loadItem="loadItem"
            @addItem="addItem"
            :canAdd="true"></Browser>
        <Editor
            v-if="hasItem"
            :items="items"
            :item="item"
            @loadItem="loadItem"
            @saveItem="saveItem"
            @renumber="renumber"
            class="editor"></Editor>
    </div>
</template>

<script>
import Browser from './Browser'
import Editor from './Editor'

import p1 from '../fixtures/1.json'
import p130 from '../fixtures/130.json'
import p300 from '../fixtures/300.json'

export default {
    components: {
        Browser, Editor
    },
    data(){
        return {
            items: [p1, p130, p300],
            currentParagraph: null,
        }
    },
    computed: {
        hasItem(){
            return this.item !== undefined
        },
        item(){
            return this.items.filter(item => item.number == this.currentParagraph)[0] || undefined
        }
    },
    watch: {
        items: {
            handler() {
                localStorage.setItem('items', JSON.stringify(this.items));
            },
            deep: true,
        },
        currentParagraph: {
            handler() {
                localStorage.setItem('currentParagraph', this.currentParagraph);
            },
        },
    },
    methods: {
        loadItem(paragraph){
            this.currentParagraph = paragraph
        },
        saveItem(payload){
            const item = this.items.filter(item => item.number == payload.number)[0]
            item.number = payload.number
            item.exert = payload.exert
            item.tags = payload.tags
            item.question = payload.question
            item.choices = payload.choices
        },
        addItem(paragraph) {
            const itemExists = this.items.filter(item => item.number == paragraph)[0]
            if (itemExists) {
                alert('Sorry this item already exists')
                return false
            }
            const item = {
                number: paragraph,
                exert: 'New paragraph',
                tags: [],
                question: '',
                choices: []
            }
            this.items.push(item)
            this.items.sort((a, b) => {
                return a.number - b.number
            })
            this.currentParagraph = paragraph
        },
        renumber(paragraph, newParagraph) {
            this.items.forEach(item => {
                if (item.number == paragraph) { 
                    item.number = newParagraph
                }
                item.choices.forEach(choice => {
                    if (choice.target == paragraph) {
                        choice.target = newParagraph
                    }
                })
            })
        },
    },
    mounted() {
        if (localStorage.getItem('items')) {
            this.items = JSON.parse(localStorage.getItem('items'));
        }
        if (localStorage.getItem('currentParagraph')) {
            this.currentParagraph = localStorage.getItem('currentParagraph');
        }
    }
}
</script>

<style lang="scss" scoped>
.gamebook-designer {
    .browser, .editor {
        height: 100%;
    }
    .browser {
        flex: 30rem 0 0;
        margin-right: 1rem;
    }
    .editor {
        flex-grow: 1;
    }
}
</style>