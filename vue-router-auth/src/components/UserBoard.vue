<template>
  <div class="hello">
    <h1>Меню</h1>
    <ul v-for="title in msg"
    :key="title.id">
      <li><img v-bind:src="title.picture"/></li>
      <li>{{title.title}}</li>
      <li>{{title.cost}}</li>
      <div v-if="!title.inCart">
        <input v-model="title.qty" type="number" min="1" max="10" step="1" value=":title.qty">
        <button @click="add(title)">Add</button>
      </div>
      <div v-else>
        Товар был добавлен
      </div>

    </ul>
    <div id="cart-total">
      <h3>Товары в корзине <span v-if="cart.length > 0">{{cart.length}}</span></h3>

      <div v-if="cart.length > 0">
        <button @click="clearCart">Очистить корзину</button><br><br>

        <div v-for="item in cart" :key="item.id" class="cart__item">
          <span class="cart__item--title">{{item.title}}</span> <button @click="remove(item.id)">x</button><br>
          <small>x{{item.qty}} * {{item.cost}} руб. =</small><br>
          <strong>{{item.cost * item.qty}} руб.</strong>
        </div>

        <br><br>

        <strong>Total: {{total}} руб.</strong>
      </div>
      <div v-else>
        Корзина пуста
      </div>
    </div>

  </div>
</template>

<script>
  var i = 0;
  import json from '../../../data.json'
  export default {
    data () {
      return {
          msg: json.data,
          cart: [],
      }
    },
    methods: {
      saveTolocalStorageCart(){
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(this.cart));
      },
      add(title){
        this.msg[title.id-1].inCart = true;
        this.msg[title.id-1].qty = title.qty;
        this.cart.push(title);

        this.saveToLocalStorageCart();
      },
      remove(id){
        for (let index = 0; index<thus.cart.length; index++){
          const cart_item_id = thus.cart[index].id;

          if(cart_item_id == id){
            this.cart.splice(index,1);
            for (let i = 0; i<this.msg.length; i++){
              if(cart_item_id == this.msg[i].id){
                this.msg[i].inCart = false;

                this.saveTolocalStorageCart();
              }
            }
          }

          let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
          if(cartLocalStorage.length == 0){
            localStorage.removeItem("cart");
            console.clear();
          }
        }
      },
      clearCart(){
        this.cart = [];

        localStorage.removeItem("cart");
        console.clear();

        for(let i = 0; this.msg.length;i++){
          this.msg[i].inCart = false;
        }
      },
      cartLocalStorage(){
        if(localStorage.getItem("cart")){
          let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
          console.log(cartLocalStorage);
          return cartLocalStorage;
        } else {
          return [];
        }
      },
    },
    computed: {
      total(){
        let i = 0;
        for(let index = 0; index < this.cart.length; index++){
          i += this.cart[index].cost * this.cart[index].qty;
        }
        return i;
      },
    },
    mounted(){
      this.cart = this.cartLocalStorage();

      for(let index = 0; index < this.msg.length; index++){
        const title = this.msg[index];

        if(localStorage.getItem("cart")){
          let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

          for(let i = 0; i<cartLocalStorage.length; i++){
            const cartitem = cartLocalStorage[i];

            if(title.id == cartitem.id){
              title.inCart = true;
            }
          }
        }
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
