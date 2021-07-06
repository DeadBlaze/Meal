<template>
  <div class="hello">
    <h1>Меню</h1>
    <ul v-for="title in msg">
      <li><img v-bind:src="title.picture"/></li>
      <li>{{title.title}}</li>
      <li>{{title.cost}}</li>
      <button class="btn" @click="sendData">Add</button>

    </ul>
    <transition>
  <button v-bind:key="isEditing">
    {{ isEditing ? 'Сохранить' : 'Редактировать' }}
  </button>
</transition>
  </div>
</template>

<script>
  var i = 0;
  import json from '../../../data.json'
  export default {
    data () {
      return {
          msg: json.data
      }
    },
    computed: {},
    methods: {
      sendData(){
        console.log("Hello");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
      font-weight: normal;
  }
  ul {
      list-style-type: none;
      padding: 0;
  }
  a {
      color: #42b983;
  }
  li {
    vertical-align: middle;
      display: inline-block;
      margin: 0 0px;
  }
  img {
    width: 100px;
    height: 100px;
  }
</style>
