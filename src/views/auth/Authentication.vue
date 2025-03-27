<script>
import {Stores_Auth} from "@/stores/auth/auth.js";

export default {
  name:'Authentication',
  mounted() {
    // document.body.classList.add("auth-background");
  },
  unmounted() {
    document.body.classList.remove("auth-background");
  },
  data(){
    return {
      loading:false,
      login : {
        email: null,
        password: null
      }
    }
  },
  methods:{
    Login(){
      if (!this.login.email || !this.login.password){
        return this.Methods_Notify_Message_Error("اطلاعات مورد نیاز را کامل کنید !")
      }
      this.loading = true;
      axios.post('/admins/auth/login',this.login).then(res=>{
        Stores_Auth().AuthLogin(res.data.result.user,res.data.result.token)
        this.Methods_Notify_Message_Success("باموفقیت وارد حساب کاربری شدید")
        this.$router.push('/');
      }).catch(err=>{
        if(err.response.status === 401){
          this.Methods_Notify_Message_Error("اطلاعات ورود به حساب نادرست است")
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.loading = false;

      })


    }
  }

}

</script>

<template>
  <div class="row">
    <div class="col-md-6 col-xs-12 q-pa-xl moblie">
      <div class="row justify-center">
        <div class="col-md-9 col-xs-12">
          <div class="login-box q-mt-xl">
            <div class="q-ml-md q-mt-lg">
              <strong class="font-lalezar font-weight-100 font-32">ورود به حساب کاربری</strong>
              <div class="q-mt-md text-grey-3">
                برای ورود آدرس ایمیل و گذروازه خود را وارد کنید
              </div>
            </div>
            <div class="q-mt-xl q-px-md q-mb-xl moblie">
              <div>
                <q-input outlined type="email" rounded label="آدرس ایمیل" v-model="login.email">
                  <template v-slot:prepend>
                    <q-icon name="fa-duotone fa-envelope q-ml-sm" color="teal-13"></q-icon>
                  </template>
                </q-input>
              </div>
              <div style="margin-top: 40px">
                <q-input outlined rounded label="گذرواژه" v-model="login.password" type="password">
                  <template v-slot:prepend>
                    <q-icon name="fa-duotone fa-key q-ml-sm" color="teal-13"></q-icon>
                  </template>
                </q-input>
              </div>
              <div style="margin-top: 60px;" class="text-center">
                <q-btn @click="Login" :loading="loading" color="teal-7" glossy icon="fa-duotone fa-send fa-light" label="ورود به حساب" rounded class="font-17 q-pt-sm q-pb-sm q-px-xl"></q-btn>
              </div>
              <div style="margin-top: 60px;" class="text-center">
                <strong class="text-teal-14">فراموشی گذرواژه !</strong>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 q-pa-xl xs-hide">
      <div class="row justify-center">
        <div class="col-md-12">
          <img src="assets/images/backgrounds/auth.svg" class="auth" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-box{
  padding: 20px 15px;
  border-radius: 10px;
  background-color: rgba(59, 56, 129, 0.35);
  backdrop-filter: blur(10px);
}
.auth{
  width: 95%;
}
@media only screen and (max-width: 768px) {
  .moblie{
    padding: 0px 0px !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}

</style>