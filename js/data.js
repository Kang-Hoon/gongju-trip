// City & spot data for Daejeon-area day trips.
// Hours are typical values; always shown to users with a "check before you go" note.
// closed: weekdays the place is closed (0 = Sun, 1 = Mon, ... 6 = Sat)
// tags: taste weights 0-3 for each dimension in DIMS
// area: spots in the same area are ~10 min apart; other areas use the city's travel matrix
// best: "sunset" | "night" | "morning" — time-of-day bonus in the planner

export const DIMS = ["history", "nature", "food", "cafe", "photo", "calm", "active", "art"];

export const DIM_LABELS = {
  history: { en: "History", ko: "역사" },
  nature:  { en: "Nature", ko: "자연" },
  food:    { en: "Local food", ko: "로컬 음식" },
  cafe:    { en: "Cafés", ko: "카페" },
  photo:   { en: "Photo spots", ko: "사진 명소" },
  calm:    { en: "Calm & tradition", ko: "여유·전통" },
  active:  { en: "Walking", ko: "걷기" },
  art:     { en: "Art & design", ko: "예술·디자인" }
};

// Approximate minutes from origin to city centre: [car, public transport]
export const ORIGINS = {
  daejeon: { en: "Daejeon", ko: "대전" },
  seoul:   { en: "Seoul", ko: "서울" },
  local:   { en: "Already in the city", ko: "이미 그 도시에 있음" }
};

