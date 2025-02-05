<script>
import {Stores_Users} from "@/stores/users/users.js";
import {Stores_Projects} from "@/stores/projects/projects.js";

export default {
  name: "Project_Customers_Assigned",
  props:['project'],
  mounted() {
    this.Get_Users();
  },
  data(){
    return {
      loading:false,
      user_id:null,
      selected_users:[],
      users:[],
      divided_users:[],
      selected_users_info:[],
      description:null

    }

    },
  methods:{
    Assigned_Customers(){
      this.loading = true;
      console.log(this.divided_users);
      let divides = [];
      this.divided_users.forEach((item,index) => {
        if (item !== null){
          divides.push({
            user_id:index,
            amount : item
          })
        }
      })
      let params = {
        divides : divides,
        description : this.description,
        id : this.project.id
      }
      Stores_Projects().Assigned_Customers(params).then((res)=>{
        this.Methods_Notify_Message_Success("مشتریان با موفقیت به کارشناسان تخصیص داده شدند")
        this.$emit('Assigned')
      }).catch(error=>{
        if (error.response.status === 409) {
          this.Methods_Notify_Message_Error(error.response.data.message);
        }
        this.loading=false;
      })
    },
    Get_Users(){
      Stores_Users().All().then(res=>{
        this.users=[];
        res.data.result.forEach(item => {
          if(!this.selected_users.includes(item.id)){
            this.users.push({
              label : item.name,
              value : item.id,
              phone: item.phone,
            })
          }

        })

      }).catch(err=>{
        this.Methods_Notify_Error_Server();

      })

    },
    Select_User(){
      if (!this.user_id){
        return this.Methods_Notify_Message_Error("ابتدا یک کارشناس انتخاب کنید")
      }
      this.selected_users.push(this.user_id);
      this.users = this.users.filter(item => {
        if (item.value === this.user_id){
          this.selected_users_info.push(item);
        }
        return item.value !== this.user_id
      })
      this.user_id=null;
      let divided = this.Methods_Divide_Equally(this.project.pending_customers,this.selected_users.length);
      this.selected_users.forEach((item,index) => {
        this.divided_users[item] = divided[index];
      })
    },
    Filter_Users_Select (val, update, abort) {
      update(() => {
        if (val){
          this.users =  this.users.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Users();
        }
      })
    },

  }
  }
</script>

<template>
  <q-banner class="q-mb-md bg-blue-9 rounded-borders text-white">
    برای تخصیص مشتریان به کارشناسان ابتدا کارشناس مورد نظر را با دکمه انتخاب کارشناس ، انتخاب کرده سپس در لیست تعداد مشتریان دریافتی برای هر کارشناس مشاهده میشود و قایل ویراش است .
  </q-banner>
  <q-select
      outlined
      transition-show="flip-up"
      transition-hide="flip-down"
      v-model="user_id"
      label="انتخاب کارشناس مورد نظر"
      :options="users"
      @filter="Filter_Users_Select"
      emit-value
      map-options
      use-input
      class="q-mt-sm"
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
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
  <div class="text-right q-mt-md">
    <q-btn @click="Select_User" color="teal-8" glossy label="انتخاب کارشناس" push icon="fas fa-user-plus"></q-btn>
  </div>
  <div v-if="selected_users_info.length" class="q-mt-sm">
    <strong class="text-red-8">کارشناسان انتخاب شده :</strong>
    <div class="q-mt-md">
      <div v-for="item in selected_users_info" class="user-box q-mb-md row">
        <div class="col-md-6">
          <div class="q-mt-sm">
            <q-icon name="fas fa-user" color="blue-9" size="30px"></q-icon>
            <strong class="q-ml-sm">{{item.label}}</strong>
            -
            <strong class="q-ml-sm">( <span class="text-grey-8">{{item.phone}}</span> )</strong>
          </div>
        </div>
        <div class="col-md-6">
          <q-input outlined rounded type="number" v-model="divided_users[item.value]" >
            <template v-slot:append>
              <q-icon name="fas fa-users" color="red-7" class="q-mr-sm"></q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
  </div>
  <div class="q-mt-md">
    <q-input   outlined v-model="description" rows="3"  type="textarea" label="توضیحات">

    </q-input>
  </div>
  <div class="q-mt-xl text-right">
    <q-btn color="grey-8" glossy icon="fas fa-times" label="بستن" class="q-mr-sm" v-close-popup></q-btn>
    <q-btn @click="Assigned_Customers" :loading="loading" color="indigo-7" glossy icon="fas fa-check" label="تخصیص به کارشناسان"></q-btn>
  </div>
</template>

<style scoped>
  .user-box{
    padding:15px 12px;
    border-radius: 8px;
    border:1px dashed rgba(33, 33, 33, 0.26);

  }
</style>