<script>
export default {
  name: "Global_Chips_Customer_Status",
  props : ['status']
}
</script>

<template>
  <q-chip class="font-13" v-if="status === 'pending'" color="yellow-10" text-color="dark" label="در انتظار" icon="fas fa-clock text-grey-4"></q-chip>
  <q-chip class="font-13" v-if="status === 'assigned'" color="green-8" text-color="white" label="تخصیص" icon="fas fa-user"></q-chip>

</template>

<style scoped>

</style>