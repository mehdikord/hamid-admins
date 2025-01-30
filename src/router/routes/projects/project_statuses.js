import Project_Statuses from "@/views/projects/statuses/Project_Statuses.vue";


const project_statuses = [
    {
        path: '/projects/statuses',
        name: 'project_statuses',
        component : Project_Statuses,
        meta:{
            title : 'پروژه ها',
            subtitle : 'وضعیت های پروژه'
        }
    },


]

export default project_statuses;