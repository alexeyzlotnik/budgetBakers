<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted } from "vue";
import { auth } from "./firebaseConfig";

    const store = useStore()
    const router = useRouter()

    auth.onAuthStateChanged(user => {
      store.dispatch("fetchUser", user);
    });

    const user = computed(() => {
      return store.getters.user;
    });

    const signOut = async () => {
      await store.dispatch('logOut')
      router.push('/')
    }

</script>

<template>
  <header>
    <div class="container m-auto">
    <router-link :to="`/`"><img alt="Vue logo" class="logo" src="@/assets/img/logo.svg" width="60" height="60" /></router-link>

      <nav class="flex gap-5 items-center">
        <template v-if="user.loggedIn">
          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <RouterLink to="/records">Records</RouterLink>
            <RouterLink to="/test">Test</RouterLink>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+ Record</button>
          <button @click.prevent="signOut" class="btn btn-primary">Log Out</button>
        </template>

        <template v-else>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/signup">Signup</RouterLink>
        </template>

      </nav>
    </div>
  </header>

  <RouterView/>
</template>

