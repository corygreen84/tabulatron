<template>
  <v-app>
    <v-main>
        <v-row class="pt-10">
          <v-col cols="10">
            <NewTabulature />
            
          </v-col>
          <v-col cols="2">
            <TopOptions />
          </v-col>
        </v-row>
        <Key style="margin-top: 120 px; margin-left: 80px; margin-right: 80px;"/>
        
    </v-main>
  </v-app>
</template>

<script>
import TopOptions from './components/TopOptions'
import NewTabulature from './components/NewTablature.vue'
import Key from './components/Key.vue'

export default {
  name: 'App',

  components: {
    TopOptions,
    NewTabulature,
    Key
  },
  computed: {
    clearAll() {
        return this.$store.state.clearAll
    },
  },
  watch: {
    clearAll() {
        window.location.reload()
    },
  },
  data: () => ({
    //
  }),
};
</script>
