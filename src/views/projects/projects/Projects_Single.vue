<script>
import {Stores_Projects} from "@/stores/projects/projects.js";
import Project_Customers from "@/views/projects/projects/components/Project_Customers.vue";

export default {
  name: "Projects_Single",
  components:{
    'project_customers' : Project_Customers,
  },
  mounted () {
    this.Get_Item();
  },
  data(){
    return {
      loading:true,
      project: null
    }
  },
  methods:{
    Get_Item(){
      Stores_Projects().Show(this.$route.params.id).then(res=>{
        this.project = res.data.result;
        this.loading=false;
      }).catch(err=>{
        this.Methods_Notify_Error_Server();
      })
    }
  }
}
</script>

<template>

  <q-card class="q-mt-sm">
    <q-card-section v-if="loading">
      <global_loading_shape></global_loading_shape>
    </q-card-section>
    <template v-else>
      <q-card-section >
        <div class="text-right q-mb-lg">
          <q-btn  class=" q-mr-sm" color="blue-8"  glossy icon="fas fa-edit" size="11px" round>
            <q-tooltip  transition-show="scale" transition-hide="scale" class="bg-blue-grey-9 font-12">
              ویرایش اطلاعات
            </q-tooltip>
          </q-btn>
          <q-btn :to="{name : 'projects'}"  class=" q-mr-sm" color="blue-grey-8"  glossy icon="fas fa-arrow-left" size="11px" round>
            <q-tooltip  transition-show="scale" transition-hide="scale" class="bg-blue-grey-9 font-12">
              بازگشت
            </q-tooltip>
          </q-btn>
        </div>
        <div class="row q-gutter-lg">
          <div class="q-px-md">
            <span class="text-grey-9 font-15">نام پروژه : </span>
            <strong class="text-red-8 font-16">{{project.name}}</strong>
          </div>
          <div class="q-px-md">
            <span class="text-grey-9 font-15">کد پروژه : </span>
            <strong class="text-indigo-8 font-16">{{project.code}}</strong>
          </div>
          <div class="q-px-md">
            <span class="text-grey-9 font-15">دسته بندی : </span>
            <template v-if="project.category">
              <strong :style="'color:'+project.category.color" class="font-16 q-ml-sm"> {{project.category.name}} </strong>
            </template>
            <template v-else>---</template>
          </div>
          <div class="q-px-md">
            <span class="text-grey-9 font-15">وضعیت : </span>
            <template v-if="project.status">
              <strong :style="'color:'+project.status.color" class="font-16 q-ml-sm">
                {{project.status.name}}
              </strong>
            </template>
            <template v-else>---</template>
          </div>
          <div class="q-px-md">
            <span class="text-grey-9 font-15">نام مدیر : </span>
            <strong class="font-16">{{project.manager_name}}</strong>
          </div>
          <div class="q-px-md">
            <span class="text-grey-9 font-15">شماره تماس مدیر : </span>
            <a :href="'tel:'+project.manager_phone">
              <strong class="font-16 text-dark">{{project.manager_phone}}</strong>
            </a>
          </div>
          <div class="q-px-md">
            <span class="text-grey-9 font-15">تعداد مشتریان : </span>
            <strong class="font-16">{{project.total_customers}}</strong>
          </div>
          <div class="q-px-md">
            <span class="text-grey-9 font-15">پروژه فعال : </span>
            <strong class="font-16">
              <template v-if="project.is_active"><q-icon name="fas fa-check" size="sm" color="green-7"></q-icon></template>
              <template v-else><q-icon name="fas fa-times" size="sm" color="red-7"></q-icon></template>
            </strong>
          </div>
          <div class="q-px-md">
            <span class="text-grey-9 font-15">تاریخ شروع : </span>
            <strong v-if="project.start_at" class="font-16 text-green-8">{{this.$filters.date_jalali(project.start_at,"jYYYY/jM/jD")}}</strong>
            <strong v-else> --- </strong>
          </div>
          <div class="q-px-md">
            <span class="text-grey-9 font-15">تاریخ پایان : </span>
            <strong v-if="project.end_at" class="font-16 text-green-8">{{this.$filters.date_jalali(project.end_at,"jYYYY/jM/jD")}}</strong>
            <strong v-else> --- </strong>
          </div>
          <div v-if="project.description" class="col-12 q-px-md">
            <strong>توضیحات : </strong> <span>{{project.description}}</span>
          </div>
        </div>
        <q-separator class="q-mt-md q-mb-md" />
        <div class="row">
          <div class="col-md-3 q-px-sm">
            <router-link :to="{name : 'projects_single_customers',params:{id:this.project.id}}">
              <div class="text-right cursor-pointer" :class="{'menu-box-active': ['projects_single', 'projects_single_customers'].includes(this.$route.name), 'menu-box': !['projects_single', 'projects_single_customers'].includes(this.$route.name)}">
                <strong class="q-mt-sm font-15 float-left"> لیست مشتریان</strong>
                <q-icon  name="fas fa-users" size="md" ></q-icon>
              </div>
            </router-link>
          </div>
          <div class="col-md-3 q-px-sm">
            <router-link :to="{name: 'projects_single_users',params:{id:this.project.id}}">
              <div class="menu-box text-right cursor-pointer" :class="{'menu-box-active': this.$route.name === 'projects_single_users', 'menu-box': !this.$route.name === 'projects_single_users'}">
                <strong class="q-mt-sm font-15 float-left"> کارشناسان پروژه</strong>
                <q-icon  name="fas fa-user-tie" size="md" ></q-icon>
              </div>
            </router-link>
          </div>
          <div class="col-md-3 q-px-sm">
            <div class="menu-box text-right cursor-pointer">
              <strong class="q-mt-sm font-15 float-left"> گزارشات</strong>
              <q-icon  name="fas fa-clipboard-list" size="md" ></q-icon>
            </div>
          </div>
          <div class="col-md-3 q-px-sm">
            <div class="menu-box text-right cursor-pointer">
              <strong class="q-mt-sm font-15 float-left"> فاکتور ها</strong>
              <q-icon  name="fas fa-dollar" size="md" ></q-icon>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-mb-md">
        <project_customers @Assigned="Get_Item" :project="project" ></project_customers>
      </q-card-section>
    </template>

  </q-card>

</template>

<style scoped>
.menu-box{
  padding: 22px 22px;
  border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.1);
  color: black !important;
}
.menu-box-active{
  padding: 22px 22px;
  border-radius: 7px;
  color: white !important;
  background-color: rgba(245, 91, 8, 0.93);
}
</style>