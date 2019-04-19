<template>
    <div>
        <h3>Edit the User</h3>
        <p>User loaded has ID: {{ $route.params.id }}</p>
        <p>Locale: {{ $route.query.locale }}</p>
        <p>Analytics: {{ $route.query.q }}</p>
        <hr>
        <button class="btn btn-primary" @click="goBack">Back to user detail</button>
        <button class="btn btn-primary" @click="confirmed = true">Confirm</button>
        <br/>
        <a href="#data">data</a>
        <div style="height: 700px"></div>
        <p id="data">Some extra Data</p>
    </div>
</template>

<script>
    export default {
        data() {
          return {
              confirmed: false
          }
        },
        methods: {
            goBack() {
                this.$router.push('/users/' + this.$route.params.id);
            }
        }
    }
</script>
