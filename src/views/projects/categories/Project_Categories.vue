<script>

import {Stores_Project_Categories} from "@/stores/projects/project_categories.js";
import Project_Categories_Create from "@/views/projects/categories/Project_Categories_Create.vue";
import Project_Categories_Edit from "@/views/projects/categories/Project_Categories_Edit.vue";

export default {
  name: "Project_Categories",
  components: {
    'project_categories_create' : Project_Categories_Create,
    'project_categories_edit' : Project_Categories_Edit,

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
      dialog_edit:[],
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
          name: 'color',
          value: 'color',
          label: 'رنگ',
          align: 'left',
          sortable: false,
          field: row => row.color,
        },
        {
          name: 'projects_count',
          value: 'projects_count',
          label: 'تعداد پروژه',
          align: 'left',
          sortable: false,
          field: row => row.projects_count,
        },
        {
          name: 'description',
          value: 'description',
          label: 'توضیحات',
          align: 'left',
          sortable: false,
          field: row => row.description,
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

      Stores_Project_Categories().Index(this.query_params).then(res=>{
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
      Stores_Project_Categories().Delete(id).then(res => {
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
            <project_categories_create @Done="(item => { Item_Create(item) })"></project_categories_create>
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
              <div><strong>{{ props.row.name }}</strong></div>
          </q-td>
        </template>
        <template v-slot:body-cell-color="props">
          <q-td :props="props">
            <div class="color-box" :style="'background-color:'+props.row.color"></div>
          </q-td>
        </template>
        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <q-btn @click="dialog_edit[props.row.id] = true"  title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fa-duotone fa-light fa-edit" size="9px" round  />
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
                  <project_categories_edit :id="props.row.id" @Done="(item => { Item_Edit(item) })"></project_categories_edit>
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