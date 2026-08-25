/**
 * Site content and data, in English and Kurdish Sorani.
 *
 * The pages, the sitemap and the structured data all read from here, so
 * changing a value in this file changes it everywhere.
 */
import type { T } from "./i18n";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://tenur.example";

export const restaurant = {
  name: "Tenûr",
  nameKu: "تەنوور",
  wordmark: "TENÛR",
  legalName: "Tenûr Restaurant, Erbil",
  founded: 2014,
  seats: 42,
  priceRange: "$$",
  currency: "IQD",
  phone: "+964 750 000 0000",
  phoneHref: "+9647500000000",
  email: "mez@tenur.example",
  cuisine: ["Kurdish", "Iraqi", "Middle Eastern"],
  address: {
    street: {
      en: "Bakhtiyari Quarter, 100 Metre Road, Building 12",
      ku: "گەڕەکی بەختیاری، شەقامی ١٠٠ مەتری، باڵەخانەی ١٢",
    } satisfies T,
    locality: { en: "Erbil", ku: "هەولێر" } satisfies T,
    region: { en: "Kurdistan Region", ku: "هەرێمی کوردستان" } satisfies T,
    country: { en: "Iraq", ku: "عێراق" } satisfies T,
    countryCode: "IQ",
    postalCode: "44001",
  },
  geo: { lat: 36.1911, lng: 44.0092 },
  social: [
    { label: "Instagram", href: "https://instagram.com/tenur.hewler" },
    { label: "Facebook", href: "https://facebook.com/tenur.hewler" },
  ],
} as const;

export const tagline: T = {
  en: "Clay, fire, bread. In that order.",
  ku: "قوڕ، ئاگر، نان. بەم ڕیزبەندییە.",
};

export const heroLead: T = {
  en: "A tandoor kitchen in Erbil. The oven is lit at nine in the morning and everything that reaches your table has been near it.",
  ku: "چێشتخانەیەکی تەنوور لە هەولێر. تەنوورەکە کاتژمێر نۆی بەیانی هەڵدەکرێت و هەرچی دەگاتە سەر مێزەکەت لە نزیکییەوە بووە.",
};

/* ------------------------------------------------------------------ hours */

export type Hours = {
  days: string[];
  label: T;
  service: T;
  ranges: Array<{ opens: string; closes: string }>;
};

export const hours: Hours[] = [
  {
    days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    label: { en: "Saturday to Thursday", ku: "شەممە تا پێنجشەممە" },
    service: { en: "Lunch and dinner", ku: "نیوەڕۆ و ئێوارە" },
    ranges: [{ opens: "12:00", closes: "23:30" }],
  },
  {
    days: ["Friday"],
    label: { en: "Friday", ku: "هەینی" },
    service: { en: "Opens after prayers", ku: "دوای نوێژ دەکرێتەوە" },
    ranges: [{ opens: "13:30", closes: "23:30" }],
  },
];

/* ------------------------------------------------------------------- menu */

export type MenuItem = {
  name: T;
  /** Latin transliteration shown under the Kurdish name. */
  roman?: string;
  description: T;
  price: number;
  image?: string;
  tags?: T[];
};

export type MenuSection = {
  id: string;
  title: T;
  note?: T;
  items: MenuItem[];
};

const VEG: T = { en: "Vegetarian", ku: "ڕووەکی" };
const VEGAN: T = { en: "Vegan", ku: "بێ بەرهەمی ئاژەڵ" };
const SHARE: T = { en: "To share", ku: "بۆ هاوبەشی" };

