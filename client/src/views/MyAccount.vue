<template>
    <div class="page-my-account">
        <div class="column is-12">
            <h1 class="title">My Account</h1>
        </div>
        <div class="column is-12">
            <button @click="logOut" class="button is-danger">Log Out</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'MyAccount',
    methods: {
        logOut() {
            axios.defaults.headers.common['Authorization'] = ""
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('userid')
            this.$store.commit('removeToken')
            this.$router.push('/')
        }
    }
}
</script>