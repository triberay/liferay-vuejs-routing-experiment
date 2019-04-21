<template>
    <div class="appContent">
        <h4>The Home Page</h4>
        <hr>
        <p>Home component created {{ createdCounter }} times</p>
        <p>click counter: {{ clickCounter }}</p>
        <p><button @click="increaseCounter()">Increase counter</button></p>
    </div>
</template>

<script>
    import { store } from '../store';

    export default {
        data () {
            return {
                createdCounter: store.state.createdCounter,
                clickCounter: store.state.clickCounter
            }
        },
        beforeCreate: function () {
            store.state.createdCounter = store.state.createdCounter + 1;
        },
        created: function () {
            console.log("Home component created, counter is now " + store.state.createdCounter);
        },
        destroyed: function () {
            console.log("Home component destroyed");
        },
        methods: {
            increaseCounter: function() {
                store.state.clickCounter = store.state.clickCounter + 1;
                this.clickCounter = store.state.clickCounter;
            }
        }
    }
</script>