export const menu: MenuSection[] = [
  {
    id: "tenur",
    title: { en: "From the tandoor", ku: "لە تەنوورەوە" },
    note: {
      en: "Baked against the wall of the oven, which is where the name comes from.",
      ku: "بە دیواری تەنوورەوە دەنرێت، ناوەکەش لەوێوە هاتووە.",
    },
    items: [
      {
        name: { en: "Tandoor bread", ku: "نانی تەنوور" },
        roman: "Nanî tenûr",
        description: {
          en: "Taken straight off the wall of the oven, blistered and too hot to hold. We bring it when it is ready, not when you order it.",
          ku: "تازە و گەرم لە دیواری تەنوورەوە دەردەهێنرێت. کاتێک ئامادە بێت دەیهێنین، نەک کاتێک داوای دەکەیت.",
        },
        price: 2000,
        image: "/img/dish-nan.jpg",
        tags: [VEG],
      },
      {
        name: { en: "Bread with gêmr and date syrup", ku: "نان بە گێمڕ و دۆشاو" },
        roman: "Nan bi gêmr û doşaw",
        description: {
          en: "Buffalo cream and date syrup. Breakfast food in Erbil, but nobody has ever turned it down at night either.",
          ku: "گێمڕی گامێش و دۆشاوی خورما. لە هەولێر نانی بەیانییە، بەڵام بە شەویش کەس ڕەتی ناکاتەوە.",
        },
        price: 6000,
        tags: [VEG],
      },
    ],
  },
  {
    id: "start",
    title: { en: "To start", ku: "دەستپێک" },
    note: {
      en: "Put in the middle of the table and argued over.",
      ku: "دەخرێتە ناوەڕاستی مێزەوە و کێشەی لەسەر دەکرێت.",
    },
    items: [
      {
        name: { en: "Mezze of the day", ku: "مێزی ڕۆژ" },
        roman: "Mêzî roj",
        description: {
          en: "Eight or nine small plates, decided in the morning. Always yoghurt, always something pickled.",
          ku: "هەشت یان نۆ قاپی بچووک، بەیانییان دیاری دەکرێن. هەمیشە ماست، هەمیشە شتێکی تورشی.",
        },
        price: 15000,
        image: "/img/dish-mezze.jpg",
        tags: [VEG, SHARE],
      },
      {
        name: { en: "Dolma", ku: "دۆڵمە" },
        roman: "Dolme",
        description: {
          en: "Vine leaves, onion and pepper, packed tight and cooked slowly upside down. Made on Tuesdays and Fridays.",
          ku: "گەڵای مێو، پیاز و بیبەر، بە توندی پێچراوە و بە هێواشی سەرەوژێر لێنراوە. سێشەممە و هەینی دروست دەکرێت.",
        },
        price: 14000,
        image: "/img/dish-dolma.jpg",
      },
      {
        name: { en: "Hummus, hot oil, tandoor bread", ku: "حومس، ڕۆنی گەرم، نانی تەنوور" },
        roman: "Humus",
        description: {
          en: "Chickpeas ground coarse. The oil goes on at the table so you hear it.",
          ku: "نۆکی ئێسک هاڕاو. ڕۆنەکە لەسەر مێزەکە دادەنرێت تاکو دەنگی ببیستیت.",
        },
        price: 8000,
        image: "/img/dish-hummus.jpg",
        tags: [VEGAN],
      },
      {
        name: { en: "Kubba Hewlêr", ku: "کوببەی هەولێر" },
        roman: "Kubbe",
        description: {
          en: "Bulgur shell, minced lamb and onion inside. Four to a plate, and they do not travel well, so eat them first.",
          ku: "توێکڵی سەوارە، گۆشتی بەرخی وردکراو و پیاز لە ناوەوە. چوار دانە لە قاپێکدا، خۆش ناگوازرێنەوە، بۆیە یەکەم جار بیانخۆ.",
        },
        price: 12000,
      },
    ],
  },
  {
    id: "fire",
    title: { en: "From the fire", ku: "لە ئاگرەوە" },
    note: {
      en: "Charcoal, not gas. It takes longer.",
      ku: "خەڵووز، نەک غاز. کاتی زیاتر دەبات.",
    },
    items: [
      {
        name: { en: "Kebab Hewlêr", ku: "کەبابی هەولێر" },
        roman: "Kebabî Hewlêr",
        description: {
          en: "Lamb and tail fat, minced twice, nothing else in it. Served on bread that has been under the skewers.",
          ku: "گۆشتی بەرخ و دوگ، دوو جار هاڕاوە، هیچی تر تێدا نییە. لەسەر ئەو نانە دەخرێتە سەر کە لە ژێر سیخەکاندا بووە.",
        },
        price: 22000,
        image: "/img/dish-kebab.jpg",
      },
      {
        name: { en: "Masgouf", ku: "مەسگووف" },
        roman: "Mesgûf",
        description: {
          en: "Carp split open and stood beside the fire for an hour, then finished over the coals. Priced by weight.",
          ku: "ماسی شەقکراو کە ماوەی کاتژمێرێک لەتەنیشت ئاگردا دەبرژێت، پاشان لەسەر خەڵووز تەواو دەکرێت. بە کێش نرخی دیاری دەکرێت.",
        },
        price: 45000,
        tags: [SHARE],
      },
      {
        name: { en: "Qozi", ku: "قۆزی" },
        roman: "Qozi",
        description: {
          en: "Lamb shoulder over rice with almonds and raisins. Enough for three.",
          ku: "شانی بەرخ لەسەر برنج بە بادەم و مێوژ. بەشی سێ کەس دەکات.",
        },
        price: 38000,
        tags: [SHARE],
      },
      {
        name: { en: "Tikka, sumac onions", ku: "تیکە، پیازی سوماق" },
        roman: "Tîke",
        description: {
          en: "Cubes of shoulder, salt only, cooked hard on the outside.",
          ku: "پارچەی شان، تەنها خوێ، لە دەرەوە بە توندی برژێنراوە.",
        },
        price: 20000,
      },
    ],
  },
  {
    id: "rice",
    title: { en: "Rice and tray", ku: "برنج و تەپسی" },
    items: [
      {
        name: { en: "Parda pilaw", ku: "پەردە پیلاو" },
        roman: "Perde pîlaw",
        description: {
          en: "Rice, chicken, almond and raisin baked inside a pastry drum, then broken open at the table. Erbil put this on the map and we are not going to change it.",
          ku: "برنج، مریشک، بادەم و مێوژ لە ناو پەردەیەکی هەویردا دەبرژێنرێت، پاشان لەسەر مێزەکە دەکرێتەوە. هەولێر ناوی دەرکردووە و ئێمە نایگۆڕین.",
        },
        price: 26000,
        image: "/img/dish-pilaw.jpg",
        tags: [SHARE],
      },
      {
        name: { en: "Tepsî", ku: "تەپسی" },
        roman: "Tepsî",
        description: {
          en: "Aubergine, tomato and minced lamb in a tray, pushed into the oven and left alone.",
          ku: "باینجان، تەماتە و گۆشتی وردکراو لە تەپسییەکدا، دەخرێتە ناو تەنوورەکە و بەجێدەهێڵرێت.",
        },
        price: 18000,
      },
    ],
  },
  {
    id: "finish",
    title: { en: "To finish", ku: "کۆتایی" },
    items: [
      {
        name: { en: "Baqlawa", ku: "بەقلاوە" },
        roman: "Beqlawe",
        description: {
          en: "Made two streets away by a family who have done it longer than we have been open.",
          ku: "دوو شەقام دوورتر لەلایەن خێزانێکەوە دروست دەکرێت کە لە ئێمە زیاتر لەم کارەدان.",
        },
        price: 7000,
        image: "/img/dish-sweets.jpg",
        tags: [VEG],
      },
      {
        name: { en: "Zerdê", ku: "زەردە" },
        roman: "Zerdê",
        description: {
          en: "Saffron rice pudding, served cold, more or less the way it is made at home.",
          ku: "شلەی برنج بە زەعفەران، سارد پێشکەش دەکرێت، کەمێک وەک ئەوەی لە ماڵەوە دروست دەکرێت.",
        },
        price: 6000,
        tags: [VEG],
      },
      {
        name: { en: "Tea", ku: "چای" },
        roman: "Çay",
        description: {
          en: "In a small glass, dark, with the sugar left to you.",
          ku: "لە پەرداخێکی بچووکدا، تۆخ، شەکرەکەی بۆ خۆت جێدەهێڵرێت.",
        },
        price: 1000,
        image: "/img/tea.jpg",
        tags: [VEGAN],
      },
    ],
  },
];

