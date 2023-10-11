<template>
  <div class="coworkers">
    <div class="coworkers__top">
      <h2 class="small-title">Результаты</h2>
    </div>
    <div class="coworkers__wrapper" v-if="coworkers && coworkers.length">
      <button class="reset-btn coworkers__item"
              :class="{active: worker ? item.id === worker.id : false}"
              v-for="item in displayedWorkers"
              :key="item.id"
              @click="handleWorker(item.id)"
      >
        <span class="coworkers__image">
          <img class="coworkers__picture" :src="item.image" :alt="item.description">
        </span>
        <span class="coworkers__description">
          <span class="coworkers__name">{{ item.name }}</span>
          <span class="coworkers__email">{{ item.email }}</span>
        </span>
      </button>
    </div>
    <div class="coworkers__empty" v-else>{{ search ? 'Ничего не найдено' : 'начните поиск' }}</div>
    <div class="pagination" v-if="coworkers && coworkers.length > perPage">
      <div class="pagination__wrapper">
        <button type="button" class="reset-btn pagination__prev" v-if="page !== 1" @click="page--"> prev</button>
        <button type="button" class="reset-btn pagination__item" v-for="pageNumber in pages.slice(page-1, page+5)"
                :key="pageNumber" @click="page = pageNumber"> {{ pageNumber }}
        </button>
        <button type="button" @click="page++" v-if="page < pages.length" class="reset-btn pagination__next">next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch} from "vue";
import {useStore} from 'vuex'

const store = useStore()
const coworkers = computed(() => store.getters.coworkers)
const worker = computed(() => store.getters.worker)
const search = computed(() => store.getters.search)

const page = ref(1)
const perPage = 5
const pages = ref([])
const displayedWorkers = ref([])

function setPages() {
  pages.value = []
  let numberOfPages = Math.ceil(coworkers.value.length / perPage);
  for (let index = 1; index <= numberOfPages; index++) {
    pages.value.push(index);
  }
}

function paginate(workers) {
  let currentPage = page.value;
  let from = (currentPage * perPage) - perPage;
  let to = (currentPage * perPage);
  return workers.slice(from, to);
}

watch(coworkers, () => {
  setPages()
  displayedWorkers.value = paginate(coworkers.value)
})

watch(page, () => {
  displayedWorkers.value = paginate(coworkers.value)
})

async function handleWorker(id) {
  const worker = coworkers.value.find(item => item.id === id)
  await store.dispatch('setWorker', worker)
}

</script>

<style scoped lang="scss">
@import "@/styles/utils/variables";

.coworkers {
  &__wrapper {
    margin-bottom: 10px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    box-shadow: $box-shadow;
    border-radius: $border-radius;
    overflow: hidden;
    font-size: 14px;
    text-align: left;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    &.active {
      background-color: $border-color;
    }
  }

  &__image {
    width: 70px;
    height: 70px;
  }

  &__picture {
    display: block;
    position: relative;
    height: 100%;
    font-weight: 300;
    line-height: 2;
    text-align: center;
    min-width: 70px;
    min-height: 70px;
    object-fit: cover;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background-image: url('@/assets/images/default-image.png');
    }
  }

  &__name {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
  }

  &__email {
    color: $gray-color;
  }

  &__empty {
    font-size: 14px;
    color: $gray-color;
  }
}

.pagination {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__item,
  &__next,
  &__prev {
    box-shadow: $box-shadow;
    padding: 5px;
  }

  &__prev {
    margin-right: 5px;
  }

  &__item {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
}
</style>