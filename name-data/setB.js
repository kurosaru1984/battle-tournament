(function(){
  const baseAdjectives = ["闇","暗黒","漆黒","影","黒炎","虚無","暗夜","闇深","黒翼","夜陰"];
  const baseNouns = ["ゴースト","デーモン","シャドウ","スケルトン","バンシー","ヴァンパイア","リッチ","ゾンビ","ナイトメア","ファントム"];
  const baseTitles = ["ロード","ダークキング","夜の帝王","黒騎士","魔将","冥王","暗黒司祭","死神","影武者","黒将軍"];
  const adjectives = [];
  const nouns = [];
  const titles = [];
  for(let i=0;i<10;i++){
    adjectives.push(...baseAdjectives);
    nouns.push(...baseNouns);
    titles.push(...baseTitles);
  }
  window.nameDataB = { adjectives, nouns, titles };
})();
