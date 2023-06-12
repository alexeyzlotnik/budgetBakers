<template>
   <main>
      <section class="wallets mt-5 grid grid-cols-5 auto-rows-fr gap-4 container">
         <div
            v-for="(wallet, walletIdx) in wallets"
            class="wallets-item flex flex-col py-1 px-2 rounded-lg text-white justify-center cursor-pointer"
            :class="`bg-[${wallet.color}]`"
            :key="walletIdx"
         >
            <span>{{ wallet.name }}</span>
            <span class="font-bold">{{ wallet.currency }} {{ wallet.balance }}</span>
         </div>
         <div
            @click="showAddWalletModal = true"
            class="wallets-item flex flex-col py-1 px-2 rounded-lg text-white hover:text-sky-300 justify-center items-center border-dotted border-2 border-sky-800 hover:border-sky-300 cursor-pointer"
         >
            <span>+ Add Wallet</span>
         </div>
      </section>
   </main>

   <Teleport to="body">
       <modal :show="showAddWalletModal" @close="showAddWalletModal = false">
         <template #header>
           <h3>ADD WALLET</h3>
         </template>
         <template #body>
           <div class="form flex flex-col gap-5">
               <input type="text" v-model="newWalletItem.name" placeholder="Wallet name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <input type="color" v-model="newWalletItem.color" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <input type="number" v-model="newWalletItem.balance" placeholder="Starting amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <select v-model="newWalletItem.currency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option
                     v-for="(currency, currencyIdx) in currencies"
                     :value="currency.name"
                     :key="currencyIdx"
                     :selected="currencyIdx === 0 ? 'true' : 'false'"
                  >
                     {{ currency.name }}
                  </option>
               </select>
               <button
                  :disabled="!newWalletItem.name"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="addNewWallet"
               >
                  save
               </button>
            </div>
         </template>
       </modal>
     </Teleport>

     <Teleport to="body">
         <modal :show="showRecordsModal" @close="showRecordsModal = false">
         <template #header>
            <h3>ADD WALLET</h3>
         </template>
         <template #body>
            <div class="form flex flex-col gap-5">
               <select v-model="newWalletItem.currency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option
                     v-for="(currency, currencyIdx) in currencies"
                     :value="currency.name"
                     :key="currencyIdx"
                     :selected="currencyIdx === 0 ? 'true' : 'false'"
                  >
                     {{ currency.name }}
                  </option>
               </select>
               <button
                  :disabled="!newWalletItem.name"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="addNewWallet"
               >
                  save
               </button>
            </div>
         </template>
         </modal>
      </Teleport>
</template>

<script>
// authentication
import { useStore } from "vuex";

import Modal from '../components/Modal.vue';
import { getFirestore, collection, getDocs, addDoc, where } from 'firebase/firestore';
import { firebaseApp, config, auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const firestore = getFirestore(firebaseApp);
const walletCollection = collection(firestore, 'wallets');



export default {
   mounted() {
      this.getWallets();
   },
   name: 'DashboardView',
   components: {
      Modal
   },
   data () {
      return {
         store: useStore(),
         showAddWalletModal: false,
         pageTitle: "Dashboard",
         currencies: [
            {
               id: 1,
               name: "UAH",
               symbol: "₴"
            },
            {
               id: 2,
               name: "USD",
               symbol: "$"
            }
         ],
         wallets: [],
         newWalletItem: {
            name: '',
            balance: 0,
            currency: 'UAH',
            color: '#e66465',
            uid: '',
            records: [],
         },
         firebaseApp: firebaseApp,
      }
   },
   methods: {
      getWallets() {
         getDocs(walletCollection).then((querySnapshot) => {
            console.log('querySnapshot.docs', querySnapshot.docs);
            const wallets = querySnapshot.docs.map(doc => doc.data());

            this.wallets = wallets.filter(wallet => wallet.uid === this.user.uid);
         }).catch((error) => {
            console.log('error', error);
         });
      },
      addNewWallet() {
         addDoc(walletCollection, this.newWalletItem)
            .then((docRef) => {
               this.getWallets();
            })

         // clear our form
         this.newWalletItem = {
            name: '',
            balance: 0,
            currency: 'UAH',
            color: '#e66465',
            uid: '',
            records: [],
         }
         this.showAddWalletModal = false;
      }
   },
   computed: {
      user() {
         return this.store.getters.user.data;
      }
   },
   created() {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            console.log('user', user);
            this.store.dispatch("fetchUser", user);
            this.newWalletItem.uid = this.user.uid;
         } else {
            console.log('no user');
         }
      });
   }
}

</script>
