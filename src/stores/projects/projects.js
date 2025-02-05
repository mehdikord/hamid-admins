import { defineStore } from 'pinia'
export const Stores_Projects = defineStore('project',{
    state : ()=>({}),
    actions : {
        Index(params){
            return new Promise((resolve, reject) => {
                axios.get('admins/projects',{params : params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Create(params){
            return new Promise((resolve, reject) => {

                axios.post('admins/projects',params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Show(id){
            return new Promise((resolve, reject) => {
                axios.get('admins/projects/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Edit(params){
            return new Promise((resolve, reject) => {
                axios.put('admins/projects/'+params.id,params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Delete(id){
            return new Promise((resolve, reject) => {
                axios.delete('admins/projects/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Activation(id){
            return new Promise((resolve, reject) => {
                axios.get('admins/projects/'+id+'/activation').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Add_Customers(params){
            return new Promise((resolve, reject) => {
                let data = new FormData();
                if(params.excel){data.append('excel',params.excel,params.excel.name);}
                if(params.numbers){data.append('numbers',params.numbers);}
                if(params.description){data.append('description',params.description);}
                axios.post('admins/projects/'+params.id+'/customers',params,{headers: {'Content-Type': 'multipart/form-data'}}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Get_Customers(params){
            return new Promise((resolve, reject) => {
                axios.get('admins/projects/'+params.id+'/customers',{params : params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Assigned_Customers(params){
            return new Promise((resolve, reject) => {
                axios.post('admins/projects/'+params.id+'/customers/assigned',params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        }


    },
    getters :{

    }




})