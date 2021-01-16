<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
/* 每个页面中都可以写css或是less，由当前需求决定 */
* {
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
.el-dialog__header {
  background: linear-gradient(270deg, #01c6fa, #1493fa);
  text-align: center;
}

.el-dialog__title {
  color: #fff !important;
}

.el-dialog__close {
  color: #fff !important;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
