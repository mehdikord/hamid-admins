<script>
export default {
  name: "Template_Menu_Components_Sub_Menu",
  props:['item'],
}
</script>

<template>
  <template v-if="item.title">
    <div class="text-blue-grey-5 q-pt-md q-pb-sm q-pl-md menu-title">
      {{ item.fa }}
    </div>
  </template>
  <template v-else>
    <template v-if="item.route_name">
      <q-expansion-item
          class="menu-sub"
          :class="{'menu-active' : this.$route.name === item.route_name}"
          :label="item.fa"
          dense-toggle
          icon="fa-duotone fa-circle-dot font-11 text-light"
          expand-separator
          hide-expand-icon
          :to="{name : item.route_name}"
          :header-inset-level="item.level"
      >
      </q-expansion-item>
    </template>
    <template v-else>
      <q-expansion-item
          class="menu q-mb-sm"
          :class="{'menu-active' : this.$route.name === item.route_name}"
          :icon="item.icon+' font-22'"
          :label="item.fa"
          dense-toggle
          expand-separator
          :header-inset-level="item.level"
      >
        <template v-if="item.subs">

          <global_menu_item v-for="sub in item.subs" :item="sub"></global_menu_item>

        </template>
      </q-expansion-item>
    </template>
  </template>


</template>

<style scoped>
.menu{
  color: #9a9cae !important;
  font-size: 15px;
  font-weight: 600;
}
.menu:hover{
  color: #ffffff !important;
}
.menu-active{
  color: #FFFFFF !important;
}
.menu-title{
  font-size: 12px;
}
.menu-sub{
  color: #9a9cae !important;
  font-size: 13px;
  font-weight: 600;
}


</style>