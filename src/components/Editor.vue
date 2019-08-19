<template>
    <div class="editor">
        <v-container>
            <v-row>
                <v-col>
                    <v-card tile>
                        <v-card-title>Paragraph</v-card-title>
                        <v-card-text>
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col cols="3">
                                            <v-text-field label="Paragraph number" :disabled="true" v-model="item.number" hint="Paragraph number that is used in actions"></v-text-field>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-btn @click="renumber">
                                                Change
                                            </v-btn>
                                            <v-dialog v-model="showRenumber" width="30rem">
                                                <v-card>
                                                    <v-card-title class="headline" primary-title>Renumber paragraph</v-card-title>
                                                    <v-card-text>Please type the number of the new paragraph</v-card-text>
                                                    <v-form>
                                                        <v-container>
                                                            <v-row>
                                                                <v-col>
                                                                    <v-text-field label="New number" v-model="newNumber" hint="New paragraph number"></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-form>
                                                    <v-divider></v-divider>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="primary" text @click="performRenumber">Renumber</v-btn>
                                                        <v-btn color="primary" text @click="cancelRenumber">Cancel</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field label="Exert" v-model="item.exert" hint="Small exert used to describe paragraph in a few words"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field label="Question" v-model="item.question" hint="The question that the user must opt on"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-card tile>
                        <v-card-title>Tags</v-card-title>
                        <v-card-text>
                            <MetaTagEditor :tags="item.tags" @addTag="(tag) => addTag(tag)" @deleteTag="(tag) => deleteTag(tag)" />
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="8">
                    <v-card tile>
                        <v-card-title>Origins and destinations</v-card-title>
                        <v-card-text>
                            <Browser label="Origins"
                                :items="origins"
                                :item="item"
                                @loadItem="loadItem"
                                :expandedMode="true"></Browser>
                            <Browser label="Destinations"
                                :items="destinations"
                                :item="item"
                                @loadItem="loadItem"
                                :expandedMode="true"
                                :canAdd="true"
                                :canDelete="true"></Browser>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
</div>
</template>

<script>
import Browser from './Browser'
import MetaTagEditor from './MetaTagEditor'
export default {
    components: { Browser, MetaTagEditor },
    props: {
        items: {
            required: true,
            type: Array,
        },
        item: {
            required: true,
            type: Object,
        },
    },
    data(){
        return {
            showRenumber: false,
            newNumber: ''
        }
    },
    computed: {
        origins() {
            return this.items.filter(item => {
                return item.choices.filter(choice => choice.target == this.item.number).length > 0
            }).map(origin => {
                const choice = origin.choices.filter(choice => choice.target == this.item.number)[0]
                return {
                    question: origin.question,
                    label: choice.label,
                    number: origin.number,
                    exert: origin.exert,
                }
            })
        },
        destinations() {
            return this.item.choices.map(choice => {
                const targetItem = this.items.filter(item => item.number == choice.target)[0]
                return {
                    label: choice.label,
                    question: this.item.question,
                    number: choice.target,
                    exert: (targetItem ? targetItem.exert : 'Target item found'),
                }
            })
        },
    },
    methods: {
        addTag(newTag) {
            this.item.tags = this.item.tags.filter(tag => tag != newTag)
            this.item.tags.push(newTag)
            this.item.tags.sort()
            this.$emit('saveItem', this.item)
        },
        deleteTag(deletedTag) {
            this.item.tags = this.item.tags.filter(tag => tag != deletedTag)
            this.$emit('saveItem', this.item)
        },
        loadItem(paragraph) {
            this.$emit('loadItem', paragraph)
        },
        renumber() {
            this.showRenumber = true
        },
        performRenumber(){
            this.showRenumber = false
            this.$emit('renumber', this.item.number, parseInt(this.newNumber))
            this.newNumber = ''
        },
        cancelRenumber(){
            this.showRenumber = false
            this.newNumber = ''
        },
    }
}
</script>