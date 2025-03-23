<script>
export default {
  name: "Global_Actions_Header_Buttons",
  props:['index','create','archive']
}
</script>

<template>
  <q-btn v-if="create" @click="this.$emit('Create','ok')" class="float-right" color="indigo-7" icon="fa-duotone fa-plus fa-regular" size="11px" round>
    <q-tooltip  transition-show="scale" transition-hide="scale" class="bg-blue-grey-9 font-12">
      افزودن آیتم
    </q-tooltip>
  </q-btn>
</template>

<style scoped>

</style>