export const CITIES = [
  {
    id: "gongju",
    name: { en: "Gongju", ko: "공주" },
    emoji: "🏯",
    tagline: {
      en: "Baekje's second capital: fortress walls, royal tombs and chestnuts.",
      ko: "백제의 두 번째 수도. 성곽길, 왕릉, 그리고 알밤."
    },
    from: { daejeon: [40, 60], seoul: [120, 110], local: [0, 0] },
    nearby: ["buyeo", "sejong"],
    areaTime: { "A-B": 10, "A-C": 35, "B-C": 35, "A-D": 15, "B-D": 20, "C-D": 40 },
    themes: [
      { id: "baekje", en: "Baekje kingdom history", ko: "백제 역사" },
      { id: "temple", en: "Mountain temple & autumn leaves", ko: "산사와 단풍" },
      { id: "chestnut", en: "Chestnut food & markets", ko: "알밤 먹거리와 시장" },
      { id: "oldtown", en: "Old-town cafés & alleys", ko: "원도심 카페 골목" }
    ],
    spots: [
      { id: "gongsanseong", name: { en: "Gongsanseong Fortress", ko: "공산성" }, area: "A", dur: 75, open: "09:00", close: "18:00", closed: [], best: "sunset",
        tags: { history: 3, photo: 3, active: 2, nature: 1 },
        desc: { en: "UNESCO-listed Baekje fortress. Walk the wall above the Geum River.", ko: "유네스코 세계유산 백제 산성. 금강을 내려다보며 성곽길을 걸어요." } },
      { id: "muryeong", name: { en: "Royal Tombs of King Muryeong", ko: "무령왕릉과 왕릉원" }, area: "B", dur: 50, open: "09:00", close: "18:00", closed: [],
        tags: { history: 3, photo: 1, calm: 1 },
        desc: { en: "Grassy royal burial mounds, with a replica of the tomb chamber.", ko: "백제 왕릉군과 무령왕릉 모형 전시관." } },
      { id: "gongjumuseum", name: { en: "Gongju National Museum", ko: "국립공주박물관" }, area: "B", dur: 60, open: "09:00", close: "18:00", closed: [1],
        tags: { history: 3, art: 1 },
        desc: { en: "Gold crowns and treasures from King Muryeong's tomb. Free entry.", ko: "무령왕릉 출토 금관과 유물. 무료 관람." } },
      { id: "magoksa", name: { en: "Magoksa Temple", ko: "마곡사" }, area: "C", dur: 100, open: "08:00", close: "18:00", closed: [], best: "morning",
        tags: { nature: 3, calm: 3, photo: 2, history: 1, active: 1 },
        desc: { en: "UNESCO mountain temple along a valley stream. Peak leaves in mid-November.", ko: "계곡을 낀 유네스코 산사. 11월 중순 단풍이 절정이에요." } },
      { id: "gongjuhanok", name: { en: "Gongju Hanok Village", ko: "공주한옥마을" }, area: "B", dur: 40, open: "00:00", close: "23:59", closed: [],
        tags: { calm: 2, photo: 2, history: 1 },
        desc: { en: "Traditional houses for a slow stroll. You can also stay overnight.", ko: "한옥 사이를 천천히 걷기 좋은 곳. 숙박도 가능해요." } },
      { id: "jeminchen", name: { en: "Jeminchen old-town alleys", ko: "제민천 골목" }, area: "A", dur: 60, open: "10:00", close: "21:00", closed: [],
        tags: { cafe: 3, photo: 1, food: 1, calm: 1 },
        desc: { en: "Stream-side alleys with cafés, small shops and chestnut desserts.", ko: "개천을 따라 카페, 소품샵, 알밤 디저트 가게가 모여 있어요." } },
      { id: "sanseongmarket", name: { en: "Sanseong Market", ko: "공주산성시장" }, area: "A", dur: 45, open: "09:00", close: "19:00", closed: [],
        tags: { food: 3 },
        desc: { en: "Traditional market: injeolmi rice cake, roasted chestnuts, snacks.", ko: "전통시장. 인절미, 군밤 같은 간식거리가 많아요." } },
      { id: "seokjangri", name: { en: "Seokjang-ri Museum", ko: "석장리박물관" }, area: "D", dur: 50, open: "09:00", close: "18:00", closed: [],
        tags: { history: 2, nature: 1, calm: 1 },
        desc: { en: "Paleolithic site on the Geum River, quiet riverside walk.", ko: "금강변 구석기 유적. 한적한 강변 산책을 겸할 수 있어요." } }
    ],
    meals: [
      { en: "Gukbap (beef soup with rice)", ko: "국밥", spice: 0, area: "A" },
      { en: "Mountain-greens bibimbap by Magoksa", ko: "마곡사 앞 산채비빔밥", spice: 0, area: "C" },
      { en: "Chestnut dishes & desserts", ko: "알밤 요리와 디저트", spice: 0, area: "A" },
      { en: "Jjamppong (spicy seafood noodles)", ko: "짬뽕", spice: 2, area: "B" }
    ],
    tips: {
      en: ["One combined ticket covers King Muryeong's Tombs, Gongsanseong and Seokjang-ri Museum.", "Gongju National Museum is closed on Mondays."],
      ko: ["무령왕릉·공산성·석장리박물관은 통합권 하나로 관람할 수 있어요.", "국립공주박물관은 매주 월요일 휴관이에요."]
    }
  },
  {
    id: "buyeo",
    name: { en: "Buyeo", ko: "부여" },
    emoji: "🪷",
    tagline: {
      en: "Baekje's last capital: lotus ponds, temple ruins and a riverside fortress.",
      ko: "백제의 마지막 수도. 연못, 절터, 강변 산성."
    },
    from: { daejeon: [70, 90], seoul: [150, 140], local: [0, 0] },
    nearby: ["gongju"],
    areaTime: { "A-B": 15 },
    themes: [
      { id: "baekje", en: "Baekje royal heritage", ko: "백제 왕도 유산" },
      { id: "lotus", en: "Lotus ponds & slow walks", ko: "연못과 느린 산책" },
      { id: "river", en: "Geum River views", ko: "금강 풍경" },
      { id: "lotusrice", en: "Lotus-leaf rice & local food", ko: "연잎밥과 향토 음식" }
    ],
    spots: [
      { id: "buyeomuseum", name: { en: "Buyeo National Museum", ko: "국립부여박물관" }, area: "A", dur: 60, open: "09:00", close: "18:00", closed: [1],
        tags: { history: 3, art: 2 },
        desc: { en: "Home of the Gilt-bronze Incense Burner of Baekje, a national treasure. Free.", ko: "국보 백제금동대향로를 볼 수 있어요. 무료 관람." } },
      { id: "busosan", name: { en: "Busosanseong Fortress & Nakhwaam", ko: "부소산성과 낙화암" }, area: "A", dur: 90, open: "09:00", close: "17:00", closed: [],
        tags: { history: 3, nature: 2, active: 2, photo: 2 },
        desc: { en: "Forested hill fortress with pavilions over the Geum River.", ko: "숲길을 따라 누각과 금강 절벽까지 이어지는 백제 산성." } },
      { id: "jeongnimsa", name: { en: "Jeongnimsa Temple Site", ko: "정림사지" }, area: "A", dur: 40, open: "09:00", close: "18:00", closed: [],
        tags: { history: 2, calm: 2, photo: 1 },
        desc: { en: "A 1,400-year-old five-storey stone pagoda on an open temple site.", ko: "1,400년 된 오층석탑이 남은 백제 절터." } },
      { id: "gungnamji", name: { en: "Gungnamji Pond", ko: "궁남지" }, area: "A", dur: 40, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { nature: 2, photo: 3, calm: 2 },
        desc: { en: "Korea's oldest artificial pond, with a pavilion on an island. Free.", ko: "섬 위 정자가 있는 백제 연못. 무료." } },
      { id: "baekjeland", name: { en: "Baekje Cultural Land", ko: "백제문화단지" }, area: "B", dur: 90, open: "09:00", close: "18:00", closed: [1],
        tags: { history: 3, photo: 2, active: 1 },
        desc: { en: "Full-scale reconstruction of a Baekje royal palace and temple.", ko: "백제 왕궁과 사찰을 실물 크기로 재현한 곳." } }
    ],
    meals: [
      { en: "Lotus-leaf rice set (yeonnipbap)", ko: "연잎밥 정식", spice: 0, area: "A" },
      { en: "Ssambap (lettuce wraps with many sides)", ko: "우렁쌈밥", spice: 1, area: "A" },
      { en: "Kalguksu (knife-cut noodles)", ko: "칼국수", spice: 0, area: "A" }
    ],
    tips: {
      en: ["Most sights are walkable from Buyeo bus terminal.", "Buyeo National Museum and Baekje Cultural Land are closed on Mondays."],
      ko: ["주요 명소 대부분은 부여 터미널에서 걸어갈 수 있어요.", "국립부여박물관과 백제문화단지는 월요일 휴관이에요."]
    }
  },
  {
    id: "daejeon",
    name: { en: "Daejeon", ko: "대전" },
    emoji: "🥐",
    tagline: {
      en: "Science city with a famous bakery, kalguksu, forests and hot springs.",
      ko: "성심당과 칼국수, 휴양림과 온천이 있는 과학도시."
    },
    from: { daejeon: [0, 0], seoul: [120, 60], local: [0, 0] },
    nearby: ["gongju", "sejong"],
    areaTime: { "A-B": 20, "A-C": 35, "B-C": 30, "A-D": 25, "B-D": 15, "C-D": 30 },
    themes: [
      { id: "bread", en: "Bakery & food tour", ko: "빵지순례와 먹거리" },
      { id: "science", en: "Science & museums", ko: "과학과 박물관" },
      { id: "forest", en: "Forests & nature", ko: "휴양림과 자연" },
      { id: "retro", en: "Retro streets & cafés", ko: "레트로 골목과 카페" }
    ],
    spots: [
      { id: "sungsimdang", name: { en: "Sungsimdang Bakery (main store)", ko: "성심당 본점" }, area: "A", dur: 40, open: "08:00", close: "22:00", closed: [],
        tags: { food: 3, cafe: 2 },
        desc: { en: "Daejeon's legendary bakery since 1956. Try the fried soboro bread.", ko: "1956년부터 이어진 대전의 명물 빵집. 튀김소보로가 대표 메뉴." } },
      { id: "sojedong", name: { en: "Soje-dong café street", ko: "소제동 카페거리" }, area: "A", dur: 60, open: "11:00", close: "21:00", closed: [],
        tags: { cafe: 3, photo: 2, history: 1 },
        desc: { en: "Old railway workers' houses turned into cafés near Daejeon Station.", ko: "대전역 근처 옛 철도관사를 개조한 카페 골목." } },
      { id: "jungangmarket", name: { en: "Daejeon Jungang Market", ko: "대전 중앙시장" }, area: "A", dur: 45, open: "09:00", close: "20:00", closed: [],
        tags: { food: 3 },
        desc: { en: "Big traditional market for snacks and street food.", ko: "간식과 길거리 음식이 많은 대형 전통시장." } },
      { id: "hanbat", name: { en: "Hanbat Arboretum", ko: "한밭수목원" }, area: "B", dur: 60, open: "09:00", close: "18:00", closed: [],
        tags: { nature: 2, calm: 2, active: 1 },
        desc: { en: "Large city-centre arboretum. East and west gardens close on different days.", ko: "도심 속 대형 수목원. 동원·서원 휴원일이 달라요." } },
      { id: "leeungno", name: { en: "Lee Ungno Museum & Daejeon Museum of Art", ko: "이응노미술관·대전시립미술관" }, area: "B", dur: 60, open: "10:00", close: "18:00", closed: [1],
        tags: { art: 3, calm: 1 },
        desc: { en: "Modern Korean art, right next to the arboretum.", ko: "수목원 바로 옆 근현대 미술관." } },
      { id: "sciencemuseum", name: { en: "National Science Museum", ko: "국립중앙과학관" }, area: "B", dur: 90, open: "09:30", close: "17:30", closed: [1],
        tags: { art: 1, active: 1, history: 1 },
        desc: { en: "Huge science museum; most halls are free.", ko: "대부분 무료로 볼 수 있는 대형 과학관." } },
      { id: "expo", name: { en: "Expo Park & Hanbit Tower", ko: "엑스포과학공원·한빛탑" }, area: "B", dur: 40, open: "00:00", close: "23:59", closed: [], best: "night",
        tags: { photo: 2, art: 1 },
        desc: { en: "Riverside park with the 1993 Expo tower, lit up at night.", ko: "1993 엑스포 상징 한빛탑. 야경이 좋아요." } },
      { id: "jangtaesan", name: { en: "Jangtaesan Forest", ko: "장태산자연휴양림" }, area: "C", dur: 120, open: "09:00", close: "18:00", closed: [],
        tags: { nature: 3, active: 2, photo: 2, calm: 1 },
        desc: { en: "Metasequoia forest with a skywalk and suspension bridge.", ko: "메타세쿼이아 숲과 스카이웨이, 출렁다리." } },
      { id: "yuseong", name: { en: "Yuseong hot-spring footbath", ko: "유성온천 족욕체험장" }, area: "D", dur: 30, open: "00:00", close: "23:59", closed: [],
        tags: { calm: 3 },
        desc: { en: "Free outdoor hot-spring footbath. Bring a small towel.", ko: "무료 야외 온천 족욕장. 작은 수건을 챙기세요." } }
    ],
    meals: [
      { en: "Kalguksu (Daejeon's signature noodles)", ko: "칼국수", spice: 0, area: "A" },
      { en: "Dubu duruchigi (spicy stir-fried tofu)", ko: "두부두루치기", spice: 2, area: "A" },
      { en: "Brunch at Sungsimdang's restaurant", ko: "성심당 레스토랑 브런치", spice: 0, area: "A" }
    ],
    tips: {
      en: ["Sungsimdang's main store often has queues on weekends; the Daejeon Station branch is quicker for takeaway.", "Museums here are mostly closed on Mondays."],
      ko: ["성심당 본점은 주말에 줄이 길어요. 포장만 할 거면 대전역점이 빨라요.", "대전의 박물관·미술관은 대부분 월요일 휴관이에요."]
    }
  },
  {
    id: "sejong",
    name: { en: "Sejong", ko: "세종" },
    emoji: "🌿",
    tagline: {
      en: "Korea's garden city: a national arboretum, a huge lake park and river bridges.",
      ko: "정원도시 세종. 국립수목원, 호수공원, 금강 보행교."
    },
    from: { daejeon: [35, 50], seoul: [110, 90], local: [0, 0] },
    nearby: ["daejeon", "gongju"],
    areaTime: { "A-B": 25 },
    themes: [
      { id: "garden", en: "Gardens & arboretum", ko: "정원과 수목원" },
      { id: "lake", en: "Lake & riverside walks", ko: "호수·강변 산책" },
      { id: "city", en: "New-city architecture", ko: "신도시 건축" },
      { id: "picnic", en: "Picnic & cycling", ko: "피크닉과 자전거" }
    ],
    spots: [
      { id: "arboretum", name: { en: "National Sejong Arboretum", ko: "국립세종수목원" }, area: "A", dur: 120, open: "09:00", close: "17:00", closed: [1],
        tags: { nature: 3, photo: 2, calm: 2, active: 1 },
        desc: { en: "Big glass greenhouses plus a Korean palace-style garden.", ko: "대형 사계절 온실과 한국 전통정원이 있는 수목원." } },
      { id: "lakepark", name: { en: "Sejong Lake Park", ko: "세종호수공원" }, area: "A", dur: 60, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { nature: 2, calm: 2, active: 1, photo: 1 },
        desc: { en: "Large lake with themed islands and a floating stage. Free.", ko: "테마섬과 수상무대가 있는 대형 호수공원. 무료." } },
      { id: "centralpark", name: { en: "Sejong Central Park", ko: "세종중앙공원" }, area: "A", dur: 45, open: "00:00", close: "23:59", closed: [],
        tags: { nature: 2, calm: 1, active: 1 },
        desc: { en: "Open fields and paths right next to the arboretum.", ko: "수목원 바로 옆 넓은 잔디와 산책로." } },
      { id: "bridge", name: { en: "Geumgang Pedestrian Bridge", ko: "금강보행교" }, area: "A", dur: 45, open: "00:00", close: "23:59", closed: [], best: "night",
        tags: { photo: 3, active: 2 },
        desc: { en: "Ring-shaped two-level bridge over the Geum River, lit at night.", ko: "금강 위 원형 복층 보행교. 밤 조명이 예뻐요." } },
      { id: "archives", name: { en: "Presidential Archives Exhibition", ko: "대통령기록전시관" }, area: "A", dur: 50, open: "09:30", close: "18:00", closed: [1],
        tags: { history: 2, art: 1 },
        desc: { en: "Records and gifts of Korea's presidents. Free.", ko: "역대 대통령 기록물과 선물 전시. 무료." } },
      { id: "beartree", name: { en: "Bear Tree Park", ko: "베어트리파크" }, area: "B", dur: 90, open: "09:00", close: "18:00", closed: [],
        tags: { nature: 2, photo: 2, calm: 1 },
        desc: { en: "Private garden park with bears and thousands of plant species.", ko: "반달곰과 다양한 수목이 있는 사설 정원." } }
    ],
    meals: [
      { en: "Korean BBQ in Naseong-dong", ko: "나성동 고깃집", spice: 0, area: "A" },
      { en: "Brunch café by the lake", ko: "호수공원 근처 브런치 카페", spice: 0, area: "A" },
      { en: "Jjigae set meal", ko: "찌개 백반", spice: 1, area: "A" }
    ],
    tips: {
      en: ["Bus 221 from Sejong Express Bus Terminal goes straight to the arboretum.", "The arboretum and Presidential Archives are closed on Mondays."],
      ko: ["세종고속시외버스터미널에서 221번 버스가 수목원까지 바로 가요.", "수목원과 대통령기록전시관은 월요일 휴관이에요."]
    }
  },
  {
    id: "cheongju",
    name: { en: "Cheongju", ko: "청주" },
    emoji: "🎨",
    tagline: {
      en: "Art storage museum, a hilltop mural village and a former presidential retreat.",
      ko: "수장형 미술관, 벽화마을, 대통령 별장 청남대."
    },
    from: { daejeon: [45, 60], seoul: [100, 100], local: [0, 0] },
    nearby: ["sejong", "daejeon"],
    areaTime: { "A-B": 20, "A-C": 45, "B-C": 50, "A-D": 20, "B-D": 30, "C-D": 55 },
    themes: [
      { id: "art", en: "Modern art & design", ko: "현대미술과 디자인" },
      { id: "fortress", en: "Fortress hiking", ko: "산성 트레킹" },
      { id: "retreat", en: "Presidential retreat & lake", ko: "청남대와 대청호" },
      { id: "samgyeopsal", en: "Pork BBQ street food", ko: "삼겹살 거리" }
    ],
    spots: [
      { id: "mmca", name: { en: "MMCA Cheongju", ko: "국립현대미술관 청주" }, area: "A", dur: 75, open: "10:00", close: "18:00", closed: [1],
        tags: { art: 3, cafe: 1, calm: 1 },
        desc: { en: "Korea's first open-storage art museum in a former tobacco factory. Free.", ko: "옛 연초제조창을 고친 국내 첫 수장형 미술관. 무료." } },
      { id: "culturefactory", name: { en: "Culture Factory", ko: "문화제조창" }, area: "A", dur: 45, open: "10:00", close: "21:00", closed: [],
        tags: { art: 2, cafe: 2, photo: 1 },
        desc: { en: "Shops, cafés and craft spaces in the same factory building.", ko: "같은 건물의 상점·카페·공예 공간." } },
      { id: "suamgol", name: { en: "Suamgol Mural Village", ko: "수암골 벽화마을" }, area: "A", dur: 60, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { photo: 3, cafe: 2, history: 1 },
        desc: { en: "Hillside village with murals and view cafés over the city.", ko: "벽화와 전망 카페가 있는 언덕 마을." } },
      { id: "sangdang", name: { en: "Sangdangsanseong Fortress", ko: "상당산성" }, area: "B", dur: 90, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { history: 2, nature: 2, active: 3, photo: 2 },
        desc: { en: "Joseon-era fortress wall loop with wide views.", ko: "조선시대 성곽을 한 바퀴 도는 전망 좋은 길." } },
      { id: "cheongnamdae", name: { en: "Cheongnamdae", ko: "청남대" }, area: "C", dur: 150, open: "09:00", close: "18:00", closed: [1],
        tags: { nature: 3, history: 2, photo: 2, calm: 2 },
        desc: { en: "Former presidential villa on Daecheong Lake, with gardens and trails.", ko: "대청호변 옛 대통령 별장. 정원과 산책로가 넓어요." } },
      { id: "seongangil", name: { en: "Seongan-gil & Iron Flagpole", ko: "성안길·용두사지 철당간" }, area: "A", dur: 45, open: "10:00", close: "21:00", closed: [],
        tags: { food: 2, history: 1 },
        desc: { en: "Downtown shopping street around a 1,000-year-old iron flagpole.", ko: "천 년 된 철당간이 있는 구도심 쇼핑거리." } },
      { id: "jeongbuk", name: { en: "Jeongbuk-dong Earthen Fortress", ko: "정북동 토성" }, area: "D", dur: 40, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { photo: 3, calm: 2, nature: 1 },
        desc: { en: "Grassy earthen walls in open fields, a famous sunset photo spot.", ko: "들판 위 흙 성벽. 노을 사진 명소." } }
    ],
    meals: [
      { en: "Soy-sauce pork BBQ (Cheongju samgyeopsal)", ko: "청주 간장 삼겹살", spice: 0, area: "A" },
      { en: "Olgaengi haejangguk (river-snail soup)", ko: "올갱이 해장국", spice: 1, area: "A" },
      { en: "Spicy braised short ribs", ko: "매운 갈비찜", spice: 2, area: "A" }
    ],
    tips: {
      en: ["Cheongju's sights are spread out; a car makes Cheongnamdae much easier.", "MMCA Cheongju and Cheongnamdae are closed on Mondays."],
      ko: ["청주는 명소가 흩어져 있어서 청남대는 자차가 훨씬 편해요.", "국립현대미술관 청주와 청남대는 월요일 휴관이에요."]
    }
  },
  {
    id: "jeonju",
    name: { en: "Jeonju", ko: "전주" },
    emoji: "🍚",
    tagline: {
      en: "800 hanok houses, bibimbap's hometown and a Joseon royal shrine.",
      ko: "한옥 800채, 비빔밥의 고향, 조선 왕실 사당 경기전."
    },
    from: { daejeon: [80, 100], seoul: [160, 120], local: [0, 0] },
    nearby: [],
    areaTime: { "A-B": 15 },
    themes: [
      { id: "hanok", en: "Hanok village & hanbok", ko: "한옥마을과 한복" },
      { id: "bibimbap", en: "Bibimbap & food", ko: "비빔밥과 먹거리" },
      { id: "joseon", en: "Joseon royal history", ko: "조선 왕실 역사" },
      { id: "nightmarket", en: "Markets & night food", ko: "시장과 야식" }
    ],
    spots: [
      { id: "hanokvillage", name: { en: "Jeonju Hanok Village streets", ko: "전주한옥마을 거리" }, area: "A", dur: 90, open: "00:00", close: "23:59", closed: [],
        tags: { photo: 3, food: 2, cafe: 2, history: 1 },
        desc: { en: "Hundreds of hanok houses with snack stalls, cafés and hanbok rentals.", ko: "수백 채의 한옥 사이로 길거리 음식, 카페, 한복 대여점." } },
      { id: "gyeonggijeon", name: { en: "Gyeonggijeon Shrine", ko: "경기전" }, area: "A", dur: 60, open: "09:00", close: "18:00", closed: [],
        tags: { history: 3, calm: 2, photo: 2 },
        desc: { en: "Shrine holding the portrait of Joseon's founder, King Taejo. Entry 3,000 won.", ko: "태조 이성계 어진을 모신 곳. 입장료 3,000원." } },
      { id: "jeondong", name: { en: "Jeondong Cathedral", ko: "전동성당" }, area: "A", dur: 20, open: "09:00", close: "18:00", closed: [],
        tags: { history: 2, photo: 3, art: 1 },
        desc: { en: "1914 Romanesque cathedral facing the shrine.", ko: "경기전 맞은편 1914년 로마네스크 성당." } },
      { id: "omokdae", name: { en: "Omokdae viewpoint", ko: "오목대" }, area: "A", dur: 30, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { photo: 2, active: 1, history: 1 },
        desc: { en: "Short climb for a view over the hanok rooftops.", ko: "잠깐 오르면 한옥 지붕이 한눈에 보여요." } },
      { id: "jaman", name: { en: "Jaman Mural Village", ko: "자만벽화마을" }, area: "A", dur: 40, open: "00:00", close: "23:59", closed: [],
        tags: { photo: 2, cafe: 1, active: 1 },
        desc: { en: "Colourful hillside murals just across from Omokdae.", ko: "오목대 건너편 언덕의 알록달록한 벽화마을." } },
      { id: "nambu", name: { en: "Nambu Market", ko: "남부시장" }, area: "A", dur: 50, open: "09:00", close: "20:00", closed: [],
        tags: { food: 3 },
        desc: { en: "Traditional market famous for kongnamul gukbap and a youth mall upstairs.", ko: "콩나물국밥으로 유명한 전통시장. 2층엔 청년몰." } },
      { id: "hyanggyo", name: { en: "Jeonju Hyanggyo", ko: "전주향교" }, area: "A", dur: 30, open: "09:00", close: "18:00", closed: [],
        tags: { calm: 3, history: 2, photo: 2 },
        desc: { en: "Joseon Confucian school with huge ginkgo trees, golden in late autumn.", ko: "은행나무가 아름다운 조선시대 향교." } },
      { id: "hanbok", name: { en: "Hanbok rental photo walk", ko: "한복 대여 사진 산책" }, area: "A", dur: 60, open: "10:00", close: "19:00", closed: [],
        tags: { photo: 3, calm: 1, history: 1 },
        desc: { en: "Rent a hanbok for an hour or two and wander the shrine and alleys.", ko: "한두 시간 한복을 빌려 경기전과 골목을 걸어요." } },
      { id: "deokjin", name: { en: "Deokjin Park", ko: "덕진공원" }, area: "B", dur: 45, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { nature: 2, calm: 2, photo: 2 },
        desc: { en: "Lake park with a long wooden bridge, famous for summer lotus blooms.", ko: "긴 나무다리가 있는 호수공원. 여름 연꽃으로 유명해요." } },
      { id: "jeonjumuseum", name: { en: "Jeonju National Museum", ko: "국립전주박물관" }, area: "B", dur: 60, open: "10:00", close: "18:00", closed: [1],
        tags: { history: 2, art: 2 },
        desc: { en: "History and art of the Jeolla region. Free.", ko: "전라 지역의 역사와 미술. 무료." } }
    ],
    meals: [
      { en: "Jeonju bibimbap", ko: "전주비빔밥", spice: 1, area: "A" },
      { en: "Kongnamul gukbap (bean-sprout soup)", ko: "콩나물국밥", spice: 1, area: "A" },
      { en: "Hanok Village street snacks", ko: "한옥마을 길거리 음식", spice: 0, area: "A" },
      { en: "Makgeolli house (table of side dishes)", ko: "막걸리집", spice: 1, area: "A" }
    ],
    tips: {
      en: ["Gyeonggijeon's royal portrait museum is closed on Mondays (the shrine itself is open).", "Hanok Village gets very busy on weekends; arrive before 10 am."],
      ko: ["경기전 안 어진박물관은 월요일 휴관이에요 (경기전은 관람 가능).", "주말 한옥마을은 많이 붐벼요. 오전 10시 전에 도착하세요."]
    }
  }
];

// Approximate sunset (HH:MM) for central Korea by month index 0-11
export const SUNSET = ["17:40", "18:10", "18:40", "19:05", "19:30", "19:55", "19:55", "19:30", "18:50", "18:10", "17:30", "17:20"];
