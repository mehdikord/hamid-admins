<script>
import {Stores_Project_Statuses} from "@/stores/projects/project_statuses.js";

export default {
  name: "project_Statuses_Create",
  data() {
    return {
      items : {
        name : null,
        color : '#e75a0f',
        description : null,
      },
      loading: false,
      errors: [],
    }
  },
  methods: {
    Create_Item() {
      this.loading = true;
      Stores_Project_Statuses().Create(this.items).then(response => {
        this.$emit('Done', response.data.result);
        this.loading = false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      });

    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام وضعیت">
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input
          :error="this.Methods_Validation_Check(errors,'color')" outlined v-model="items.color" label="رنگ وضعیت"
      >
        <template v-slot:append>
          <q-icon name="fa-duotone fa-palette fa-fade" color="teal-13" class="cursor-pointer" size="30px">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color v-model="items.color" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'color')" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12 q-pa-xs">
      <q-input  :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description" rows="4"  type="textarea" label="توضیحات">
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
        </template>
      </q-input>
    </div>
    <div class="col-12 q-mt-sm q-pa-xs text-right">
      <q-btn rounded  color="blue-grey-8" icon="fa-duotone fa-times" label="بستن" class="q-mr-sm" v-close-popup></q-btn>
      <q-btn rounded @click="Create_Item" :loading="loading" color="indigo-7" icon="fa-duotone fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
    </div>
  </div>

</template>

<style scoped>

</style>