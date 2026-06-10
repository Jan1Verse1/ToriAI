// All mock data. Swap these for live API responses later.

export const USER = {
  name: "Amara Okeke",
  email: "amara@lagosdaily.com",
  role: "Managing Editor",
  avatar: "",
};

export const NEWSROOM = {
  name: "Lagos Daily",
  slogan: "The news you can trust",
  logo: "",
  primaryColor: "#BC4A2A",
  secondaryColor: "#2E6B4E",
};

export const initials = (name) =>
  name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export const LANGS = [
  { id:"en", name:"English", abbr:"EN", color:"#1E1B16",
    voices:[ {n:"Amara", d:"Warm · Female"}, {n:"David", d:"Authoritative · Male"} ] },
  { id:"pcm", name:"Pidgin", abbr:"PC", color:"#BC4A2A",
    voices:[ {n:"Chidi", d:"Conversational · Male"}, {n:"Ngozi", d:"Lively · Female"} ] },
  { id:"ha", name:"Hausa", abbr:"HA", color:"#2E6B4E",
    voices:[ {n:"Aisha", d:"Calm · Female"}, {n:"Sani", d:"Broadcast · Male"} ] },
  { id:"yo", name:"Yoruba", abbr:"YO", color:"#BE8E2C",
    voices:[ {n:"Bọla", d:"Warm · Female"}, {n:"Tunde", d:"Measured · Male"} ] },
  { id:"ig", name:"Igbo", abbr:"IG", color:"#3A6276",
    voices:[ {n:"Adaeze", d:"Clear · Female"}, {n:"Emeka", d:"Steady · Male"} ] },
];

export const langById = (id) => LANGS.find(l => l.id === id);

export const SAMPLE = {
  title:"Lagos Launches Solar-Powered Bus Routes to Cut Commute Costs",
  text:"The Lagos State Government has launched a fleet of solar-powered buses on three major routes across the metropolis, in a move officials say will cut transport costs for commuters and reduce air pollution. The first 40 buses begin service next month along the Lekki, Ikeja and Yaba corridors, with a further 120 expected before the end of the year. Transport Commissioner said fares on the new routes would be roughly 30 percent lower than conventional buses, and that the vehicles would charge at solar depots during off-peak hours.",
};

export const SUMMARIES = {
  en:"Lagos State has launched solar-powered buses on three major routes — Lekki, Ikeja and Yaba — to cut commuter costs and reduce air pollution. The first 40 buses start next month, with 120 more due before year-end. Officials say fares will be about 30% lower than conventional buses, and the vehicles will recharge at solar depots during off-peak hours.",
  pcm:"Lagos State don bring solar bus wey go dey carry people for three big routes — Lekki, Ikeja and Yaba — to cut transport money and reduce smoke for air. Di first 40 buses go start next month, and dem wan add 120 more before di year end. Government talk say di fare go cheap reach 30% pass normal bus, and di buses go charge for solar depot.",
  ha:"Jihar Legas ta ƙaddamar da motocin bas masu amfani da hasken rana a manyan hanyoyi uku — Lekki, Ikeja da Yaba — don rage kuɗin sufuri da gurɓataccen iska. Motoci 40 na farko za su fara aiki wata mai zuwa, sannan a ƙara 120 kafin ƙarshen shekara.",
  yo:"Ìpínlẹ̀ Èkó ti ṣe ìfilọ́lẹ̀ àwọn ọkọ̀ akérò tó ń lo agbára oòrùn ní ojú ọ̀nà mẹ́ta — Lekki, Ikeja àti Yaba — láti dín owó ìrìnnà àti èéfín kù. Ọkọ̀ 40 àkọ́kọ́ máa bẹ̀rẹ̀ ní oṣù tó ń bọ̀.",
  ig:"Steeti Legos ewepụtala ụgbọ ala bọs na-eji ìhè anyanwụ n'ụzọ atọ bụ́ Lekki, Ikeja na Yaba iji belata ego njem na anwụrụ ọkụ. Ụgbọ ala 40 nke mbụ ga-amalite ọnwa na-abịa.",
};

export const RECENT = [
  { t:"FG Approves New Minimum Wage Framework for 2026", langs:["EN","PC","HA"], type:"Audio + Video", time:"12 min ago", c:"#BC4A2A", st:"Published" },
  { t:"Naira Strengthens Against Dollar in Parallel Market", langs:["EN","PC"], type:"Audio", time:"1 hr ago", c:"#2E6B4E", st:"Ready" },
  { t:"Super Eagles Name Squad for AFCON Qualifiers", langs:["EN","YO","IG"], type:"Video", time:"3 hrs ago", c:"#BE8E2C", st:"Published" },
  { t:"Power Grid Restored After Nationwide Outage", langs:["EN","HA","PC"], type:"Audio + Video", time:"Yesterday", c:"#3A6276", st:"Published" },
];

export const LANG_USAGE = [
  { ...LANGS[0], pct:"34%" }, { ...LANGS[1], pct:"28%" }, { ...LANGS[2], pct:"16%" },
  { ...LANGS[3], pct:"13%" }, { ...LANGS[4], pct:"9%" },
];

export const WAVE = Array.from({ length:54 }, (_, i) => {
  const v = Math.abs(Math.sin(i*0.7)*0.6 + Math.sin(i*0.27)*0.4);
  return 0.25 + v*0.75;
});
