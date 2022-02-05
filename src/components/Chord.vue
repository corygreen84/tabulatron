<template>
  <v-container class="pa-0">
      <v-row v-for="(i, index) in getCurrentStringCount + 1" :key="index" style="width: 60px; height: 30px;">
          <v-text-field v-if="index === getCurrentStringCount" outlined readonly hide-details="" class="centered-input small-text-size rotated ml-0 mt-5" v-model="chordName"></v-text-field>
          <v-text-field v-else :class="`centered-input ${tabColumn}`" v-model="arrayOfTabNotes[i]" @input="tabEntered($event, i)"></v-text-field>
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
            rootNote: null,
            arrayOfTabNotes: []
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
        clearTab() {
            return this.$store.state.clearTab
        }
    },
    watch: {
        clearTab() {
            this.chord = []
            this.currentTuning = []
            this.rootNote = null
            this.chordName = ''
            this.arrayOfTabNotes = []

            if(this.tabColumn === this.$store.state.columnCount) {
                this.$store.dispatch('clearTab', false)
            }
        }
    },
    methods: {
        tabEntered($event, i){
            if($event !== ''){
                let note = {
                    fret: $event,
                    string: i,
                    stringNote: this.getCurrentTuning()[i - 1],
                    newNote: '',
                    newNoteIndex: 0
                }
                let returnedNote = this.noteName(note)
                note.newNote = returnedNote
                
                let returnedIndex = this.noteIndex(note.newNote)
                note.newNoteIndex = returnedIndex

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
        noteIndex(note) {
            let notes = this.$store.state.tuningsList
            let index = notes.indexOf(note)
            return index
        },
        figureOutRootNote() {
            this.chord.sort(function (a, b) {
                return a.string - b.string;
            })
            return this.chord[this.chord.length - 1]
        },

        analyzingNotes() {
            this.rootNote = this.figureOutRootNote()
            let noteCountInChord = this.chord.length
            let notes = this.$store.state.tuningsList
            if(noteCountInChord === 0){
                // zeroing out the chord name since nothing exists //
                this.chordName = ''
            }else if(noteCountInChord === 1){
                // using the root note of the chord name if theres only one note present //
                this.chordName = ''
                this.chordName = this.rootNote.newNote
            }else{
                // if theres more than one note present, then we need to analyze the notes //
                // need to create an array of intervals from the root note to all other notes //
                this.chordName = ''
                let noteIntervals = []
                let rootNoteIndex = this.rootNote.newNoteIndex
                for(var j in this.chord) {
                    let distance
                    if(rootNoteIndex === this.chord[j].newNoteIndex){
                        distance = 0
                    }else{
                        let differenceBetweenRoot = notes.length - rootNoteIndex
                        distance = differenceBetweenRoot + this.chord[j].newNoteIndex
                        distance = distance % notes.length
                    }
                    noteIntervals.push(distance)
                }

                // removing duplicate intervals //
                let uniqueIntervals = noteIntervals.filter((c, index) => {
                    return noteIntervals.indexOf(c) === index;
                });

                uniqueIntervals.sort(function(a, b) {
                    return a - b;
                });
                // analyzing this pattern with our chord patterns //
                let allPatternObject = this.$store.state.chordPatterns.allPatterns
                let chordName = ''
                for(var l in allPatternObject){
                    let chordFormation = JSON.stringify(allPatternObject[l])
                    let chordInterval = JSON.stringify(uniqueIntervals)
                    if(chordFormation === chordInterval){
                        chordName = l
                        break
                    }
                }
                this.chordName = this.rootNote.newNote + ' ' + chordName
            }
        },
        
    },
}
</script>


















<style scoped>
    .centered-input >>> input{
        text-align: center; 
        color: white;
    }
    .rotated {
        transform: rotate(90deg);
    }
    .rotated >>> .v-input__slot{
        width: 150px;
    }
    .small-text-size {
        font-size: 10px;
    }
    .v-text-field >>> .v-input__slot:before {
        border-style: none;
    } 
    .v-text-field >>> .v-input__slot::before {
        padding-top: 17px;
        
    }
</style>