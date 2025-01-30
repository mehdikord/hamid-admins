<script>
import {Stores_Projects} from "@/stores/projects/projects.js";

export default {
  name: "Project_Add_Customers",
  props:['id'],
  mounted() {
    if (this.id) {
      this.items.id = this.id;
    }
  },
  data(){
    return {
      items:{
        id:null,
        excel:null,
        numbers:null,
        description:null,
      },
      loading: false,
      errors:[],
    }
  },
  methods:{
    Create_Item(){
      if(!this.items.excel && !this.items.numbers){
        return this.Methods_Notify_Message_Error("یکی از گزینه های فایل یا شماره ها را وارد کنید")
      }

      this.loading = true;
      Stores_Projects().Add_Customers(this.items).then((res)=>{

        console.log(res.data.result);
        this.loading = false;

      }).catch(error=>{
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      })
    }
  }
}
</script>

<template>
  <div class="q-mb-sm">
    <strong class="text-grey-9">افزودن از طریق فایل اکسل : </strong>
    <div class="q-mt-lg">
      <q-file outlined bottom-slots v-model="items.excel" label="انتخاب فایل " counter>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent color="blue-8"/>
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.stop.prevent="items.excel = null" class="cursor-pointer" />
        </template>
      </q-file>
    </div>
  </div>
  <q-separator/>
  <div class="q-mt-md">
    <strong class="text-grey-9">افزودن با وارد کردن شماره : </strong>
    <q-banner class="q-mt-md bg-blue-grey-8 rounded-borders">
      <strong class="text-white">راهنما : </strong>
      <p class="q-mt-sm text-white">
        برای افزودن مشتریان به صورت گروهی شماره های مورد نظر را بدون فاصله و با کاما ( , ) از هم جدا کنید
        مثال : ( 09112586666,09355556666,09125256565 )
      </p>
    </q-banner>
    <q-input class="q-mt-md" :error="this.Methods_Validation_Check(errors,'numbers')" outlined v-model="items.numbers" rows="4"  type="textarea" label="شماره ها " placeholder="09115004030,09355556666">
      <template v-slot:error>
        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'customers')" />
      </template>
    </q-input>
    <q-input class="mt-md" :error="this.Methods_Validation_Check(errors,'description')" outlined v-model="items.description" rows="3"  type="textarea" label="توضیحات">
      <template v-slot:error>
        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
      </template>
    </q-input>
  </div>
  <div class="q-mt-md text-right">
    <q-btn color="grey-8" glossy icon="fas fa-times" label="بستن" class="q-mr-sm" v-close-popup></q-btn>
    <q-btn @click="Create_Item" :loading="loading" color="indigo-7" glossy icon="fas fa-users" label="افزودن مشتریان"></q-btn>
  </div>

</template>

<style scoped>

</style>