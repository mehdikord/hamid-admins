<script>

import {Stores_Users} from "@/stores/users/users.js";
import Users_Create from "@/views/users/Users_Create.vue";
import Users_Edit from "@/views/users/Users_Edit.vue";
import Users_Edit_Password from "@/views/users/Users_Edit_Password.vue";

export default {
  name: "Users",
  components: {
    'users_create' : Users_Create,
    'users_edit' : Users_Edit,
    'users_edit_password' : Users_Edit_Password,
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
      activation_loading:false,
      dialog_create:false,
      dialog_edit:[],
      dialog_password:[],
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
          label: 'نام',
          align: 'left',
          sortable: true,
          field: row => row.name,
        },
        {
          name: 'phone',
          value: 'phone',
          label: 'موبایل',
          align: 'left',
          sortable: false,
          field: row => row.phone,
        },
        {
          name: 'email',
          value: 'email',
          label: 'ایمیل',
          align: 'left',
          sortable: false,
          field: row => row.email,
        },
        {
          name: 'is_active',
          value: 'is_active',
          label: 'وضعیت',
          align: 'left',
          sortable: true,
          field: row => row.is_active,
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

      Stores_Users().Index(this.query_params).then(res=>{
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
      Stores_Users().Delete(id).then(res => {
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
      Stores_Users().Activation(id).then(res => {
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
    Item_Change_Password(id){
      this.dialog_password[id] = false;
      return this.Methods_Notify_Message_Success("گذرواژه کاربر یاموفقیت تغییر کرد")

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
        <q-card style="width: 1024px; max-width: 85vw; margin-top: 50px" >

          <q-card-section class="bg-indigo-7">
            <strong class="font-16">افزودن آیتم جدید</strong>
            <q-btn size="sm" color="white" text-color="dark" icon="fa-duotone fa-times" round dense v-close-popup class="q-mr-sm float-right"/>
          </q-card-section>
          <q-card-section>
            <users_create @Done="(item => { Item_Create(item) })"></users_create>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-separator class="q-mt-xl"/>
    </q-card-section>
    <q-card-section>
      <q-table
          flat
          bordered
          :loading="items_loading"
          :rows="items"
          title="لیست آیتم ها"
          title-class="font-15 font-weight-600 q-py-sm"
          table-header-class="bg-blue-grey-10"
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

            <div class="row">
              <q-icon name="fa-duotone fa-user " size="28px" color="deep-orange-5"></q-icon>
              <div class="q-ml-md q-mt-sm"><strong>{{ props.row.name }}</strong></div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-is_active="props">
          <q-td :props="props">
            <global_actions_activation_item @Set_Ok="Item_Activation(props.row.id)" :status="props.row.is_active"></global_actions_activation_item>
          </q-td>
        </template>
        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <q-btn @click="dialog_edit[props.row.id] = true"  title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fa-duotone fa-regular fa-edit" size="9px" round  />
              <q-btn @click="dialog_password[props.row.id] = true"  title="ویرایش گذرواژه" class="q-ma-xs" color="teal-7" icon="fa-duotone fa-regular fa-lock" size="9px" round  />
              <global_actions_delete_item @Set_Ok="Item_Delete(props.row.id)" :loading="delete_loading"></global_actions_delete_item>
            </div>
            <q-dialog
                v-model="dialog_edit[props.row.id]"
                position="top"
            >
              <q-card style="width: 1024px; max-width: 85vw; margin-top: 50px">

                <q-card-section class="bg-blue-7">
                  <strong class="font-15">ویرایش اطلاعات : <strong>{{props.row.name}}</strong></strong>
                  <q-btn size="sm" text-color="dark" color="white" icon="fa-duotone fa-times" round dense v-close-popup  class="q-mr-sm float-right"/>
                </q-card-section>
                <q-card-section>
                  <users_edit :id="props.row.id" @Done="(item => { Item_Edit(item) })"></users_edit>
                </q-card-section>
              </q-card>
            </q-dialog>
            <q-dialog
                v-model="dialog_password[props.row.id]"
                position="top"
            >
              <q-card style="width: 1024px; max-width: 85vw; margin-top: 50px">

                <q-card-section class="bg-teal-7">
                  <strong class="font-15">ویرایش گذرواژه : <strong>{{props.row.name}}</strong></strong>
                  <q-btn size="sm" text-color="dark" icon="fa-duotone fa-times" round dense v-close-popup color="white" class="q-mr-sm float-right"/>
                </q-card-section>
                <q-card-section>
                  <users_edit_password :id="props.row.id" @Done_Password="Item_Change_Password(props.row.id)"></users_edit_password>
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