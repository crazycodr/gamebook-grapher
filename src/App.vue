<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>GameBook</span>
        <span class="font-weight-light">Designer</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
        <!-- Provides the application the proper gutter -->
        <v-container fluid fill-height>
            <GameBookDesigner class="designer"></GameBookDesigner>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
import GameBookDesigner from './components/GameBookDesigner'

export default {
  name: 'App',
  components: {
    GameBookDesigner
  },
};
</script>

<style lang="scss" scoped>
.designer {
    display: flex;
    width: 100%;
    height: 100%;
}
</style>