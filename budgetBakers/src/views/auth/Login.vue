<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-md-8">
            <div class="card">
               <div class="card-header text-xl text-center mb-5">Login</div>
               <div class="card-body">
                  <div v-if="error" class="border-2 border border-red-600 p-3 w-1/2 m-auto mb-10 text-red-600">{{ error }}</div>

                  <template v-if="loading">
                     Loading...
                  </template>

                   <template v-else>
                     <form class="flex flex-col w-1/2 m-auto" action="#" @submit.prevent="Login">
                        <div class="form-group w-full">
                           <label for="email" class="col-form-label text-md-right">Email</label>

                           <div>
                              <input id="email" type="email" class="form-control w-full" name="email" value required autofocus
                                 v-model="email" />
                           </div>
                        </div>

                        <div class="form-group w-full">
                           <label for="password" class="col-form-label text-md-right">Password</label>

                           <div>
                              <input id="password" type="password" class="form-control w-full" name="password" required
                                 v-model="password" />
                           </div>
                        </div>

                        <div class="form-group row mt-5">
                           <div class="flex flex-row gap-5 mb-5">
                              <button type="submit" class="btn-primary">Login</button>
                           </div>
                              <p>Don't have an account yet? Create one</p>
                              <button type="submit" class="btn-secondary"><router-link :to="`/signup`">Sign up</router-link></button>
                        </div>
                     </form>
                  </template>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export default {
   name: "LoginComponent",
   setup() {
      const loading = ref(false)
      const email = ref('')
      const password = ref('')
      const error = ref(null)

      const store = useStore()
      const router = useRouter()

      const Login = async () => {
         try {
            loading.value = true
            await store.dispatch('logIn', {
               email: email.value,
               password: password.value
            })
            router.push('/dashboard')
         }
         catch (err) {
            error.value = err.message
         } finally {
            loading.value = false
         }
      }
      return { loading, Login, email, password, error }
   }
};
</script>