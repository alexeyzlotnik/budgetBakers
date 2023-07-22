<template>
   <main>
      <h1 v-if="loadingStatus" class="text-center">Loading...</h1>
      <template v-else>
         <section class="container pt-10">
            <h1 class="text-center">Test View</h1>
         </section>
         <section class="container">
            <DropdownSelectWithSearch
               label="Select user with search"
               :options="users"
               :value="selectedOption ? selectedOption.value : ''"
               @selection-changed="selectedOption = $event"
            />

            <button @click="this.$toasts.error('message')">
               Show toast
            </button>
         </section>
         <section class="container pt-10">
            <div class="filters grid grid-cols-12 gap-5 my-4 justify-space-between">
               <div class="col-span-3">
                   <form id="username" class="w-full w-full">
                     <input name="query" v-model="userFilters.name" placeholder="username" class="w-full">
                  </form>
               </div>
               <div class="col-span-3">
                  <button @click="opneUserModal" class="btn-primary">Add new user</button>
               </div>
            </div>
            <div class="grid grid-cols-12 gap-5 bg-white text-black border-2 py-4" v-for="(user, idx) in filteredUsers" :key="idx">
               <div class="col-span-3">{{ user.name }}</div>
               <div class="col-span-3">{{ user.email }}</div>
               <div class="col-span-3">{{ user.phone }}</div>
               <div class="col-span-3">{{ user.website }}</div>
            </div>
         </section>
      </template>

   </main>

   <Teleport to="body">
      <modal :show="showAddUserModal" @close="closeUserModal">
      <template #header>
         <h3>ADD USER</h3>
      </template>
      <template #body>
         <div class="form flex flex-col gap-5">
            <input type="text" v-model="newUser.name" placeholder="User name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <input type="email" v-model="newUser.email" placeholder="User email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <input type="phone" v-model="newUser.phone" placeholder="User phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <input type="text" v-model="newUser.website" placeholder="User website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <button
               class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
               @click="addNewUser"
            >
               save
            </button>
         </div>
      </template>
      </modal>
   </Teleport>
</template>

<script>

import DropdownSelectWithSearch from "../components/drowdownSelectWithSeach.vue";
import Modal from "../components/modal.vue";

export default {
   components: {
      DropdownSelectWithSearch,
      Modal,
   },
   data() {
      return {
         users: null,
         loadingStatus: true,
         selectedOption: null,
         showAddUserModal: false,
         newUser: {
            name: '',
            email: '',
            phone: '',
            website: '',
         },
         userFilters: {
            name: '',
         }
      }
   },
   methods: {
      async getUsers() {
         const posts = await fetch('https://jsonplaceholder.typicode.com/users')
            .then(
               (response) => response.json(),
            );

         this.loadingStatus = false,
         this.users = posts;
      },
      opneUserModal() {
         this.showAddUserModal = true;
      },
      closeUserModal() {
         this.showAddUserModal = false;
         this.newUser = {
            name: '',
            email: '',
            phone: '',
            website: '',
         };
      },
      addNewUser() {
         if (this.newUser.name !== '') {
            this.users.push(this.newUser);
            this.showAddUserModal = false;
               this.$toasts.success(`${this.newUser.name} is added to user list`);

            this.newUser = {
               name: '',
               email: '',
               phone: '',
               website: '',
            };
         } else {
            this.$toasts.error('Please enter user name');
         }
      }
   },
   computed: {
      filteredUsers() {
         return this.users.filter(user => {
            return user.name.toLowerCase().includes(this.userFilters.name.toLowerCase());
         });
      }
   },
   mounted() {
      this.getUsers();
   }
};
</script>