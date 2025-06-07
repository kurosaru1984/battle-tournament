(function(){
  const baseAdjectives = ["ランダム","混沌","未知","奇跡","無敵","変幻","超絶","異次元","超級","幻影"];
  const baseNouns = ["ドラゴン","ニンジャ","サイボーグ","モンスター","ウォリアー","ロボット","エイリアン","ハンター","メカ","ソルジャー"];
  const baseTitles = ["マスター","キング","ファイター","チャンピオン","バスター","クラッシャー","ブラザー","スター","ヒーロー","ドリーマー"];
  const adjectives = [];
  const nouns = [];
  const titles = [];
  for(let i=0;i<10;i++){
    adjectives.push(...baseAdjectives);
    nouns.push(...baseNouns);
    titles.push(...baseTitles);
  }
  window.nameDataD = { adjectives, nouns, titles };
})();
