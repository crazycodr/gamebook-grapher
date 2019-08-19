<template>
    <div>
        <v-list>
            <v-subheader>Meta tags</v-subheader>
            <v-list-item>
                <v-list-item-action>
                    <v-btn icon :disabled="newTag == ''" @click="addTag">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-list-item-action>
                <v-list-item-title>
                    <v-text-field label="New tag" v-model.trim="newTag" hint="Type a single word tag to represent this paragraph"></v-text-field>
                </v-list-item-title>
            </v-list-item>
            <v-list-item v-for="tag in tags" :key="tag">
                <v-list-item-action>
                    <v-btn icon @click="() => removeTag(tag)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </v-list-item-action>
                <v-list-item-title>{{tag}}</v-list-item-title>
            </v-list-item>
        </v-list>
        <v-dialog v-model="showDelete" width="30rem">
            <v-card>
                <v-card-title class="headline" primary-title>Delete tag?</v-card-title>
                <v-card-text>Are you sure you want to delete the tag <strong>{{ deletedTag }}</strong>?</v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="confirmDelete">Yes</v-btn>
                    <v-btn color="primary" text @click="cancelDelete">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        tags: {
            required: true,
            type: Array,
        }
    },
    data() {
        return {
            newTag: '',
            showDelete: false,
            deletedTag: ''
        }
    },
    methods: {
        addTag() {
            this.$emit('addTag', this.newTag)
            this.newTag = ''
        },
        removeTag(tag) {
            this.deletedTag = tag
            this.showDelete = true
        },
        confirmDelete() {
            this.$emit('deleteTag', this.deletedTag)
            this.showDelete = false
        },
        cancelDelete() {
            this.showDelete = false
        },
    }
}
</script>