<script>
import {Stores_Users} from "@/stores/users/users.js";

export default {
  name: "Users_Create",
  data() {
    return {
      items : {
        name : null,
        phone : null,
        email : null,
        password: null,
        password_confirmation: null,
        description : null,
      },
      loading: false,
      errors: [],
    }
  },
  methods: {
    Create_Item() {
      this.loading = true;
      Stores_Users().Create(this.items).then(response => {
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
    <div class="col-xs-12 col-sm-12 col-md-12 q-pa-xs">
      <q-input class="rounded-borders" :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام کابر">
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input  :error="this.Methods_Validation_Check(errors,'phone')" outlined v-model="items.phone"  type="number" label="شماره موبایل">
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'phone')" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input  :error="this.Methods_Validation_Check(errors,'email')" outlined v-model="items.email"  type="email" label="آدرس ایمیل">
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'email')" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input  :error="this.Methods_Validation_Check(errors,'password')" outlined v-model="items.password"  type="password" label="گذرواژه">
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'password')" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input  :error="this.Methods_Validation_Check(errors,'password_confirmation')" outlined v-model="items.password_confirmation"  type="password" label="تکرار گذرواژه">
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'password_confirmation')" />
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