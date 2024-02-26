<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Search</h1>
                <h2 class="is-size-5 has-text-grey">Search Term: "{{ query }}"</h2>
            </div>
            <div class="column is-3" v-for="product in products" v-bind:key="product.id">
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
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Search',
    data() {
        return {
            products: [],
            query: ''
        }
    },
    mounted() {
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)
        if (params.get('query')) {
            this.query = params.get('query')

            this.performSearch()
        }
    },
    methods: {
        async performSearch() {
            this.$store.commit('setIsLoading', true)
            await axios.post('/api/v1/products/search/', { 'query': this.query }).then((res) => {
                this.products = res.data
            }).catch((err) => {
                console.log(err)
            })
            this.$store.commit('setIsLoading', false)
        }
    },
}
</script>