export const setMenu = {
  title: { en: "The sifra", ku: "سفرە" } satisfies T,
  price: 15000,
  description: {
    en: "The whole table eats the same thing: bread, the mezze, one thing from the fire, rice, and something sweet. We need a day of notice and the whole table has to agree.",
    ku: "هەموو مێزەکە هەمان شت دەخوات: نان، مێزە، شتێک لە ئاگرەوە، برنج، و شتێکی شیرین. ڕۆژێک پێش وەخت ئاگادارمان بکەنەوە و دەبێت هەموو مێزەکە ڕازی بێت.",
  } satisfies T,
};

/* ------------------------------------------------------------------ story */

export const story = {
  eyebrow: { en: "Since 2014", ku: "لە ٢٠١٤ەوە" } satisfies T,
  heading: {
    en: "The oven came first. Everything else was arranged around it.",
    ku: "تەنوورەکە یەکەمجار هات. هەموو شتێکی تر لە دەوریدا ڕێکخرا.",
  } satisfies T,
  paragraphs: [
    {
      en: "Tenûr opened in 2014 with sixteen seats and a clay oven that took four men and most of a morning to get through the door.",
      ku: "تەنوور لە ساڵی ٢٠١٤دا کرایەوە، بە شازدە کورسی و تەنوورێکی قوڕین کە بۆ هێنانییە ژوورەوە چوار پیاو و نیوەی ڕۆژێکی خایاند.",
    },
    {
      en: "It is built from clay, straw and goat hair, the way they have been built here for a very long time. It takes three hours to come up to heat and it cannot be hurried, so the whole day is arranged backwards from the moment it is ready.",
      ku: "لە قوڕ و کا و مووی بزنەوە دروستکراوە، بەو شێوەیەی ماوەیەکی زۆر درێژە لێرە دروستیان کردووە. سێ کاتژمێری دەوێت تا گەرم دەبێت و ناتوانرێت پەلە بکرێت، بۆیە هەموو ڕۆژەکە لەو ساتەوە بەرەو دواوە ڕێک دەخرێت.",
    },
    {
      en: "We buy in the Qaysari bazaar most mornings and write the menu after, not before. If something you liked in March is gone, that is the arrangement.",
      ku: "زۆربەی بەیانییان لە بازاڕی قەیسەری کڕین دەکەین، پاشان لیستی خواردن دەنووسین. ئەگەر ئەو خواردنەی جاری پێشوو حەزت لێی بوو ئەمجارە نەبوو، ئەوە شێوازی کارکردنمانە.",
    },
  ] satisfies T[],
  stats: [
    { value: 42, label: { en: "Seats", ku: "کورسی" } satisfies T, suffix: "" },
    { value: 3, label: { en: "Hours to heat the oven", ku: "کاتژمێر بۆ گەرمکردنی تەنوور" } satisfies T, suffix: "h" },
    { value: 2014, label: { en: "First service", ku: "یەکەم خزمەتگوزاری" } satisfies T, suffix: "" },
    { value: 1, label: { en: "Oven, still", ku: "تەنوور، هێشتا" } satisfies T, suffix: "" },
  ],
};

