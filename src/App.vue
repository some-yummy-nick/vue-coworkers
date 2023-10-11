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
import {computed, watch} from 'vue'
import {useStore} from 'vuex'

import {request} from "@/api";
import BaseHeader from "@/components/base-header.vue"
import BaseSidebar from "@/components/base-sidebar.vue"
import BaseWorker from "@/components/base-worker.vue"
import {prepareSearch} from "@/use/utils";

const store = useStore()
const coworkers = computed(() => store.getters.coworkers)
const overlay = computed(() => store.getters.overlay)
const search = computed(() => store.getters.search)

watch(search, async () => {
  if (search.value) {
    await getCoworkers(search.value)
  } else {
    await store.dispatch('setCoworkers', [])
    await store.dispatch('setWorker', null)
  }
})

async function getCoworkers(q) {
  try {
    const query = prepareSearch(q)
    await store.dispatch('setOverlay', true)
    const data = await request(`users${query}`);
    await store.dispatch('setCoworkers', data)
    if (!data.length) {
      await store.dispatch('setWorker', null)
    }
  } catch (e) {
    console.error(e);
    alert(e.message)
  } finally {
    await store.dispatch('setOverlay', false)
  }
}

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
