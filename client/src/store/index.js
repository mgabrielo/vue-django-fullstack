import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: []
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
      if (localStorage.getItem('token')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
        state.isAuthenticated = true
      } else {
        state.isAuthenticated = false
        state.token = ''
      }
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter((itm) => itm.product.id === item.product.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state, token) {
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
