<template>
  <div class="container mx-auto mt-12">
    <Funds :funds="funds" :totalIncome="totalIncome" />

    <!-- Mobile View -->
    <div class="md:hidden">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="Dự chi thiết yếu">
          <EstimateNecessity :necessityLimitation="necessityLimitation" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Thu nhập" force-render>
          <IncomeDebt
            class="md:border-l md:border-r px-4"
            :columns="columnsIncome"
            :data="dataIncome"
            :totalIncome="totalIncome"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Xử lý thu nhập">
          <HandleIncome
            :columns="columnsHandleIncome"
            :data="dataHandleIncome"
          />
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- Desktop View-->
    <div class="flex flex-col md:flex-row hidden md:flex">
      <a-col :md="{ span: 6 }">
        <EstimateNecessity :necessityLimitation="necessityLimitation" />
      </a-col>

      <a-col :md="{ span: 8 }">
        <IncomeDebt
          class="md:border-l md:border-r px-4"
          :columns="columnsIncome"
          :data="dataIncome"
          :totalIncome="totalIncome"
        />
      </a-col>

      <a-col :md="{ span: 10 }">
        <HandleIncome :columns="columnsHandleIncome" :data="dataHandleIncome" />
      </a-col>
    </div>
  </div>
</template>
<script>
import { Col, Tabs, TabPane } from "ant-design-vue";
import Funds from "./components/Funds.vue";
import IncomeDebt from "./components/IncomeDebt.vue";
import HandleIncome from "./components/HandleIncome.vue";
import EstimateNecessity from "./components/EstimateNecessity.vue";

export default {
  components: {
    ACol: Col,
    ATabs: Tabs,
    ATabPane: TabPane,
    Funds,
    IncomeDebt,
    HandleIncome,
    EstimateNecessity,
  },
  setup() {
    const columnsIncome = [
      {
        title: "Nguồn thu nhập",
        dataIndex: "source",
        key: "source",
        width: 200,
      },
      {
        title: "Số tiền",
        dataIndex: "amount",
        key: "amount",
      },
    ];
    const dataIncome = [
      {
        key: "1",
        source: "Lương",
        amount: 13500000,
      },
      {
        key: "2",
        source: "Ba cho",
        amount: 2000000,
      },
      {
        key: "3",
        source: "Mẹ cho",
        amount: 4500000,
      },
    ];
    const columnsHandleIncome = [
      {
        title: "Loại",
        dataIndex: "type",
        maxWidth: 50,
      },
      {
        title: "Quỹ",
        dataIndex: "fund",
      },
      {
        title: "Số tiền",
        dataIndex: "amount",
      },
    ];

    const dataHandleIncome = [
      {
        key: "1",
        wallet: "Momo",
        fund: "Q. CT thiết yếu",
        type: "necessity",
        amount: 1259499,
      },
      {
        key: "2",
        wallet: "Momo",
        fund: "Q. Nội thất",
        type: "necessity",
        amount: 200000,
      },
      {
        key: "3",
        wallet: "VinID",
        fund: "Q. Du lịch",
        type: "freedom",
        amount: 600000,
      },
      {
        key: "4",
        wallet: "Momo",
        fund: "Ví chính H.Thụ",
        type: "enjoy",
        amount: 670000,
      },
      {
        key: "5",
        wallet: "Tiền mặt",
        fund: "Hưởng thụ",
        type: "enjoy",
        amount: 400000,
      },
      {
        key: "6",
        wallet: "Momo",
        fund: "Chuyển tiền ăn vặt vợ",
        type: "enjoy",
        amount: 300000,
      },
      {
        key: "7",
        wallet: "VinID",
        fund: "Q. Gia hạn sim",
        type: "enjoy",
        amount: 100000,
      },
      {
        key: "8",
        wallet: "VinID",
        fund: "Qũy Vieon",
        type: "enjoy",
        amount: 30000,
      },
      {
        key: "9",
        wallet: "VNPay",
        fund: "Q. Học tập",
        type: "education",
        amount: 265000,
      },
      {
        key: "10",
        wallet: "VinID",
        fund: "Qũy Goalify",
        type: "education",
        amount: 35000,
      },
      {
        key: "11",
        wallet: "VinID",
        fund: "Trả mua ghế công thái",
        type: "education",
        amount: 100000,
      },
      {
        key: "12",
        wallet: "ZaloPay",
        fund: "Trả tiền lễ tốt nghiệp",
        type: "education",
        amount: 200000,
      },
      {
        key: "13",
        wallet: "ZaloPay",
        fund: "Q. Cho đi",
        type: "giving",
        amount: NaN,
      },
      {
        key: "14",
        wallet: "VinID",
        fund: "Qũy birthday mẹ Sang",
        type: "giving",
        amount: 100000,
      },
      {
        key: "15",
        wallet: "VinID",
        fund: "Qũy birthday mẹ Linh",
        type: "giving",
        amount: 100000,
      },
      {
        key: "16",
        wallet: "ZaloPay",
        fund: "Trả tiền cưới Thương Q",
        type: "giving",
        amount: 400000,
      },
      {
        key: "17",
        wallet: "ZaloPay",
        fund: "TK tích lũy",
        type: "longTermSaving",
        amount: 2200000,
      },
      {
        key: "18",
        wallet: "VinID",
        fund: "Q. Lavie",
        type: "necessity",
        amount: 222000,
      },
      {
        key: "19",
        wallet: "Shopee",
        fund: "Q. Khám bệnh",
        type: "necessity",
        amount: 300000,
      },
    ];
    const totalIncome = calculateTotalAmount(dataIncome);

    function calculateTotalAmount(data) {
      let totalAmount = 0;

      for (const element of data) {
        totalAmount += element.amount;
      }

      return totalAmount;
    }
    const funds = [
      {
        id: "",
        src: "",
        percentage: "",
        wallet: "",
        name: "",
        classColor: "",
      },
      {
        id: "necessity",
        src: "../src/assets/images/momo.svg",
        percentage: 72.5,
        wallet: "Túi thần tài",
        name: "Nhu cầu thiết yếu",
        classColor: "bg-[#ffabab]",
      },
      {
        id: "freedom",
        src: "../src/assets/images/momo.svg",
        percentage: 3,
        wallet: "Qũy nhóm",
        name: "Tự do tài chính",
        classColor: "bg-[#63b5ff]",
      },
      {
        id: "education",
        src: "../src/assets/images/vnpay.png",
        percentage: 3,
        wallet: "Ví chính",
        name: "Giáo dục đào tạo",
        classColor: "bg-[#97a2ff]",
      },
      {
        id: "relax",
        src: "../src/assets/images/momo.svg",
        percentage: 7.5,
        wallet: "Ví chính",
        name: "Hưởng thụ",
        classColor: "bg-[#76de82]",
      },
      {
        id: "giving",
        src: "../src/assets/images/zalopay.png",
        percentage: 3,
        wallet: "Ví chính",
        name: "Cho đi",
        classColor: "bg-[#c0c0c0]",
      },
      {
        id: "longTermSaving",
        src: "../src/assets/images/zalopay.png",
        percentage: 11,
        wallet: "Tài khoản tích lũy",
        name: "Tiết kiệm dài hạn",
        classColor: "bg-[#f9a484]",
      },
    ];

    const necessityLimitation =
      (funds.find((item) => item.id === "necessity").percentage * totalIncome) /
      100;
    console.log("necessityLimitation", necessityLimitation);
    return {
      columnsIncome,
      dataIncome,
      funds,
      totalIncome,
      columnsHandleIncome,
      dataHandleIncome,
      necessityLimitation,
    };
  },
};
</script>
