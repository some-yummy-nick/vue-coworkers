<template>
  <div class="coworkers">
    <div class="coworkers__top">
      <h2 class="small-title">Результаты</h2>
    </div>
    <div class="coworkers__wrapper" v-if="coworkers">
      <button class="reset-btn coworkers__item"
              :class="{active: worker ? item.id === worker.id : false}"
              v-for="item in coworkers"
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
    <div class="coworkers__empty" v-else>Ничего не найдено</div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useStore} from 'vuex'

const store = useStore()
const coworkers = computed(() => store.getters.coworkers)
const worker = computed(() => store.getters.worker)

async function handleWorker(id) {
  const worker = coworkers.value.find(item => item.id === id)
  await store.dispatch('setWorker', worker)
}

</script>

<style scoped lang="scss">
@import "@/styles/utils/variables";

.coworkers {
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
</style>