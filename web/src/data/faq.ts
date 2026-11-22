export type FaqItem = {
  id: number;
  category: string;
  question: string;
  answer: string;
  sort: number;
};

export const FAQ_CATEGORIES = [
  "下單流程",
  "檔案規格",
  "付款與發票",
  "交期出貨",
  "包裝盒 3D",
  "會員帳戶",
] as const;

export const faqItems: FaqItem[] = [
  {
    id: 1,
    category: "下單流程",
    question: "一定要註冊會員才能下單嗎？",
    answer:
      "會員可於會員中心追蹤訂單與補件。本期亦支援訪客下單，以 Email 專屬連結進入訂單頁。",
    sort: 1,
  },
  {
    id: 2,
    category: "檔案規格",
    question: "可接受哪些檔案格式？",
    answer: "建議 PDF、AI、ZIP；預覽可用 JPG／PNG。單檔預設上限 100MB。",
    sort: 1,
  },
  {
    id: 3,
    category: "檔案規格",
    question: "檢稿不合格怎麼辦？",
    answer:
      "員工會標示待補件並說明原因，請依指示重傳；核准後換檔會回到待檢稿。",
    sort: 2,
  },
  {
    id: 4,
    category: "付款與發票",
    question: "目前支援哪些付款方式？",
    answer:
      "本期採人工轉帳：全部品項檢稿通過後通知匯款，後台確認收款後安排印製。",
    sort: 1,
  },
  {
    id: 5,
    category: "交期出貨",
    question: "一般交期多久？",
    answer: "視品項與數量而定，訂單明細會顯示進度：印製中／已出貨／已收貨。",
    sort: 1,
  },
  {
    id: 6,
    category: "包裝盒 3D",
    question: "3D 預覽可以下單嗎？",
    answer: "3D 為外觀示意與詢價，不含自動估價與直接下單。",
    sort: 1,
  },
  {
    id: 7,
    category: "會員帳戶",
    question: "忘記密碼怎麼處理？",
    answer: "於登入頁使用忘記密碼，系統會寄送重設信件至註冊 Email。",
    sort: 1,
  },
  {
    id: 8,
    category: "下單流程",
    question: "購物車結帳後還能改規格嗎？",
    answer:
      "建立訂單後若尚未進入印製，可聯繫客服協助調整或作廢重下。",
    sort: 2,
  },
];
