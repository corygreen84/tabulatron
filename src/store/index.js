import Vue from 'vue'
import Vuex from 'vuex'
import chordPatterns from './modules/chordPatterns'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tuningsList: ['A','A♯/B♭','B','C','C♯/D♭','D','D♯/E♭','E','F','F♯/G♭','G','G♯/A♭'],
        selectedTuning: 'E',
        overallTuningNotes: [],
        overallTuningIndexes: [],
        numberOfStringsList: [4,5,6,7,8,9],
        seletectedNumberOfStrings: 6,
        dropTuningDegreeList: [-5, -4, -3, -2, -1, 0],
        selectedDropTuning: 0,
        clearAll: false,
        clearTab: false,

        columnCount: 0,

        // this is the main tab mapping array //
        mainTabMapping: []
    },
    mutations: {
        setSelectedTuning(state, payload) {
            state.selectedTuning = payload
        },
        setTuningNotes(state, payload){
            state.overallTuningNotes = payload
        },
        setTuningIndexes(state, payload) {
            state.overallTuningIndexes = payload
        },
        setSelectedNumberOfStrings(state, payload) {
            state.seletectedNumberOfStrings = payload
        },
        setSelectedDropTuning(state, payload) {
            state.selectedDropTuning = payload
        },
        setTabMappingArray(state, payload) {
            state.mainTabMapping = payload
        },
        setClearTab(state, payload) {
            state.clearTab = payload
        },
        clearAll(state, payload) {
            state.clearAll = payload
        },

        setNumberOfColumns(state, payload) {
            state.columnCount = payload
        }

    },
    actions: {
        changeTuning({commit}, status) {
            commit('setSelectedTuning', status)
        },
        changeTuningNotes({commit}, status) {
            commit('setTuningNotes', status)
        },
        changeTuningIndexes({commit}, status) {
            commit('setTuningIndexes', status)
        },
        changeNumberOfStrings({commit}, status) {
            commit('setSelectedNumberOfStrings', status)
        },
        changeDropTuning({commit}, status) {
            commit('setSelectedDropTuning', status)
        },
        changeTabMapping({commit}, status) {
            commit('setTabMappingArray', status)
        },
        clearTab({commit}, status) {
            commit('setClearTab', status)
        },
        clearAll({commit}, status) {
            commit('clearAll', status)
        },
        changeColumnCount({commit}, status) {
            commit('setNumberOfColumns', status)
        }
    },
    modules: {
        chordPatterns
    }
})