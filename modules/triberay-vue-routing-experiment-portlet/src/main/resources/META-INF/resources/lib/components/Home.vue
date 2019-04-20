<template>
    <div class="appContent">
        <h4>The Home Page</h4>
        <hr>
        <p>created method called {{ createdCounter }} times</p>
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
        created: function () {
            store.state.createdCounter = store.state.createdCounter + 1;
            console.log("created method, counter is now " + store.state.createdCounter);
        },
        methods: {
            increaseCounter: function() {
                store.state.clickCounter = store.state.clickCounter + 1
                this.clickCounter = store.state.clickCounter;
            }
        }
    }
</script>
