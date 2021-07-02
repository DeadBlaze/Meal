<template>
  <body>
  <div class="hello">
    <h1>Welcome to administrator page</h1>
    <h2>{{msg}}</h2>

    <h2>Enter link: </h2>
    <form action="/forma" method="post">
        <label>Site</label><br>
        <input id="site" type="text" v-model="site" /><br><br>
        <button type="submit" @click="handleSubmit">
          Парсить
        </button>
    </form>
  </div>
</body>
</template>
<script>
  export default {
    data () {
      return {
        msg: 'The superheros'
      }
    },
    methods : {
      handleSubmit(e){
        e.preventDefault()
        if (this.site.length > 0) {
          this.$http.post('http://localhost:9000/forma', {
            site: this.site
          })
          .then(response => {
          })
          .catch(function (error) {
            console.error(error.response);
          });
        }
      }
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
