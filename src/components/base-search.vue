<template>
  <div class="search">
    <h2 class="small-title">Поиск сотрудников</h2>
    <input type="search"
           class="input"
           placeholder="Введите Id или имя"
           :value="search"
           @input="handleFieldsInput"
    >
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useStore} from 'vuex'

import {useDebounce} from "@/use/debounce";

const store = useStore()
const search = computed(() => store.getters.search)

const handleFieldsInput = useDebounce(handleInput, 500)

async function handleInput(e) {
  await store.dispatch('setSearch', e.target.value)
}
</script>