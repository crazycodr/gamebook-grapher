<template>
    <v-list two-line>
        <v-subheader v-if="label != ''">{{label}}</v-subheader>
        <ParagraphListItem2Lines 
            v-for="item in items" 
            :key="item.number" 
            :number="item.number" 
            :exert="item.exert" 
            :label="item.label"></ParagraphListItem2Lines>
    </v-list>
</template>
<script>
import ParagraphListItem2Lines from './ParagraphListItem2Lines'
export default {
    components: { ParagraphListItem2Lines },
    props: {
        label: {
            required: false,
            type: String,
            default: '',
        },
        items: {
            required: true,
            type: Array,
        },
    },
}
</script>