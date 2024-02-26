<template>
  <section class="hero is-medium is-dark mb-6">
    <div class="hero-body has-text-centered">
      <p class="title mb-6">Welcome DjVueCommerce</p>
      <p class="subtitle">The best ecommerce in the world</p>
    </div>
  </section>
  <div class="columns is-multiline">
    <div class="column is-12">
      <h2 class="is-size-2 has-text-centered">Latest products</h2>
    </div>
    <div class="column is-3" v-for="product in latestProducts" v-bind:key="product.id">
      <div class="box">
        <figure class="image mb-4">
          <img v-bind:src="product.get_thumbnail" />
        </figure>
        <h3 class="is-size-4">{{ product.name }}</h3>
        <p class="is-size-6 has-text-gray">{{ product.price }}</p>
        View Details
        <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'HomeView',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {},
  mounted() {
    this.getLatestProducts()
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)

      axios.get('/api/v1/latest-products').then((res) => {
        this.latestProducts = res.data
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.$store.commit('setIsLoading', false)
      })
    }
  }
}
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>