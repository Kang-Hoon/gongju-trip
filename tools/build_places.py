# Builds data/places.json (+ CSV for review) — city-level features for the "find your city" quiz.
# Scores 0-5 (see data/rubric.md): hi=history na=nature fo=food ca=cafe ph=photo cl=calm ac=active ar=art se=sea
# hrs = approx one-way public-transport hours from central Seoul; days = suggested stay
# seasons: sp su au wi ; crowd 1 quiet - 3 busy ; easy 1-3 = ease for first-time foreign visitors
import json, csv

D = "hi na fo ca ph cl ac ar se".split()
K = {"hi":"history","na":"nature","fo":"food","ca":"cafe","ph":"photo","cl":"calm","ac":"active","ar":"art","se":"sea"}

# id, region, scores(9), hrs, days, seasons, crowd, easy, access, plan, why_en, why_ko
P = [
("seoul","seoul",[5,2,5,5,4,1,3,5,0],0,3,"sp su au wi",3,3,"subway","seoul","Palaces, markets, cafés and the Han River — the easiest place to start.","궁궐, 시장, 카페, 한강까지. 처음 한국 여행을 시작하기 가장 쉬운 곳."),
("incheon","capital",[3,2,3,2,3,1,2,2,3],1,1,"sp su au wi",2,3,"subway","","Chinatown, open-port streets and sea views right by the airport.","공항 바로 옆에서 차이나타운, 개항장 거리, 바다를 볼 수 있어요."),
("suwon","capital",[5,1,3,2,3,2,3,1,0],1,1,"sp au",2,3,"subway","","Walk a UNESCO fortress wall, then eat Suwon's famous fried chicken.","유네스코 세계유산 성곽을 걷고 수원 통닭으로 마무리."),
("ganghwa","capital",[4,3,2,1,3,4,2,0,3],2,1,"sp au",1,1,"bus","","Prehistoric dolmens, an old temple and tidal-flat sunsets.","고인돌, 오래된 사찰, 갯벌 노을."),
("paju","capital",[4,2,1,2,2,3,2,3,0],1.5,1,"sp au wi",2,2,"tour/bus","","See the DMZ and the divided peninsula up close.","DMZ와 분단의 현장을 가까이에서."),
("gangneung","gangwon",[3,3,4,5,4,3,2,2,4],2,2,"sp su au wi",2,2,"KTX","gangneung","Coffee with a sea view, Joseon heritage and soft tofu.","바다 보며 커피 한 잔, 조선 유산, 초당순두부."),
("sokcho","gangwon",[1,5,3,2,4,2,5,0,4],2.5,2,"au wi",2,2,"bus","","Seoraksan's peaks meet the East Sea — Korea's best autumn colours.","설악산 봉우리와 동해 바다. 가을 단풍은 국내 최고."),
("chuncheon","gangwon",[1,3,3,2,3,3,2,1,0],1.5,1,"sp au",2,2,"ITX","","Lake views, Nami Island and spicy dakgalbi, an easy hop from Seoul.","호수, 남이섬, 닭갈비. 서울에서 가볍게 다녀오기 좋아요."),
("pyeongchang","gangwon",[1,4,2,1,3,3,4,0,0],2.5,2,"su wi",1,1,"KTX+bus","","Mountain sheep farms in summer, Olympic ski slopes in winter.","여름엔 대관령 양떼목장, 겨울엔 올림픽 스키장."),
("yeongwol","gangwon",[3,4,1,1,3,4,2,2,0],3,1,"au",1,1,"bus","","River bends, a king's exile site and some of Korea's darkest night skies.","강이 굽이치는 풍경, 단종의 유배지, 별이 쏟아지는 밤하늘."),
("yangyang","gangwon",[2,3,2,3,3,2,4,0,5],2.5,2,"su",2,1,"bus","","Korea's surf town, with a cliffside temple for sunrise.","서핑 성지, 그리고 절벽 위 낙산사 일출."),
("samcheok","gangwon",[1,4,2,1,3,3,3,0,4],3.5,2,"su",1,1,"bus","","Sea cable car, an ocean suspension bridge and a giant limestone cave.","해상케이블카, 바다 출렁다리, 거대한 석회동굴."),
("inje","gangwon",[0,4,1,1,3,5,3,0,0],3,1,"wi au",1,1,"bus","","A silent white birch forest that looks like Scandinavia in winter.","겨울이면 북유럽 같아지는 하얀 자작나무 숲."),
("danyang","chungcheong",[1,4,2,2,4,2,4,0,0],2.5,2,"sp au",2,1,"train","","River rocks, skywalks and paragliding over the Namhan River.","강 위의 바위, 스카이워크, 남한강 위 패러글라이딩."),
("gongjubuyeo","chungcheong",[5,2,2,1,3,4,2,1,0],2,2,"au sp",1,2,"bus","gongju","Two quiet capitals of the Baekje Kingdom, with fortress walls and lotus ponds.","백제의 조용한 두 수도. 성곽길과 연못."),
("taean","chungcheong",[1,4,2,1,3,3,2,0,4],3,2,"su au",1,1,"bus","","West Sea sunsets, pine-lined beaches and a famous arboretum.","서해 노을, 소나무 해변, 천리포수목원."),
("boryeong","chungcheong",[0,2,3,1,2,2,2,0,4],2.5,1,"su",2,1,"train","","Big beach, a summer mud festival and grilled clams.","넓은 해변, 여름 머드축제, 조개구이."),
("daejeon","chungcheong",[1,3,4,3,2,3,2,3,0],1,1,"sp su au wi",2,2,"KTX","daejeon","Bakery pilgrimages, a metasequoia forest and free hot-spring footbaths.","빵지순례, 메타세쿼이아 숲, 무료 온천 족욕."),
("jecheon","chungcheong",[1,4,2,1,3,3,3,0,0],2.5,1,"au",1,1,"train","","Lake cable car and cliffs over Cheongpung Lake.","청풍호 케이블카와 호수 위 절벽."),
("sejong","chungcheong",[0,3,1,2,2,4,2,2,0],1.5,1,"sp au",1,2,"KTX+bus","sejong","A new garden city with a national arboretum and a huge lake park.","국립수목원과 대형 호수공원이 있는 정원도시."),
("cheongju","chungcheong",[3,3,2,2,3,3,3,4,0],1.5,1,"au sp",1,2,"bus","cheongju","An art-storage museum, mural village and a presidential retreat on a lake.","수장형 미술관, 벽화마을, 호숫가 대통령 별장."),
("jeonju","jeolla",[4,1,5,3,5,2,2,2,0],2,2,"sp au",3,3,"KTX","jeonju","800 hanok houses and Korea's best food city — bibimbap was born here.","한옥 800채와 국내 최고의 맛 도시. 비빔밥의 고향."),
("yeosu","jeolla",[2,3,4,2,4,2,2,1,5],3,2,"sp su",2,2,"KTX","","Romantic night sea, a sea cable car and crab-marinated rice.","낭만의 밤바다, 해상케이블카, 게장백반."),
("suncheon","jeolla",[2,4,2,1,4,4,2,1,2],2.5,1,"au",2,2,"KTX","","Golden reed fields at sunset and Korea's national garden.","노을 지는 갈대밭과 국가정원."),
("damyang","jeolla",[1,4,3,2,3,3,2,0,0],3,1,"su au",2,1,"bus","","Bamboo forest walks and grilled tteokgalbi.","대나무 숲길과 떡갈비."),
("mokpo","jeolla",[3,2,4,1,3,2,2,1,3],2.5,2,"sp au",1,1,"KTX","","Port city of colonial-era streets and the richest Namdo cooking.","근대 거리가 남은 항구, 남도 음식의 본고장."),
("gunsan","jeolla",[4,1,3,3,3,3,2,1,2],2.5,1,"sp au wi",1,1,"bus","","A retro town frozen in the 1930s, with Korea's oldest bakery.","1930년대에 멈춘 듯한 레트로 거리와 오래된 빵집."),
("boseong","jeolla",[0,4,2,2,4,4,2,0,2],4,1,"sp su",1,1,"bus","","Rolling green tea terraces.","굽이치는 초록 녹차밭."),
("cheongsando","jeolla",[1,4,2,0,4,5,3,0,3],5.5,2,"sp",1,1,"bus+ferry","","A slow-city island of canola fields and stone-wall roads.","유채꽃과 돌담길의 슬로시티 섬."),
("buan","jeolla",[2,4,2,1,3,3,2,0,4],3.5,1,"au",1,1,"bus","","Layered sea cliffs and a fir-lined temple path.","켜켜이 쌓인 해안 절벽과 전나무 숲길."),
("gochang","jeolla",[4,3,3,0,3,4,2,0,1],3,1,"au",1,1,"bus","","UNESCO dolmens and red spider lilies at Seonunsa in early autumn.","유네스코 고인돌과 초가을 선운사 꽃무릇."),
("namwon","jeolla",[3,3,3,1,2,3,2,0,0],2.5,1,"sp au",1,1,"KTX","","The garden of Korea's most famous love story, at the foot of Jirisan.","춘향전의 무대, 지리산 자락의 정원."),
("gurye","jeolla",[2,4,2,1,3,4,3,0,0],3.5,2,"sp au",1,1,"train","","Jirisan temples and a village that turns yellow with cornus blossoms.","지리산 사찰과 산수유로 노랗게 물드는 마을."),
("busan","gyeongsang",[2,3,5,4,5,1,3,3,5],2.5,3,"sp su au wi",3,3,"KTX","busan","Beaches, hillside villages, seafood markets and glittering bridges.","해변, 산동네, 수산시장, 반짝이는 다리."),
("gyeongju","gyeongsang",[5,3,3,4,5,3,3,2,0],2.5,2,"sp au",3,3,"KTX","gyeongju","Silla's thousand-year capital — tombs, temples and glowing ponds at night.","신라 천년의 수도. 왕릉, 사찰, 밤의 연못."),
("andong","gyeongsang",[5,2,3,1,3,4,2,2,0],3,2,"au",2,2,"KTX","","Korea's best-preserved traditional village and Confucian academies.","가장 잘 보존된 전통 마을과 서원."),
("tongyeong","gyeongsang",[2,3,5,2,4,2,2,3,5],4,2,"sp au",2,1,"bus","","Island-dotted harbour, mural village and fresh oysters.","섬이 흩어진 항구, 벽화마을, 싱싱한 굴."),
("namhae","gyeongsang",[1,4,2,2,4,5,2,0,4],4.5,2,"sp",1,1,"bus","","Terraced rice paddies falling into the sea.","바다로 떨어지는 다랭이 논."),
("geoje","gyeongsang",[1,3,2,2,4,2,2,0,4],4.5,2,"sp su",2,1,"bus","","Windy-hill windmill and a botanical island garden.","바람의 언덕 풍차와 섬 정원 외도."),
("daegu","gyeongsang",[3,1,4,3,2,1,2,2,0],2,1,"sp au",2,2,"KTX","","Modern-history alleys and night markets in Korea's food-and-fashion city.","근대골목과 야시장. 음식과 패션의 도시."),
("jinju","gyeongsang",[4,2,3,1,3,3,2,1,0],3.5,1,"au",1,1,"bus","","Riverside fortress and the October lantern festival.","강변 진주성과 10월 유등축제."),
("pohang","gyeongsang",[1,3,3,1,3,2,2,2,4],2.5,1,"wi su",2,2,"KTX","","First sunrise at the 'Hand of Harmony' and winter gwamegi.","상생의 손 해맞이와 겨울 과메기."),
("ulsan","gyeongsang",[2,4,2,1,3,2,3,1,4],2.5,2,"sp au",2,2,"KTX","","Rocky coastal park, bamboo groves on the river and whale history.","해안 바위 공원, 강변 대숲, 고래 이야기."),
("hadong","gyeongsang",[1,4,2,2,3,5,2,0,0],4,1,"sp",1,1,"bus","","Ten-li cherry-blossom road, tea fields and a riverside market.","십리벚꽃길, 녹차밭, 화개장터."),
("hapcheon","gyeongsang",[5,3,1,0,2,5,2,0,0],3.5,1,"au",1,1,"bus","","Haeinsa, home of the 80,000 Tripitaka Koreana woodblocks.","팔만대장경을 간직한 해인사."),
("mungyeong","gyeongsang",[3,3,2,1,2,3,3,0,0],2.5,1,"au",1,1,"bus","","Walk the old scholars' road over the mountain pass.","선비들이 넘던 옛 과거길."),
("cheongsong","gyeongsang",[1,5,2,0,4,5,3,0,0],4,2,"au",1,1,"bus","","Misty Jusanji pond with trees growing in the water.","물속에 나무가 자라는 안개 낀 주산지."),
("yeongdeok","gyeongsang",[0,3,4,0,2,2,3,0,4],4,1,"wi",1,1,"bus","","Snow crab country and a long coastal walking trail.","대게의 고장과 긴 해안 트레킹길."),
("bonghwa","gyeongsang",[1,4,1,0,3,4,2,0,0],4,1,"wi au",1,1,"train","","A canyon train through the mountains and a tiny Santa village.","산을 가르는 협곡열차와 작은 산타마을."),
("geochang","gyeongsang",[0,4,1,0,3,3,3,0,0],3.5,1,"su au",1,1,"bus","","Y-shaped suspension bridge and cool valley streams.","Y자 출렁다리와 시원한 계곡."),
("jeju","island",[2,5,4,5,5,3,5,2,5],2.5,3,"sp su au wi",3,2,"flight","jeju","Volcanic craters, black-stone beaches, forests and tangerines.","화산 분화구, 현무암 해변, 숲, 그리고 귤."),
("ulleungdo","island",[1,5,3,1,5,4,5,0,5],6,3,"su",1,1,"bus+ferry","","Remote volcanic island of sheer cliffs — the gateway to Dokdo.","깎아지른 절벽의 화산섬, 독도로 가는 관문."),
]