/* ---------------------------------------------------------------- process */

export const steps = [
  {
    index: "01",
    title: { en: "The clay", ku: "قوڕ" } satisfies T,
    body: {
      en: "The oven was built on site by a man from Koya who would not let anyone watch the last part of it.",
      ku: "تەنوورەکە لە شوێنی خۆیدا لەلایەن پیاوێکی کۆیەییەوە دروستکرا کە ڕێگەی نەدا کەس تەماشای بەشی کۆتایی بکات.",
    } satisfies T,
    image: "/img/tandoor.jpg",
  },
  {
    index: "02",
    title: { en: "The heat", ku: "گەرما" } satisfies T,
    body: {
      en: "Lit at nine, ready at twelve, and it holds until close. Nobody touches the fire after service starts.",
      ku: "کاتژمێر نۆ هەڵدەکرێت، دوازدە ئامادەیە، و تا کۆتایی بەردەوام دەبێت. دوای دەستپێکردنی خزمەتگوزاری کەس دەست لە ئاگرەکە نادات.",
    } satisfies T,
    image: "/img/embers.jpg",
  },
  {
    index: "03",
    title: { en: "The bazaar", ku: "بازاڕ" } satisfies T,
    body: {
      en: "Qaysari, most mornings, for whatever is actually good rather than whatever is on the list.",
      ku: "زۆربەی بەیانییان دەچینە بازاڕی قەیسەری و ئەوە دەکڕین کە باشترینە، نەک ئەوەی پێشتر لە لیستدا نووسراوە.",
    } satisfies T,
    image: "/img/citadel.jpg",
  },
  {
    index: "04",
    title: { en: "The table", ku: "سفرە" } satisfies T,
    body: {
      en: "Everything arrives in the middle and nobody gets their own plate. That part is not negotiable.",
      ku: "هەموو خواردنێک دەخرێتە ناوەڕاستی مێزەوە و بەیەکەوە دەیخۆین. ئەمە شێوازی ئێمەیە و ناگۆڕدرێت.",
    } satisfies T,
    image: "/img/dish-mezze.jpg",
  },
];

