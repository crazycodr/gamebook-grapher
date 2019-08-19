<template>
    <v-card tile>
        <v-list :two-line="expandedMode">
            <v-subheader>{{ label }}</v-subheader>
            <template v-if="canAdd">
                <v-list-item>
                    <v-list-item-action>
                        <v-btn icon :disabled="newItem == ''" @click="addItem">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-title>
                        <v-text-field label="New item" v-model.trim="newItem" hint="Type the number of the paragraph to add"></v-text-field>
                    </v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
            </template>
            <v-list-item-group v-model="currentParagraph" @change="validateChange">
                <v-list-item v-for="item in items" :key="item.number" :value="item.number" color="primary">
                    <v-list-item-action v-if="canDelete">
                        <v-btn icon>
                            <v-icon>delete</v-icon>
                        </v-btn>
                        <v-dialog v-model="showDelete" width="30rem">
                            <v-card>
                                <v-card-title class="headline" primary-title>Delete item?</v-card-title>
                                <v-card-text>Are you sure you want to delete this item?</v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="confirmDelete">Yes</v-btn>
                                    <v-btn color="primary" text @click="cancelDelete">No</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-if="!expandedMode">
                            <strong class="number">{{ item.number }}</strong> {{ item.exert }}
                        </v-list-item-title>
                        <v-list-item-title v-if="expandedMode">
                            <strong>{{ item.question }}</strong>: {{ item.label }}
                        </v-list-item-title>
                        <v-list-item-subtitle v-if="expandedMode">
                            <strong class="number">{{ item.number }}</strong> {{ item.exert }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
export default {
    props: {
        items: {
            required: true,
            type: Array,
        },
        item: {
            required: false,
            type: Object,
            default: undefined,
        },
        label: {
            required: false,
            type: String,
            default: 'Browser',
        },
        expandedMode: {
            required: false,
            type: Boolean,
            default: false,
        },
        canAdd: {
            required: false,
            type: Boolean,
            default: false,
        },
        canDelete: {
            required: false,
            type: Boolean,
            default: false,
        },
    },
    data(){
        return {
            newItem: '',
        }
    },
    computed: {
        currentParagraph: {
            get(){
                if ( this.item != undefined ) {
                    return this.item.number
                }
                return undefined
            },
            set(value) {
                if (value == undefined) {
                    return;
                }
                this.$emit('loadItem', value)
            }
        }
    },
    methods: {
        validateChange(value) {
            if (value == undefined) {
                return false
            }
        },
        addItem() {
            this.$emit('addItem', this.newItem)
        }
    }
}
</script>

<style lang="scss" scoped>
.number {
    display: inline-block;
    width: 3rem;
    text-align: right;
    margin-right: 1rem;
}
</style>