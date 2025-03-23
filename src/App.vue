<script>
import Template_Header_User from "@/components/template/header/Template_Header_User.vue";
import Template_Header_Notifications from "@/components/template/header/Template_Header_Notifications.vue";
import Template_Header_Shortcuts from "@/components/template/header/Template_Header_Shortcuts.vue";
import Template_Menu_Main from "@/components/template/menu/Template_Menu_Main.vue";
import Template_Title from "@/components/template/Template_Title.vue";
import Template_Header_Search from "@/components/template/header/Template_Header_Search.vue";

export default {

  components:{
    'template_header_user' : Template_Header_User,
    'template_header_notification' : Template_Header_Notifications,
    'template_header_search' : Template_Header_Search,
    'template_header_shortcuts' : Template_Header_Shortcuts,
    'template_menu_main' : Template_Menu_Main,
    'template_title' : Template_Title,
  },
  data() {
    return {
      leftDrawerOpen: true,
      rightDrawerOpen: false,

    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;

    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    }
  }

}
</script>

<template>

  <q-layout view="hHh LpR fff">

    <q-header  v-if="this.$route.name !== 'auth'" class="header_bg text-white q-pt-xs q-pb-xs">
      <q-toolbar>
        <q-btn dense flat round icon="fa-duotone fa-grid-2 fa-light font-28" @click="toggleLeftDrawer" />
        <q-toolbar-title class="q-py-xs">
        </q-toolbar-title>
        <template_header_search></template_header_search>
        <template_header_shortcuts class="q-ml-md"  ></template_header_shortcuts>
        <template_header_notification class="q-ml-md"  ></template_header_notification>
        <template_header_user class="q-ml-md" ></template_header_user>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="this.$route.name !== 'auth'" v-model="leftDrawerOpen" side="left" style="background-color: #0b0c10">
      <template_menu_main></template_menu_main>
    </q-drawer>

    <!--    <q-drawer  v-model="rightDrawerOpen" side="right" bordered>-->

    <!--    </q-drawer>-->

    <q-page-container>

      <q-page class="q-pa-sm q-px-sm">
        <template_title v-if="this.$route.name !== 'auth'" class="q-mb-md"></template_title>
        <router-view></router-view>
      </q-page>

    </q-page-container>

  </q-layout>

</template>
<style scoped>

.header_bg{
  background-color: #0d0e12;
}

</style>