/* ---------------------------------------------------------------- gallery */

export const gallery = [
  {
    src: "/img/hero.jpg",
    alt: { en: "Kebab skewers over a long charcoal grill", ku: "سیخی کەباب لەسەر منقەڵێکی درێژی خەڵووز" } satisfies T,
    caption: { en: "Second service", ku: "خزمەتگوزاری دووەم" } satisfies T,
  },
  {
    src: "/img/tandoor.jpg",
    alt: { en: "Flatbread baking against the inside wall of a clay tandoor", ku: "نان لە دیواری ناوەوەی تەنوورێکی قوڕیندا دەبرژێت" } satisfies T,
    caption: { en: "Bread, nine minutes", ku: "نان، نۆ خولەک" } satisfies T,
  },
  {
    src: "/img/fire.jpg",
    alt: { en: "Charcoal glowing under an iron grate", ku: "خەڵووزی گەشاوە لە ژێر کڵاوێکی ئاسنیندا" } satisfies T,
    caption: { en: "The grate at eight", ku: "منقەڵەکە لە کاتژمێر هەشت" } satisfies T,
  },
  {
    src: "/img/dish-dolma.jpg",
    alt: { en: "A tray of rolled vine leaf dolma before cooking", ku: "تەپسییەکی دۆڵمەی پێچراو پێش لێنان" } satisfies T,
    caption: { en: "Tuesday, before service", ku: "سێشەممە، پێش خزمەتگوزاری" } satisfies T,
  },
  {
    src: "/img/baker.jpg",
    alt: { en: "Cooks working in the restaurant kitchen", ku: "چێشتلێنەران لە چێشتخانەکەدا کار دەکەن" } satisfies T,
    caption: { en: "The pass, 20:10", ku: "پاس، ٢٠:١٠" } satisfies T,
  },
  {
    src: "/img/dish-pilaw.jpg",
    alt: { en: "Saffron rice served in a copper pot", ku: "برنجی زەعفەران لە مەنجەڵێکی مسیندا" } satisfies T,
    caption: { en: "Parda pilaw, opened", ku: "پەردە پیلاو، کراوە" } satisfies T,
  },
  {
    src: "/img/interior.jpg",
    alt: { en: "A traditional Kurdish room with decorated walls", ku: "ژوورێکی کوردی نەریتی بە دیواری ڕازێنراوە" } satisfies T,
    caption: { en: "The back room", ku: "ژووری دواوە" } satisfies T,
  },
  {
    src: "/img/logs.jpg",
    alt: { en: "Cut firewood stacked end on", ku: "دارەمەلی بڕاو بە کۆششەوە" } satisfies T,
    caption: { en: "Delivery, Sunday", ku: "گەیاندن، یەکشەممە" } satisfies T,
  },
];

/* -------------------------------------------------------------------- chef */

export const chef = {
  name: { en: "Nazdar Baban", ku: "نازدار بابان" } satisfies T,
  role: { en: "Head chef and co-owner", ku: "سەرچێشتلێنەر و هاوخاوەن" } satisfies T,
  image: "/img/baker.jpg",
  quote: {
    en: "My mother never measured anything. I have spent nine years trying to write down what her hands already knew.",
    ku: "دایکم هەرگیز هیچ شتێکی نەپێواوە. نۆ ساڵە هەوڵ دەدەم ئەوە بنووسمەوە کە دەستەکانی پێشتر دەیانزانی.",
  } satisfies T,
  bio: {
    en: "Nazdar cooked in Sulaymaniyah and Istanbul before opening Tenûr with her brother. She writes the menu by hand after the bazaar, most mornings.",
    ku: "نازدار لە سلێمانی و ئەستەنبوڵ چێشتی لێناوە پێش ئەوەی لەگەڵ براکەی تەنوور بکاتەوە. زۆربەی بەیانییان دوای بازاڕ بە دەست لیستەکە دەنووسێت.",
  } satisfies T,
};

/* ------------------------------------------------------------------- press */

