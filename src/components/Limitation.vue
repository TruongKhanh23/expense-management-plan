<template>
  <a-row justify="space-around" class="bg-[#ffdddd] rounded-full">
    <a-col :span="3" class="border-r-2 border-r-[white]">
      <p class="my-2 font-bold">Hạn mức</p>
    </a-col>
    <template v-for="fund in funds" :key="fund.id">
      <a-col :span="3">
        <p class="my-2 font-bold">
          {{
            new Intl.NumberFormat().format(
              (totalIncome * fund.percentage) / 100,
            )
          }}
        </p>
      </a-col>
    </template>
  </a-row>
</template>
<script>
import { Row, Col } from "ant-design-vue";
export default {
  components: {
    ARow: Row,
    ACol: Col,
  },
  props: {
    funds: {
      type: Object,
      require: true,
    },
    totalIncome: {
      type: Number,
      require: true,
    },
  },
};
</script>
