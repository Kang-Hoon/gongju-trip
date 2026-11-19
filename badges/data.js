// 59 badges: Seoul's 10 districts + 49 destinations.
// r = region, t = badge title, d = what to do there, icon = key in ICONS, c = frame colour, plan = K-Trip Planner city id
window.REGIONS = [
  { id: "seoul", ko: "서울", en: "Seoul" },
  { id: "capital", ko: "수도권", en: "Capital area" },
  { id: "gangwon", ko: "강원", en: "Gangwon" },
  { id: "chungcheong", ko: "충청", en: "Chungcheong" },
  { id: "jeolla", ko: "전라", en: "Jeolla" },
  { id: "gyeongsang", ko: "경상", en: "Gyeongsang" },
  { id: "island", ko: "섬", en: "Islands" }
];

window.BADGES = [
  // ---- Seoul ----
  { id: "jongno", r: "seoul", ko: "종로구", en: "Jongno", icon: "palace", c: "#7A2E2E", plan: "seoul",
    t: { ko: "궁궐 산책자", en: "Palace Stroller" }, d: { ko: "경복궁, 북촌한옥마을, 익선동, 광장시장", en: "Gyeongbokgung, Bukchon, Ikseon-dong, Gwangjang Market" } },
  { id: "junggu", r: "seoul", ko: "중구", en: "Jung-gu", icon: "tower", c: "#1F4E79", plan: "seoul",
    t: { ko: "남산 정복", en: "Namsan Climber" }, d: { ko: "N서울타워, 명동, 덕수궁 돌담길, DDP", en: "N Seoul Tower, Myeongdong, Deoksugung wall road, DDP" } },
  { id: "yongsan", r: "seoul", ko: "용산구", en: "Yongsan", icon: "museum", c: "#5B4A8B", plan: "seoul",
    t: { ko: "용산 탐험가", en: "Yongsan Explorer" }, d: { ko: "국립중앙박물관, 이태원·한남동, 해방촌", en: "National Museum of Korea, Itaewon & Hannam, Haebangchon" } },
  { id: "mapo", r: "seoul", ko: "마포구", en: "Mapo", icon: "guitar", c: "#B8336A", plan: "seoul",
    t: { ko: "홍대 인디", en: "Hongdae Indie" }, d: { ko: "홍대, 연남동 경의선숲길, 망원시장", en: "Hongdae, Yeonnam forest path, Mangwon Market" } },
  { id: "seongdong", r: "seoul", ko: "성동구", en: "Seongdong", icon: "tree", c: "#2F5D46", plan: "seoul",
    t: { ko: "성수 힙스터", en: "Seongsu Hipster" }, d: { ko: "성수 카페거리, 서울숲, 연무장길", en: "Seongsu cafés, Seoul Forest, Yeonmujang-gil" } },
  { id: "gangnam", r: "seoul", ko: "강남구", en: "Gangnam", icon: "diamond", c: "#1B6F8A", plan: "seoul",
    t: { ko: "강남 스타일", en: "Gangnam Style" }, d: { ko: "코엑스 별마당도서관, 봉은사, 가로수길", en: "Starfield Library, Bongeunsa, Garosu-gil" } },
  { id: "songpa", r: "seoul", ko: "송파구", en: "Songpa", icon: "skyscraper", c: "#3D3D3A", plan: "seoul",
    t: { ko: "잠실 타워", en: "Tower Topper" }, d: { ko: "롯데월드타워 서울스카이, 석촌호수", en: "Lotte World Tower Seoul Sky, Seokchon Lake" } },
  { id: "yeongdeungpo", r: "seoul", ko: "영등포구", en: "Yeongdeungpo", icon: "bridge", c: "#C26A1E", plan: "seoul",
    t: { ko: "여의도 한강", en: "Han River Chiller" }, d: { ko: "여의도한강공원, 더현대 서울, 63빌딩", en: "Yeouido Hangang Park, The Hyundai Seoul, 63 Building" } },
  { id: "seodaemun", r: "seoul", ko: "서대문구", en: "Seodaemun", icon: "book", c: "#7B5A2B", plan: "seoul",
    t: { ko: "신촌 청춘", en: "Sinchon Student" }, d: { ko: "신촌·이대 거리, 서대문형무소역사관, 안산자락길", en: "Sinchon & Ewha streets, Seodaemun Prison History Hall, Ansan trail" } },
  { id: "gwangjin", r: "seoul", ko: "광진구", en: "Gwangjin", icon: "sunrise", c: "#A13C2F", plan: "seoul",
    t: { ko: "아차산 일출", en: "Achasan Sunrise" }, d: { ko: "아차산, 뚝섬한강공원, 건대 맛의거리", en: "Achasan, Ttukseom Hangang Park, Konkuk food street" } },

  // ---- Capital area ----
  { id: "incheon", r: "capital", ko: "인천", en: "Incheon", icon: "redgate", c: "#B03A2E",
    t: { ko: "개항장 산책", en: "Port City Walker" }, d: { ko: "차이나타운, 개항장 거리, 월미도, 송도 야경", en: "Chinatown, open-port streets, Wolmido, Songdo at night" } },
  { id: "suwon", r: "capital", ko: "수원", en: "Suwon", icon: "gate", c: "#5A3A2A",
    t: { ko: "화성 성곽 지킴이", en: "Fortress Guard" }, d: { ko: "수원화성 성곽길, 행궁동, 통닭거리", en: "Hwaseong Fortress walls, Haenggung-dong, fried chicken street" } },
  { id: "ganghwa", r: "capital", ko: "강화도", en: "Ganghwa", icon: "dolmen", c: "#6F6A60",
    t: { ko: "고인돌 탐험가", en: "Dolmen Hunter" }, d: { ko: "강화 고인돌, 전등사, 갯벌 노을", en: "Ganghwa dolmens, Jeondeungsa, tidal-flat sunset" } },
  { id: "paju", r: "capital", ko: "파주", en: "Paju", icon: "fence", c: "#4A4A45",
    t: { ko: "DMZ 방문자", en: "DMZ Visitor" }, d: { ko: "임진각, DMZ 투어, 헤이리 예술마을", en: "Imjingak, DMZ tour, Heyri Art Village" } },

  // ---- Gangwon ----
  { id: "gangneung", r: "gangwon", ko: "강릉", en: "Gangneung", icon: "cup", c: "#6B4226", plan: "gangneung",
    t: { ko: "바다 커피 한 잔", en: "Coffee by the Sea" }, d: { ko: "안목해변 카페거리, 경포대, 오죽헌", en: "Anmok coffee street, Gyeongpodae, Ojukheon" } },
  { id: "sokcho", r: "gangwon", ko: "속초·설악산", en: "Sokcho & Seoraksan", icon: "snowpeak", c: "#2E3E4E",
    t: { ko: "설악의 정상", en: "Seorak Summit" }, d: { ko: "설악산 케이블카, 울산바위, 중앙시장", en: "Seoraksan cable car, Ulsanbawi, Jungang Market" } },
  { id: "chuncheon", r: "gangwon", ko: "춘천·가평", en: "Chuncheon & Gapyeong", icon: "boat", c: "#2E5A8A",
    t: { ko: "호반의 여행자", en: "Lakeside Drifter" }, d: { ko: "남이섬, 소양강 스카이워크, 닭갈비", en: "Nami Island, Soyang River skywalk, dakgalbi" } },
  { id: "pyeongchang", r: "gangwon", ko: "평창·정선", en: "Pyeongchang & Jeongseon", icon: "sheep", c: "#4E7A2E",
    t: { ko: "대관령 목동", en: "Mountain Shepherd" }, d: { ko: "대관령 양떼목장, 정선 5일장, 레일바이크", en: "Daegwallyeong sheep farm, Jeongseon market, rail bike" } },
  { id: "yeongwol", r: "gangwon", ko: "영월", en: "Yeongwol", icon: "stars", c: "#2A2F5A",
    t: { ko: "별 헤는 밤", en: "Stargazer" }, d: { ko: "한반도 지형, 청령포, 별마로천문대", en: "Korean-peninsula river bend, Cheongnyeongpo, Byeolmaro Observatory" } },
  { id: "yangyang", r: "gangwon", ko: "양양", en: "Yangyang", icon: "surf", c: "#1E6A9A",
    t: { ko: "동해 서퍼", en: "East Sea Surfer" }, d: { ko: "서피비치, 죽도해변, 낙산사 일출", en: "Surfyy Beach, Jukdo Beach, Naksansa sunrise" } },
  { id: "samcheok", r: "gangwon", ko: "삼척", en: "Samcheok", icon: "cablecar", c: "#8A2E2E",
    t: { ko: "바다 위 케이블카", en: "Sea Cable Rider" }, d: { ko: "해상케이블카, 바다 출렁다리, 환선굴", en: "Sea cable car, ocean suspension bridge, Hwanseongul Cave" } },
  { id: "inje", r: "gangwon", ko: "인제", en: "Inje", icon: "birch", c: "#5A6A4A",
    t: { ko: "자작나무 숲길", en: "Birch Forest Walker" }, d: { ko: "원대리 자작나무숲, 내린천", en: "Wondae-ri birch forest, Naerincheon" } },

  // ---- Chungcheong ----
  { id: "danyang", r: "chungcheong", ko: "단양", en: "Danyang", icon: "rocks3", c: "#3D6A5A",
    t: { ko: "도담삼봉 비행사", en: "Danyang Flyer" }, d: { ko: "도담삼봉, 만천하스카이워크, 패러글라이딩", en: "Dodamsambong, Mancheonha Skywalk, paragliding" } },
  { id: "gongjubuyeo", r: "chungcheong", ko: "공주·부여", en: "Gongju & Buyeo", icon: "wall", c: "#7A5A3A", plan: "gongju",
    t: { ko: "백제 왕도 순례", en: "Baekje Pilgrim" }, d: { ko: "공산성, 무령왕릉, 부소산성, 궁남지", en: "Gongsanseong, King Muryeong's Tombs, Busosanseong, Gungnamji" } },
  { id: "taean", r: "chungcheong", ko: "태안", en: "Taean", icon: "sunset", c: "#C2561E",
    t: { ko: "서해 노을 사냥꾼", en: "Sunset Chaser" }, d: { ko: "꽃지해변 노을, 천리포수목원", en: "Kkotji Beach sunset, Chollipo Arboretum" } },
  { id: "boryeong", r: "chungcheong", ko: "보령", en: "Boryeong", icon: "umbrella", c: "#8A5A2E",
    t: { ko: "머드 파이터", en: "Mud Fighter" }, d: { ko: "대천해수욕장, 머드축제, 조개구이", en: "Daecheon Beach, Mud Festival, grilled clams" } },
  { id: "daejeon", r: "chungcheong", ko: "대전", en: "Daejeon", icon: "bread", c: "#9A6A2E", plan: "daejeon",
    t: { ko: "빵지순례자", en: "Bread Pilgrim" }, d: { ko: "성심당, 장태산 휴양림, 유성온천 족욕", en: "Sungsimdang, Jangtaesan forest, Yuseong footbath" } },
  { id: "jecheon", r: "chungcheong", ko: "제천", en: "Jecheon", icon: "lake", c: "#2E6A7A",
    t: { ko: "청풍호 유람객", en: "Lake Wanderer" }, d: { ko: "청풍호반 케이블카, 의림지, 옥순봉 출렁다리", en: "Cheongpung cable car, Uirimji, Oksunbong bridge" } },

  // ---- Jeolla ----
  { id: "jeonju", r: "jeolla", ko: "전주", en: "Jeonju", icon: "hanok", c: "#4A3A2A", plan: "jeonju",
    t: { ko: "한옥 지붕 아래", en: "Under Hanok Roofs" }, d: { ko: "한옥마을, 경기전, 비빔밥, 막걸리집", en: "Hanok Village, Gyeonggijeon, bibimbap, makgeolli house" } },
  { id: "yeosu", r: "jeolla", ko: "여수", en: "Yeosu", icon: "nightbridge", c: "#1E2F5A",
    t: { ko: "여수 밤바다", en: "Yeosu Night Sea" }, d: { ko: "해상케이블카, 돌산대교 야경, 낭만포차", en: "Sea cable car, Dolsan Bridge at night, harbour food tents" } },
  { id: "suncheon", r: "jeolla", ko: "순천", en: "Suncheon", icon: "reeds", c: "#8A6A2E",
    t: { ko: "갈대밭의 노을", en: "Reed Field Dreamer" }, d: { ko: "순천만 갈대밭, 국가정원, 낙안읍성", en: "Suncheon Bay reeds, National Garden, Naganeupseong" } },
  { id: "damyang", r: "jeolla", ko: "담양", en: "Damyang", icon: "bamboo", c: "#256B36",
    t: { ko: "대숲 바람", en: "Bamboo Breeze" }, d: { ko: "죽녹원, 메타세쿼이아길, 떡갈비", en: "Juknokwon, Metasequoia Road, tteokgalbi" } },
  { id: "mokpo", r: "jeolla", ko: "목포", en: "Mokpo", icon: "lighthouse", c: "#2E4E7A",
    t: { ko: "항구의 낭만", en: "Harbour Romantic" }, d: { ko: "근대역사거리, 유달산, 해상케이블카", en: "Modern history street, Yudalsan, sea cable car" } },
  { id: "gunsan", r: "jeolla", ko: "군산", en: "Gunsan", icon: "retro", c: "#7A5A3A",
    t: { ko: "시간 여행자", en: "Retro Time Traveller" }, d: { ko: "근대 거리, 경암동 철길마을, 이성당", en: "Modern-era streets, Gyeongam railway village, Lee Sung Dang bakery" } },
  { id: "boseong", r: "jeolla", ko: "보성", en: "Boseong", icon: "tea", c: "#2F6A3E",
    t: { ko: "녹차밭 산책", en: "Green Tea Walker" }, d: { ko: "보성 녹차밭, 율포 해변", en: "Boseong tea fields, Yulpo Beach" } },
  { id: "cheongsando", r: "jeolla", ko: "완도 청산도", en: "Cheongsando", icon: "flowers", c: "#B8952E",
    t: { ko: "슬로시티 산책자", en: "Slow City Walker" }, d: { ko: "유채꽃길, 구들장논, 서편제 돌담길", en: "Canola fields, gudeuljang rice terraces, stone-wall road" } },
  { id: "buan", r: "jeolla", ko: "부안", en: "Buan", icon: "cliff", c: "#6A4A2E",
    t: { ko: "채석강 탐사", en: "Cliff Reader" }, d: { ko: "채석강, 내소사 전나무숲길, 변산반도", en: "Chaeseokgang cliffs, Naesosa fir path, Byeonsan Peninsula" } },
  { id: "gochang", r: "jeolla", ko: "고창", en: "Gochang", icon: "flowers", c: "#A62E3E", pal: { a: "#D7383B", c: "#F4A6C0" },
    t: { ko: "꽃무릇 탐방", en: "Red Spider Lily Seeker" }, d: { ko: "고인돌 유적, 선운사 꽃무릇, 풍천장어", en: "Dolmen sites, Seonunsa lilies, grilled eel" } },
  { id: "namwon", r: "jeolla", ko: "남원", en: "Namwon", icon: "pavilion", c: "#7A2E2E",
    t: { ko: "춘향의 정원", en: "Chunhyang's Garden" }, d: { ko: "광한루원, 지리산 뱀사골, 추어탕", en: "Gwanghallu garden, Baemsagol valley, loach soup" } },
  { id: "gurye", r: "jeolla", ko: "구례", en: "Gurye", icon: "flowers", c: "#9A7A1E",
    t: { ko: "산수유 마을", en: "Cornus Village" }, d: { ko: "화엄사, 노고단, 산수유마을", en: "Hwaeomsa, Nogodan, cornus blossom village" } },

  // ---- Gyeongsang ----
  { id: "busan", r: "gyeongsang", ko: "부산", en: "Busan", icon: "waves", c: "#1E5AA8", plan: "busan",
    t: { ko: "바다 사나이", en: "Sea Dog" }, d: { ko: "해운대, 감천문화마을, 자갈치시장, 광안대교", en: "Haeundae, Gamcheon village, Jagalchi Market, Gwangan Bridge" } },
  { id: "gyeongju", r: "gyeongsang", ko: "경주", en: "Gyeongju", icon: "pagoda", c: "#6E3B1F", plan: "gyeongju",
    t: { ko: "천년 고도", en: "Thousand-Year Capital" }, d: { ko: "불국사, 석굴암, 대릉원, 동궁과 월지", en: "Bulguksa, Seokguram, Daereungwon, Donggung Palace & Wolji" } },
  { id: "andong", r: "gyeongsang", ko: "안동", en: "Andong", icon: "mask", c: "#5A4632",
    t: { ko: "하회탈의 미소", en: "Mask Smile" }, d: { ko: "하회마을, 병산서원, 안동찜닭", en: "Hahoe Village, Byeongsan Seowon, jjimdak" } },
  { id: "tongyeong", r: "gyeongsang", ko: "통영", en: "Tongyeong", icon: "boat", c: "#1E6A8A", pal: { b: "#1E5AA8" },
    t: { ko: "한려수도 항해사", en: "Island Navigator" }, d: { ko: "케이블카, 동피랑 벽화마을, 충무김밥", en: "Cable car, Dongpirang murals, chungmu gimbap" } },
  { id: "namhae", r: "gyeongsang", ko: "남해", en: "Namhae", icon: "terraces", c: "#3E6A2E",
    t: { ko: "다랭이 논두렁", en: "Terrace Farmer" }, d: { ko: "다랭이마을, 독일마을, 보리암", en: "Darangi village, German Village, Boriam" } },
  { id: "geoje", r: "gyeongsang", ko: "거제", en: "Geoje", icon: "windmill", c: "#3D3D3A",
    t: { ko: "바람의 언덕", en: "Windy Hill" }, d: { ko: "바람의언덕, 외도 보타니아", en: "Windy Hill, Oedo Botania" } },
  { id: "daegu", r: "gyeongsang", ko: "대구", en: "Daegu", icon: "apple", c: "#A62E2E",
    t: { ko: "근대골목 미식가", en: "Alley Gourmet" }, d: { ko: "근대골목, 김광석길, 서문시장 야시장", en: "Modern alleys, Kim Kwang-seok Street, Seomun night market" } },
  { id: "jinju", r: "gyeongsang", ko: "진주", en: "Jinju", icon: "lantern", c: "#B04A2E",
    t: { ko: "남강 유등", en: "Lantern River" }, d: { ko: "진주성, 남강 유등, 진주냉면", en: "Jinju Fortress, Namgang lanterns, Jinju naengmyeon" } },
  { id: "pohang", r: "gyeongsang", ko: "포항", en: "Pohang", icon: "hand", c: "#4A5A6A",
    t: { ko: "호미곶 해맞이", en: "First Sunrise" }, d: { ko: "호미곶 상생의 손, 영일대, 스페이스워크", en: "Homigot Hand of Harmony, Yeongildae, Space Walk" } },
  { id: "ulsan", r: "gyeongsang", ko: "울산", en: "Ulsan", icon: "whale", c: "#2E4E7A",
    t: { ko: "고래의 바다", en: "Whale Coast" }, d: { ko: "대왕암공원, 태화강 십리대숲, 간절곶", en: "Daewangam Park, Taehwa River bamboo, Ganjeolgot" } },
  { id: "hadong", r: "gyeongsang", ko: "하동", en: "Hadong", icon: "blossom", c: "#B8577A",
    t: { ko: "십리 벚꽃길", en: "Blossom Road" }, d: { ko: "화개장터, 쌍계사, 십리벚꽃길, 녹차밭", en: "Hwagae market, Ssanggyesa, cherry-blossom road, tea fields" } },
  { id: "hapcheon", r: "gyeongsang", ko: "합천", en: "Hapcheon", icon: "temple", c: "#3D5A4A",
    t: { ko: "팔만대장경 수호자", en: "Tripitaka Keeper" }, d: { ko: "해인사 장경판전, 소리길", en: "Haeinsa Janggyeong Panjeon, Sorigil trail" } },
  { id: "mungyeong", r: "gyeongsang", ko: "문경", en: "Mungyeong", icon: "gate", c: "#6A4A2E",
    t: { ko: "과거길 선비", en: "Scholar's Road" }, d: { ko: "문경새재, 오미자 막걸리", en: "Mungyeong Saejae pass, omija makgeolli" } },
  { id: "cheongsong", r: "gyeongsang", ko: "청송", en: "Cheongsong", icon: "watertree", c: "#8A5A2E",
    t: { ko: "주산지의 아침", en: "Misty Pond" }, d: { ko: "주왕산, 주산지, 청송 사과", en: "Juwangsan, Jusanji pond, Cheongsong apples" } },
  { id: "yeongdeok", r: "gyeongsang", ko: "영덕", en: "Yeongdeok", icon: "crab", c: "#B03A2E",
    t: { ko: "대게 원정대", en: "Snow Crab Squad" }, d: { ko: "블루로드, 풍력발전단지, 영덕대게", en: "Blue Road trail, wind farm, snow crab" } },
  { id: "bonghwa", r: "gyeongsang", ko: "봉화", en: "Bonghwa", icon: "train", c: "#8A2E2E",
    t: { ko: "협곡열차 탑승객", en: "Canyon Rail Rider" }, d: { ko: "분천 산타마을, 백두대간 협곡열차", en: "Buncheon Santa Village, Baekdudaegan canyon train" } },
  { id: "geochang", r: "gyeongsang", ko: "거창", en: "Geochang", icon: "suspension", c: "#8A3A2E",
    t: { ko: "Y자 출렁다리", en: "Bridge Walker" }, d: { ko: "Y자형 출렁다리, 수승대", en: "Y-shaped suspension bridge, Suseungdae" } },

  // ---- Islands ----
  { id: "jeju", r: "island", ko: "제주", en: "Jeju", icon: "volcano", c: "#2E6B5E", plan: "jeju",
    t: { ko: "오름 정복", en: "Oreum Conqueror" }, d: { ko: "성산일출봉, 오름, 올레길, 바다", en: "Seongsan Ilchulbong, oreum hills, Olle trails, beaches" } },
  { id: "ulleungdo", r: "island", ko: "울릉도", en: "Ulleungdo", icon: "squid", c: "#2A4A7A",
    t: { ko: "동해의 끝", en: "Edge of the East Sea" }, d: { ko: "해안 절벽, 나리분지, 독도 (날씨 허락 시)", en: "Sea cliffs, Nari Basin, Dokdo (weather permitting)" } }
];

