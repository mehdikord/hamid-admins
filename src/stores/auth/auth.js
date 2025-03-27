import { defineStore } from 'pinia'
export const Stores_Auth = defineStore('auth',{
    state : ()=>({
        user : null,
        token : null
    }),
    actions : {
        AuthLogin(user,token){
            this.user = user;
            this.token = token
            localStorage.setItem('crm_token', token)
            localStorage.setItem('crm_user', JSON.stringify(user));
        },
        AuthSyncData(){
            if (localStorage.getItem('crm_token')){
                this.token = localStorage.getItem('crm_token');
            }
            if (localStorage.getItem('crm_user')){
                this.user = JSON.parse(localStorage.getItem('crm_user'));
            }
        },
        AuthLogout(){
            localStorage.removeItem('crm_token');
            localStorage.removeItem('crm_user');
            window.location.reload();
        }
    },
    getters :{
        AuthGetUser(){
            return this.user;
        },
        AuthGetToken(){
            return this.token;
        },
        AuthGetCheckAuth(){
            return !!this.token;
        }




    }




})