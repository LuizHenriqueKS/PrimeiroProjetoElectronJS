<template>
  <div class="pill">
    <span class="name">{{ name }}</span>
    <span class="amount">{{ amount }}</span>
  </div>
</template>

<script>
export default {
  props: ["name", "amount"],
};
</script>

<style scoped>
.pill {
  margin: 10px;
  height: 55px;
  border-radius: 30px;

  background-color: #dc143ccc;
  box-shadow: 1px 1px 2px 0px #00000078;

  color: white;
  font-size: 1.3rem;
  font-weight: bold;

  display: flex;
  align-items: center;
}

.pill .name {
  margin-left: 15px;
}

.pill .amount {
  margin: 10px;
  padding: 5px;
  height: 35px;
  min-width: 35px;
  border-radius: 100%;

  background-color: white;
  color: #dc143c;

  font-size: 14px;

  display: flex;
  align-items: center;
}
</style>