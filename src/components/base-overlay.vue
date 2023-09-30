<template>
  <div class="overlay">
    <div class="loader"></div>
  </div>
</template>

<style lang="scss" scoped>
.overlay{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:rgba(0, 0, 0, 0.1);
}
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite
}
.loader::before , .loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 5px solid #FFF;
  animation: prixClipFix 2s linear infinite ;
}
.loader::after{
  transform: rotate3d(90, 90, 0, 180deg );
  border-color: #FF3D00;
}

@keyframes rotate {
  0%   {transform: rotate(0deg)}
  100%   {transform: rotate(360deg)}
}

@keyframes prixClipFix {
  0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
  50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
  75%, 100%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
}
</style>