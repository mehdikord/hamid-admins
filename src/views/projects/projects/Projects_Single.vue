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

  <q-card bordered  flat>
    <q-card-section v-if="loading" class="q-pa-xs">
      <global_loading_shape></global_loading_shape>
    </q-card-section>
    <q-card-section v-else>
      <div class="row">
        <div class="col-12 row">
          <div class="col-6">
            <q-icon name="fa-duotone fa-circle fa-fade" class="q-mr-sm" color="teal-14"></q-icon>
            <strong class="font-18">{{ project.name }}</strong>
          </div>
          <div class="col-6 text-right">
            <q-btn round color="red" icon="fa-duotone fa-light fa-hand" title="غیرفعال کردن پروژه" size="11px" class="q-mr-sm"></q-btn>
            <q-btn round color="blue-7" icon="fa-duotone fa-light fa-pen" title="ویرایش اطلاعات" size="11px" class="q-mr-sm"></q-btn>
            <q-btn :to="{name : 'projects'}" round color="grey-8" icon="fa-duotone fa-regular fa-arrow-left" title="بازگشت" size="11px"></q-btn>
          </div>
        </div>

      </div>
    </q-card-section>

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