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
      exists_numbers:[],
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
        if (res.data.result){
          this.exists_numbers=res.data.result
        }
        this.Methods_Notify_Message_Success("شماره های مورد نظر باموفقیت به پروژه افزوده شدند")
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
    <template v-if="exists_numbers.length">
      <q-banner class="bg-blue-grey-8 rounded-borders q-mb-md text-white">
        <strong> تعداد {{exists_numbers.length}} مشتری (شماره) در این پروژه درحال حاظر موجود است !</strong>
        <div class="q-mt-sm">
          <strong>لیست شماره های تکراری : </strong>
          <div class="q-mt-sm q-gutter-sm q-mb-md">
            <q-chip v-for="item in exists_numbers" color="grey-2" :label="item"></q-chip>
          </div>
        </div>
      </q-banner>


    </template>
    <strong class="text-grey-4">افزودن از طریق فایل اکسل : </strong>
    <div class="q-mt-lg">
      <q-file outlined bottom-slots v-model="items.excel" label="انتخاب فایل " counter>
        <template v-slot:prepend>
          <q-icon size="27px" name="fa-duotone fa-regular fa-upload" @click.stop.prevent color="teal-14"/>
        </template>
        <template v-slot:append>
          <q-icon name="fa-duotone fa-regular fa-times" @click.stop.prevent="items.excel = null" color="red" class="cursor-pointer" />
        </template>
      </q-file>
    </div>
  </div>
  <q-separator/>
  <div class="q-mt-md">
    <strong class="text-grey-4">افزودن با وارد کردن شماره : </strong>
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