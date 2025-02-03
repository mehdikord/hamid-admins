<script>
import {Stores_Projects} from "@/stores/projects/projects.js";

export default {
  name: "Project_Users",
  props:['project'],
  mounted() {
    if (this.project) {
      this.query_params.id = this.project.id;
      this.Get_Customers();
    }
  },
  data() {
    return {
      loading: true,
      customers: [],
      query_params:{
        id:null,
        sort_by : 'id',
        sort_type : 'desc',
        per_page : 15,
        page : 1,
        search :{}
      },
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
    }
  },
  methods: {
    Get_Customers(per_page,page){
      if (per_page){
        this.query_params.per_page = per_page;
      }
      if (page){
        this.query_params.page = page;
      }

      Stores_Projects().Get_Customers(this.query_params).then(res=>{

        this.customers = res.data.result.data;
        this.pagination.page = res.data.result.current_page;
        this.pagination.rowsPerPage = res.data.result.per_page;
        this.pagination.rowsNumber = res.data.result.total;
        this.loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.loading=false;
      })
    }
  }
}
</script>

<template>

</template>

<style scoped>

</style>