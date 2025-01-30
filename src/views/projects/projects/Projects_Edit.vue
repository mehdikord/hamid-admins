<script>
import {Stores_Projects} from "@/stores/projects/projects.js";
import {Stores_Project_Categories} from "@/stores/projects/project_categories.js";
import {Stores_Project_Statuses} from "@/stores/projects/project_statuses.js";

export default {
  name: "Projects_Edit",
  props:['id'],
  mounted () {
    if(this.id){
      this.Get_Item();
      this.Get_Categories();
      this.Get_Statuses();
    }
  },
  data() {
    return {
      jalali_start_date:null,
      jalali_end_date:null,
      items : {
        project_category_id: null,
        project_status_id: null,
        name:null,
        description:null,
        start_at: null,
        end_at: null,
        manager_name: null,
        manager_phone: null,
      },
      loading: true,
      edit_loading: false,
      errors: [],
      categories:[],
      statuses:[],
    }
  },
  methods: {
    Get_Item() {
      Stores_Projects().Show(this.id).then(response => {
        this.items = response.data.result;
        if (this.items.start_at){
          this.jalali_start_date = this.Methods_Date_Gregorian_To_Jalali(this.items.start_at)
        }
        if (this.items.end_at){
          this.jalali_end_date = this.Methods_Date_Gregorian_To_Jalali(this.items.end_at)
        }
        this.loading = false;
      }).catch(error => {
       this.Methods_Notify_Error_Server();
        this.loading=false;
      });
    },
    Edit_Item(){
      this.edit_loading = true;
      Stores_Projects().Edit(this.items).then(response => {
        this.$emit('Done', response.data.result);
        this.edit_loading = false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.edit_loading=false;
      });
    },
    Get_Categories() {
      Stores_Project_Categories().All().then(response => {
        this.categories = [];
        response.data.result.forEach(item => {
          this.categories.push({
            label: item.name,
            value: item.id,
            color: item.color,
          });
        })
      })
    },
    Get_Statuses() {
      Stores_Project_Statuses().All().then(response => {
        this.statuses = [];
        response.data.result.forEach(item => {
          this.statuses.push({
            label: item.name,
            value: item.id,
            color: item.color,
          });
        })
      })
    },
    Filter_Categories_Select (val, update, abort) {
      update(() => {
        if (val){
          this.categories =  this.categories.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Categories();
        }
      })
    },
    Filter_Statuses_Select (val, update, abort) {
      update(() => {
        if (val){
          this.statuses =  this.statuses.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Statuses();
        }
      })
    },
  }
}
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 q-pa-xs">
      <q-input :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="عنوان پروژه">
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-select
          outlined
          transition-show="flip-up"
          transition-hide="flip-down"
          v-model="items.project_category_id"
          label="انتخاب دسته دبندی"
          :options="categories"
          @filter="Filter_Categories_Select"
          emit-value
          map-options
          use-input
          :error="this.Methods_Validation_Check(errors,'project_category_id')"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-red">
              گزینه ای یافت نشد
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-chip :style="'background-color:'+scope.opt.color"></q-chip>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'project_category_id')" />
        </template>
      </q-select>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-select
          outlined
          transition-show="flip-up"
          transition-hide="flip-down"
          v-model="items.project_status_id"
          label="انتخاب وضعیت"
          :options="statuses"
          @filter="Filter_Statuses_Select"
          emit-value
          map-options
          use-input
          :error="this.Methods_Validation_Check(errors,'project_status_id')"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-red">
              گزینه ای یافت نشد
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-chip :style="'background-color:'+scope.opt.color"></q-chip>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'project_status_id')" />
        </template>
      </q-select>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input :error="this.Methods_Validation_Check(errors,'manager_name')" outlined v-model="items.manager_name"  type="text" label="نام مدیر پروژه">
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'manager_name')" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input :error="this.Methods_Validation_Check(errors,'manager_phone')" outlined v-model="items.manager_phone"  type="text" label="شماره تماس مدیریت">
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'manager_phone')" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input :error="this.Methods_Validation_Check(errors,'start_at')" outlined v-model="jalali_start_date" mask="date" label="تاریخ شروع همکاری">
        <template v-slot:append>
          <q-icon color="teal-7" name="fas fa-calendar" class="cursor-pointer" title="باز کردن تقویم">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date color="teal-7" dark v-model="jalali_start_date" calendar="persian" mask="YYYY/MM/DD">
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'start_at')" />
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-xs">
      <q-input :error="this.Methods_Validation_Check(errors,'end_at')" outlined v-model="jalali_end_date" mask="date" label="تاریخ پایان همکاری">
        <template v-slot:append>
          <q-icon color="teal-7" name="fas fa-calendar" class="cursor-pointer" title="باز کردن تقویم">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date color="teal-7" dark v-model="jalali_end_date" calendar="persian" mask="YYYY/MM/DD">
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:error>
          <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'end_at')" />
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