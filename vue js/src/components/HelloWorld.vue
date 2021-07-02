<template>
<div class="hello">
<h1>Добро пожаловать на наш сайт!</h1>
<h2>Наш вариант: BAUART Meal Техническое задание (Альтернативное v.1 Node.js)</h2>
    <button type="submit" @click="handleSubmit1">
        Login
    </button>
    <button type="submit" @click="handleSubmit2">
        Register
    </button>
</div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        handleSubmit1() {
            this.$router.push('login')
        },
        handleSubmit2() {
          this.$router.push('register')
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h1,
h2 {
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