export const press = [
  {
    quote: {
      en: "The best argument in Erbil for doing one thing and doing it properly.",
      ku: "باشترین بەڵگە لە هەولێر بۆ کردنی یەک شت و باش کردنی.",
    } satisfies T,
    source: "Hewlêr Review",
    year: "2024",
  },
  {
    quote: {
      en: "A menu you can read in a minute and think about for a year.",
      ku: "لیستێک لە خولەکێکدا دەیخوێنیتەوە و ساڵێک بیری لێ دەکەیتەوە.",
    } satisfies T,
    source: "Zagros Table",
    year: "2024",
  },
  {
    quote: {
      en: "Forty-two seats, one clay oven, and no obvious interest in what anyone else is doing.",
      ku: "چل و دوو کورسی، یەک تەنووری قوڕین، و هیچ گرنگییەکی ئاشکرا بەوەی کەسانی تر چی دەکەن.",
    } satisfies T,
    source: "Bazaar Quarterly",
    year: "2023",
  },
];

/* --------------------------------------------------------------------- faq */

export const faq = [
  {
    question: { en: "Do you take walk-ins?", ku: "بەبێ مێزگرتن وەردەگرن؟" } satisfies T,
    answer: {
      en: "Yes, for the ten seats along the oven wall. They are kept back from booking and given out from the moment we open.",
      ku: "بەڵێ، بۆ ئەو دە کورسییەی لەتەنیشت دیواری تەنوورەکەن. لە مێزگرتن دوور دەخرێنەوە و لە کاتی کردنەوەمانەوە دەدرێن.",
    } satisfies T,
  },
  {
    question: { en: "How far ahead can we book?", ku: "چەند پێشتر دەتوانین مێز بگرین؟" } satisfies T,
    answer: {
      en: "Six weeks. Thursday and Friday evenings usually go within the day.",
      ku: "شەش هەفتە. ئێوارانی پێنجشەممە و هەینی زۆرجار لە هەمان ڕۆژدا تەواو دەبن.",
    } satisfies T,
  },
  {
    question: { en: "Can you cook for vegetarians?", ku: "بۆ ڕووەکخۆران چێشت لێدەنێن؟" } satisfies T,
    answer: {
      en: "Most of the mezze, the dolma, the bread and the tepsî can all be done without meat. Tell us when you book. The kitchen is small, so we will say honestly if we cannot make an allergy safe rather than guess.",
      ku: "زۆربەی مێزە، دۆڵمە، نان و تەپسی دەکرێن بەبێ گۆشت. لە کاتی مێزگرتندا پێمان بڵێ. چێشتخانەکە بچووکە، بۆیە بە ڕاستگۆیی دەڵێین ئەگەر نەتوانین هەستیارییەک سەلامەت بکەین، لەبری ئەوەی گریمانە بکەین.",
    } satisfies T,
  },
  {
    question: { en: "Is there parking?", ku: "شوێنی ئۆتۆمبێل هەیە؟" } satisfies T,
    answer: {
      en: "There is a yard behind the building with room for about a dozen cars, and street parking along the 100 Metre Road after seven.",
      ku: "حەوشەیەک لە پشتی باڵەخانەکەدا هەیە بۆ نزیکەی دوازدە ئۆتۆمبێل، و لەسەر شەقامی ١٠٠ مەتری دوای کاتژمێر حەوت شوێن هەیە.",
    } satisfies T,
  },
  {
    question: { en: "Is the room accessible?", ku: "ژوورەکە دەستڕاگەیشتووە؟" } satisfies T,
    answer: {
      en: "The dining room and the accessible toilet are at street level with no step at the entrance. Tell us when you book and we will keep a standard table rather than a stool.",
      ku: "ژووری خواردن و تەوالێتی تایبەت لە ئاستی شەقامدان و هیچ پلیکانەیەک لە دەروازەکەدا نییە. لە کاتی مێزگرتندا پێمان بڵێ تاکو مێزێکی ئاسایی بۆت بهێڵینەوە نەک کورسییەکی بەرز.",
    } satisfies T,
  },
];

/* ------------------------------------------------------------ ui strings */

