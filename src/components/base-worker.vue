<template>
  <div v-if="worker" class="worker">
    <div class="worker__wrapper">
      <div class="worker__image">
        <img class="worker__picture" :src="worker.image" :alt="worker.name">
      </div>
      <div class="worker__info">
        <h2 class="worker__name small-title">{{ worker.name }}</h2>
        <h2 class="small-title">О себе:</h2>
        <div class="worker__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </div>
  </div>
  <div v-else class="empty">Выберите документ, чтобы посмотреть его содержимое</div>
</template>

<script setup>
import {computed} from "vue";
import {useStore} from 'vuex'

const store = useStore()
const worker = computed(() => store.getters.worker)

</script>

<style scoped lang="scss">
@import "@/styles/utils/variables";

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 14px;
  color: $gray-color;
}

.worker {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    padding: 30px 20px;
  }

  &__image {
    background-color: #ccc;
    overflow: hidden;
  }

  &__picture {
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
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
      background-color: #ccc;
      position: absolute;
      border: 1px solid $border-color;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background-image: url('@/assets/images/big-default-image.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  @media screen and (max-width: $mobile-width) {
    &__wrapper {
      display: block;
    }
  }

  &__image {
    margin-bottom: 15px;
  }
}

</style>