// Bonus badges: cities in the K-Trip Planner that aren't in the top-50 list.
// Appended at the end so existing collection links keep working.
window.BADGES.push(
  { id: "sejong", r: "chungcheong", ko: "세종", en: "Sejong", icon: "greenhouse", c: "#2F6A4E", plan: "sejong", bonus: true,
    t: { ko: "정원도시 산책자", en: "Garden City Walker" }, d: { ko: "국립세종수목원, 세종호수공원, 금강보행교 야경", en: "National Sejong Arboretum, Sejong Lake Park, Geumgang bridge at night" } },
  { id: "cheongju", r: "chungcheong", ko: "청주", en: "Cheongju", icon: "palette", c: "#8A5A3A", plan: "cheongju", bonus: true,
    t: { ko: "수장고 감상가", en: "Art Vault Viewer" }, d: { ko: "국립현대미술관 청주, 수암골, 상당산성, 청남대", en: "MMCA Cheongju, Suamgol, Sangdangsanseong, Cheongnamdae" } }
);

window.RANKS = [
  { min: 0, ko: "여행 준비생", en: "Trip Planner" },
  { min: 1, ko: "첫 도장", en: "First Stamp" },
  { min: 5, ko: "주말 여행자", en: "Weekend Traveller" },
  { min: 15, ko: "국내 탐험가", en: "Korea Explorer" },
  { min: 30, ko: "K-로드 마스터", en: "K-Road Master" },
  { min: 45, ko: "전국 유랑자", en: "Grand Wanderer" },
  { min: window.BADGES.length, ko: "대한민국 정복", en: "Korea Conquered" }
];
