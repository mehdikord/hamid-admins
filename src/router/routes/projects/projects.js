
import Projects from "@/views/projects/projects/Projects.vue";
import Projects_Single from "@/views/projects/projects/Projects_Single.vue";


const projects = [
    {
        path: '/projects',
        name: 'projects',
        component : Projects,
        meta:{
            title : 'پروژه ها',
            subtitle : 'مدیریت پروژه ها'
        }
    },
    {
        path: '/projects/:id',
        name: 'projects_single',
        component : Projects_Single,
        meta:{
            title : 'پروژه ها',
            subtitle : 'جزئیات پروژه'
        }
    },
    {
        path: '/projects/:id/customers',
        name: 'projects_single_customers',
        component : Projects_Single,
        meta:{
            title : 'پروژه ها',
            subtitle : 'جزئیات پروژه : لیست مشتریان'
        }
    },
    {
        path: '/projects/:id/users',
        name: 'projects_single_users',
        component : Projects_Single,
        meta:{
            title : 'پروژه ها',
            subtitle : 'جزئیات پروژه : لیست کارشناسان'
        }
    },


]

export default projects;