import {QSpinnerGears, useQuasar} from 'quasar'

export default {
    data(){
        return {
            VUE_APP_ASSET:null,
        }
    },
    created() {
        this.VUE_APP_ASSET = import.meta.env.VITE_API_ASSET_URL

    },

    mounted() {
        const $q = useQuasar();

    },
    methods:{

        //All notifications methods
        Methods_Notify_Generator(message,color='deep-orange',icon='fa-duotone fa-regular fa-envelope-open-text',caption=null,timeout=null,position='bottom-right'){
            this.$q.notify({
                message: message,
                color : color,
                icon : icon,
                progress : true,
                caption : caption,
                timeout : timeout,
                badgeColor : 'dark',
                position : position
            })
        },
        Methods_Notify_Generator_Spinner(message,color='deep-orange'){
            this.$q.notify({
                message: message,
                color : color,
                progress : true,
                classes : 'glossy',
                spinner : QSpinnerGears
            })
        },
        Methods_Notify_Generator_Avatar(message,color='deep-orange',avatar='assets/images/logo.png'){
            this.$q.notify({
                message: message,
                color : color,
                progress : true,
                classes : 'glossy',
                avatar : avatar
            })
        },

        //Default notification types
        Methods_Notify_Message_Success(message){
            this.Methods_Notify_Generator(message,'green-7','fa-duotone fa-regular fa-check ');
        },

        Methods_Notify_Message_Error(message){
            this.Methods_Notify_Generator(message,'red-7','fa-duotone fa-regular fa-times ');
        },

        //Default notification message
        Methods_Notify_Update(){
            this.Methods_Notify_Generator('اطلاعات باموفقیت بروزرسانی شد','green-7','fa-duotone fa-regular fa-check ');
        },
        Methods_Notify_Create(){
            this.Methods_Notify_Generator('اطلاعات باموفقیت ثبت شد','green-7','fa-duotone fa-regular fa-check ');

        },
        Methods_Notify_Delete(){
            this.Methods_Notify_Generator('اطلاعات باموفقیت حذف شد','green-7','fa-duotone fa-regular fa-check ');

        },

        Methods_Notify_Error_Server(){
            this.Methods_Notify_Generator('خطای سرور : سرور پاسخگو نیست !','red-7','fa-duotone fa-regular fa-times ');
        },

        Methods_Notify_Error_Internal(){
            this.Methods_Notify_Generator('خطای داخلی : سیستم پاسخگو نیست !','red-7','fa-duotone fa-regular fa-times ');
        },

        Methods_Notify_Error_NotFound(){
            this.Methods_Notify_Generator('آیتم مورد نظر یافت نشد ! اطلاعات را بررسی کنید','red-7','fa-duotone fa-regular fa-times ');
        },

        //Validations check and error message methods
        Methods_Validation_Check(errors=[],field){
            return !!(errors[field] && errors[field].length);
        },
        Methods_Validation_Notify(){
            this.Methods_Notify_Generator('اطلاعات ارسالی ناقص است!','red-7','fa-duotone fa-regular fa-triangle-exclamation')
        },

        Methods_Validation_Errors(errors=[],field){
            return errors[field] && errors[field].length ? errors[field] : {};
        },

        //text shorter
        Methods_Text_Shorter(text,count=25){

            let text_count=text.length;
            if(text_count<= count){
                return text
            }else{
                return text.substring(0,count)+ " ..." ;
            }

        },

        //Get File type by extension
        Methods_Files_Get_Type(extension= null){
            let text = ['txt','pdf','doc','docx','rtf','wps'];
            let image = ['png','svg','jpg','jpeg'];
            let video = ['mp4','mkv','avi','mov','flv','wmv','webm'];
            let audio = ['mp3','wav','ogg','aac','flac'];
            let archive = ['zip','rar','7zip','tar','gz','tar.gz','zipx','zz'];
            let office = ['xlsx','xlsm','xltx','xltm','ppt','pot','pps','ppa','accda','accdb','accde','one','ecf','pub'];
            if (text.includes(extension)){
                return 'text';
            }
            if (image.includes(extension)){
                return 'image';
            }
            if (video.includes(extension)){
                return 'video';
            }
            if (audio.includes(extension)){
                return 'audio';
            }
            if (archive.includes(extension)){
                return 'archive';
            }
            if (office.includes(extension)){
                return 'office';
            }
            return 'unknown'

        },

        //Get File extension by file path
        Methods_Files_Get_Extension(url){
            // Use URL constructor to handle edge cases

            // Extract extension after the last '.' and return it
            const extension = url.substring(url.lastIndexOf('.') + 1);

            return extension ? extension.toLowerCase() : null;
        },

        Methods_Date_Today(format = "jYYYY-jMM-jDD"){
            return moment().format(format)
        },

        Methods_Date_Jalali_To_Gregorian(date){
            return moment(date, 'jYYYY/jM/jD').format('YYYY-M-D')
        },

        Methods_Date_Gregorian_To_Jalali(date){
            return moment(date, 'YYYY-M-D').format('jYYYY-jMM-jDD')
        },
        Methods_Divide_Equally(number,people){
            const base_amount = Math.floor(number / people);

            const remainder = number % people;

            const result = [];

            for (let i = 0; i < people; i++) {
                result.push(base_amount);
            }

            for (let i = 0; i < remainder; i++) {
                result[i]++;
            }

            return result;
        }



    }

}