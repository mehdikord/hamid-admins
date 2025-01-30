<script>
import {Stores_Project_Statuses} from "@/stores/projects/project_statuses.js";

export default {
  name: "Project_Statuses_Edit",
  props:['id'],
  mounted () {
    if(this.id){
      this.Get_Item()
    }
  },
  data() {
    return {
      items : {
        name : null,
        color : null,
        description : null,
      },
      loading: true,
      edit_loading: false,
      errors: [],
    }
  },
  methods: {
    Get_Item() {
      Stores_Project_Statuses().Show(this.id).then(response => {
        this.items = response.data.result;
        this.loading = false;
      }).catch(error => {
       this.Methods_Notify_Error_Server();
        this.loading=false;
      });
    },
    Edit_Item(){
      this.edit_loading = true;
      Stores_Project_Statuses().Edit(this.items).then(response => {
        this.$emit('Done', response.data.result);
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
          <q-icon name="fas fa-eye-dropper" class="cursor-pointer">
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
      <q-btn color="grey-8" glossy icon="fas fa-times" label="بستن" class="q-mr-sm" v-close-popup></q-btn>
      <q-btn @click="Edit_Item" :loading="edit_loading" color="indigo-7" glossy icon="fas fa-edit" label="ویرایش آیتم"></q-btn>
    </div>
  </div>

</template>

<style scoped>

</style>