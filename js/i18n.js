import { local } from "./store.js";

export const STR = {
  brand: { en: "K-Trip Planner", ko: "K-트립 플래너" },
  heroEyebrow: { en: "Day trips & short stays around Daejeon", ko: "대전 근교 당일치기 · 짧은 여행" },
  heroTitle: { en: "Plan a Korean trip that fits <em>your</em> taste.", ko: "<em>내 취향</em>에 맞는 국내 여행 일정 짜기" },
  heroSub: {
    en: "Pick a city, set your times, answer 10 quick questions. Get an hour-by-hour plan with food picks.",
    ko: "도시를 고르고, 시간을 정하고, 10개 질문에 답하면 시간대별 일정과 음식 추천이 나와요."
  },
  startPlanning: { en: "Start planning →", ko: "일정 짜기 →" },
  notSure: { en: "Not sure where? Take the quiz first", ko: "어디 갈지 모르겠다면 퀴즈부터" },
  cities: { en: "Cities", ko: "도시" },
  communityTheme: { en: "Visitors say:", ko: "방문자들이 꼽은 테마:" },
  voteTheme: { en: "Vote this city's theme", ko: "이 도시 테마 투표하기" },
  noVotes: { en: "No votes yet — be the first", ko: "아직 투표가 없어요. 첫 투표를 해주세요" },

  setupTitle: { en: "Trip settings", ko: "여행 설정" },
  forWho: { en: "Who's this plan for? (optional)", ko: "누구를 위한 일정인가요? (선택)" },
  forWhoPh: { en: "e.g. Michael", ko: "예: Michael" },
  city: { en: "City", ko: "도시" },
  anyCity: { en: "Let the quiz decide", ko: "퀴즈 결과로 정하기" },
  length: { en: "Trip length", ko: "여행 기간" },
  dayTrip: { en: "Day trip", ko: "당일치기" },
  n1: { en: "1 night, 2 days", ko: "1박 2일" },
  n2: { en: "2 nights, 3 days", ko: "2박 3일" },
  date: { en: "Date (optional — checks closing days)", ko: "날짜 (선택 · 휴관일 반영)" },
  startTime: { en: "Start each day at", ko: "하루 시작 시간" },
  endTime: { en: "Finish each day by", ko: "하루 종료 시간" },
  origin: { en: "Coming from", ko: "출발지" },
  transport: { en: "Getting around", ko: "이동 수단" },
  car: { en: "Car", ko: "자차" },
  transit: { en: "Bus / train", ko: "대중교통" },
  next: { en: "Next: taste quiz →", ko: "다음: 취향 퀴즈 →" },
  back: { en: "← Back", ko: "← 이전" },
  timeError: { en: "The day needs at least 3 hours.", ko: "하루 일정은 최소 3시간이 필요해요." },

  question: { en: "Question", ko: "질문" },

  travelType: { en: "travel type", ko: "여행 타입" },
  withSide: { en: "with a strong side of", ko: "그리고 이런 취향도:" },
  tasteProfile: { en: "Taste profile", ko: "취향 프로필" },
  yourPlan: { en: "Your plan", ko: "추천 일정" },
  bestMatch: { en: "Best-matching cities for you", ko: "나와 잘 맞는 도시" },
  switchCity: { en: "Plan this city instead", ko: "이 도시로 다시 짜기" },
  day: { en: "Day", ko: "Day" },
  closedNote: { en: "Closed days are taken into account for", ko: "휴관일 반영 날짜:" },
  noDateNote: { en: "No date set — double-check Monday closures.", ko: "날짜를 안 정했어요. 월요일 휴관에 주의하세요." },
  removeStop: { en: "Remove this stop", ko: "이 일정 빼기" },
  restoreAll: { en: "Restore removed stops", ko: "뺀 일정 되돌리기" },
  travelTo: { en: "Travel to", ko: "이동:" },
  dayTripTo: { en: "Day trip to", ko: "근교 이동:" },
  moveNext: { en: "Move to next stop", ko: "다음 장소로 이동" },
  lunch: { en: "Lunch", ko: "점심" },
  dinner: { en: "Dinner", ko: "저녁" },
  freeTime: { en: "Café break / free time", ko: "카페 휴식 · 자유 시간" },
  freeTimeSub: { en: "Rest your feet, browse a shop, grab a coffee", ko: "다리 쉬기, 소품샵 구경, 커피 한 잔" },
  goHome: { en: "Head back to", ko: "귀가:" },
  arrive: { en: "arrive around", ko: "도착 예상" },
  stayNight: { en: "Check in and rest", ko: "숙소 체크인 · 휴식" },
  approx: { en: "approx.", ko: "약" },
  min: { en: "min", ko: "분" },
  thingsToEat: { en: "Things to eat", ko: "먹어볼 음식" },
  goodToKnow: { en: "Good to know", ko: "알아두면 좋은 것" },
  hoursDisclaimer: {
    en: "Opening hours and travel times are approximate and change by season. Check official sites before you go.",
    ko: "운영시간과 이동시간은 대략적인 값이며 계절마다 달라요. 방문 전 공식 사이트를 확인하세요."
  },
  share: { en: "Share this plan", ko: "일정 공유하기" },
  shareSub: { en: "The link opens this exact plan.", ko: "링크를 열면 이 일정이 그대로 나와요." },
  copyLink: { en: "Copy link", ko: "링크 복사" },
  copyText: { en: "Copy as text", ko: "텍스트로 복사" },
  shareBtn: { en: "Share…", ko: "공유…" },
  copied: { en: "Copied!", ko: "복사했어요!" },
  retake: { en: "↺ Start over", ko: "↺ 처음부터" },

  voteTitle: { en: "What's {city}'s main theme for you?", ko: "{city}의 메인 테마는 뭐라고 생각해요?" },
  voteSub: { en: "Your vote shapes how we describe this city.", ko: "투표 결과는 도시 소개에 반영돼요." },
  voted: { en: "Thanks! You voted.", ko: "투표 완료!" },
  votes: { en: "votes", ko: "표" },
  localOnly: { en: "(saved in this browser only)", ko: "(이 브라우저에만 저장됨)" },

  surveyTitle: { en: "Quick survey: how was this plan?", ko: "짧은 설문: 일정 어땠어요?" },
  rating: { en: "Overall", ko: "전체 만족도" },
  realistic: { en: "Does the timing look realistic?", ko: "시간 배분이 현실적인가요?" },
  yes: { en: "Yes", ko: "네" },
  somewhat: { en: "Somewhat", ko: "어느 정도" },
  no: { en: "No", ko: "아니요" },
  maybe: { en: "Maybe", ko: "글쎄요" },
  wouldUse: { en: "Would you use this for a real trip?", ko: "실제 여행에 쓸 것 같나요?" },
  nextCity: { en: "Which city should we add next?", ko: "다음에 추가했으면 하는 도시는?" },
  nextCityPh: { en: "e.g. Gyeongju, Gangneung", ko: "예: 경주, 강릉" },
  comment: { en: "Anything else?", ko: "그 밖에 하고 싶은 말" },
  submit: { en: "Send feedback", ko: "보내기" },
  thanks: { en: "Thank you! Your feedback helps improve the planner.", ko: "고마워요! 더 좋은 플래너를 만드는 데 쓸게요." },
  sendFail: { en: "Couldn't send right now. Please try again later.", ko: "지금은 보내지 못했어요. 잠시 후 다시 시도해 주세요." },
  footer: { en: "Made in Daejeon. Hours and prices change — always check before you go.", ko: "대전에서 만들었어요. 운영시간·요금은 바뀔 수 있으니 방문 전 확인하세요." },
  weekday: { en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ko: ["일", "월", "화", "수", "목", "금", "토"] }
};

let lang = local.get("kt_lang", null) || ((navigator.language || "").toLowerCase().startsWith("ko") ? "ko" : "en");
const qs = new URLSearchParams(location.search);
if (qs.get("lang") === "ko" || qs.get("lang") === "en") lang = qs.get("lang");

export const getLang = () => lang;
export function setLang(l) { lang = l; local.set("kt_lang", l); document.documentElement.lang = l; }
export const t = (key, vars) => {
  let s = STR[key] ? STR[key][lang] : key;
  if (vars && typeof s === "string") Object.entries(vars).forEach(([k, v]) => (s = s.replace("{" + k + "}", v)));
  return s;
};
export const L = (obj) => (obj ? obj[lang] ?? obj.en : "");
