// Taste quiz. Each option adds to dimension scores (s) and may set a key value (v).
export const QUESTIONS = [
  {
    q: { en: "Your ideal free day back home looks like…", ko: "평소 쉬는 날, 가장 이상적인 하루는?" },
    opts: [
      { e: "🥾", t: { en: "A hike, then a view", ko: "등산하고 전망 즐기기" }, s: { nature: 2, active: 2 } },
      { e: "🍢", t: { en: "Eating my way through a food street", ko: "먹자골목 정복하기" }, s: { food: 3 } },
      { e: "🏛️", t: { en: "Museums and old buildings", ko: "박물관과 오래된 건물 구경" }, s: { history: 3 } },
      { e: "☕", t: { en: "A slow coffee somewhere quiet", ko: "조용한 카페에서 느긋하게" }, s: { cafe: 3, calm: 1 } }
    ]
  },
  {
    q: { en: "Ancient kingdoms, royal tombs, 1,500-year-old gold crowns…", ko: "고대 왕국, 왕릉, 1,500년 된 금관…" },
    opts: [
      { e: "👑", t: { en: "Love it, tell me the whole story", ko: "좋아요, 이야기 다 들려줘요" }, s: { history: 3 } },
      { e: "📸", t: { en: "A quick look and a photo", ko: "잠깐 보고 사진 한 장" }, s: { history: 1, photo: 1 } },
      { e: "🙃", t: { en: "Show me something more alive", ko: "좀 더 생기 있는 걸로" }, s: { food: 1, cafe: 1 } }
    ]
  },
  {
    q: { en: "Forests, mountain temples, lakes — how much nature?", ko: "숲, 산사, 호수… 자연은 얼마나?" },
    opts: [
      { e: "🌲", t: { en: "As much as possible", ko: "최대한 많이" }, s: { nature: 3, calm: 1 } },
      { e: "🌳", t: { en: "One nice walk is enough", ko: "산책 한 번이면 충분" }, s: { nature: 1 } },
      { e: "🏙️", t: { en: "I'm a city person", ko: "저는 도시파예요" }, s: { cafe: 1, art: 1 } }
    ]
  },
  {
    q: { en: "Modern art, galleries, murals, design shops?", ko: "현대미술, 갤러리, 벽화, 디자인 숍은?" },
    opts: [
      { e: "🎨", t: { en: "Yes, put them in", ko: "좋아요, 꼭 넣어줘요" }, s: { art: 3 } },
      { e: "🖼️", t: { en: "If it's on the way", ko: "가는 길에 있으면" }, s: { art: 1 } },
      { e: "🚫", t: { en: "Not really my thing", ko: "별로 관심 없어요" }, s: {} }
    ]
  },
  {
    q: { en: "In your friend group, you're the one who…", ko: "친구들 사이에서 나는…" },
    opts: [
      { e: "📷", t: { en: "Takes all the photos", ko: "사진 담당" }, s: { photo: 3 } },
      { e: "🗺️", t: { en: "Reads every sign", ko: "안내판 다 읽는 사람" }, s: { history: 2 } },
      { e: "🍜", t: { en: "Finds the best food", ko: "맛집 찾는 사람" }, s: { food: 2 } },
      { e: "🧘", t: { en: "Just enjoys the moment", ko: "그냥 순간을 즐기는 사람" }, s: { calm: 2 } }
    ]
  },
  {
    q: { en: "How much walking sounds good?", ko: "하루에 얼마나 걸어도 괜찮아요?" },
    key: "walk",
    opts: [
      { e: "🏃", t: { en: "15,000+ steps, no problem", ko: "만오천 보 이상도 OK" }, v: "high", s: { active: 3 } },
      { e: "🚶", t: { en: "Normal, with breaks", ko: "보통, 중간중간 쉬면서" }, v: "mid", s: { active: 1 } },
      { e: "🪑", t: { en: "As little as possible", ko: "최대한 적게" }, v: "low", s: { cafe: 1, calm: 1 } }
    ]
  },
  {
    q: { en: "How much spice can you handle?", ko: "매운 음식은 얼마나?" },
    key: "spice",
    opts: [
      { e: "🔥", t: { en: "The redder the better", ko: "빨갈수록 좋아요" }, v: 2, s: { food: 1 } },
      { e: "🌶️", t: { en: "Some kick is fine", ko: "약간 매운 건 괜찮아요" }, v: 1, s: {} },
      { e: "🥛", t: { en: "Mild please", ko: "안 맵게 부탁해요" }, v: 0, s: {} }
    ]
  },
  {
    q: { en: "Travel pace?", ko: "여행 속도는?" },
    key: "pace",
    opts: [
      { e: "⚡", t: { en: "Pack it in — see everything", ko: "빡빡하게, 최대한 많이" }, v: "fast", s: { active: 1 } },
      { e: "⚖️", t: { en: "Balanced", ko: "적당히" }, v: "mid", s: {} },
      { e: "🐢", t: { en: "Slow, with long café breaks", ko: "느긋하게, 카페에서 오래" }, v: "slow", s: { cafe: 2, calm: 1 } }
    ]
  },
  {
    q: { en: "How should the day end?", ko: "하루의 마무리는?" },
    opts: [
      { e: "🌇", t: { en: "Sunset from a viewpoint", ko: "전망 좋은 곳에서 노을" }, s: { photo: 2, nature: 1 } },
      { e: "🏮", t: { en: "Market snacks and street food", ko: "시장 간식과 길거리 음식" }, s: { food: 3 } },
      { e: "🕯️", t: { en: "A cosy café", ko: "아늑한 카페" }, s: { cafe: 3 } },
      { e: "♨️", t: { en: "Something relaxing, like a footbath", ko: "족욕 같은 휴식" }, s: { calm: 3 } }
    ]
  },
  {
    q: { en: "When it comes to food, you're…", ko: "음식에 대해서 나는…" },
    opts: [
      { e: "🧭", t: { en: "Adventurous — the more local the better", ko: "모험파, 로컬일수록 좋아요" }, s: { food: 3 } },
      { e: "⭐", t: { en: "Here for the famous dishes", ko: "유명한 대표 음식 위주" }, s: { food: 2, history: 1 } },
      { e: "🥐", t: { en: "Bakeries and desserts", ko: "빵과 디저트" }, s: { cafe: 2, food: 1 } },
      { e: "🤷", t: { en: "Whatever's nearby", ko: "근처 아무 데나" }, s: { calm: 1 } }
    ]
  }
];
