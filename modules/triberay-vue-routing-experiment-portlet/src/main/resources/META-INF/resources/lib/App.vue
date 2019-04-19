<template>
    <div id="routing-app">
        <app-header></app-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from './components/Header.vue';
    export default {
        components: {
            appHeader: Header
        }
    }
</script>

<style lang="scss">
    #routing-app {
        padding: 10px;

        button {
            margin: 2px;
        }
    }
</style>
