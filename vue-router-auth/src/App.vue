<template>
  <div id="app">
    <ul id="ulc">
    <li class="lic"><router-link to="/" exact active-class="active">Главная страница</router-link></li>
    <li class="lic"><router-link to="/dashboard" active-class="active">Меню</router-link></li>
    <li class="lic"><router-link to="/admin" active-class="active">Админ</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#ulc {
  list-style-type: none;
  list-style-position: inside;
  background-color: rgb(176, 255, 215);
  height: 30px;
}
.lic{
  display: inline-block;
  margin-top: 5px;
  margin-right: 50px;
}
</style>
