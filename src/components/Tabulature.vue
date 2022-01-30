<template>
  <v-container class="pa-0">
      <v-row v-for="(i, string) in returnOverallTuning" :key="string" class="pa-0" style="height: 30px;">
          <div style="padding-top: 20px; padding-right: 10px;">{{i}}</div>
          <v-text-field single-line v-for="(j, column) in 20" :key="column" style="width: 20px;" class="centered-input" @input="tabField($event, string, column)"></v-text-field>
      </v-row>
  </v-container>
</template>

<script>
export default {
    data(){
        return {
            tabMap: []
        }
    },
    methods: {
        tabField($event, string, column){
            if($event === ''){
                delete this.tabMap[string + '-' + column]
            }else{
                //this.tabMap[string + '-' + column] = $event
                let tab = {
                    column: column,
                    string: string,
                    fret: $event
                }
                this.tabMap.push(tab)
            }
            this.$store.dispatch('changeTabMapping', this.tabMap)
        }
    },
    watch: {
        clearAll(){
            // clear all pressed //
        }
    },
    computed: {
        clearAll() {
            return this.$store.state.clearAll
        },
        figureDropTuning() {
            let notes = this.$store.state.tuningsList
            let selectedTuning = this.$store.state.selectedTuning
            let dropTuned = this.$store.state.dropTuningEnabled
            let dropTunedDegree = this.$store.state.selectedDropTuning

            let currentTuningIndex = notes.indexOf(selectedTuning)
            if(dropTuned) {
                currentTuningIndex = notes.indexOf(selectedTuning) + dropTunedDegree
                if(currentTuningIndex < 0) {
                    currentTuningIndex = Math.abs(currentTuningIndex)
                }
            }
            // if not drop tuned then we just return the selected tuning without it //
            return notes[currentTuningIndex]
        },
        returnOverallTuning() {
            let returnArrayOfNotes = []
            let returnArrayOfIndexes = []
            let notes = this.$store.state.tuningsList

            // getting the first note (lowest string) //
            let firstNote = this.figureDropTuning
            let firstNoteIndex = notes.indexOf(firstNote)

            // pushing the first note and index into the arrays //
            returnArrayOfNotes.push(firstNote)
            returnArrayOfIndexes.push(firstNoteIndex)

            // taking into account number of strings //
            let stringCount = this.$store.state.seletectedNumberOfStrings

            let startingNote = this.$store.state.selectedTuning
            let startingIndex = notes.indexOf(startingNote)

            // going forward we will actually be figuring out the series off notes after the //
            // first note //
            for(let i = 1; i < stringCount; i++) {
                if(i === 4 && stringCount !== 5){
                    startingIndex = startingIndex + 4
                }else{
                    startingIndex = startingIndex + 5
                }
                if(startingIndex > notes.length - 1){
                    startingIndex = startingIndex - notes.length
                }
                returnArrayOfNotes.push(notes[startingIndex])
                returnArrayOfIndexes.push(startingIndex)
            }

            this.$store.dispatch('changeTuningNotes', returnArrayOfNotes)
            this.$store.dispatch('changeTuningIndexes', returnArrayOfIndexes)

            return returnArrayOfNotes.reverse()
        }
    }
}
</script>











<style scoped>
    .centered-input >>> input{
        text-align: center; 
        color: blue;
    }

    .v-text-field >>> .v-input__slot::before {
        padding-top: 17px;
    }

</style>