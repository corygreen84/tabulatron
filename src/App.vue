<template>
  <v-app>
    <v-main>
      <v-container>
      <TopOptions />
      <NewTabulature />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TopOptions from './components/TopOptions'
import NewTabulature from './components/NewTablature.vue'

export default {
  name: 'App',

  components: {
    TopOptions,
    NewTabulature,
  },
  data: () => ({
    //
  }),
};
</script>
