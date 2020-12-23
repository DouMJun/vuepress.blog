<template>
  <div id="ac1">
    <div id="number" >{{number}}</div>
    <button @click="click">click</button>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        number: 0
      }
    },
    methods: {
      click() {
        for(let i = 0; i < 100; i++){
          this.number++
        }
        console.log(this.number);
      }
    }
  }
</script>
<style scoped>
#ac1{
  margin-left: 2rem;
}
</style>