# Seoul districts (match badge ids) — used to tell Seoul fans which districts suit them
SD = [
("jongno",[5,1,4,3,4,2,2,3,0]),("junggu",[3,2,4,2,4,1,3,2,0]),("yongsan",[4,1,3,3,2,2,2,5,0]),
("mapo",[0,2,4,5,3,1,2,3,0]),("seongdong",[0,3,2,5,3,2,2,3,0]),("gangnam",[2,0,3,3,3,1,2,3,0]),
("songpa",[1,2,2,2,5,2,2,1,0]),("yeongdeungpo",[0,3,2,2,3,3,3,1,0]),("seodaemun",[4,2,2,2,2,2,3,0,0]),
("gwangjin",[0,3,3,2,3,2,4,0,0]),
]

# Names, badge titles and highlights come from badges/data.js so there is one source of truth.
import re as _re
_bd = open("badges/data.js", encoding="utf-8").read()
NAMES = {}
for m in _re.finditer(r'\{ id: "([a-z]+)", r: "[a-z]+", ko: "([^"]+)", en: "([^"]+)"[\s\S]*?t: \{ ko: "([^"]+)", en: "([^"]+)" \}, d: \{ ko: "([^"]+)", en: "([^"]+)" \}', _bd):
    i, ko, en, tko, ten, dko, den = m.groups()
    NAMES[i] = {"name": {"ko": ko, "en": en}, "badge": {"ko": tko, "en": ten}, "highlights": {"ko": dko, "en": den}}
