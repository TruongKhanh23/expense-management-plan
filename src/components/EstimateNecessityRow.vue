<template>
  <a-row
    class="border-b-2 border-[white] leading-[3.5rem] flex justify-center items-center"
    :class="rowClass"
  >
    <a-col flex="4" class="text-left pl-4" :class="nameColClass">{{
      name
    }}</a-col>
    <a-col flex="1" class="pr-4" :class="amountColClass">{{
      new Intl.NumberFormat().format(amount)
    }}</a-col>
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
    name: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    rowClass: {
      type: String,
      require: false,
    },
    nameColClass: {
      type: String,
      require: false,
    },
    amountColClass: {
      type: String,
      require: false,
    },
  },
};
</script>
