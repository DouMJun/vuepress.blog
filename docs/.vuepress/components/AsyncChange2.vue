<template>
  <div id='ac2'>
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
        var that = this
        for(let i = 0; i < 100; i++){
          setTimeout(function(){
            that.number++
          },i*10)
        }
        console.log(this.number);
      }
    }
  }
</script>

<style scoped>
#ac2{
  margin-left: 2rem;
}
</style>