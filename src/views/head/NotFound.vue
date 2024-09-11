<template>
  <div>
    <h1 style="text-align: center; margin-top: 50px;"> 抱歉，该功能尚未开发！ </h1>
    <p style="text-align: center; margin-top: 18px; color: #888888;"> @Web大作业2024 </p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
* {
  line-height: 1.2;
  margin: 0;
}

html {
  color: #888;
  display: table;
  font-family: sans-serif;
  height: 100%;
  text-align: center;
  width: 100%;
}

body {
  display: table-cell;
  vertical-align: middle;
  margin: 2em auto;
}

h1 {
  color: #555;
  font-size: 2em;
  font-weight: 400;
}

p {
  margin: 0 auto;
  width: 280px;
}

@media only screen and (max-width: 280px) {
  body,
  p {
    width: 95%;
  }

  h1 {
    font-size: 1.5em;
    margin: 0 0 0.3em;
  }
}
</style>