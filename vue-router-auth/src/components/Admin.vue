<template>
<body>
    <div class="hello">
        <h1>Меню Администратора</h1>
        <h2>{{msg}}</h2>

        <h2>Enter link: </h2>
        <form>
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
    data() {
        return {
            msg: 'Ссылка на ресторан',
            site: ""
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            if (this.site.length > 0) {
                this.$http.post('http://localhost:9000/admin', {
                        site: this.site
                    })
                    .then(response => {
                        console.log(123)
                        this.$router.push('dashboard')
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
