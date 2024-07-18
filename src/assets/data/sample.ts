import { TableColumnType } from "ant-design-vue";

type TableDataType = {
  key: string;
  wallet: string;
  type: string;
  fund: string;
  amount: number;
};

type NecessaryThingsItem = {
  id: number;
  name: string;
  timespan: number;
  savePerMonth: number;
  limitation: number;
  type:string;
};

type DebtItem = {
  id: string;
  name: string;
  amount: number;
  isFinished: boolean;
};


export const columnsIncome = [
  {
    title: "Nguồn thu nhập",
    dataIndex: "source",
    key: "source",
    width: 200,
  },
  { title: "Số tiền", dataIndex: "amount", key: "amount", align: "right" },
];

export const columnsHandleIncome: TableColumnType<TableDataType>[] = [
  {
    title: "Loại",
    dataIndex: "type",
    filters: [
      { text: "necessity", value: "necessity" },
      { text: "freedom", value: "freedom" },
      { text: "enjoy", value: "enjoy" },
      { text: "education", value: "education" },
      { text: "giving", value: "giving" },
      { text: "longTermSaving", value: "longTermSaving" },
    ],
    onFilter: (value, record) => record.type.startsWith(value as string),
    align: "center",
  },
  { title: "Quỹ", dataIndex: "fund" },
  { title: "Số tiền", dataIndex: "amount", align: "right" },
];

export const dataHandleIncome: TableDataType[] = [
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
    amount: 0,
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

export const columnsNecessaryThings: TableColumnType<NecessaryThingsItem>[] = [
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    filters: [
      { text: "shampoo", value: "shampoo" },
      { text: "skinCare", value: "skinCare" },
      { text: "oralHealth", value: "oralHealth" },
      { text: "bodyCare", value: "bodyCare" },
      { text: "furniture", value: "furniture" },
    ],
    onFilter: (value, record) => record.type.startsWith(value as string),
  },
  { title: "Thời gian sử dụng (tháng)", dataIndex: "timespan", align: "right" },
  { title: "Tiết kiệm mỗi tháng", dataIndex: "savePerMonth", align: "right" },
  { title: "Hạn mức", dataIndex: "limitation", align: "right" },
];

export const dataNecessaryThings: NecessaryThingsItem[] = [
  {
    id: 0,
    name: "Sunsilk",
    timespan: 3.017241379310345,
    savePerMonth: 51039.99999999999,
    limitation: 154000,
    type: "shampoo",
  },
  {
    id: 1,
    name: "Guardian",
    timespan: 4.693486590038314,
    savePerMonth: 18962.448979591838,
    limitation: 89000,
    type: "shampoo",
  },
  {
    id: 2,
    name: "Hada Labo",
    timespan: 3,
    savePerMonth: 31750,
    limitation: 127000,
    type: "skinCare",
  },
  {
    id: 3,
    name: "Nước tẩy trang",
    timespan: 1,
    savePerMonth: 138000,
    limitation: 138000,
    type: "skinCare",
  },
  {
    id: 4,
    name: "Bông tẩy trang",
    timespan: 2.5,
    savePerMonth: 9200,
    limitation: 23000,
    type: "skinCare",
  },
  {
    id: 5,
    name: "Khẩu trang",
    timespan: 3.75,
    savePerMonth: 48800,
    limitation: 183000,
    type: "skinCare",
  },
  {
    id: 6,
    name: "Bông lau mặt",
    timespan: 2,
    savePerMonth: 19200,
    limitation: 48000,
    type: "skinCare",
  },
  {
    id: 7,
    name: "Serum Vi-C",
    timespan: 4,
    savePerMonth: 75000,
    limitation: 300000,
    type: "skinCare",
  },
  {
    id: 8,
    name: "Kem dưỡng ẩm",
    timespan: 2,
    savePerMonth: 150000,
    limitation: 300000,
    type: "skinCare",
  },
  {
    id: 9,
    name: "Serum D. Ẩm",
    timespan: 4,
    savePerMonth: 100000,
    limitation: 400000,
    type: "skinCare",
  },
  {
    id: 10,
    name: "Toner",
    timespan: 8,
    savePerMonth: 50000,
    limitation: 400000,
    type: "skinCare",
  },
  {
    id: 11,
    name: "Chống nắng",
    timespan: 2,
    savePerMonth: 200000,
    limitation: 400000,
    type: "skinCare",
  },
  {
    id: 12,
    name: "Kem đánh răng",
    timespan: 2,
    savePerMonth: 17000,
    limitation: 34000,
    type: "oralHealth",
  },
  {
    id: 13,
    name: "Nước súc miệng ",
    timespan: 0.5,
    savePerMonth: 78000,
    limitation: 39000,
    type: "oralHealth",
  },
  {
    id: 14,
    name: "Sữa tắm VK",
    timespan: 3.448275862068966,
    savePerMonth: 57999.999999999985,
    limitation: 200000,
    type: "bodyCare",
  },
  {
    id: 15,
    name: "Sữa tắm CK",
    timespan: 4.310344827586207,
    savePerMonth: 15079.999999999998,
    limitation: 65000,
    type: "bodyCare",
  },
  {
    id: 16,
    name: "Chống nắng",
    timespan: 2,
    savePerMonth: 100000,
    limitation: 200000,
    type: "bodyCare",
  },
  {
    id: 17,
    name: "Bao tay xịn",
    timespan: 3,
    savePerMonth: 11166.666666666666,
    limitation: 33500,
    type: "bodyCare",
  },
  {
    id: 18,
    name: "Bao tay nilon",
    timespan: 3,
    savePerMonth: 4966.666666666667,
    limitation: 14900,
    type: "furniture",
  },
  {
    id: 19,
    name: "Khí Gas",
    timespan: 3,
    savePerMonth: 83333.33333333333,
    limitation: 250000,
    type: "furniture",
  },
  {
    id: 20,
    name: "Qũy nội thất",
    timespan: 1,
    savePerMonth: 200000,
    limitation: 200000,
    type: "furniture",
  },
];

export const columnsDebt: TableColumnType<DebtItem>[] = [
  {
    title: "Tên nợ",
    dataIndex: "name",
  },
  { title: "Số tiền", dataIndex: "amount", align: "right" },
  { title: "Trạng thái", dataIndex: "isFinished", align: "right" },
];

export const debts: DebtItem[] = [
  {
    id: "snjks78669sjnj",
    name: "Iphone14",
    amount: 13500000,
    isFinished: false
  }
]