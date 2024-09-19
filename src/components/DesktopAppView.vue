<template>
  <a-col :md="{ span: 6 }">
    <EstimateNecessity
      :data="dataEstimateNecessity"
    />
  </a-col>

  <a-col :md="{ span: 8 }">
    <IncomeDebt
      :totalIncome="totalIncome"
      :isDark="isDark"
    />
  </a-col>

  <a-col :md="{ span: 10 }">
    <HandleIncome
      :isDark="isDark"
      :totalIncome="totalIncome"
    />
  </a-col>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Col, Button } from "ant-design-vue";
import IncomeDebt from "@/components/IncomeDebt.vue";
import HandleIncome from "@/components/HandleIncome.vue";
import EstimateNecessity from "@/components/EstimateNecessity.vue";

export default {
  components: {
    ACol: Col,
    AButton: Button,
    IncomeDebt,
    HandleIncome,
    EstimateNecessity,
  },
  props: {
    isDark: {
      type: [Boolean, Object],
      require: undefined,
    },
  },
  setup() {
    const store = useStore();
    const totalIncome = computed(() => store.getters.getTotalIncome);
    const dataEstimateNecessity = computed(
      () => store.getters.getEstimateNecessities,
    );
    return { totalIncome, dataEstimateNecessity };
  },
};
</script>
