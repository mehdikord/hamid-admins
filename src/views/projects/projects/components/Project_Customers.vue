<script>
import {Stores_Projects} from "@/stores/projects/projects.js";
import projects_edit from "@/views/projects/projects/Projects_Edit.vue";
import add_customers from "@/views/projects/projects/components/Project_Add_Customers.vue";

export default {
  name: "Project_Customers",
  components: {add_customers, projects_edit},
  props:['project'],
  mounted() {
    if (this.project) {
      this.query_params.id = this.project.id;
      console.log(this.project);
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
          label: 'نام مشتری',
          align: 'left',
          sortable: false,
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
          name: 'instagram',
          value: 'instagram',
          label: 'اینستاگرام',
          align: 'left',
          sortable: false,
          field: row => row.instagram,
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
          name: 'import_at',
          value: 'import_at',
          label: 'تاریخ ثبت',
          align: 'left',
          sortable: true,
          field: row => row.import_at,
        },
        {
          name: 'reports',
          value: 'reports',
          label: 'گزارشات',
          align: 'left',
          sortable: false,
          field: row => row.reports,
        },
        {
          name: 'factors',
          value: 'factors',
          label: 'فاکتور ها',
          align: 'left',
          sortable: false,
          field: row => row.factors,
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
      this.Get_Customers(rowsPerPage,page);

    },
  }
}
</script>

<template>
  <div>
    <q-btn :disable="!pending_customers" glossy  push color="indigo" rounded class="float-right" label="تخصیص به کارشناسان" icon="fas fa-user-plus"> </q-btn>
    <strong class="text-teal-10 font-16">لیست مشتریان پروژه : </strong>
    <q-chip :label="project.pending_customers" color="green-6" size="sm" text-color="white" class="font-14 font-weight-700" title="تخصیص به کارشناس"></q-chip>
    <q-chip :label="project.total_customers" color="blue-grey-8" size="sm" text-color="white" class="font-14 font-weight-700" title="کل مشتریان"></q-chip>
    <q-chip :label="project.total_customers - project.pending_customers" color="red-6" size="sm" text-color="white" class="font-14 font-weight-700" title="بدون کارشناس"></q-chip>
  </div>
  <div class="q-mt-lg">
    <q-table
        flat
        bordered
        :loading="loading"
        :rows="customers"
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
          <div v-if="props.row.customer">
            <strong v-if="props.row.customer.name">{{props.row.customer.name}}</strong>
            <span v-else> --- </span>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-phone="props">
        <q-td :props="props">
          <div v-if="props.row.customer">
            <strong class="text-teal-9" v-if="props.row.customer">{{props.row.customer.phone}}</strong>

          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-instagram="props">
        <q-td :props="props">
          <div v-if="props.row.customer">
            <q-chip v-if="props.row.customer.instagram_id" color="blue-7" size="sm" class="font-13" :label="props.row.customer.instagram_id" text-color="white"></q-chip>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <global_chips_customer_status :status="props.row.status"></global_chips_customer_status>
        </q-td>
      </template>
      <template v-slot:body-cell-import_at="props">
        <q-td :props="props">
          <global_filter_date :date="props.row.import_at" />
        </q-td>
      </template>
      <template v-slot:body-cell-reports="props">
        <q-td :props="props">
          <q-chip color="teal-8" label="0" text-color="white" class="font-13"></q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-factors="props">
        <q-td :props="props">
          <q-chip color="purple-8" label="0" text-color="white" class="font-13"></q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-tools="props">
        <q-td :props="props">
          <q-btn  glossy title="جزئیات کامل" class="q-ma-xs" color="blue-grey-7" icon="fas fa-list" size="9px" round  />

          <global_actions_delete_item @Set_Ok="" :loading="delete_loading"></global_actions_delete_item>

        </q-td>
      </template>



    </q-table>

  </div>
</template>

<style scoped>

</style>