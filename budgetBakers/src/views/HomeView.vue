<template>
  <div class="container">
    <div class="flex flex-col min-h-screen justify-content-center">
      <div class="w-1/2 m-auto text-center">
        <div class="card">
          <div v-if="user.loggedIn">

            <div class="card-header">Welcome, {{ user.data.displayName }}</div>
            <div class="card-body">
              <div class="alert alert-success" role="alert">
                You are logged in!
              </div>
            </div>

          </div>
          <div v-else class="alert alert-danger" role="alert">
            You are not logged in! Please login to continue.
            <router-link :to="`/login`">Login</router-link>
            <router-link :to="`/signup`">Signup</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import { auth } from "../firebaseConfig";


export default {
  setup() {

    const store = useStore()
    const router = useRouter()

    auth.onAuthStateChanged(user => {
      store.dispatch("fetchUser", user);
    });

    const user = computed(() => {
      return store.getters.user;
    });

    return { user }
  }



};
</script>
