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
        console.log(res.data);
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
          this.Methods_Notify_Generator( error.response.data.error,'red-8','fas fa-times')
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
          this.Methods_Notify_Generator( error.response.data.error,'red-8','fas fa-times')
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

  <q-card>
    <q-card-section>
      <global_actions_header_buttons @Create="dialog_create=true" :create="true"></global_actions_header_buttons>

      <q-dialog
          v-model="dialog_create"
          position="top"
      >
        <q-card style="width: 1024px; max-width: 85vw;">

          <q-card-section>
            <strong class="text-indigo-8 font-15">افزودن آیتم جدید</strong>
            <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm float-right"/>
          </q-card-section>
          <q-card-section>
            <projects_create @Done="(item => { Item_Create(item) })"></projects_create>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-separator class="q-mt-xl"/>
    </q-card-section>
    <q-card-section>
      <q-banner class="bg-blue-grey-8 rounded-borders text-white">
        برای مدیرت کامل پروژه و مشتریان و گزارشات ثبت شده ، به صفحه مدیریت پروژه بروید (               <q-btn  glossy class="q-ma-xs" color="teal-8" icon="fas fa-cog" size="9px" round  />
        )
        و برای افزودن سریع مشتری به پروژه از کلید ( <q-btn  glossy class="q-ma-xs" color="purple-8" icon="fas fa-users" size="9px" round  /> ) استفاده کنید
      </q-banner>
    </q-card-section>
    <q-card-section>
      <q-table
          flat
          bordered
          :loading="items_loading"
          :rows="items"
          title="لیست آیتم ها"
          title-class="text-teal-8 font-18 font-weight-500"
          table-header-class="text-red-8"
          :columns="columns"
          separator="cell"
          selection="multiple"
          row-key="id"
          :selected="selected"
          @update:selected="updateSelected"
          v-model:pagination="pagination"
          @request="Items_OnRequest"
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
              <div><strong>{{ props.row.name }}</strong></div>
          </q-td>
        </template>
        <template v-slot:body-cell-category="props">
          <q-td :props="props">
            <template v-if="props.row.category">
              <q-chip class="font-12" :style="'background-color:'+props.row.category.color"  size="sm" :label="props.row.category.name"></q-chip>
            </template>
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <template v-if="props.row.status">
              <q-chip class="font-12" :style="'background-color:'+props.row.status.color"  size="sm" :label="props.row.status.name"></q-chip>
            </template>
          </q-td>
        </template>
        <template v-slot:body-cell-customers="props">
          <q-td :props="props" >
            <div class="text-center">
              <q-chip :label="props.row.pending_customers" color="green-6" size="sm" text-color="white" class="font-12 font-weight-700" title="تخصیص به کارشناس"></q-chip>
              <q-chip :label="props.row.total_customers" color="blue-grey-8" size="sm" text-color="white" class="font-12 font-weight-700" title="کل مشتریان"></q-chip>
              <q-chip :label="props.row.total_customers - props.row.pending_customers" color="red-6" size="sm" text-color="white" class="font-12 font-weight-700" title="بدون کارشناس"></q-chip>
            </div>


          </q-td>
        </template>


        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <q-btn @click="dialog_edit[props.row.id] = true" glossy title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
              <q-btn  glossy title="مدیریت پروژه" class="q-ma-xs" color="teal-8" icon="fas fa-cog" size="9px" round  />
              <q-btn  @click="dialog_customers[props.row.id] = true" glossy title="افزودن مشتری" class="q-ma-xs" color="purple-8" icon="fas fa-users" size="9px" round  />
              <global_actions_delete_item @Set_Ok="Item_Delete(props.row.id)" :loading="delete_loading"></global_actions_delete_item>
            </div>
            <q-dialog
                v-model="dialog_edit[props.row.id]"
                position="top"
            >
              <q-card style="width: 1024px; max-width: 85vw;">

                <q-card-section>
                  <strong class="text-blue-8 font-15">ویرایش اطلاعات : <strong class="text-red-8">{{props.row.name}}</strong></strong>
                  <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm float-right"/>
                </q-card-section>
                <q-card-section>
                  <projects_edit :id="props.row.id" @Done="(item => { Item_Edit(item) })"></projects_edit>
                </q-card-section>
              </q-card>
            </q-dialog>
            <q-dialog
                v-model="dialog_customers[props.row.id]"
                position="top"
            >
              <q-card style="width: 1024px; max-width: 85vw;">

                <q-card-section>
                  <strong class="text-blue-8 font-15">افزودن مشتری به : <strong class="text-red-8">{{props.row.name}}</strong></strong>
                  <q-btn size="sm" icon="fas fa-times" glossy round dense v-close-popup color="red" class="q-mr-sm float-right"/>
                </q-card-section>
                <q-card-section>
                  <add_customers :id="props.row.id" @Done="(item => { Item_Edit(item) })"></add_customers>
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-td>
        </template>

        <template v-slot:body-cell-created_at="props">
          <q-td :props="props" >
            <global_filter_date :date="props.row.created_at" />
          </q-td>
        </template>
        <template v-slot:body-cell-updated_at="props">
          <q-td :props="props" >
            <global_filter_date :date="props.row.updated_at" />
          </q-td>
        </template>


      </q-table>
    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>