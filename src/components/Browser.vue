<template>
    <v-card tile>
        <v-list>
            <v-subheader>Paragraph browser</v-subheader>
            <v-list-item-group v-model="currentItemNumber" color="primary">
                <v-list-item v-for="item in items" :key="item.number" :value="item.number">
                    <v-list-item-content>
                        <v-list-item-title>
                            <strong>{{ item.number }}</strong> {{ item.exert }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
export default {
    computed: {
        items() {
            return this.$store.getters.items
        },
        currentItemNumber: {
            get(){
                const currentItem = this.$store.getters.currentItem || { number: 0 }
                return currentItem.number
            },
            set(value){
                this.$store.commit('setCurrentItemByNumber', value)
            }
        },
        currentItem() {
            return this.$store.getters.currentItem || { number: 0 }
        },
    }
}
</script>
<style lang="scss" scoped>
strong {
    display: inline-block;
    width: 3rem;
    text-align: right;
    margin-right: 1rem;
}
</style>