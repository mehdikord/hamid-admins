<script>

import {Stores_Projects} from "@/stores/projects/projects.js";
import Projects_Create from "@/views/projects/projects/Projects_Create.vue";
import Projects_Edit from "@/views/projects/projects/Projects_Edit.vue";
import {Stores_Users} from "@/stores/users/users.js";
import Project_Add_Customers from "@/views/projects/projects/components/Project_Add_Customers.vue";

export default {
  name: "Projects",
  components: {
    'projects_create' : Projects_Create,
    'projects_edit' : Projects_Edit,
    'add_customers' : Project_Add_Customers

  },
  mounted() {
    this.Items_Get();
  },
  data(){
    return {
      items:[],
      query_params:{
        sort_by : 'id',
        sort_type : 'desc',
        per_page : 15,
        page : 1,
        search :{}
      },
      items_loading:true,
      delete_loading:false,
      dialog_create:false,
      activation_loading:false,
      dialog_edit:[],
      dialog_customers:[],
      items_selected:[],
      selected: [],
      pagination: {
        sortBy : 'id',
        descending:true,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 15
      },
      columns : [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          sortable: true,
          field: row => '# ' + row.id,
        },
        {
          name: 'name',
          value: 'name',
          label: 'عنوان',
          align: 'left',
          sortable: true,
          field: row => row.name,
        },
        {
          name: 'code',
          value: 'code',
          label: 'کد',
          align: 'left',
          sortable: true,
          field: row => row.code,
        },
        {
          name: 'category',
          value: 'category',
          label: 'دسته بندی',
          align: 'left',
          sortable: false,
          field: row => row.category,
        },
        {
          name: 'status',
          value: 'status',
          label: 'وضعیت',
          align: 'left',
          sortable: false,
          field: row => row.status,
        },
        {
          name: 'manager_name',
          value: 'manager_name',
          label: 'نام مدیر',
          align: 'left',
          sortable: false,
          field: row => row.manager_name,
        },
        {
          name: 'manager_phone',
          value: 'manager_phone',
          label: 'تماس',
          align: 'left',
          sortable: false,
          field: row => row.manager_phone,
        },
        {
          name: 'customers',
          value: 'customers',
          label: 'تعداد مشتریان',
          align: 'left',
          sortable: false,
          field: row => row.customers,
        },
        {
          name: 'created_at',
          value: 'created_at',
          label: 'ت ایجاد',
          align: 'left',
          sortable: true ,
          field: row => row.created_at,
        },
        {
          name: 'updated_at',
          value: 'updated_at',
          label: 'ت ویرایش',
          align: 'left',
          sortable: true ,
          field: row => row.updated_at,
        },
        {
          name: 'tools',
          value: 'tools',
          label: 'عملیات',
          align: 'left',
        }
      ],
      visible_columns:[],
    }
  },
  methods :{
    Items_Get(per_page,page){
      if (per_page){
        this.query_params.per_page = per_page;
      }
      if (page){
        this.query_params.page = page;
      }

      Stores_Projects().Index(this.query_params).then(res=>{
        this.items = res.data.result.data;
        this.pagination.page = res.data.result.current_page;
        this.pagination.rowsPerPage = res.data.result.per_page;
        this.pagination.rowsNumber = res.data.result.total;
        this.items_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.items_loading=false;
      })
    },
    Item_Create(item){
      this.items.unshift(item);
      this.dialog_create = false;
      this.Methods_Notify_Create()
    },
    Item_Edit(item){
      this.items = this.items.map(get_item => {
        if (get_item.id === item.id) {
          return item;
        }
        return get_item;
      });
      this.dialog_edit[item.id] = false;
      this.Methods_Notify_Update()
    },
    Item_Delete(id){
      this.delete_loading=true;
      Stores_Projects().Delete(id).then(res => {
        this.items = this.items.filter(item => {
          return item.id !== id;
        })
        this.Methods_Notify_Delete();
        this.delete_loading=false;
      }).catch(error => {
        if (error.response.status === 409) {
          this.Methods_Notify_Generator( error.response.data.error,'red-8','fa-duotone fa-times')
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.delete_loading=false;
      })

    },
    Item_Activation(id){
      this.activation_loading=true;
      Stores_Projects().Activation(id).then(res => {
        this.items = this.items.filter(item => {
          if (item.id === id){
            item.is_active = !item.is_active;
          }
          return item;
        })
        this.activation_loading=false;
      }).catch(error =>{
        if (error.response.status === 409) {
          this.Methods_Notify_Generator( error.response.data.error,'red-8','fa-duotone fa-times')
        }
        this.activation_loading=false;
      })

    },
    updateSelected(newSelection) {
      this.selected = newSelection;
      this.items_selected = newSelection.map(item => item.id);
    },
    Items_OnRequest(props){
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      let sort_type;
      this.pagination.sortBy = sortBy
      if (page === this.pagination.page && rowsPerPage === this.pagination.rowsPerPage){
        this.pagination.descending = !this.pagination.descending
      }
      if (this.pagination.descending){
        sort_type = "desc"
      }else {
        sort_type = "asc"
      }
      this.query_params.sort_by = sortBy;
      this.query_params.sort_type = sort_type;
      this.Items_Get(rowsPerPage,page);

    },

  }

}
</script>

