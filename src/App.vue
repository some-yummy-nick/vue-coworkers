<template>
  <div class="app">
    <div class="container app__container">
      <BaseHeader/>
      <BaseOverlay v-if="overlay"/>
      <div class="app__wrapper">
        <BaseSidebar/>
        <BaseWorker/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'

import {request} from "@/api";
import BaseHeader from "@/components/base-header.vue"
import BaseSidebar from "@/components/base-sidebar.vue"
import BaseWorker from "@/components/base-worker.vue"

const store = useStore()
const coworkers = computed(() => store.getters.coworkers)
const overlay = computed(() => store.getters.overlay)

let unsubscribe = ref(null)

async function getCoworkers(q) {
  try {
    await store.dispatch('setOverlay', true)
    const data = await request(`users?id=${q}`);
    await store.dispatch('setCoworkers', data)
  } catch (e) {
    console.error(e);
    alert(e.message)
  } finally {
    await store.dispatch('setOverlay', false)
  }
}
onMounted(async () => {
  unsubscribe.value = store.subscribe(async (mutation, state) => {
    if (mutation.type === 'setSearch') {
      if(state.search.search){
        await getCoworkers(state.search.search)
      }else {
        await store.dispatch('setCoworkers', [])
        await store.dispatch('setWorker', null)
      }
    }
  });
})
</script>

<style scoped lang="scss">
@import "@/styles/utils/variables";

.app {
  padding-top: 40px;
  padding-bottom: 40px;
  height: 100%;

  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__wrapper {
    flex-grow: 1;
    display: flex;
    box-shadow: $box-shadow;
    border-radius: $border-radius;
  }

  @media screen and (max-width: $mobile-width) {
    &__wrapper {
      display: block;
    }
  }
}
</style>
