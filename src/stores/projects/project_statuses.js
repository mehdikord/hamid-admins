import { defineStore } from 'pinia'
export const Stores_Project_Statuses = defineStore('project_statuses',{
    state : ()=>({}),
    actions : {
        Index(params){
            return new Promise((resolve, reject) => {
                axios.get('admins/projects/statuses',{params : params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        All(){
            return new Promise((resolve, reject) => {
                axios.get('admins/projects/statuses/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Create(params){
            return new Promise((resolve, reject) => {
                axios.post('admins/projects/statuses',params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Show(id){
            return new Promise((resolve, reject) => {
                axios.get('admins/projects/statuses/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Edit(params){
            return new Promise((resolve, reject) => {
                axios.put('admins/projects/statuses/'+params.id,params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Delete(id){
            return new Promise((resolve, reject) => {
                axios.delete('admins/projects/statuses/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },


    },
    getters :{

    }




})