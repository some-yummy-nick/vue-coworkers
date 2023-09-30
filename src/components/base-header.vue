<template>
  <header class="header">
    <div class="header__wrapper">
      <h1 class="header__title">Жилфонд</h1>
      <div class="user">Пользователь</div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import "@/styles/utils/variables";

.header {
  margin-bottom: 35px;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title{
    font-size: 32px;
    color: $red-color;
  }
}
</style>