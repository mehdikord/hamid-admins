import { defineStore } from 'pinia'
export const Stores_Project_Categories = defineStore('project_categories',{
    state : ()=>({}),
    actions : {
        Index(params){
            return new Promise((resolve, reject) => {
                axios.get('admins/projects/categories',{params : params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        All(){
            return new Promise((resolve, reject) => {
                axios.get('admins/projects/categories/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Create(params){
            return new Promise((resolve, reject) => {
                axios.post('admins/projects/categories',params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Show(id){
            return new Promise((resolve, reject) => {
                axios.get('admins/projects/categories/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Edit(params){
            return new Promise((resolve, reject) => {
                axios.put('admins/projects/categories/'+params.id,params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Delete(id){
            return new Promise((resolve, reject) => {
                axios.delete('admins/projects/categories/'+id).then(response =>{
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