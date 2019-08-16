<template>
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title>
                {{ label }}
            </v-list-item-title>
            <v-list-item-subtitle>
                <strong>{{ number }}</strong> {{ exert }}
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>
<script>
export default {
    props: {
        number: {
            required: true,
            type: Number,
        },
        exert: {
            required: true,
            type: String,
        },
        label: {
            required: true,
            type: String,
        }
    },
}
</script>