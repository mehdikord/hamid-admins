<script>
import {Stores_Users} from "@/stores/users/users.js";

export default {
  name: "Users_Edit_Password",
  props:['id'],
  mounted () {
    if (this.id) {
      this.items.id = this.id;
    }
  },
  data() {
    return {
      items : {
        id:null,
        password : null,
        password_confirmation : null,
      },
      edit_loading: false,
      errors: [],
    }
  },
  methods: {
    Edit_Item(){
      this.edit_loading = true;
      Stores_Users().Edit_Password(this.items).then(response => {
        this.$emit('Done_Password', response.data.message);
        this.edit_loading = false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.edit_loading=false;
      });
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input :error="this.Methods_Validation_Check(errors,'password')" outlined v-model="items.password"  type="password" label="گذرواٰژه جدید">
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
    <div class="col-12 q-mt-sm q-pa-xs text-right">
      <q-btn color="blue-grey-8" rounded icon="fa-duotone fa-times" label="بستن" class="q-mr-sm" v-close-popup></q-btn>
      <q-btn @click="Edit_Item" :loading="edit_loading" color="teal-7" rounded icon="fa-duotone fa-lock" label="ویرایش گذرواژه"></q-btn>
    </div>
  </div>

</template>

<style scoped>

</style>