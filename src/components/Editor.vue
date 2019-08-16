<template>
    <div class="editor">
        <v-card tile>
            <v-card-title>Paragraph</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="Paragraph number" v-model="item.number" hint="Paragraph number that is used in actions"></v-text-field>
                    <v-text-field label="Exert" v-model="item.exert" hint="Small exert used to describe paragraph in a few words"></v-text-field>
                </v-form>
            </v-card-text>
        </v-card>
        <br />
        <v-card tile>
            <v-card-title>Tags</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <h3>Flow tags</h3>
                            <v-switch v-model="item.control" label="Starting point" value="startpoint"></v-switch>
                            <v-switch v-model="item.control" label="Restart point" value="restart"></v-switch>
                            <v-switch v-model="item.control" label="Dead end" value="deadend"></v-switch>
                        </v-col>
                        <v-col cols="10">
                            <h3>Meta tags</h3>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-btn icon :disabled="new_tag == ''" @click="add_tag">
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                    <v-list-item-title>
                                        <v-text-field label="New tag" v-model.trim="new_tag" hint="Type a single word tag to represent this paragraph"></v-text-field>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item v-for="tag in item.tags" :key="tag">
                                    <v-list-item-action>
                                        <v-btn icon @click="() => remove_tag(tag)">
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                    <v-list-item-title>{{tag}}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            <v-dialog v-model="show_delete" width="30rem">
                                <v-card>
                                    <v-card-title class="headline" primary-title>Delete tag?</v-card-title>
                                    <v-card-text>Are you sure you want to delete the tag <strong>{{ deleted_tag }}</strong>?</v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="confirm_delete">Yes</v-btn>
                                        <v-btn color="primary" text @click="cancel_delete">No</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
        <br />
        <v-card tile>
            <v-card-title>Origins and destinations</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col><strong>Origins >>></strong></v-col>
                                <v-col><strong>This place >>></strong></v-col>
                                <v-col><strong>Destinations</strong></v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <ParagraphList :items="origins"></ParagraphList>
                                </v-col>
                                <v-col>
                                    <ParagraphList :items="thisParagraph"></ParagraphList>
                                </v-col>
                                <v-col>
                                    <ParagraphList :items="destinations"></ParagraphList>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
</div>
</template>

<script>
import ParagraphList from './ParagraphList'
export default {
    components: { ParagraphList },
    data() {
        return {
            new_tag: '',
            show_delete: false,
            deleted_tag: ''
        }
    },
    computed: {
        item() {
            return this.$store.getters.currentItem
        },
        origins() {
            return this.$store.getters.originsOf(this.item.number).map(origin => {
                return {
                    label: origin.choices.filter(choice => choice.target == this.item.number)[0].label || 'Not found',
                    number: origin.number,
                    exert: origin.exert,
                }
            })
        },
        thisParagraph() {
            return [{
                label: 'This paragraph',
                number: this.item.number,
                exert: this.item.exert,
            }]
        },
        destinations() {
            return this.item.choices.map(choice => {
                return {
                    label: choice.label,
                    number: choice.target,
                    exert: this.targetItem(choice.target).exert,
                }
            })
        },

        //         question: "Quel sac appartient à Holmes?",
        //         choices: [
        //             {
        //                 target: 366,
        //                 label: "Sac plein"
        //             },
        //             {
        //                 target: 149,
        //                 label: "Sac à moitié plein"
        //             },
        //             {
        //                 target: 130,
        //                 label: "Demander plus d'informations"
        //             }
        //         ]

    },
    methods: {
        add_tag() {
            this.item.tags.push(this.new_tag)
            this.new_tag = ''
        },
        remove_tag(tag) {
            this.deleted_tag = tag
            this.show_delete = true
        },
        confirm_delete() {
            this.item.tags = this.item.tags.filter(tag => tag != this.deleted_tag)
            this.show_delete = false
        },
        cancel_delete() {
            this.show_delete = false
        },
        targetItem(target) {
            return this.$store.getters.item(target) || {number:target, exert: 'Cannot find item'}
        }
    }
}
</script>