NAMES["seoul"] = {"name": {"ko": "서울", "en": "Seoul"}, "badge": None,
    "highlights": {"ko": "궁궐과 북촌, 광장시장, 성수 카페, 남산, 한강", "en": "Palaces and Bukchon, Gwangjang Market, Seongsu cafés, Namsan, the Han River"}}

places = []
for (pid, r, sc, hrs, days, seas, crowd, easy, access, plan, wen, wko) in P:
    assert len(sc) == 9, pid
    places.append({"id": pid, "region": r, "scores": {K[k]: v for k, v in zip(D, sc)},
        "hours_from_seoul": hrs, "days": days, "seasons": seas.split(), "crowd": crowd, "easy": easy,
        "access": access, "plan": plan or None, "why": {"en": wen, "ko": wko}, **NAMES[pid]})
districts = [{"id": i, "scores": {K[k]: v for k, v in zip(D, sc)}} for i, sc in SD]
json.dump({"version": 2, "scale": 5, "updated": "2026-11-19", "dims": [K[k] for k in D], "places": places, "seoul_districts": districts},
          open("data/places.json", "w"), ensure_ascii=False, indent=1)

with open("tools/places_review.csv", "w", newline="", encoding="utf-8-sig") as f:
    w = csv.writer(f)
    w.writerow(["id", "권역", "역사", "자연", "음식", "카페", "사진", "여유", "걷기", "예술", "바다", "서울→시간", "추천일수", "추천계절", "붐빔(1-3)", "외국인편의(1-3)", "교통", "플래너", "한줄(한)", "한줄(영)"])
    for p, row in zip(places, P):
        w.writerow([p["id"], p["region"], *row[2], p["hours_from_seoul"], p["days"], " ".join(p["seasons"]), p["crowd"], p["easy"], p["access"], "O" if p["plan"] else "", p["why"]["ko"], p["why"]["en"]])
print(len(places), "places,", len(districts), "districts")
