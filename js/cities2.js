// Batch 1 expansion: Seoul, Busan, Gyeongju, Jeju, Gangneung.
// areaTime values are car minutes; public transport = areaTime × transitFactor + 5.
// Verified Nov 2026: Bukchon red zone 10:00–17:00 for tourists; National Museum of Korea 09:30–17:30
// (closed 1st Monday of Mar/Jun/Sep/Dec); Seongsan Ilchulbong closed 1st Monday monthly;
// Gyeongju National Museum 10:00–18:00; Ojukheon 09:00–18:00, open daily.

export const CITIES2 = [
  {
    id: "seoul",
    name: { en: "Seoul", ko: "서울" },
    emoji: "🏙️",
    tagline: {
      en: "Palaces and hanok alleys next to cafés, markets and the Han River.",
      ko: "궁궐과 한옥 골목, 그 옆의 카페·시장·한강."
    },
    from: { daejeon: [130, 70], seoul: [0, 0], incheon: [60, 70], local: [0, 0] },
    nearby: [],
    transitFactor: 1.2,
    // A 종로·중구 / B 용산 / C 마포 / D 성동·광진 / E 강남·송파 / F 영등포(여의도) / G 서대문
    areaTime: { "A-B": 15, "A-C": 25, "A-D": 25, "A-E": 35, "A-F": 25, "A-G": 15, "B-C": 20, "B-D": 20, "B-E": 25, "B-F": 15, "B-G": 20,
      "C-D": 35, "C-E": 40, "C-F": 15, "C-G": 10, "D-E": 20, "D-F": 35, "D-G": 35, "E-F": 35, "E-G": 40, "F-G": 25 },
    themes: [
      { id: "palace", en: "Palaces & hanok", ko: "궁궐과 한옥" },
      { id: "market", en: "Markets & street food", ko: "시장과 길거리 음식" },
      { id: "kculture", en: "K-culture, cafés & shopping", ko: "K-컬처, 카페, 쇼핑" },
      { id: "hangang", en: "Han River & night views", ko: "한강과 야경" }
    ],
    spots: [
      { id: "gyeongbokgung", name: { en: "Gyeongbokgung Palace", ko: "경복궁" }, area: "A", dur: 90, open: "09:00", close: "17:00", closed: [2], best: "morning",
        tags: { history: 3, photo: 3, calm: 1 },
        desc: { en: "Joseon's main palace. Wear a hanbok and entry is free. Guard ceremony at 10:00 and 14:00.", ko: "조선의 정궁. 한복을 입으면 무료 입장. 10시·14시 수문장 교대식." } },
      { id: "bukchon", name: { en: "Bukchon Hanok Village", ko: "북촌한옥마을" }, area: "A", dur: 50, open: "10:00", close: "17:00", closed: [],
        tags: { photo: 3, history: 2, calm: 1 },
        desc: { en: "Residential hanok alleys. Tourists are only allowed in the core 'red zone' 10:00–17:00. Keep quiet.", ko: "사람이 사는 한옥 골목. 핵심 구역(레드존)은 관광객 10~17시만 출입 가능. 조용히 다녀요." } },
      { id: "changdeokgung", name: { en: "Changdeokgung Palace", ko: "창덕궁" }, area: "A", dur: 80, open: "09:00", close: "17:30", closed: [1],
        tags: { history: 3, calm: 2, nature: 1, photo: 2 },
        desc: { en: "UNESCO palace that follows the hills. The Secret Garden needs a separate guided-tour ticket.", ko: "자연 지형을 살린 유네스코 궁궐. 후원은 별도 해설 관람 예약이 필요해요." } },
      { id: "ikseon", name: { en: "Insadong & Ikseon-dong", ko: "인사동·익선동" }, area: "A", dur: 60, open: "10:00", close: "21:00", closed: [],
        tags: { cafe: 2, art: 2, food: 1, photo: 1 },
        desc: { en: "Craft shops in Insadong, hanok cafés in Ikseon-dong's tiny alleys.", ko: "인사동 공예품 거리와 익선동 한옥 카페 골목." } },
      { id: "gwangjang", name: { en: "Gwangjang Market", ko: "광장시장" }, area: "A", dur: 60, open: "09:00", close: "22:00", closed: [],
        tags: { food: 3 },
        desc: { en: "Seoul's classic food market: mung-bean pancakes, gimbap, yukhoe.", ko: "빈대떡, 마약김밥, 육회로 유명한 서울 대표 먹거리 시장." } },
      { id: "namsan", name: { en: "Namsan & N Seoul Tower", ko: "남산·N서울타워" }, area: "A", dur: 90, open: "10:00", close: "23:00", closed: [], best: "sunset",
        tags: { photo: 3, active: 2, nature: 1 },
        desc: { en: "Walk or take the cable car up for the classic view over Seoul.", ko: "걸어서 또는 케이블카로 올라가 서울 전경을 봐요." } },
      { id: "myeongdong", name: { en: "Myeongdong", ko: "명동" }, area: "A", dur: 60, open: "10:00", close: "22:00", closed: [], best: "night",
        tags: { food: 2, photo: 1 },
        desc: { en: "Cosmetics shops by day, street-food stalls in the evening.", ko: "낮엔 화장품 쇼핑, 저녁엔 길거리 음식 노점." } },
      { id: "deoksugung", name: { en: "Deoksugung & stone-wall road", ko: "덕수궁·돌담길" }, area: "A", dur: 50, open: "09:00", close: "21:00", closed: [1],
        tags: { history: 2, calm: 2, photo: 2 },
        desc: { en: "Palace with Western-style halls downtown; the wall road is lovely in autumn.", ko: "도심 속 서양식 건물이 섞인 궁궐. 가을 돌담길이 예뻐요." } },
      { id: "nmk", name: { en: "National Museum of Korea", ko: "국립중앙박물관" }, area: "B", dur: 120, open: "09:30", close: "17:30", closed: [], closedNth: [{ wd: 1, n: 1, months: [2, 5, 8, 11] }],
        tags: { history: 3, art: 3, calm: 1 },
        desc: { en: "Korea's biggest museum, free. Wed and Sat open until 21:00.", ko: "국내 최대 박물관, 무료. 수·토는 21시까지." } },
      { id: "itaewon", name: { en: "Itaewon & Hannam-dong", ko: "이태원·한남동" }, area: "B", dur: 60, open: "11:00", close: "22:00", closed: [],
        tags: { cafe: 2, food: 2, art: 1 },
        desc: { en: "International food street and design shops.", ko: "세계 음식 거리와 디자인 편집숍." } },
      { id: "hongdae", name: { en: "Hongdae & Yeonnam-dong", ko: "홍대·연남동" }, area: "C", dur: 90, open: "11:00", close: "23:00", closed: [], best: "night",
        tags: { cafe: 2, food: 2, photo: 1, active: 1 },
        desc: { en: "Busking, indie shops and the Gyeongui Line Forest Park in Yeonnam.", ko: "버스킹, 인디 숍, 연남동 경의선숲길." } },
      { id: "mangwon", name: { en: "Mangwon Market & Hangang Park", ko: "망원시장·망원한강공원" }, area: "C", dur: 60, open: "10:00", close: "20:00", closed: [],
        tags: { food: 2, calm: 1, nature: 1 },
        desc: { en: "Cheap market snacks, then eat by the river.", ko: "시장에서 간식 사서 한강에서 먹기." } },
      { id: "seongsu", name: { en: "Seongsu & Seoul Forest", ko: "성수동·서울숲" }, area: "D", dur: 90, open: "11:00", close: "21:00", closed: [],
        tags: { cafe: 3, art: 1, nature: 1, photo: 1 },
        desc: { en: "Factory-turned cafés and pop-up stores, next to a big city park.", ko: "공장을 고친 카페와 팝업스토어, 그리고 서울숲." } },
      { id: "achasan", name: { en: "Achasan trail", ko: "아차산" }, area: "D", dur: 90, open: "06:00", close: "18:00", closed: [], best: "morning",
        tags: { active: 3, nature: 2, photo: 1 },
        desc: { en: "Easy hike with a view over the Han River and Lotte Tower.", ko: "한강과 롯데타워가 보이는 쉬운 등산로." } },
      { id: "coex", name: { en: "Starfield Library & Bongeunsa", ko: "별마당도서관·봉은사" }, area: "E", dur: 70, open: "10:00", close: "22:00", closed: [],
        tags: { art: 2, photo: 2, calm: 1, history: 1 },
        desc: { en: "Giant bookshelves in COEX mall, then a 1,200-year-old temple across the road.", ko: "코엑스 대형 책장 도서관과 길 건너 천년 고찰 봉은사." } },
      { id: "lotte", name: { en: "Lotte World Tower & Seokchon Lake", ko: "롯데월드타워·석촌호수" }, area: "E", dur: 90, open: "10:30", close: "22:00", closed: [], best: "sunset",
        tags: { photo: 3, nature: 1 },
        desc: { en: "Seoul Sky observatory on the 117th–123rd floors, lake walk below.", ko: "117~123층 서울스카이 전망대와 석촌호수 산책." } },
      { id: "yeouido", name: { en: "Yeouido Hangang Park", ko: "여의도한강공원" }, area: "F", dur: 60, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { nature: 2, calm: 2, active: 1 },
        desc: { en: "Rent a bike or order chicken to the riverside like locals do.", ko: "자전거를 빌리거나 치킨을 시켜 강변에서 먹어요." } },
      { id: "thehyundai", name: { en: "The Hyundai Seoul", ko: "더현대 서울" }, area: "F", dur: 60, open: "10:30", close: "20:00", closed: [],
        tags: { cafe: 1, food: 1, art: 1 },
        desc: { en: "Department store with an indoor garden and pop-ups.", ko: "실내 정원과 팝업이 있는 백화점." } },
      { id: "seodaemun", name: { en: "Seodaemun Prison History Hall", ko: "서대문형무소역사관" }, area: "G", dur: 60, open: "09:30", close: "18:00", closed: [1],
        tags: { history: 3 },
        desc: { en: "Colonial-era prison where independence activists were held.", ko: "독립운동가들이 갇혔던 일제강점기 형무소." } }
    ],
    meals: [
      { en: "Korean BBQ (samgyeopsal)", ko: "삼겹살 구이", spice: 0, area: "A" },
      { en: "Mung-bean pancake & makgeolli", ko: "빈대떡과 막걸리", spice: 0, area: "A" },
      { en: "Seolleongtang (ox-bone soup)", ko: "설렁탕", spice: 0, area: "A" },
      { en: "Tteokbokki & street snacks", ko: "떡볶이와 분식", spice: 2, area: "C" },
      { en: "Fried chicken & beer (chimaek)", ko: "치킨과 맥주", spice: 0, area: "F" },
      { en: "Kimchi jjigae set", ko: "김치찌개 백반", spice: 1, area: "D" }
    ],
    tips: {
      en: ["Gyeongbokgung closes on Tuesdays; Changdeokgung, Deoksugung and Seodaemun Prison close on Mondays.", "Bukchon's core alleys are open to tourists only 10:00–17:00.", "Get a T-money card at any convenience store for subway and buses."],
      ko: ["경복궁은 화요일, 창덕궁·덕수궁·서대문형무소역사관은 월요일 휴무예요.", "북촌 핵심 골목은 관광객 10~17시만 출입할 수 있어요.", "편의점에서 티머니 카드를 사면 지하철·버스를 편하게 탈 수 있어요."]
    }
  },
  {
    id: "busan",
    name: { en: "Busan", ko: "부산" },
    emoji: "🌊",
    tagline: {
      en: "Beaches, hillside villages, seafood markets and bridges lit up at night.",
      ko: "해변, 산동네, 수산시장, 그리고 불 켜진 다리."
    },
    from: { daejeon: [180, 100], seoul: [300, 170], incheon: [330, 230], local: [0, 0] },
    nearby: ["gyeongju"],
    transitFactor: 1.3,
    // A 남포·중구 / B 감천·사하 / C 해운대 / D 광안리 / E 기장 / F 영도
    areaTime: { "A-B": 15, "A-C": 35, "A-D": 25, "A-E": 50, "A-F": 15, "B-C": 45, "B-D": 35, "B-E": 60, "B-F": 25, "C-D": 15, "C-E": 20, "C-F": 40, "D-E": 30, "D-F": 30, "E-F": 55 },
    themes: [
      { id: "beach", en: "Beaches & ocean views", ko: "해변과 바다 전망" },
      { id: "village", en: "Hillside villages", ko: "산복도로 마을" },
      { id: "seafood", en: "Seafood & markets", ko: "해산물과 시장" },
      { id: "night", en: "Night views & bridges", ko: "야경과 다리" }
    ],
    spots: [
      { id: "gamcheon", name: { en: "Gamcheon Culture Village", ko: "감천문화마을" }, area: "B", dur: 75, open: "09:00", close: "18:00", closed: [],
        tags: { photo: 3, art: 2, active: 1 },
        desc: { en: "Pastel houses stacked up the hill, with murals and small galleries.", ko: "언덕을 따라 쌓인 파스텔 집과 벽화, 작은 갤러리." } },
      { id: "jagalchi", name: { en: "Jagalchi Fish Market", ko: "자갈치시장" }, area: "A", dur: 50, open: "08:00", close: "21:00", closed: [],
        tags: { food: 3 },
        desc: { en: "Korea's biggest seafood market. Pick fish downstairs, eat it upstairs.", ko: "국내 최대 수산시장. 1층에서 고르고 2층에서 먹어요." } },
      { id: "biff", name: { en: "BIFF Square & Gukje Market", ko: "BIFF광장·국제시장" }, area: "A", dur: 60, open: "10:00", close: "21:00", closed: [],
        tags: { food: 3, history: 1 },
        desc: { en: "Street food alley (try ssiat hotteok) and the old wartime market.", ko: "씨앗호떡 거리와 피란 시절부터 이어진 국제시장." } },
      { id: "huinnyeoul", name: { en: "Huinnyeoul Culture Village", ko: "흰여울문화마을" }, area: "F", dur: 60, open: "09:00", close: "18:00", closed: [], best: "sunset",
        tags: { photo: 3, calm: 2, nature: 1 },
        desc: { en: "Cliffside village on Yeongdo with sea views and a coastal path.", ko: "영도 절벽 위 마을, 바다를 따라 걷는 해안 산책로." } },
      { id: "taejongdae", name: { en: "Taejongdae", ko: "태종대" }, area: "F", dur: 90, open: "04:00", close: "24:00", closed: [],
        tags: { nature: 3, active: 2, photo: 2 },
        desc: { en: "Forested cape with cliffs and a lighthouse; a road train circles it.", ko: "절벽과 등대가 있는 숲길 해안. 다누비 열차로 돌 수 있어요." } },
      { id: "haeundae", name: { en: "Haeundae Beach & Dongbaekseom", ko: "해운대·동백섬" }, area: "C", dur: 75, open: "00:00", close: "23:59", closed: [],
        tags: { nature: 2, active: 1, photo: 2 },
        desc: { en: "Busan's famous beach and a pine-covered island walk next to it.", ko: "부산 대표 해변과 옆 동백섬 산책로." } },
      { id: "skycapsule", name: { en: "Haeundae Blueline Park", ko: "해운대 블루라인파크" }, area: "C", dur: 70, open: "09:30", close: "19:00", closed: [],
        tags: { photo: 3, calm: 1, nature: 1 },
        desc: { en: "Coastal beach train and colourful sky capsules from Mipo to Cheongsapo.", ko: "미포~청사포 해변열차와 스카이캡슐." } },
      { id: "yonggungsa", name: { en: "Haedong Yonggungsa", ko: "해동용궁사" }, area: "E", dur: 60, open: "05:00", close: "19:00", closed: [], best: "morning",
        tags: { history: 2, photo: 3, calm: 1 },
        desc: { en: "Temple built right on the seaside rocks.", ko: "바닷가 바위 위에 지은 사찰." } },
      { id: "gwangalli", name: { en: "Gwangalli Beach", ko: "광안리해수욕장" }, area: "D", dur: 60, open: "00:00", close: "23:59", closed: [], best: "night",
        tags: { photo: 3, food: 1, cafe: 1 },
        desc: { en: "Watch Gwangan Bridge light up from the beach cafés and bars.", ko: "해변 카페에서 불 켜진 광안대교 감상." } },
      { id: "songdocable", name: { en: "Songdo Beach & Sea Cable Car", ko: "송도해수욕장·해상케이블카" }, area: "B", dur: 60, open: "09:00", close: "21:00", closed: [],
        tags: { photo: 2, nature: 1 },
        desc: { en: "Cable car over the sea and a cloud-shaped skywalk.", ko: "바다 위 케이블카와 구름산책로." } }
    ],
    meals: [
      { en: "Dwaeji gukbap (pork soup with rice)", ko: "돼지국밥", spice: 0, area: "A" },
      { en: "Milmyeon (Busan cold wheat noodles)", ko: "밀면", spice: 1, area: "A" },
      { en: "Raw fish at the market", ko: "시장 회", spice: 0, area: "A" },
      { en: "Eomuk (fishcake) & ssiat hotteok", ko: "어묵과 씨앗호떡", spice: 0, area: "A" },
      { en: "Spicy grilled eel or nakgopsae", ko: "낙곱새", spice: 2, area: "D" }
    ],
    tips: {
      en: ["Busan is big: group your day by area (Nampo + Yeongdo, or Haeundae + Gijang).", "Gamcheon has many stairs; wear comfortable shoes."],
      ko: ["부산은 넓어서 남포+영도, 해운대+기장처럼 권역으로 묶는 게 좋아요.", "감천문화마을은 계단이 많으니 편한 신발을 신으세요."]
    }
  },
  {
    id: "gyeongju",
    name: { en: "Gyeongju", ko: "경주" },
    emoji: "🏛️",
    tagline: {
      en: "Silla's thousand-year capital: royal mounds, temples and glowing ponds at night.",
      ko: "신라 천년의 수도. 왕릉, 사찰, 그리고 밤의 연못."
    },
    from: { daejeon: [160, 100], seoul: [270, 150], incheon: [300, 220], local: [0, 0] },
    nearby: ["busan"],
    transitFactor: 1.6,
    // A 시내 유적지구 / B 불국사·석굴암 / C 보문단지 / D 양동마을
    areaTime: { "A-B": 25, "A-C": 15, "A-D": 30, "B-C": 15, "B-D": 45, "C-D": 35 },
    themes: [
      { id: "silla", en: "Silla history", ko: "신라 역사" },
      { id: "night", en: "Night views", ko: "야경" },
      { id: "hwangni", en: "Hwangnidan-gil cafés", ko: "황리단길 카페" },
      { id: "temple", en: "Temples & quiet walks", ko: "사찰과 산책" }
    ],
    spots: [
      { id: "daereungwon", name: { en: "Daereungwon Tomb Complex", ko: "대릉원" }, area: "A", dur: 60, open: "09:00", close: "22:00", closed: [],
        tags: { history: 3, calm: 2, photo: 2 },
        desc: { en: "Huge grassy royal mounds; go inside Cheonmachong tomb.", ko: "거대한 신라 왕릉들. 천마총 내부를 볼 수 있어요." } },
      { id: "cheomseongdae", name: { en: "Cheomseongdae Observatory", ko: "첨성대" }, area: "A", dur: 30, open: "00:00", close: "23:59", closed: [],
        tags: { history: 2, photo: 2 },
        desc: { en: "Asia's oldest surviving observatory, in open fields. Free.", ko: "현존하는 동양에서 가장 오래된 천문대. 무료." } },
      { id: "wolji", name: { en: "Donggung Palace & Wolji Pond", ko: "동궁과 월지" }, area: "A", dur: 60, open: "09:00", close: "22:00", closed: [], best: "night",
        tags: { history: 2, photo: 3, calm: 1 },
        desc: { en: "Reconstructed palace pavilions reflected in the pond; best after dark.", ko: "연못에 비친 누각. 해가 진 뒤가 가장 아름다워요." } },
      { id: "gjmuseum", name: { en: "Gyeongju National Museum", ko: "국립경주박물관" }, area: "A", dur: 90, open: "10:00", close: "18:00", closed: [],
        tags: { history: 3, art: 2 },
        desc: { en: "Silla gold crowns and the Divine Bell of King Seongdeok. Free.", ko: "신라 금관과 성덕대왕신종. 무료." } },
      { id: "hwangnidan", name: { en: "Hwangnidan-gil", ko: "황리단길" }, area: "A", dur: 60, open: "10:00", close: "21:00", closed: [],
        tags: { cafe: 3, food: 2, photo: 1 },
        desc: { en: "Hanok cafés, bakeries and small shops next to the tombs.", ko: "왕릉 옆 한옥 카페, 빵집, 소품샵 거리." } },
      { id: "woljeonggyo", name: { en: "Woljeonggyo Bridge", ko: "월정교" }, area: "A", dur: 30, open: "00:00", close: "23:59", closed: [], best: "night",
        tags: { photo: 3, history: 1 },
        desc: { en: "Restored Silla wooden bridge, lit up at night.", ko: "복원된 신라 목조 다리. 밤 조명이 예뻐요." } },
      { id: "bulguksa", name: { en: "Bulguksa Temple", ko: "불국사" }, area: "B", dur: 90, open: "09:00", close: "18:00", closed: [], best: "morning",
        tags: { history: 3, calm: 2, photo: 2 },
        desc: { en: "UNESCO temple with stone stairways and two famous pagodas. Free.", ko: "돌계단과 다보탑·석가탑이 있는 유네스코 사찰. 무료." } },
      { id: "seokguram", name: { en: "Seokguram Grotto", ko: "석굴암" }, area: "B", dur: 50, open: "09:00", close: "17:30", closed: [],
        tags: { history: 3, calm: 2, nature: 1 },
        desc: { en: "Granite Buddha in a mountain grotto above Bulguksa; take bus 12.", ko: "불국사 위 산속 석굴의 본존불. 12번 버스로 올라가요." } },
      { id: "bomun", name: { en: "Bomun Lake", ko: "보문호" }, area: "C", dur: 60, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { nature: 2, calm: 2, active: 1 },
        desc: { en: "Lakeside path around the resort area, cherry blossoms in spring.", ko: "리조트 단지를 도는 호숫가 산책로. 봄 벚꽃 명소." } },
      { id: "yangdong", name: { en: "Yangdong Folk Village", ko: "양동마을" }, area: "D", dur: 60, open: "09:00", close: "18:00", closed: [],
        tags: { history: 2, calm: 3, photo: 1 },
        desc: { en: "UNESCO clan village of Joseon nobles, still lived in.", ko: "지금도 사람이 사는 조선 양반 마을. 유네스코 세계유산." } }
    ],
    meals: [
      { en: "Ssambap (lettuce wraps with many sides)", ko: "쌈밥", spice: 1, area: "A" },
      { en: "Hwangnam-ppang (red-bean pastry)", ko: "황남빵", spice: 0, area: "A" },
      { en: "Kalguksu", ko: "칼국수", spice: 0, area: "A" },
      { en: "Hanwoo beef bulgogi", ko: "한우 불고기", spice: 0, area: "C" }
    ],
    tips: {
      en: ["The historic core is walkable or bikeable; rent a bike near Hwangnidan-gil.", "Save Donggung & Wolji for after sunset."],
      ko: ["시내 유적지구는 걷거나 자전거로 다니기 좋아요. 황리단길 근처에서 빌릴 수 있어요.", "동궁과 월지는 해가 진 뒤로 남겨두세요."]
    }
  },
  {
    id: "jeju",
    name: { en: "Jeju", ko: "제주" },
    emoji: "🌋",
    tagline: {
      en: "Volcanic island of craters, black-stone coasts, forests and tangerines.",
      ko: "분화구, 검은 현무암 해안, 숲, 그리고 귤의 섬."
    },
    // From the mainland: flight time + airport transfer. "local" = already on Jeju (e.g. Jeju Airport).
    from: { daejeon: [210, 210], seoul: [150, 150], incheon: [240, 240], local: [0, 0] },
    nearby: [],
    transitFactor: 1.5,
    // A 제주시 / B 동부(성산) / C 서귀포 / D 서부(협재) / E 중산간(한라산·사려니)
    areaTime: { "A-B": 60, "A-C": 55, "A-D": 50, "A-E": 30, "B-C": 50, "B-D": 100, "B-E": 45, "C-D": 45, "C-E": 35, "D-E": 50 },
    themes: [
      { id: "volcano", en: "Volcanic nature", ko: "화산 자연" },
      { id: "beach", en: "Beaches & coast", ko: "해변과 해안" },
      { id: "olle", en: "Olle trails & forests", ko: "올레길과 숲" },
      { id: "food", en: "Black pork & seafood", ko: "흑돼지와 해산물" }
    ],
    spots: [
      { id: "dongmun", name: { en: "Dongmun Market", ko: "동문시장" }, area: "A", dur: 60, open: "08:00", close: "21:00", closed: [], best: "night",
        tags: { food: 3 },
        desc: { en: "Jeju City's market, with a night market for street food.", ko: "제주시 대표 시장. 야시장에서 길거리 음식을 먹어요." } },
      { id: "yongduam", name: { en: "Yongduam Rock & coast road", ko: "용두암·용담해안도로" }, area: "A", dur: 40, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { nature: 1, photo: 2, calm: 1 },
        desc: { en: "Dragon-head rock near the airport and a seaside café road.", ko: "공항 근처 용머리 바위와 바닷가 카페 도로." } },
      { id: "seongsan", name: { en: "Seongsan Ilchulbong", ko: "성산일출봉" }, area: "B", dur: 90, open: "06:00", close: "18:00", closed: [], closedNth: [{ wd: 1, n: 1 }], best: "morning",
        tags: { nature: 3, active: 3, photo: 3 },
        desc: { en: "UNESCO tuff cone; 20–30 minutes of stairs to the crater rim. Closed the 1st Monday of each month.", ko: "유네스코 화산체. 정상까지 계단 20~30분. 매월 첫째 월요일 휴무." } },
      { id: "seopjikoji", name: { en: "Seopjikoji", ko: "섭지코지" }, area: "B", dur: 50, open: "00:00", close: "23:59", closed: [],
        tags: { nature: 2, photo: 2, calm: 1 },
        desc: { en: "Grassy headland with a lighthouse and views of Seongsan.", ko: "등대와 성산일출봉이 보이는 초원 해안." } },
      { id: "udo", name: { en: "Udo Island", ko: "우도" }, area: "B", dur: 180, open: "08:00", close: "17:00", closed: [],
        tags: { nature: 2, photo: 2, calm: 2, active: 1 },
        desc: { en: "15-minute ferry from Seongsan; white-sand beaches and peanut ice cream. Ferries depend on weather.", ko: "성산에서 배로 15분. 하얀 모래 해변과 땅콩아이스크림. 날씨에 따라 운항이 바뀌어요." } },
      { id: "cheonjiyeon", name: { en: "Cheonjiyeon Waterfall", ko: "천지연폭포" }, area: "C", dur: 40, open: "09:00", close: "22:00", closed: [], best: "night",
        tags: { nature: 2, calm: 2 },
        desc: { en: "Short forest walk to a waterfall, lit up in the evening.", ko: "숲길 끝의 폭포. 저녁엔 조명이 켜져요." } },
      { id: "jusangjeolli", name: { en: "Jusangjeolli Cliff", ko: "주상절리대" }, area: "C", dur: 40, open: "09:00", close: "18:00", closed: [],
        tags: { nature: 2, photo: 2 },
        desc: { en: "Hexagonal basalt columns where the waves crash.", ko: "파도가 부딪히는 육각형 현무암 기둥." } },
      { id: "oedolgae", name: { en: "Oedolgae & Olle Route 7", ko: "외돌개·올레 7코스" }, area: "C", dur: 70, open: "00:00", close: "23:59", closed: [],
        tags: { active: 2, nature: 2, photo: 2 },
        desc: { en: "A lone sea stack and a section of Jeju's famous coastal walking trail.", ko: "바다 위 외돌개 바위와 올레길 해안 구간." } },
      { id: "hyeopjae", name: { en: "Hyeopjae Beach", ko: "협재해수욕장" }, area: "D", dur: 60, open: "00:00", close: "23:59", closed: [], best: "sunset",
        tags: { nature: 2, photo: 2, calm: 2 },
        desc: { en: "Emerald water facing Biyangdo island; great at sunset.", ko: "비양도를 마주한 에메랄드빛 바다. 노을 명소." } },
      { id: "osulloc", name: { en: "O'sulloc Tea Museum", ko: "오설록 티뮤지엄" }, area: "D", dur: 60, open: "09:00", close: "18:00", closed: [],
        tags: { cafe: 3, calm: 1, nature: 1 },
        desc: { en: "Green-tea fields and a café famous for matcha desserts.", ko: "녹차밭과 말차 디저트로 유명한 카페." } },
      { id: "saryeoni", name: { en: "Saryeoni Forest Path", ko: "사려니숲길" }, area: "E", dur: 75, open: "09:00", close: "17:00", closed: [],
        tags: { nature: 3, calm: 2, active: 1 },
        desc: { en: "Cedar forest trail in the island's highlands.", ko: "중산간의 삼나무 숲길." } },
      { id: "eorimok", name: { en: "Hallasan Eorimok Trail (to Witse-oreum)", ko: "한라산 어리목 탐방로 (윗세오름)" }, area: "E", dur: 210, open: "06:00", close: "16:00", closed: [], best: "morning",
        tags: { active: 3, nature: 3, photo: 2 },
        desc: { en: "Half-day hike up Hallasan without a summit reservation. Start early.", ko: "정상 예약 없이 가는 한라산 반나절 코스. 일찍 출발하세요." } }
    ],
    meals: [
      { en: "Jeju black-pork BBQ", ko: "흑돼지 구이", spice: 0, area: "A" },
      { en: "Gogi-guksu (pork noodle soup)", ko: "고기국수", spice: 0, area: "A" },
      { en: "Abalone porridge", ko: "전복죽", spice: 0, area: "B" },
      { en: "Braised hairtail (galchi jorim)", ko: "갈치조림", spice: 2, area: "C" },
      { en: "Seafood ramyeon by the sea", ko: "해물라면", spice: 1, area: "B" }
    ],
    tips: {
      en: ["Jeju is big and buses are slow: stick to one or two areas per day.", "Seongsan Ilchulbong closes on the 1st Monday of each month.", "A car saves a lot of time; switch the plan to 'Car' if you rent one."],
      ko: ["제주는 넓고 버스가 느려서 하루에 한두 권역만 도는 게 좋아요.", "성산일출봉은 매월 첫째 월요일 휴무예요.", "렌터카가 있으면 훨씬 빨라요. 빌린다면 이동 수단을 '자차'로 바꾸세요."]
    }
  },
  {
    id: "gangneung",
    name: { en: "Gangneung", ko: "강릉" },
    emoji: "☕",
    tagline: {
      en: "Coffee by the East Sea, Joseon heritage, tofu village and sunrise beaches.",
      ko: "동해 바다 커피, 조선 유산, 초당 두부, 해돋이 해변."
    },
    from: { daejeon: [200, 220], seoul: [150, 120], incheon: [180, 170], local: [0, 0] },
    nearby: [],
    transitFactor: 1.6,
    // A 시내 / B 경포 / C 안목 / D 주문진 / E 정동진
    areaTime: { "A-B": 15, "A-C": 15, "A-D": 30, "A-E": 30, "B-C": 15, "B-D": 25, "B-E": 40, "C-D": 35, "C-E": 35, "D-E": 55 },
    themes: [
      { id: "coffee", en: "Coffee & the sea", ko: "커피와 바다" },
      { id: "beach", en: "Beaches & sunrise", ko: "해변과 일출" },
      { id: "joseon", en: "Joseon heritage", ko: "조선 유산" },
      { id: "seafood", en: "Seafood & tofu", ko: "해산물과 두부" }
    ],
    spots: [
      { id: "anmok", name: { en: "Anmok Coffee Street", ko: "안목해변 커피거리" }, area: "C", dur: 60, open: "09:00", close: "22:00", closed: [],
        tags: { cafe: 3, nature: 1, photo: 1 },
        desc: { en: "A beach lined with cafés; grab a window seat facing the sea.", ko: "카페가 줄지어 선 해변. 바다 쪽 창가 자리를 잡아요." } },
      { id: "gyeongpo", name: { en: "Gyeongpo Beach & Lake", ko: "경포해변·경포호" }, area: "B", dur: 60, open: "00:00", close: "23:59", closed: [], best: "morning",
        tags: { nature: 2, calm: 2, active: 1 },
        desc: { en: "Long beach and a lake path, popular for sunrise.", ko: "긴 해변과 호수 산책로. 해돋이 명소." } },
      { id: "gyeongpodae", name: { en: "Gyeongpodae Pavilion", ko: "경포대" }, area: "B", dur: 30, open: "09:00", close: "18:00", closed: [],
        tags: { history: 1, calm: 2, photo: 1 },
        desc: { en: "Joseon pavilion overlooking the lake.", ko: "호수를 내려다보는 조선 누각." } },
      { id: "ojukheon", name: { en: "Ojukheon", ko: "오죽헌" }, area: "A", dur: 60, open: "09:00", close: "18:00", closed: [],
        tags: { history: 3, calm: 1 },
        desc: { en: "Birthplace of scholar Yulgok, surrounded by black bamboo. Last entry 17:00.", ko: "율곡 이이가 태어난 곳, 검은 대나무 정원. 입장 마감 17시." } },
      { id: "seongyojang", name: { en: "Seongyojang House", ko: "선교장" }, area: "A", dur: 50, open: "09:00", close: "18:00", closed: [],
        tags: { history: 2, calm: 2, photo: 1 },
        desc: { en: "300-year-old aristocrat's estate with a lotus-pond pavilion.", ko: "연못 정자가 있는 300년 된 양반 가옥." } },
      { id: "jungangmarket", name: { en: "Jungang Market & Wolhwa Street", ko: "중앙시장·월화거리" }, area: "A", dur: 60, open: "09:00", close: "21:00", closed: [], best: "night",
        tags: { food: 3 },
        desc: { en: "Squid sundae, fried chicken and street snacks; night market at Wolhwa Street.", ko: "오징어순대, 닭강정 등 시장 먹거리와 월화거리 야시장." } },
      { id: "jumunjin", name: { en: "Jumunjin Breakwater & Fish Market", ko: "주문진 방파제·수산시장" }, area: "D", dur: 50, open: "08:00", close: "20:00", closed: [],
        tags: { photo: 2, food: 2 },
        desc: { en: "The 'Goblin' drama breakwater and a busy seafood market.", ko: "드라마 〈도깨비〉 방파제와 활기찬 수산시장." } },
      { id: "jeongdongjin", name: { en: "Jeongdongjin", ko: "정동진" }, area: "E", dur: 60, open: "00:00", close: "23:59", closed: [], best: "morning",
        tags: { nature: 2, photo: 2 },
        desc: { en: "Beach right next to the train station, a famous sunrise spot.", ko: "기차역 바로 앞 해변. 해돋이 명소." } },
      { id: "haslla", name: { en: "Haslla Art World", ko: "하슬라아트월드" }, area: "E", dur: 90, open: "09:00", close: "18:00", closed: [],
        tags: { art: 3, photo: 2, nature: 1 },
        desc: { en: "Sculpture park and museum on a cliff above the sea.", ko: "바다 위 언덕의 조각공원과 미술관." } }
    ],
    meals: [
      { en: "Chodang sundubu (soft tofu)", ko: "초당순두부", spice: 0, area: "B" },
      { en: "Jjamppong sundubu (spicy tofu stew)", ko: "짬뽕순두부", spice: 2, area: "B" },
      { en: "Jang kalguksu (pepper-paste noodles)", ko: "장칼국수", spice: 2, area: "A" },
      { en: "Fresh seafood & raw fish", ko: "해산물과 회", spice: 0, area: "D" },
      { en: "Squid sundae", ko: "오징어순대", spice: 0, area: "A" }
    ],
    tips: {
      en: ["KTX from Seoul Station takes about 2 hours.", "For sunrise, stay overnight near Gyeongpo or Jeongdongjin."],
      ko: ["서울역에서 KTX로 약 2시간이에요.", "해돋이를 보려면 경포나 정동진 근처에서 1박하세요."]
    }
  }
];
