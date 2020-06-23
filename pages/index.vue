<template>
  <div class="row mt--30">
    <div
      class="col-lg-4 col-sm-12 col-md-6"
      v-for="product in products"
      :key="product._id"
    >
      <div class="menu__grid__item wow fadeInLeft">
        <div class="menu__grid__thumb">
          <NuxtLink to>
            <img :src="'/items/' + product.image" :alt="product.name" />
          </NuxtLink>
          <div class="grid__item__offer">
            <span>Special</span>
            <span>Offer</span>
          </div>
        </div>
        <div class="menu__grid__inner">
          <div class="menu__grid__details">
            <h2>
              <NuxtLink to>{{ product.name }}</NuxtLink>
            </h2>
            <p>
              <span v-for="sub in product.subitems" :key="sub.id">{{
                sub.name
              }}</span>
            </p>
          </div>
          <div class="grid__addto__cart__btn">
            <a
              href
              data-toggle="modal"
              data-target="#exampleModal"
              style="cursor: pointer;"
              >Add to Cart</a
            >
          </div>
        </div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {{ product.name }}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div
                    class="col-md-6 d-flex"
                    v-for="subitem in product.subitems"
                    :key="subitem.id"
                  >
                    <img :src="'/items/' + subitem.image" class="w-25" />
                    <input
                      class="ml-3 mt-1"
                      type="radio"
                      :id="subitem.id"
                      :value="subitem.id"
                      aria-label="Radio button for following text input"
                    />
                    <label class="pl-1" :for="subitem.id">{{
                      subitem.name
                    }}</label>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <div class="add__to__cart__btn">
                  <a class="food__btn">Add To Cart</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import products from "./products";
export default {
  data() {
    return {
      products,
    };
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartTotal() {
      return this.$store.state.cartTotal;
    },
    totalCost() {
      return Object.values(this.cart)
        .reduce((sum, el) => sum + el.count * el.amount, 0)
        .toFixed(2);
    },
  },
  methods: {
    addToCart(item) {
      this.$store.commit("addToCart", item);
      if (this.$store.state.coupon !== 0) {
        const cart = this.$store.getters.cart;
        const totalCost = Object.values(this.cart)
          .reduce((sum, el) => sum + el.count * el.amount, 0)
          .toFixed(2);

        const total = totalCost - parseInt(totalCost) * 0.9;
        this.$store.commit("setCoupon", total);
      }

      this.$toast.success(`${item.name} added to cart`);
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
