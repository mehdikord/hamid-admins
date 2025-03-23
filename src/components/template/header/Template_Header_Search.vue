<script>

export default {
  name: "Template_Header_Search",
  data(){
    return {
      search_dialog:false,
    }
  },
  methods:{

  },
  mounted() {

  }

}
</script>

<template>
  <q-btn @click="search_dialog=true" title="جستجتو" round icon="fa-duotone fa-search" size="14px">
  </q-btn>
  <q-dialog
      v-model="search_dialog"
      position="top"
  >
    <q-card style="width: 700px; max-width: 80vw; margin-top: 80px" >
      <q-card-section class="bg-deep-orange-8">
        <strong class="font-16">جستجو در سیستم</strong>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-lg q-mt-sm">
          <q-input rounded outlined color="indigo-5" placeholder="جستجو ... ">
            <template v-slot:prepend>
              <q-icon name="fa-duotone fa-search fa-light q-ml-sm" color="deep-orange"></q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>