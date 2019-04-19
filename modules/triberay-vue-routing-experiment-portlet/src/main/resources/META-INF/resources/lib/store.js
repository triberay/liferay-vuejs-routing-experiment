import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        createdCounter: 0,
        clickCounter: 0
    }
});
