<script setup lang="ts">
// 页面一只需要展示一行文字
</script>

<template>
  <div class="page-content">
    <div class="content-card">
      <p class="content-text">这是页面一</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-content {
  height: 100%;
}

.content-card {
  background: #fff;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8ecf1;

  .content-text {
    font-size: 18px;
    color: #2a3547;
    margin: 0;
    font-weight: 500;
  }
}
</style>

