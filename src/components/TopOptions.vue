<template>
  <v-container>
      <v-row align="start">
          <!-- String Selection -->
          <v-col cols="auto">
              <v-menu offset-y>
                  <template v-slot:activator="{on, attrs}">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on"># Of Strings</v-btn>
                  </template>
                  <v-list>
                      <v-list-item v-for="(item, index) in getNumberOfStringsList" :key="index" @click="changeNumberOfStrings(item)">
                          <v-list-item-title>{{item}}</v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>
              <div style="float: right;" class="pl-5 pt-2">Selected # of Strings: {{getSeletectedNumberOfStrings}}</div>
          </v-col>
          <!-- Tuning -->
          <v-col cols="auto">
              <v-menu offset-y>
                  <template v-slot:activator="{on, attrs}">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on">Tunings</v-btn>
                  </template>
                  <v-list>
                      <v-list-item v-for="(item, index) in getTuningList" :key="index" @click="changeTuning(item)">
                          <v-list-item-title>{{item}}</v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>
              <div style="float: right;" class="pl-5 pt-2">Selected Tuning: {{getSelectedTuning}}</div>
          </v-col>
          <!-- Drop Tuning Toggle -->
          <v-col cols="auto" class="pt-0">
                <v-switch v-model="dropTuningToggle" :label="`Drop Tuning: ${dropTuningToggle.toString()}`" ></v-switch>
          </v-col>
          <!-- Drop tuning degree -->
          <v-col cols="auto">
              <v-menu offset-y>
                  <template v-slot:activator="{on, attrs}">
                      <v-btn color="primary" :disabled="!dropTuningToggle" :dark="dropTuningToggle" v-bind="attrs" v-on="on">Drop Tunings</v-btn>
                  </template>
                  <v-list>
                      <v-list-item v-for="(item, index) in getDropTuningDegreeList" :key="index" @click="changeDropTuning(item)">
                          <v-list-item-title>{{item}}</v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>
              <div :hidden="!dropTuningToggle" style="float: right;" class="pl-5 pt-2">Drop tuning degree: {{getSelectedDropTuning}}</div>
          </v-col>
          <v-col>
              <v-btn color="primary" @click="clearAll">Clear All</v-btn>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
//import Tabulature1 from 'vue-music-notation/src/components/Tabulature.vue'
export default {
    components: { 
        //Tabulature1
    },
    data() {
        return {
            dropTuningToggle: false,
            tabulatureArray: []
        }
    },
    watch: {
        dropTuningToggle(){
            this.$store.dispatch('changeDropTuningEnabled', this.dropTuningToggle)
        }
    },
    methods: {
        changeTuning(item) {
            this.$store.dispatch('changeTuning', item)
        },
        changeNumberOfStrings(item) {
            this.$store.dispatch('changeNumberOfStrings', item)
        },
        changeDropTuningEnabled(item) {
            this.$store.dispatch('changeDropTuningEnabled', item)
        },
        changeDropTuning(item) {
            this.$store.dispatch('changeDropTuning', item)
        },
        clearAll() {
            this.$store.dispatch('clearAll', true)
        }
    },
    computed: {
        getTuningList() {
            return this.$store.state.tuningsList
        },
        getSelectedTuning() {
            return this.$store.state.selectedTuning
        },
        getNumberOfStringsList() {
            return this.$store.state.numberOfStringsList
        },
        getSeletectedNumberOfStrings() {
            return this.$store.state.seletectedNumberOfStrings
        },
        getDropTuningDegreeList() {
            return this.$store.state.dropTuningDegreeList
        },
        getSelectedDropTuning() {
            return this.$store.state.selectedDropTuning
        },
        
    }
}
</script>

<style>

</style>