<template>
  <div class="px-4">
    <EstimateNecessityRow
      :name="'Dự dư'"
      :amount="necessityLimitation - calculateTotalExpense(data)"
      :rowClass="'font-semibold bg-[#e6f4ff]'"
    />
    <EstimateNecessityRow
      :name="'Dự chi'"
      :amount="calculateTotalExpense(data)"
      :rowClass="'font-semibold bg-[#ffdddd]'"
    />
    <template v-for="item in data" :key="item">
      <EstimateNecessityRow
        :name="item.name"
        :amount="sumOfDetails(item)"
        :rowClass="'font-semibold bg-[#fafafa] cursor-pointer'"
        @click="toggleDropDown(item.id)"
      />
      <div v-if="isDropDownOpen(item.id)">
        <template v-for="subItem in item.details" :key="subItem">
          <EstimateNecessityRow :name="subItem.name" :amount="subItem.amount" />
        </template>
      </div>
    </template>
  </div>
</template>
<script>
import { ref } from "vue";
import EstimateNecessityRow from "../components/EstimateNecessityRow.vue";

export default {
  components: {
    EstimateNecessityRow,
  },
  props: {
    necessityLimitation: {
      type: Number,
      require: true,
    },
  },
  setup() {
    const dropDownOpen = ref([]);
    const data = [
      {
        id: "necessity",
        name: "Chi tiêu thiết yếu",
        details: [
          {
            id: "eating",
            name: "Ăn",
            amount: 4000000,
          },
          {
            id: "electric",
            name: "Điện",
            amount: 500000,
          },
          {
            id: "water",
            name: "Nước",
            amount: 240000,
          },
          {
            id: "services",
            name: "Dịch vụ",
            amount: 150000,
          },
          {
            id: "rentHouse",
            name: "Nhà",
            amount: 7000000,
          },
          {
            id: "petroleum",
            name: "Xăng xe",
            amount: 200000,
          },
          {
            id: "bikeKeeping",
            name: "Gửi xe",
            amount: 200000,
          },
        ],
      },
      {
        id: "necessityFund",
        name: "Quỹ thiết yếu",
        details: [
          {
            id: "shampoo",
            name: "Ăn",
            amount: 70002,
          },
          {
            id: "electric",
            name: "Sức khỏe da mặt",
            amount: 821950,
          },
          {
            id: "water",
            name: "Răng miệng",
            amount: 95000,
          },
          {
            id: "services",
            name: "Body",
            amount: 184247,
          },
          {
            id: "rentHouse",
            name: "Đồ trong nhà",
            amount: 288300,
          },
        ],
      },
      {
        id: "healthFund",
        name: "Quỹ khám bệnh",
        value: 300000,
      },
      {
        id: "waterLavieFund",
        name: "Quỹ Lavie",
        value: 222000,
      },
    ];
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
    };
  },
};
</script>
