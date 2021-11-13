import { getPriceConversion } from "./getPriceConversion";

export const plans = [
  /* {
    name: "Silver Plan",
    period: "weekly",
    price: "599",
    stripeSubscriptionId: "price_1JQUF8BDalVdaGO2VxrDawWH",
    service : {
      basic: [
      "Free foundation course", 
      "1 live session per week",
      "1 recorded revision session per week",
      "2 hours live support / day",
      "Industry Curriculun (IC)",
      "In-trend online learning platform",
      "Remote learning - no compromise on your job",
      "Hands on experience on real-world problems",
      "Flexible payment plans",
    ],
    star: [],
    superStar: []
  },
  requirement:[
    "4 hours of study per week", 
    "Minimum purchase - 2 Months",
  ],
    _id: "d8cc4ea7-80a-a8ce-dc839bce88b1",
  }, */
  /* {
    name: "Silver Plan",
    period: "monthly",
    price: "2299",
    stripeSubscriptionId: "price_1JQUF8BDalVdaGO22YjXN0Qs",
    service : {
      basic: [
      "Free foundation course", 
      "1 live session per week",
      "1 recorded revision session per week",
      "2 hours live support / day",
      "Industry Curriculun (IC)",
      "In-trend online learning platform",
      "Remote learning - no compromise on your job",
      "Hands on experience on real-world problems",
      "Flexible payment plans",
    ],
    star: [],
    superStar: []
    },
    requirement:[
      "4 hours of study per week", 
      "Minimum purchase - 2 Months",
      ],
    _id: "d8cc4ea7-8092-480a-a8839bce88b1",
  }, */
  /* {
    name: "Golden Plan",
    period: "weekly",
    course: "frontend",
    price: "699",
    stripeSubscriptionId: "price_1JQUF8BDalVdaGO2iucJbhOj",
    service: {
      basic: [
        "Free foundation course",
        "2 live session per week",
        "2 recorded revision session per week",
        "4 hours live support / week",
        "Industry Curriculun (IC)",
        "In-trend online learning platform",
        "Remote learning - no compromise on your job",
        "Hands on experience on real-world problems",
      ],
      star: [
        "1 : 1 career support (CV & portfolio guidance) (Github account review & support)(LinkedIn account review & support)",
        "Flexible payment plans",
      ],
      superStar: ["One to one live lecture with tutor"],
    },
    requirement: ["8 hours of study per week", "Minimum purchase - 2 Months"],

    _id: "d8cc4ea7-809a-a8ce-dc839bce88b1",
  },
  {
    name: "Golden Plan",
    period: "weekly",
    course: "fullstack",
    price: "699",
    stripeSubscriptionId: "price_1JQUF8BDalVdaGO2iucJbhOj",
    service: {
      basic: [
        "Free foundation course",
        "2 live session per week",
        "2 recorded revision session per week",
        "4 hours live support / week",
        "Industry Curriculun (IC)",
        "In-trend online learning platform",
        "Remote learning - no compromise on your job",
        "Hands on experience on real-world problems",
      ],
      star: [
        "1 : 1 career support (CV & portfolio guidance) (Github account review & support)(LinkedIn account review & support)",
        "Flexible payment plans",
      ],
      superStar: ["One to one live lecture with tutor"],
    },
    requirement: ["8 hours of study per week", "Minimum purchase - 2 Months"],

    _id: "d8cc4ea7-809a-a8ce-dc839bce88b1",
  }, */
  {
    name: "Front End Part Time Plan",
    period: "monthly",
    price: "2699",
    course: "frontend",
    stripeSubscriptionId: "price_1JQUF8BDalVdaGO2CeL53NQp",
    service: {
      basic: [
        "Free foundation course",
        "2 live session per week",
        "2 recorded revision session per week",
        "4 hours live support / week",
        "Industry Curriculun (IC)",
        "In-trend online learning platform",
        "Remote learning - no compromise on your job",
        "Hands on experience on real-world problems",
      ],
      star: [
        "1 : 1 career support (CV & portfolio guidance) (Github account review & support)(LinkedIn account review & support)",
        "Flexible payment plans",
      ],
      superStar: ["One to one live lecture with tutor"],
    },
    requirement: ["8 hours of study per week", "Minimum purchase - 2 Months"],

    _id: "d8cc4ea7-8092-480a-a8839bce88b1",
  },
  {
    name: "Full Stack Part Time Plan",
    period: "monthly",
    price: "2699",
    course: "fullstack",
    stripeSubscriptionId: "price_1JQUF8BDalVdaGO2CeL53NQp",
    service: {
      basic: [
        "Free foundation course",
        "2 live session per week",
        "2 recorded revision session per week",
        "4 hours live support / week",
        "Industry Curriculun (IC)",
        "In-trend online learning platform",
        "Remote learning - no compromise on your job",
        "Hands on experience on real-world problems",
      ],
      star: [
        "1 : 1 career support (CV & portfolio guidance) (Github account review & support)(LinkedIn account review & support)",
        "Flexible payment plans",
      ],
      superStar: ["One to one live lecture with tutor"],
    },
    requirement: ["8 hours of study per week", "Minimum purchase - 2 Months"],

    _id: "d8cc4e92-480a-a8ce-dc839bce88b1",
  },
  /* {
    name: "Diamond Plan",
    period: "weekly",
    course: "frontend",
    price: "899",
    stripeSubscriptionId: "price_1JQUF8BDalVdaGO2tRzUCERv",
    service: {
      basic: [
        "Free foundation course",
        "3 live session per week",
        "2 recorded revision session per week",
        "6 hours live support / week",
        "One to one live lecture with tutor",
        "Industry Curriculun (IC)",
        "In-trend online learning platform",
        "Remote learning - no compromise on your job",
        "Hands on experience on real-world problems",
        "Flexible payment plans",
      ],
      star: [
        "1 : 1 career support (CV & portfolio guidance) (Github account review & support)(LinkedIn account review & support)",
      ],
      superStar: [
        "Hiring interview simulation",
        "Access to global hiring partner network",
      ],
    },
    requirement: ["12 hours of study per week", "Minimum purchase - 2 Months"],
    _id: "4ea7-8092-480a-a8ce-dc839bce88b1",
  },
  {
    name: "Diamond Plan",
    period: "weekly",
    course: "fullstack",
    price: "899",
    stripeSubscriptionId: "price_1JQUF8BDalVdaGO2tRzUCERv",
    service: {
      basic: [
        "Free foundation course",
        "3 live session per week",
        "2 recorded revision session per week",
        "6 hours live support / week",
        "One to one live lecture with tutor",
        "Industry Curriculun (IC)",
        "In-trend online learning platform",
        "Remote learning - no compromise on your job",
        "Hands on experience on real-world problems",
        "Flexible payment plans",
      ],
      star: [
        "1 : 1 career support (CV & portfolio guidance) (Github account review & support)(LinkedIn account review & support)",
      ],
      superStar: [
        "Hiring interview simulation",
        "Access to global hiring partner network",
      ],
    },
    requirement: ["12 hours of study per week", "Minimum purchase - 2 Months"],
    _id: "4ea7-8092-480a-a8ce-dc839bce88b1",
  }, */
  {
    name: "Front End Full Time Plan",
    period: "monthly",
    price: "3499",
    course: "frontend",
    stripeSubscriptionId: "price_1JQUF8BDalVdaGO2vI1gRfC3",
    service: {
      basic: [
        "Free foundation course",
        "3 live session per week",
        "2 recorded revision session per week",
        "6 hours live support / week",
        "One to one live lecture with tutor",
        "Industry Curriculun (IC)",
        "In-trend online learning platform",
        "Remote learning - no compromise on your job",
        "Hands on experience on real-world problems",
        "Flexible payment plans",
      ],
      star: [
        "1 : 1 career support (CV & portfolio guidance) (Github account review & support)(LinkedIn account review & support)",
      ],
      superStar: [
        "Hiring interview simulation",
        "Access to global hiring partner network",
      ],
    },
    requirement: ["12 hours of study per week", "Minimum purchase - 2 Months"],
    _id: "d8cc4ea7-8092-480a-a8ce-dc888b1",
  },

  {
    name: "Full Stack Full Time plan",
    period: "monthly",
    price: "3499",
    course: "fullstack",
    stripeSubscriptionId: "price_1JQUF8BDalVdaGO2vI1gRfC3",
    service: {
      basic: [
        "Free foundation course",
        "3 live session per week",
        "2 recorded revision session per week",
        "6 hours live support / week",
        "One to one live lecture with tutor",
        "Industry Curriculun (IC)",
        "In-trend online learning platform",
        "Remote learning - no compromise on your job",
        "Hands on experience on real-world problems",
        "Flexible payment plans",
      ],
      star: [
        "1 : 1 career support (CV & portfolio guidance) (Github account review & support)(LinkedIn account review & support)",
      ],
      superStar: [
        "Hiring interview simulation",
        "Access to global hiring partner network",
      ],
    },
    requirement: ["12 hours of study per week", "Minimum purchase - 2 Months"],
    _id: "d8cc4ea7-8092-480a-a8ce-dc888b3",
  },
];