<template>

  <q-card flat>
    <q-card-section>
      <global_actions_header_buttons @Create="dialog_create=true" :create="true"></global_actions_header_buttons>

      <q-dialog
          v-model="dialog_create"
          position="top"
      >
        <q-card style="width: 1024px; max-width: 85vw; margin-top: 50px">

          <q-card-section class="bg-indigo-7">
            <strong class="font-16">افزودن آیتم جدید</strong>
            <q-btn size="sm" color="white" text-color="dark" icon="fa-duotone fa-times" round dense v-close-popup class="q-mr-sm float-right"/>
            </q-card-section>
          <q-card-section>
            <projects_create @Done="(item => { Item_Create(item) })"></projects_create>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-separator class="q-mt-xl"/>
    </q-card-section>
    <q-card-section>

    </q-card-section>
    <q-card-section>
      <q-table
          flat
          grid
          bordered
          :loading="items_loading"
          :rows="items"
          :columns="columns"
          separator="cell"
          row-key="id"
          :selected="selected"
          @update:selected="updateSelected"
          v-model:pagination="pagination"
          @request="Items_OnRequest"
      >
        <template v-slot:item="props">
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 q-px-md">
            <q-card flat bordered >
              <q-card-section class="bg-grey-10 row">
                <div class="col-6">
                  <router-link :to="{name : 'projects_single',params : {id : props.row.id} }" >
                    <strong class="font-17 text-white">{{props.row.name}}</strong>
                  </router-link>
                </div>
                <div class="col-6 text-right">
                  <q-btn :to="{name : 'projects_single',params : {id : props.row.id} }" title="تظیمات پروژه" size="10px" color="teal" round icon="fa-duotone fa-light fa-screwdriver-wrench"></q-btn>
                  <q-btn title="کارشناسان" size="10px" color="deep-orange-8" round icon="fa-duotone fa-light fa-users" class="q-ml-sm"></q-btn>
                  <q-btn @click="dialog_edit[props.row.id] = true" title="ویرایش پروژه" size="10px" color="blue-7" round icon="fa-duotone fa-light fa-pen" class="q-ml-sm"></q-btn>
                </div>

              </q-card-section>
              <q-card-section class="row q-mt-sm">
                <div class="col-12 row q-gutter-lg">
                  <div>
                    <strong class="font-12">دسته بندی : </strong>
                    <strong class="font-14 q-ml-sm" :style="'color:'+props.row.category.color">{{props.row.category.name}}</strong>
                  </div>
                  <div>
                    <strong class="font-12">وضعیت پروژه : </strong>
                    <strong class="q-ml-sm font-14" :style="'color:'+props.row.status.color">{{props.row.status.name}}</strong>
                  </div>
                  <div>
                    <strong class="font-12">فعال : </strong>
                    <q-icon v-if="props.row.is_active" name="fa-duotone fa-check fa-regular" color="green-14" size="20px"></q-icon>
                    <q-icon v-else name="fa-duotone fa-times fa-regular" color="red" size="20px"></q-icon>
                  </div>

                </div>
                <div class="col-12 q-mt-lg q-pt-sm">
                  <div class="row q-gutter-md">
                    <q-chip  clickable color="indigo-8" text-color="white" icon="fa-duotone fa-users fa-light q-mr-md">
                      <strong>{{ props.row.total_customers }}</strong>
                      <q-tooltip class="bg-grey-4 glossy">
                        <strong class="text-dark font-13">کل مشتریان</strong>
                      </q-tooltip>
                    </q-chip>
                    <q-chip clickable color="green-8" text-color="white" icon="fa-duotone fa-user-check fa-light q-mr-md">
                      <strong>{{ props.row.total_customers - props.row.pending_customers }}</strong>
                      <q-tooltip class="bg-grey-4 glossy">
                        <strong class="text-dark font-13">مشتریان در انتظار</strong>
                      </q-tooltip>
                    </q-chip>
                    <q-chip  clickable color="red-8" text-color="white" icon="fa-duotone fa-user-times fa-light q-mr-md">
                      <strong>{{ props.row.pending_customers }}</strong>
                      <q-tooltip class="bg-grey-4 glossy">
                        <strong class="text-dark font-13">مشتریان تخصیص داده شده</strong>
                      </q-tooltip>
                    </q-chip>
                    <q-chip clickable color="purple-8" text-color="white" icon="fa-duotone fa-user-tie fa-light q-mr-md">
                       <strong>{{ props.row.users_count }}</strong>
                      <q-tooltip class="bg-grey-4 glossy">
                        <strong class="text-dark font-13">کارشناسان پروژه</strong>
                      </q-tooltip>
                    </q-chip>
                  </div>
                </div>
                <div class="col-12 q-mt-lg row q-gutter-x-md">
                  <q-chip outline size="13px" color="green-4">شروع :
                    <span v-if="props.row.start_at" dir="ltr" class="q-ml-xs">{{this.Methods_Date_Gregorian_To_Jalali(props.row.start_at)}}</span>
                    <span v-else  dir="ltr" class="q-ml-xs">----</span>
                  </q-chip>
                  <q-chip outline size="13px" color="red-4">پایان :
                    <span v-if="props.row.end_at" dir="ltr" class="q-ml-xs">{{this.Methods_Date_Gregorian_To_Jalali(props.row.end_at)}}</span>
                    <span v-else  dir="ltr" class="q-ml-xs">----</span>
                  </q-chip>
                  <q-chip outline size="13px" color="grey-5"> ویرایش :
                    <span v-if="props.row.updated_at" dir="ltr" class="q-ml-xs">{{this.Methods_Date_Gregorian_To_Jalali(props.row.updated_at)}}</span>
                    <span v-else  dir="ltr" class="q-ml-xs">----</span>
                  </q-chip>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-md q-mb-sm">
                <div class="row q-gutter-x-lg">
                  <div>
                    <q-icon name="fa-duotone fa-file-invoice-dollar" size="26px" color="teal-14"></q-icon>
                    <strong class="q-ml-xs font-14 text-grey-5">فاکتورها : </strong>
                    <strong class="font-16">21</strong>
                  </div>
                  <div>
                    <q-icon name="fa-duotone fa-file-lines fa-" size="26px" color="blue-12"></q-icon>
                    <strong class="q-ml-xs font-14 text-grey-5">گزارشات : </strong>
                    <strong class="font-16">21</strong>
                  </div>
                  <div>
                    <q-icon name="fa-duotone fa-coins fa-" size="26px" color="yellow-7"></q-icon>
                    <strong class="q-ml-xs font-14 text-grey-5">مبالغ : </strong>
                    <strong class="font-15">28,000,000</strong>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <q-dialog
              v-model="dialog_edit[props.row.id]"
              position="top"
          >
            <q-card style="width: 1024px; max-width: 85vw; margin-top: 50px">

              <q-card-section class="bg-blue-7">
                <strong class="font-16">ویرایش اطلاعات پروژه : {{props.row.name}}</strong>
                <q-btn size="sm" color="white" text-color="dark" icon="fa-duotone fa-times" round dense v-close-popup class="q-mr-sm float-right"/>
              </q-card-section>
              <q-card-section>
                <projects_edit :id="props.row.id" @Done="(item => { Item_Edit(item) })"></projects_edit>
              </q-card-section>
            </q-card>
          </q-dialog>

        </template>




      </q-table>
    </q-card-section>
  </q-card>

</template>

<style scoped>
.chip{
  padding: 2px 7px;
  border-radius: 5px;
  font-weight: 600;

}
</style>