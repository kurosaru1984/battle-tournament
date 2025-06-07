(function(){
  var adjectives = [];
  var nouns = [];
  var titles = [];
  for(var i=1;i<=1000;i++){
    adjectives.push('爆走'+i);
    nouns.push('ワニ'+i);
    titles.push('キング'+i);
  }
  window.nameDataA = {
    adjectives: adjectives,
    nouns: nouns,
    titles: titles
  };
})();
