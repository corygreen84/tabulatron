<template>
    <v-container>
        <v-row class="pa-0">
            <v-col cols="auto" v-for="(i, index) in 18" :key="index">
                <v-container v-if="index === 0" class="pa-0">
                    <v-row v-for="(j, ind) in returnOverallTuning" :key="ind" style="width: 60px; height: 30px;">
                        <v-text-field class="centered-input" :value="j" readonly></v-text-field>
                    </v-row>
                </v-container>
                <Chord :tabColumn="i" v-else/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Chord from './Chord.vue'
export default {
    components: {
        Chord
    },
    data() {
        return {
            numberOfColumns: 18
        }
    },
    mounted() {
        this.$store.dispatch('changeColumnCount', this.numberOfColumns)
    },
    computed: {
        clearAll() {
            return this.$store.state.clearAll
        },
        figureDropTuning() {
            let notes = this.$store.state.tuningsList
            let selectedTuning = this.$store.state.selectedTuning
            let dropTunedDegree = this.$store.state.selectedDropTuning

            let currentTuningIndex = notes.indexOf(selectedTuning)
            if(dropTunedDegree !== 0){
                currentTuningIndex = notes.indexOf(selectedTuning) + dropTunedDegree
                if(currentTuningIndex < 0) {
                    currentTuningIndex = notes.length - Math.abs(currentTuningIndex)
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
    },
}
</script>

<style scoped>
    .centered-input >>> input{
        text-align: center; 
        color: red;
    }
    .v-text-field >>> .v-input__slot:before {
        border-style: none;
    } 
    .v-text-field >>> .v-input__slot::before {
        padding-top: 17px;
        border-color: white;
    }

</style>