export const ui = {
  reserve: { en: "Reserve a table", ku: "مێزێک بگرە" } satisfies T,
  reserveShort: { en: "Reserve", ku: "مێز گرتن" } satisfies T,
  viewMenu: { en: "See the full menu", ku: "لیستی تەواو ببینە" } satisfies T,
  backHome: { en: "Back to the start", ku: "گەڕانەوە بۆ سەرەتا" } satisfies T,
  scroll: { en: "Scroll", ku: "خوار بڕۆ" } satisfies T,
  menuLabel: { en: "Menu", ku: "لیست" } satisfies T,
  close: { en: "Close", ku: "داخستن" } satisfies T,
  skipToContent: { en: "Skip to content", ku: "بازدان بۆ ناوەڕۆک" } satisfies T,
  currency: { en: "IQD", ku: "د.ع" } satisfies T,
  openingHours: { en: "Opening hours", ku: "کاتەکانی کردنەوە" } satisfies T,
  findUs: { en: "Find us", ku: "بمانددۆزەرەوە" } satisfies T,
  callUs: { en: "Call", ku: "پەیوەندی" } satisfies T,
  questions: { en: "Questions", ku: "پرسیارەکان" } satisfies T,
  pressTitle: { en: "Said about us", ku: "دەربارەمان" } satisfies T,
  galleryTitle: { en: "The room", ku: "ژوورەکە" } satisfies T,
  fireTitle: { en: "How it works", ku: "چۆن کاردەکات" } satisfies T,
  menuTitle: { en: "What we cook", ku: "چی لێدەنێین" } satisfies T,
  storyTitle: { en: "Story", ku: "چیرۆک" } satisfies T,
  visitTitle: { en: "Visit", ku: "سەردانمان" } satisfies T,
  perPerson: { en: "per person", ku: "بۆ هەر کەسێک" } satisfies T,
  langSwitch: { en: "کوردی", ku: "English" } satisfies T,
};

export const navigation = [
  { label: { en: "Story", ku: "چیرۆک" } satisfies T, href: "#story" },
  { label: { en: "How it works", ku: "چۆن کاردەکات" } satisfies T, href: "#fire" },
  { label: { en: "Menu", ku: "لیست" } satisfies T, href: "#menu" },
  { label: { en: "Visit", ku: "سەردانمان" } satisfies T, href: "#visit" },
];

/** Words for the scrolling ticker between sections. */
export const ticker: T[] = [
  { en: "Clay oven", ku: "تەنووری قوڕین" },
  { en: "Charcoal, not gas", ku: "خەڵووز، نەک غاز" },
  { en: "Erbil", ku: "هەولێر" },
  { en: "Forty-two seats", ku: "چل و دوو کورسی" },
  { en: "Since 2014", ku: "لە ٢٠١٤ەوە" },
  { en: "Bread at nine minutes", ku: "نان لە نۆ خولەکدا" },
];

/* -------------------------------------------------------------- page meta */

export const meta = {
  home: {
    title: {
      en: "Tenûr — Tandoor restaurant in Erbil, Kurdistan",
      ku: "تەنوور — چێشتخانەی تەنوور لە هەولێر، کوردستان",
    } satisfies T,
    description: {
      en: "A clay-oven kitchen in Erbil. Kurdish and Iraqi cooking over charcoal: tandoor bread, kebab Hewlêr, dolma, parda pilaw and masgouf. Book a table on the 100 Metre Road.",
      ku: "چێشتخانەیەکی تەنووری قوڕین لە هەولێر. خواردنی کوردی و عێراقی لەسەر خەڵووز: نانی تەنوور، کەبابی هەولێر، دۆڵمە، پەردە پیلاو و مەسگووف. مێزێک لە شەقامی ١٠٠ مەتری بگرە.",
    } satisfies T,
  },
  menu: {
    title: {
      en: "Menu — Tenûr, Erbil",
      ku: "لیستی خواردن — تەنوور، هەولێر",
    } satisfies T,
    description: {
      en: "The full menu at Tenûr in Erbil: tandoor bread, mezze, dolma, kubba, kebab Hewlêr, masgouf, quzî, parda pilaw and tepsî, with prices in Iraqi dinar.",
      ku: "لیستی تەواوی تەنوور لە هەولێر: نانی تەنوور، مێزە، دۆڵمە، کوببە، کەبابی هەولێر، مەسگووف، قوزی، پەردە پیلاو و تەپسی، بە نرخی دیناری عێراقی.",
    } satisfies T,
  },
};
