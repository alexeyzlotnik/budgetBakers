<template>
   <label>{{ label }}</label>
   <div class="custom-select" :class="{ 'cursor-not-allowed opacity-75': disabled }" :tabindex="tabindex">
      <div class="selected" :class="{ 'open': open }" @click="toggleDropdown">
         <div class="inline-block text-gray-600 font-medium mr-auto leading-5 w-10/12 py-3">
            {{ selectedItemsDisplay }}
         </div>
         <img v-if="!disabled" src="@/assets/img/icons/icon-down-arrow.png" alt=""
            class="inline-block absolute right-0 mr-4 arrow-image" />
      </div>
      <div class="items font-archivo" :class="{ selectHide: !open }">
         <form id="search" class="w-full px-10 my-2">
            <input name="query" v-model="searchQuery" placeholder="Search" class="w-full">
         </form>
         <div class="items-wrapper" v-if="filteredOptions.length !== 0">
            <div v-for="(option, i) of filteredOptions" :key="i" class="leading-5 checkbox">
               <input type="checkbox" class="form-checkbox h-5 w-5 text-green-600" :checked="isSelected(option)"
                  @click="toggleSelection(option)" :id="`checkbox-${i}`" />
               <label class="checkbox-label flex items-center cursor-pointer py-2" :for="`checkbox-${i}`">
                  {{ option.name }}
               </label>
               <div v-if="option.desc" class="mt-1">{{ option.desc }}</div>
            </div>
         </div>
         <div v-else class="items-wrapper">
            <label class="checkbox-label text-black">No matches found</label>
         </div>

      </div>
   </div>
</template>

<script>
export default {
   props: {
      label: {
         type: String,
         default: "",
         required: false,
      },
      options: {
         type: Array,
         required: true,
      },
      tabindex: {
         type: Number,
         required: false,
         default: 0,
      },
      value: {
         type: String,
         default: null,
      },
      showAll: {
         type: Boolean,
         default: false,
      },
      disabled: {
         type: Boolean,
         default: false,
      },
      // selectedByDefault: {
      //    type: Object,
      //    default: null,
      // },
   },
   emits: ["selection-changed", "clear-selection"],
   data() {
      return {
         open: false,
         selected: [],
         searchQuery: "",
      };
   },
   methods: {
      toggleDropdown() {
         if (!this.disabled) {
            this.open = !this.open;
         }
      },
      toggleSelection(option) {
         // Toggle the selection of an option
         const index = this.selected.findIndex((item) => item.value === option.value);
         if (index === -1) {
            this.selected.push(option);
         } else {
            this.selected.splice(index, 1);
         }
         this.$emit("selection-changed", this.selected);
      },
      isSelected(option) {
         return this.selected.some((item) => item.value === option.value);
      },
      setSelected() {
         this.selected = this.options.filter((option) =>
            this.value ? this.value.includes(option.value) : false
         );
      },
      clearSelection() {
         this.selected = [];
         this.$emit("clear-selection");
      },
   },
   computed: {
      filteredOptions() {
         return this.options.filter((option) => {
            return option.name.toLowerCase().includes(this.searchQuery.toLowerCase());
         });
      },
      selectedItemsDisplay() {
         if (this.selected.length === 0) {
            return "Sélectionner";
         } else if (this.selected.length < 3) {
            return this.selected.map((item) => item.name).join(", ");
         } else {
            return `${this.selected[0].name}, ${this.selected[1].name} + ${this.selected.length - 2} de plus`;
         }
      },
   },
   watch: {
      // value(newValue) {
      //    this.setSelected();
      // },
      // selectedByDefault(newValue) {
      //    this.selected = newValue;
      // },
   },
   // mounted() {
   //    this.setSelected();
   //    if (this.selectedByDefault) {
   //       this.selected = this.selectedByDefault;
   //    }
   // },
};
</script>

<style scoped>
.default {
   color: #595959;
   padding-left: 1em;
   cursor: pointer;
   user-select: none;
}

.custom-select {
   position: relative;
   width: 100%;
   text-align: left;
   outline: none;
   height: auto;
   min-height: 47px;
}

.custom-select .selected {
   height: auto;
   min-height: 35px;
   background-color: #fff;
   border-radius: 6px;
   border: 1px solid #cbcbcb;
   color: #666;
   padding-left: 0.7em;
   cursor: pointer;
   user-select: none;
   min-height: 41px !important;
}

.custom-select .selected.open {
   border: 1px solid rgb(86, 208, 138);
   border-radius: 6px 6px 6px 6px;
   margin-bottom: 8px;
}

.custom-select .items {
   border-radius: 6px 6px 6px 6px;
   overflow: hidden;
   border-right: 1px solid lightgray;
   border-left: 1px solid lightgray;
   border-top: 1px solid lightgray;
   border-bottom: 1px solid lightgray;
   position: absolute;
   background-color: #fff;
   left: 0;
   right: 0;
   z-index: 1;
   line-height: 24px;

}

.custom-select .items-wrapper {
   max-height: 150px;
   overflow-y: scroll;
   padding: 8px 20px;
}

.custom-select .items-wrapper div {
   color: #595959;
   padding-left: 1em;
   cursor: pointer;
   user-select: none;
}

.custom-select .items-wrapper div:hover .checkbox-label {
   color: #56D08A;
}

.custom-select .items-new-user {
   padding: 8px 15px;
   border-top: 1px solid #CBCBCB;
   display: flex;
   justify-content: end;
   color: #56D08A;
}

.selectHide {
   display: none;
}

.arrow-image {
   margin-top: 15px;
}

label {
   margin-bottom: 5px !important;
   font-weight: 600;
   align-items: center;
   display: flex;
}

.items .form-checkbox {
   display: none !important;
}

.items-wrapper label {
   cursor: pointer;
   display: inline-block;
   position: relative;
   width: 100%;
   height: 100%;
   padding-left: 20px;
}

.items-wrapper label:before,
.items-wrapper label:after {
   content: "";
   width: 20px;
   height: 20px;
   position: absolute;
   top: 50%;
   left: 0% !important;
   transform: translate(-50%, -50%) !important;
   transition: all 0.3s ease 0s;
   transition-delay: 1ms;
   -webkit-transform: translate(-50%, -50%);
   -webkit-transition: all 0.3s ease 0s;
   display: inline-block;
   background: url("~@/assets/img/icons/icon-check-default.svg");
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
}

.items-wrapper label:after {
   visibility: hidden;
   opacity: 0;
   background: url("~@/assets/img/icons/icon-check-checked.svg");
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
}

.items-wrapper label:hover:before {
   background: url("~@/assets/img/icons/icon-check-hover.svg");
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
}

input[type="checkbox"]:checked+label:before {
   visibility: hidden;
   opacity: 0;
}

.items-wrapper input[type="checkbox"]:checked+label:after {
   visibility: visible;
   opacity: 1;
}
</style>
