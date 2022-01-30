<template>
  <v-container class="pa-0">
      <v-row v-for="(i, index) in getCurrentStringCount + 1" :key="index" style="width: 40px; height: 30px;">
          <v-text-field v-if="index === getCurrentStringCount" class="centered-input small-text-size" @input="tabEntered($event, i)" v-model="chordName"></v-text-field>
          <v-text-field v-else class="centered-input" @input="tabEntered($event, i)"></v-text-field>
      </v-row>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            chord: [],
            chordName: '',
            currentTuning: [],
            rootNote: null
        }
    },
    props: {    
        tabColumn: {
            default: 0
        },
    },
    computed: {
        getCurrentStringCount() {
            return this.$store.state.seletectedNumberOfStrings
        },
    },
    methods: {
        tabEntered($event, i){
            if($event !== ''){
                let note = {
                    fret: $event,
                    string: i,
                    stringNote: this.getCurrentTuning()[i - 1],
                    newNote: ''
                }
                let returnedNote = this.noteName(note)
                note.newNote = returnedNote

                if(this.chord.length === 0){
                    this.chord.push(note)
                }
                
                // checking to see if a note exists on the string already //
                // if it does, replace it with whats on the fret //
                // if not, then add it //
                const index1 = this.chord.findIndex(ele => ele.string === note.string)
                if(index1 !== -1) {
                    this.chord[index1] = note
                }else{
                    this.chord.push(note)
                }
            }else{
                // if the string is empty, remove it from the array //
                const index2 = this.chord.findIndex(ele => ele.string === i)
                if(index2 !== -1) {
                    this.chord.splice(index2, 1)
                }
            }
            this.analyzingNotes()
        },
        getCurrentTuning() {
            return this.$store.state.overallTuningNotes
        },
        noteName(note) {
            let currentTuning = this.getCurrentTuning()
            let notes = this.$store.state.tuningsList

            let startingNote = currentTuning[note.string - 1]
            let enteredNoteIndex = notes.indexOf(startingNote) + parseInt(note.fret)

            let actualNoteIndex = enteredNoteIndex % notes.length
            return notes[actualNoteIndex]
        },






        analyzingNotes() {

            // first I think I need to get my chord note count //
            let noteCountInChord = this.chord.length
            console.log(noteCountInChord)
            // then I need to get the root note //
            this.rootNote = this.figureOutRootNote()
            console.log(this.rootNote.newNote)
        },

        figureOutRootNote() {
            this.chord.sort(function (a, b) {
                return a.string - b.string;
            })
            return this.chord[this.chord.length - 1]
        }
    },
}
</script>


















<style scoped>
    .centered-input >>> input{
        text-align: center; 
        color: blue;
        
    }
    .small-text-size {
        font-size: 10px;
    }
    .v-text-field >>> .v-input__slot::before {
        padding-top: 17px;
        border-color: white;
    }
</style>