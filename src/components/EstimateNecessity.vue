<template>
  <div class="px-4">
    <EstimateNecessityRow
      :name="'Dự dư'"
      :amount="necessityLimitation - calculateTotalExpense(data)"
      :rowClass="'font-semibold bg-[#FAFAFA] dark:bg-[#1D1D1D]'"
    />
    <EstimateNecessityRow
      :name="'Dự chi'"
      :amount="calculateTotalExpense(data)"
      :rowClass="'font-semibold bg-[#FAFAFA] dark:bg-[#1D1D1D]'"
    />
    <template v-for="item in data" :key="item">
      <EstimateNecessityRow
        :name="item.name"
        :amount="sumOfDetails(item)"
        :rowClass="'font-semibold bg-[#FFFFFF] hover:bg-[#FAFAFA] dark:bg-[#141414] dark:hover:bg-[#1B1B1B] cursor-pointer'"
        @click="toggleDropDown(item.id)"
      />
      <div v-if="isDropDownOpen(item.id)">
        <div class="flex flex-row mx-4 my-4 justify-between">
          <p class="mr-2">Chế độ chỉnh sửa:</p>
          <a-switch class="my-ant-switch" v-model:checked="isEditable" />
        </div>
        <template
          v-if="!isEditable"
          v-for="subItem in item.details"
          :key="subItem"
        >
          <EstimateNecessityRow :name="subItem.name" :amount="subItem.amount" />
        </template>
        <EstimateNecessityEdit v-else :data="item" />
      </div>
    </template>
  </div>
</template>
<script>
import { ref } from "vue";
import EstimateNecessityRow from "../components/EstimateNecessityRow.vue";
import { Switch } from "ant-design-vue";
import EstimateNecessityEdit from "@/components/EstimateNecessityEdit.vue";
import { getEstimateNecessityExpenses } from "@/composables/estimateNecessity/index.js";

export default {
  components: {
    EstimateNecessityRow,
    ASwitch: Switch,
    EstimateNecessityEdit,
  },
  props: {
    necessityLimitation: {
      type: Number,
      require: true,
    },
  },
  setup() {
    const isEditable = ref(false);
    const dropDownOpen = ref([]);
    const data = ref([]);

    (async () => {
      data.value = await getEstimateNecessityExpenses();
    })();

    function sumOfDetails(item) {
      if (Object.hasOwn(item, "details")) {
        return item.details.reduce((acc, item) => acc + item.amount, 0);
      } else return item.value;
    }
    function calculateTotalExpense(data) {
      return data.reduce((acc, item) => {
        if (Object.hasOwn(item, "details")) {
          const totalSub = item.details.reduce(
            (acc, item) => acc + item.amount,
            0,
          );
          acc = acc + totalSub;
        } else {
          acc = acc + item.value;
        }
        return acc;
      }, 0);
    }
    function toggleDropDown(id) {
      const index = dropDownOpen.value.indexOf(id);
      if (index === -1) {
        dropDownOpen.value.push(id);
      } else {
        dropDownOpen.value.splice(index, 1);
      }
    }

    function isDropDownOpen(id) {
      return dropDownOpen.value.includes(id);
    }
    return {
      data,
      sumOfDetails,
      calculateTotalExpense,
      toggleDropDown,
      isDropDownOpen,
      isEditable,
    };
  },
};
</script>
