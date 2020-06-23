import Vue from "vue";

export const state = () => ({
  cartTotal: 0,
  cart: {},
  products: [],
  globals: [],
  coupon: 0,
});
export const mutations = {
  setCoupon(state, amount) {
    state.coupon = amount;
  },
  clearCoupon(state) {
    state.coupon = 0;
  },
  setProducts(state, products) {
    state.products = products;
  },
  setGlobals(state, globals) {
    state.globals = globals;
  },
  clearCart(state) {
    state.cart = {};
    state.cartTotal = 0;
  },
  removeItem(state, item) {
    state.cartTotal -= item.count;
    Vue.delete(state.cart, item.slug);
  },
  addToCart(state, item) {
    state.cartTotal++;
    if (item.slug in state.cart) {
      state.cart[item.slug].count++;
    } else {
      let stateItem = Object.assign({}, item);
      stateItem.count = 1;
      state.cart[item.slug] = stateItem;
    }
  },
};
export const getters = {
  products: (state) => state.products,
  cart: (state) => state.cart,
};
