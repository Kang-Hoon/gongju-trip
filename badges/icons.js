// Pixel icons (up to 10x10). "." = transparent. Letters map to the icon's palette.
// Rows may be shorter than 10; the renderer centres them.
// To change the visual style later, replace this file + drawBadge() in render.js — the data and app stay the same.
window.ICONS = {
  palace: { p: { a: "#9B2F2F", b: "#F2D29B", c: "#4A1E1E", d: "#4E8B3A" }, m: [
    "..........", "...aaaa...", ".aaaaaaaa.", "a..aaaa..a", "..bbbbbb..", "..babbab..", "..bbbbbb..", "..bbccbb..", "..bbccbb..", "dddddddddd"] },
  tower: { p: { a: "#1F4E79", b: "#F2B233", d: "#3E7A3A" }, m: [
    "....aa....", "....aa....", "...aaaa...", "..abbbba..", "...aaaa...", "....aa....", "....aa....", "....aa....", "..dddddd..", "dddddddddd"] },
  museum: { p: { a: "#5B4A8B", b: "#B9AEDC" }, m: [
    "....aa....", "..aaaaaa..", "aaaaaaaaaa", "..........", ".a.a..a.a.", ".a.a..a.a.", ".a.a..a.a.", ".a.a..a.a.", "aaaaaaaaaa", "bbbbbbbbbb"] },
  guitar: { p: { a: "#5A2A1A", b: "#D4537E", c: "#2B1410" }, m: [
    "........aa", ".......aa.", "......aa..", ".....aa...", "..bbba....", ".bbbbbb...", "bbbcbbb...", "bbbbbbb...", ".bbbbb....", "..bbb....."] },
  tree: { p: { a: "#2F7A4E", b: "#7FC28E", c: "#6B4A2E", d: "#8A8780" }, m: [
    "...aaaa...", "..aabaaa..", ".aaaaabaa.", ".abaaaaaa.", "..aaaaaa..", "....cc....", "....cc....", "....cc....", "..dddddd..", "dddddddddd"] },
  diamond: { p: { a: "#1B6F8A", b: "#8FD3E8" }, m: [
    "..aaaaaa..", ".abbabbaa.", "aaaaaaaaaa", ".abbbbbba.", "..abbbba..", "...abba...", "....aa...."] },
  skyscraper: { p: { a: "#3D3D3A", b: "#9FC9E8", c: "#3B82B8" }, m: [
    "....aa....", "....aa....", "...aaaa...", "...abaa...", "...aaba...", "..aabaaa..", "..aaabaa..", "..abaaaa..", ".cccccccc.", "cccccccccc"] },
  bridge: { p: { a: "#C26A1E", b: "#E9C79A", c: "#3B82B8" }, m: [
    "..a....a..", ".a.a..a.a.", "a...aa...a", "aaaaaaaaaa", ".b..b..b..", "cccccccccc", "cbcccbcccb", "cccccccccc"] },
  nightbridge: { p: { a: "#F2B233", b: "#1E2F5A", c: "#3B5BA8", d: "#FFFFFF" }, m: [
    ".d......d.", "..........", "..a....a..", ".a.a..a.a.", "a...aa...a", "aaaaaaaaaa", "cccccccccc", "cacccaccca", "cccccccccc"] },
  book: { p: { a: "#7B5A2B", b: "#F5EBD8", c: "#A47C45" }, m: [
    "aaaaaaaa", "abbbbbba", "abaaaaba", "abbbbbba", "abaaaaba", "abbbbbba", "aaaaaaaa", "cccccccc"] },
  sunrise: { p: { a: "#A13C2F", b: "#E9A23B", d: "#5E8B3A" }, m: [
    "......bb..", ".....bbbb.", "......bb..", "..........", "...a......", "..aaa.....", ".aaaaa.a..", "aaaaaaaaa.", "aaaaaaaaaa", "dddddddddd"] },
  gate: { p: { a: "#5A3A2A", b: "#C9B79C", d: "#7A7A72" }, m: [
    "..aaaaaa..", ".aaaaaaaa.", "aaaaaaaaaa", ".bbbbbbbb.", "bbbbbbbbbb", "bbb....bbb", "bbb....bbb", "bbb....bbb", "dddddddddd"] },
  redgate: { p: { a: "#C0392B", b: "#F2B233", c: "#7A1F14", d: "#7A7A72" }, m: [
    "aaaaaaaaaa", ".bbbbbbbb.", "aaaaaaaaaa", ".c......c.", ".c..bb..c.", ".c......c.", ".c......c.", ".c......c.", "dddddddddd"] },
  dolmen: { p: { a: "#6F6A60", b: "#9A948A", d: "#5E8B3A" }, m: [
    ".aaaaaaaa.", "aaaaaaaaaa", "..........", "..b....b..", "..b....b..", ".bb....bb.", "dddddddddd", "dddddddddd"] },
  fence: { p: { a: "#7A7A72", b: "#4A4A45", c: "#E24B4A", d: "#5E8B3A" }, m: [
    "b.a.a.a.b", "baaaaaaab", "b.a.a.a.b", "baaaaaaab", "b.a.c.a.b", "baaccaaab", "b...c...b", "ddddddddd"] },
  cup: { p: { a: "#B4B2A9", b: "#8A5A3B", c: "#5A3A26", d: "#C9B79C" }, m: [
    "...a.a...", "....a.a..", ".........", "bbbbbb...", "bbbbbbcc.", "bbbbbb.c.", "bbbbbbcc.", ".bbbb....", "dddddddd."] },
  snowpeak: { p: { a: "#FFFFFF", b: "#4A5A6A", c: "#2E3E4E", d: "#3E7A3A" }, m: [
    "....a.....", "...aab....", "..aabbb...", "..abbbb.a.", ".bbbbbbaab", ".bbbbbbbbb", "bbbbcbbbbb", "dddddddddd"] },
  boat: { p: { a: "#FFFFFF", b: "#C0392B", c: "#3B82B8", d: "#6FA8E8" }, m: [
    "....a.....", "....aa....", "....aaa...", "....aaaa..", "....a.....", "bbbbbbbbbb", ".bbbbbbbb.", "cccccccccc", "dcccdcccdc"] },
  sheep: { p: { a: "#FFFFFF", b: "#3D3D3A", d: "#7FB24A" }, m: [
    "..........", "..aaaaa...", ".aaaaaaabb", ".aaaaaaabb", ".aaaaaaa..", "..b...b...", "..b...b...", "dddddddddd"] },
  stars: { p: { a: "#F2D24A", b: "#2A2F5A", c: "#FFFFFF" }, m: [
    "a.......c.", "...c......", "......a...", ".c........", "....aaa..c", "...aa.aa..", "....aaa...", "c.........", "bbbbbbbbbb", "bbbbbbbbbb"] },
  surf: { p: { a: "#F28C38", b: "#3B82B8", c: "#FFFFFF" }, m: [
    "......aa..", ".....aaa..", "....aaa...", "...aaa....", "..aaa.....", "..aa......", "..........", ".c...c...c", "cbc.cbc.cb", "bbbbbbbbbb"] },
  cablecar: { p: { a: "#3D3D3A", b: "#E24B4A", c: "#FFFFFF", d: "#3B82B8" }, m: [
    "aa........", "..aa......", "....aa....", "....a.aa..", "..bbbbb.aa", "..bcbcb...", "..bbbbb...", "..........", "dddddddddd"] },
  birch: { p: { a: "#F4F2EC", b: "#3D3D3A", c: "#9FC98A" }, m: [
    "cc.cc.cc..", "cc.cc.cc..", "a..a..a..a", "a..b..a..a", "b..a..b..a", "a..a..a..b", "a..b..a..a", "b..a..a..a", "a..a..b..a"] },
  rocks3: { p: { a: "#5A6A5A", b: "#3D7A4E", c: "#3B82B8" }, m: [
    "....b.....", "...aaa....", "...aaa....", ".a.aaa.a..", "aaaaaaaaa.", "cccccccccc", "cccccccccc"] },
  wall: { p: { a: "#8A7A62", b: "#B8A88A", d: "#4E8B3A" }, m: [
    "a.a.a.a.a.", "aaaaaaaaaa", "abbabbabba", "aaaaaaaaaa", "babbabbabb", "aaaaaaaaaa", "dddddddddd"] },
  sunset: { p: { a: "#F28C38", b: "#F2B233", c: "#3B5BA8", d: "#2E3E6E" }, m: [
    "...bbbb...", "..bbbbbb..", ".aaaaaaaa.", ".aaaaaaaa.", "cccccccccc", "dcdcdcdcdc", "cccccccccc"] },
  umbrella: { p: { a: "#E24B4A", b: "#FFFFFF", c: "#6B4A2E", d: "#E8D3A2" }, m: [
    "...abab...", ".abababab.", "ababababab", "....c.....", "....c.....", "....c.....", "....c.....", "dddddddddd", "dddddddddd"] },
  bread: { p: { a: "#C98A3E", b: "#8A5A26", c: "#F2D29B" }, m: [
    "..aaaaaa..", ".aacaacaa.", "aacaacaaca", "aaaaaaaaaa", "abababbaba", ".bbbbbbbb."] },
  lake: { p: { a: "#3D7A4E", b: "#3B82B8", c: "#8FC1E8" }, m: [
    "..a.......", ".aaa...a..", "aaaaa.aaa.", "aaaaaaaaaa", "bbbbbbbbbb", "bcbbbbcbbb", "bbbbcbbbbb", "bbbbbbbbbb"] },
  hanok: { p: { a: "#4A3A2A", b: "#C89B62", c: "#F5EEDD", d: "#6E9A45" }, m: [
    "a........a", ".aaaaaaaa.", "aaaaaaaaaa", "..cccccc..", "..cbccbc..", "..cccccc..", "..ccbbcc..", "dddddddddd"] },
  reeds: { p: { a: "#C9A24A", b: "#8A6A2E", c: "#3B82B8", d: "#F2B233" }, m: [
    "a..a...a..", "a.aa.a.aa.", "b.ab.a.ab.", "b.b..b.b..", "b.b..b.b..", "bbb.bbbb.b", "cccccccccc"] },
  bamboo: { p: { a: "#3D8B4E", b: "#256B36", c: "#7FC28E" }, m: [
    "c.a..a..a.", "cca..b..a.", ".ab.ca..b.", ".a..aa..a.", ".b..a..ca.", ".a..b..ab.", ".a..a..a..", ".b..a..b..", ".a..b..a.."] },
  lighthouse: { p: { a: "#FFFFFF", b: "#C0392B", c: "#F2B233", d: "#3B82B8" }, m: [
    "....c.....", "...ccc....", "...bbb....", "...aaa....", "...bbb....", "..aaaaa...", "..bbbbb...", "dddddddddd"] },
  retro: { p: { a: "#7A5A3A", b: "#E8D3A2", c: "#3B5BA8", d: "#7A7A72" }, m: [
    "..aaaaaa..", ".aaaaaaaa.", ".bcbbcbcb.", ".bbbbbbbb.", ".bcbbcbcb.", ".bbbbbbbb.", ".bbbaabbb.", "dddddddddd"] },
  tea: { p: { a: "#2F7A4E", b: "#7FC28E", c: "#8A6A3E" }, m: [
    "bbbbbbbbbb", "aaaaaaaaaa", ".bbbbbbbbb", ".aaaaaaaaa", "..bbbbbbbb", "..aaaaaaaa", "...bbbbbbb", "cccccccccc"] },
  flowers: { p: { a: "#F2D24A", b: "#3E7A3A", c: "#FFFFFF" }, m: [
    ".a...a..a.", "aca.aca.ac", ".a...a..a.", ".b.a.b.a.b", ".bacab.aca", "..ba.b..a.", "...b.b..b.", "bbbbbbbbbb"] },
  cliff: { p: { a: "#8A6A4A", b: "#B8986A", c: "#6A4A2E", d: "#3B82B8" }, m: [
    "aaaa......", "bbbbb.....", "aaaaaa....", "cccccc....", "bbbbbbb...", "aaaaaaa...", "ccccccccc.", "dddddddddd"] },
  pavilion: { p: { a: "#7A2E2E", b: "#3E7A3A", c: "#3B82B8" }, m: [
    "a........a", ".aaaaaaaa.", "..aaaaaa..", "..a....a..", "..a....a..", "bbbbbbbbbb", "cccccccccc", "cbcccccbcc"] },
  mask: { p: { a: "#E8C79A", b: "#3D2A1A", c: "#C0392B" }, m: [
    "..aaaaaa..", ".aaaaaaaa.", "aabbaabbaa", "aaaaaaaaaa", "aaaaaaaaaa", "aabaaaabaa", "aaabbbbaaa", ".aaaaaaaa.", "..aaaaaa.."] },
  terraces: { p: { a: "#4E8B3A", b: "#97C459", c: "#3B82B8" }, m: [
    "aaaa......", "bbbbbb....", "aaaaaaa...", "bbbbbbbb..", "aaaaaaaaa.", "bbbbbbbbbb", "cccccccccc"] },
  windmill: { p: { a: "#FFFFFF", b: "#C0392B", c: "#3D3D3A", d: "#7FB24A" }, m: [
    "a.......a.", ".a.....a..", "..a...a...", "...bbb....", "..abbba...", ".a.bbb.a..", "a..ccc..a.", "...ccc....", "dddddddddd"] },
  apple: { p: { a: "#D7383B", b: "#3E7A3A", c: "#FFFFFF", d: "#6B4A2E" }, m: [
    "....d.b...", "....dbb...", ".aaaaaaa..", "aacaaaaaa.", "acaaaaaaa.", "aaaaaaaaa.", "aaaaaaaaa.", ".aaaaaaa..", "..aa.aa..."] },
  lantern: { p: { a: "#E2553B", b: "#F2B233", c: "#3D3D3A", d: "#3B5BA8" }, m: [
    "....c.....", "...bbb....", "..aaaaa...", ".aabaaba..", ".aaaaaaa..", "..aaaaa...", "...bbb....", "dddddddddd", "dbdddddbdd"] },
  hand: { p: { a: "#7A7A72", b: "#3B82B8", c: "#F2B233" }, m: [
    "c..a.a....", "..aa.a.a..", "..aa.aaa..", "..aaaaaa.a", "..aaaaaaaa", "..aaaaaaa.", "...aaaaa..", "bbbbbbbbbb", "bbbbbbbbbb"] },
  whale: { p: { a: "#2E4E7A", b: "#9FC9E8", c: "#FFFFFF", d: "#3B82B8" }, m: [
    "...c.c....", "....c.....", "..aaaaa...", ".aaaaaaa.a", "aacaaaaaaa", "abbbbbaa.a", ".bbbbb....", "dddddddddd"] },
  blossom: { p: { a: "#F4A6C0", b: "#6B4A2E", c: "#FFFFFF" }, m: [
    ".aaa.aaa..", "aacaaacaa.", "aaaaaaaaaa", ".aacaaaca.", "..aaaaaa..", "....bb....", "....bb....", "...bbbb..."] },
  temple: { p: { a: "#3D5A4A", b: "#C0392B", c: "#E8C79A", d: "#7A7A72" }, m: [
    "a........a", ".aaaaaaaa.", "aaaaaaaaaa", ".bcbcbcbb.", ".bcbcbcbb.", ".bbbccbbb.", "dddddddddd"] },
  watertree: { p: { a: "#C98A3E", b: "#6B4A2E", c: "#3B82B8", d: "#8FC1E8" }, m: [
    ".aaa......", "aaaaa.aa..", ".aaa.aaaa.", "..b...aa..", "..b....b..", "ccbccccbcc", "cdbcdccbdc", "cccccccccc"] },
  crab: { p: { a: "#E2553B", b: "#3D2A1A" }, m: [
    "aa......aa", "a.a....a.a", ".aa....aa.", "...abba...", ".aaaaaaaa.", "aaaaaaaaaa", ".aaaaaaaa.", "a.a....a.a"] },
  train: { p: { a: "#C0392B", b: "#F2E3C0", c: "#3D3D3A" }, m: [
    "..........", "aaaaaaaaa.", "abbabbabba", "abbabbabba", "aaaaaaaaaa", "aaaaaaaaaa", ".cc...cc..", "cccccccccc"] },
  suspension: { p: { a: "#C0392B", b: "#7A7A72", d: "#3E7A3A" }, m: [
    "a........a", "ab......ba", "a.b....b.a", "a..b..b..a", "a...bb...a", "aaaaaaaaaa", "dd......dd", "dd......dd"] },
  volcano: { p: { a: "#2E7D5B", b: "#F28C38", c: "#3B82B8" }, m: [
    "........b.", ".......bbb", "........b.", "...aaaa...", "..aa..aa..", ".aaaaaaaa.", ".aaaaaaaa.", "aaaaaaaaaa", "cccccccccc"] },
  squid: { p: { a: "#F4F2EC", b: "#3D3D3A", c: "#2A4A7A" }, m: [
    "....aa....", "...aaaa...", "..aaaaaa..", "..abaaba..", "..aaaaaa..", "..a.aa.a..", ".a..a..a..", "cccccccccc"] },
  waves: { p: { a: "#F2B233", b: "#FFFFFF", c: "#1E5AA8", d: "#6FA8E8" }, m: [
    "......aa..", ".....aaaa.", "......aa..", "..........", ".b...b...b", "bcb.bcb.bc", "cccccccccc", "dddddddddd", ".b...b...b", "dddddddddd"] },
  greenhouse: { p: { a: "#2F6A4E", b: "#BFE3D0", c: "#7FC28E", d: "#3B82B8" }, m: [
    "...aaaa...", "..abbbba..", ".abcbbcba.", ".abbbbbba.", "abcbbbbcba", "abbbbbbbba", "aaaaaaaaaa", "dddddddddd"] },
  palette: { p: { a: "#C9A27A", b: "#E24B4A", c: "#3B82B8", d: "#F2B233", e: "#2F7A4E" }, m: [
    "..aaaaaa..", ".abaacaaa.", "aaaaaaaada", "aeaa..aaaa", "aaaa..aaaa", "aaaaaaaaa.", ".aaaaaaa..", "..aaaa...."] },
  pagoda: { p: { a: "#7A4A2A", d: "#5E8B3A" }, m: [
    "....aa....", "...aaaa...", "....aa....", "..aaaaaa..", "...aaaa...", ".aaaaaaaa.", "...aaaa...", "aaaaaaaaaa", "..aaaaaa..", "dddddddddd"] }
};
