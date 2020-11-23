<template>
  <div class="container">
    <div class="content">
      <header>
        <Content slot-key="header"/>
      </header>
      <main>
        <Content/>
      </main>
      <footer>
        <Content slot-key="footer"/>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test'
}

new Vue()
</script>

<style scoped>
  * {
    margin: 0;
  }
  .container {
    background-color: black;
  }
  .content {
    margin: 0;
    width: 50%;
  }
</style>