// Mock数据
export const bannerData = [
  {
    id: 1,
    title: "毕业季特惠专场",
    image: "fd63556187ad7404baf97bfe980ab87.jpg",
    link: "/event/1"
  },
  {
    id: 2,
    title: "教材回收计划",
    image: "d6ae3577fbb4fef9242b261f081e751.jpg",
    link: "/event/2"
  },
  {
    id: 3,
    title: "宿舍好物特卖",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=dorm%20items%20sale%20banner&sign=0e9dc3ee93694d9f4fb58e3307680b6f",
    link: "/event/3"
  }
];

export const productsData = [
  {
    id: 1,
    name: "计算机专业教材",
    price: 25,
    distance: "500m",
    image: "fd63556187ad7404baf97bfe980ab87.jpg",
    certified: true,
    tags: ["教材", "计算机"]
  },
  {
    id: 2,
    name: "宿舍台灯",
    price: 15,
    distance: "300m",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=dorm%20desk%20lamp&sign=3c8fb067b756924557df10c5eeebb06f",
    certified: false,
    tags: ["宿舍好物"]
  },
  {
    id: 3,
    name: "毕业季行李箱",
    price: 80,
    distance: "1km",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=graduation%20luggage&sign=d727aee8aa0be9e037f28fc42828016b",
    certified: true,
    tags: ["毕业季"]
  }

];

export const itemDetailData = {
  id: 1,
  title: "计算机专业教材 - 数据结构与算法",
  price: 25,
  originalPrice: 98,
  description: "计算机专业必修课教材，九成新，有少量笔记。适合计算机学院各专业使用。",
  seller: {
    name: "张学长",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=college%20student%20male%20avatar&sign=f1758e0ca6451e906002d6a1435aa6f9",
    creditScore: 85,
    department: "计算机学院",
    grade: "大四"
  },
  images: [
    "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=computer%20science%20textbook%20cover&sign=df62cd30b97d69f1259765a090c86b97",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=textbook%20page%20with%20notes&sign=13f7084eb1f201cd6cfab7f1807c2896",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=textbook%20back%20cover&sign=dd7f8c3dcfb60ec591ed769b13efe31b"
  ],
  tags: ["教材", "计算机", "数据结构", "毕业季"],
  location: "教学楼A区",
  distance: "500m",
  postedTime: "3天前"
};

export const commentsData = [
  {
    id: 1,
    user: {
      name: "李学姐",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=college%20student%20female%20avatar&sign=c9686306294418d7825b1b6ce222c9e7",
      department: "计算机学院"
    },
    content: "这本书内容很全面，讲解清晰，是学习数据结构的好帮手。",
    time: "2小时前",
    likes: 5
  },
  {
    id: 2,
    user: {
      name: "王学长",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=college%20student%20male%20avatar&sign=f1758e0ca6451e906002d6a1435aa6f9",
      department: "软件学院"
    },
    content: "价格实惠，比买新书便宜多了，毕业季必备。",
    time: "1天前",
    likes: 3
  }
];

export const tradeOptions = [
  {
    id: 1,
    type: "platform",
    title: "平台担保交易",
    description: "平台作为第三方担保，确认收货后付款给卖家",
    riskLevel: "低风险",
    minCreditScore: 60,
    fee: "免费"
  },
  {
    id: 2,
    type: "selfPickup",
    title: "线下自提",
    description: "线下见面交易，需核对双方校园认证信息",
    riskLevel: "中风险",
    minCreditScore: 70,
    fee: "免费"
  }
];

export const campusAuthData = {
  studentInfo: {
    name: "",
    studentId: "",
    department: "",
    grade: "",
    idCardFront: "",
    idCardBack: "",
    studentCard: "",
    verified: false
  },
  creditScore: {
    score: 0,
    level: "未评估",
    lastUpdated: "",
    description: "完成学籍认证后即可获得初始信用分"
  },
  riskControl: {
    aiStatus: "未评估",
    manualStatus: "未审核",
    lastChecked: ""
  },
  tags: ["教材", "宿舍好物", "毕业季"]
};