<script>
export default {
  name: "Template_Title"
}
</script>

<template>
  <q-card-section class="q-py-xs row q-gutter-sm">
    <div class="text-subtitle1 font-weight-600 font-14">
      {{this.$route.meta.title}}
    </div>
    <div>
      <q-icon name="fa-duotone fa-chevron-left" color="white" style="margin-top: 6px"></q-icon>
    </div>
    <div class="text-subtitle2 font-13">
      {{this.$route.meta.subtitle}}
    </div>
  </q-card-section>
</template>

<style scoped>
.text-subtitle2{
  margin-top: 10px;
}
</style>