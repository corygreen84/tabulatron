<template>
  <v-container class="pa-0">
      <v-row class="pa-0" style="height: 30px;">
          <div style="padding-top: 20px; padding-right: 10px; padding-left: 10px;"></div>
          <v-text-field readonly single-line v-for="(j, column) in 20" :key="column" style="width: 20px;" class="centered-input" :label="`${column}`"></v-text-field>
      </v-row>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            mainTab: []
        }
    },
    watch: {
        '$store.state.mainTabMapping': {
            handler(){
                this.mainTab = this.$store.state.mainTabMapping
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<style scoped>
    .centered-input >>> .v-label{
        text-align: center; 
        padding-left:22px; 
    }
    .v-text-field .v-label {
        padding-left:10px; 
    }
</style>