<template>
    <div class="appContent">
        <h4>Users Page</h4>
        <hr>
        <router-view></router-view>
        <hr>
        <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
    </div>
</template>

<script>
    export default {
        methods: {
            navigateToHome() {
                this.$router.push({ name: 'home' });
            }
        }
    }
</script>
