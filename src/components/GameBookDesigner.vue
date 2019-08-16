<template>
    <div class="gamebook-designer">
        <Browser class="browser"></Browser>
        <Editor v-if="this.currentItem != null" class="editor"></Editor>
    </div>
</template>

<script>
import Browser from './Browser'
import Editor from './Editor'
export default {
    components: {
        Browser, Editor
    },
    computed: {
        currentItem() {
            return this.$store.getters.currentItem
        },
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