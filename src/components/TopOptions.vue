<template>
  <v-container>
      <v-row align="start">
          <!-- String Selection -->
          <v-col cols="auto">
              <v-menu offset-y>
                  <template v-slot:activator="{on, attrs}">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on"># Of Strings: {{getSeletectedNumberOfStrings}}</v-btn>
                  </template>
                  <v-list>
                      <v-list-item v-for="(item, index) in getNumberOfStringsList" :key="index" @click="changeNumberOfStrings(item)">
                          <v-list-item-title>{{item}}</v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>
          </v-col>
          <!-- Tuning -->
          <v-col cols="auto">
              <v-menu offset-y>
                  <template v-slot:activator="{on, attrs}">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on">Tuning: {{getSelectedTuning}}</v-btn>
                  </template>
                  <v-list>
                      <v-list-item v-for="(item, index) in getTuningList" :key="index" @click="changeTuning(item)">
                          <v-list-item-title>{{item}}</v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>
          </v-col>
          <!-- Drop tuning degree -->
          <v-col cols="auto">
              <v-menu offset-y>
                  <template v-slot:activator="{on, attrs}">
                      <v-btn color="primary" v-bind="attrs" v-on="on">Drop Tuning: {{getSelectedDropTuningNote}}</v-btn>
                  </template>
                  <v-list>
                      <v-list-item v-for="(item, index) in getDropTuningDegreeList" :key="index" @click="changeDropTuning(item)">
                          <v-list-item-title>{{item}}</v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>
          </v-col>
          <v-col cols="auto">
              <v-btn color="green" @click="clearTab">Reset Tab</v-btn>
          </v-col>
          <v-col cols="auto">
              <v-btn color="green" @click="clearAll">Reset All</v-btn>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    components: { 
    },
    data() {
        return {
            tabulatureArray: []
        }
    },
    methods: {
        changeTuning(item) {
            this.$store.dispatch('changeTuning', item)
        },
        changeNumberOfStrings(item) {
            this.$store.dispatch('changeNumberOfStrings', item)
        },
        changeDropTuning(item) {
            this.$store.dispatch('changeDropTuning', item)
        },
        clearTab() {
            console.log('clear tab hit')
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
        getSelectedDropTuningNote() {
            let notes = this.getTuningList
            let selectedTuning = this.getSelectedTuning
            let dropTuningDegree = Math.abs(this.$store.state.selectedDropTuning)

            let currentTuningIndex = notes.indexOf(selectedTuning)
            let newTuningIndex = (currentTuningIndex - dropTuningDegree)
            if(newTuningIndex < 0){
                let tempNewTuningIndex = newTuningIndex
                newTuningIndex = notes.length + tempNewTuningIndex
            }
            let newNote = notes[newTuningIndex]
            return newNote
        },
        getSelectedDropTuning() {
            return this.$store.state.selectedDropTuning
        },
        
    }
}
</script>

<style>

</style>