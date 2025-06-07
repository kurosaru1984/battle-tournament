(function(){
  var adjectives = [];
  var nouns = [];
  var titles = [];
  for(var i=1;i<=1000;i++){
    adjectives.push('闇'+i);
    nouns.push('ゴースト'+i);
    titles.push('ロード'+i);
  }
  window.nameDataB = { adjectives: adjectives, nouns: nouns, titles: titles };
})();
