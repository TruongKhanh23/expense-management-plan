import momo from "@/assets/images/momo.svg";
import vnpay from "@/assets/images/vnpay.png";
import zalopay from "@/assets/images/zalopay.png";

import { TableColumnType } from "ant-design-vue";

type TableDataType = {
  key: string;
  wallet: string;
  type: string;
  fund: string;
  amount: number;
};

type DataIncomeType = {
  key: string;
  source: string;
  amount: number;
};


export const columnsIncome = [
  {
    title: "Nguồn thu nhập",
    dataIndex: "source",
    key: "source",
    width: 200,
  },
  { title: "Số tiền", dataIndex: "amount", key: "amount" },
];

export const dataIncome: DataIncomeType[] = [
  { key: "1", source: "Lương", amount: 13500000 },
  { key: "2", source: "Ba cho", amount: 2000000 },
  { key: "3", source: "Mẹ cho", amount: 4500000 },
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
  },
  { title: "Quỹ", dataIndex: "fund" },
  { title: "Số tiền", dataIndex: "amount" },
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

export const funds = [
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
    src: momo,
    percentage: 72.5,
    wallet: "Túi thần tài",
    name: "Nhu cầu thiết yếu",
    classColor: "bg-[#ffabab]",
  },
  {
    id: "freedom",
    src: momo,
    percentage: 3,
    wallet: "Qũy nhóm",
    name: "Tự do tài chính",
    classColor: "bg-[#63b5ff]",
  },
  {
    id: "education",
    src: vnpay,
    percentage: 3,
    wallet: "Ví chính",
    name: "Giáo dục đào tạo",
    classColor: "bg-[#97a2ff]",
  },
  {
    id: "relax",
    src: momo,
    percentage: 7.5,
    wallet: "Ví chính",
    name: "Hưởng thụ",
    classColor: "bg-[#76de82]",
  },
  {
    id: "giving",
    src: zalopay,
    percentage: 3,
    wallet: "Ví chính",
    name: "Cho đi",
    classColor: "bg-[#c0c0c0]",
  },
  {
    id: "longTermSaving",
    src: zalopay,
    percentage: 11,
    wallet: "Tài khoản tích lũy",
    name: "Tiết kiệm dài hạn",
    classColor: "bg-[#f9a484]",
  },
];
