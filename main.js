$(document).ready( initiateApp );

var heroAbilities = {
  'strength':1,
  'resilience':2,
  'regeneration':4,
  'speed':8,
  'flight':16,
  'raycasting':32,
  'senses':64,
  'intelligence': 128,
  'technology': 256,
  'wealth': 512,
  'skill': 1024
}

var abilityNumericMap = [];
for(var key in heroAbilities){
	abilityNumericMap.push( { name: key, value: heroAbilities[key]})
}

abilityNumericMap.sort( (a,b)=> a.value - b.value);


var heroes = {
  'batman': 1920,
  'spiderman': 1219,
  'wonder woman': 1155,
  'hawk eye': 1024,
  'superman': 251,
  'deadpool': 1028,
  'black panther': 1859,
  'the flash': 10
}

function makeSkillFilterDomElements( filters ){
  var domElements = [];
  for(var key in filters){
    var label = $("<label>",{
      'for': 'skill_'+key,
      text: key,
      'class': 'ability'
    });
    var checkBox = $("<input>",{
      type: 'checkbox',
      'class': 'filterVals',
      value: filters[key],
      id: 'skill_'+key
    });
    label.append(checkBox);
    domElements.push(label);
  }
  $("#filterContainer").append(domElements);
}

function findHeroes(){
  var selectedElements = document.querySelectorAll(".filterVals:checked");
  var total = 0;
  for( var i=0; i< selectedElements.length; i++){
  	total += parseInt( selectedElements[i].value );
  }
  
  var filteredHeroes = [];
  
  for(var heroName in heroes){
    var matching = heroes[heroName] & total;
    if( matching > 0){
      var abilities = [], heroAbilities = heroes[heroName];
      var abilityIndex = abilityNumericMap.length-1;
      var matchCount = 0;
      while(heroAbilities && abilityIndex>=0){
      	var matching= false;
      	if(heroAbilities & abilityNumericMap[abilityIndex].value){
      		if(abilityNumericMap[abilityIndex].value&total){
      			matchCount++;
      			matching = true;
      		}
      		var singleAbility = {name: abilityNumericMap[abilityIndex].name, matching: matching};
      		abilities.push(singleAbility);
      		
      	}
      	abilityIndex--;
      }
      var singleHero = { name: heroName, abilities: abilities, matchCount: matchCount };
      filteredHeroes.push(singleHero);
    }
  }
  
  var sortedFilteredHeroes = filteredHeroes.sort( (a,b)=> b.matchCount - a.matchCount);
  displayHeroes(sortedFilteredHeroes)
  console.log('filtered: ',sortedFilteredHeroes);
}

function displayHeroes( matchingHeroes ){
	var heroDomElements = [];
	for(var heroIndex = 0; heroIndex < matchingHeroes.length; heroIndex++){
		var heroDom = makeHeroDom(matchingHeroes[heroIndex]);
		heroDomElements.push(heroDom);
	}
	$("#heroContainer").empty().append(heroDomElements);
}

function makeHeroDom( heroStats ){
	var container = $("<div>",{
		'class': 'hero'
	});
	var nameContainer = $("<div>",{
		'class': 'nameContainer'
	})
	var heroName = $("<div>",{
		'class': 'name',
		text: heroStats.name
	})
	nameContainer.append(heroName);
	var abilityContainer = $("<div>",{
		'class': 'skillContainer'
	});
	var abilityList = [];
	for( var i=0; i< heroStats.abilities.length; i++){
		var ability = $("<span>",{
			'class' : 'skill '+ (heroStats.abilities[i].matching ? 'found' : ''),
			text: heroStats.abilities[i].name
		});
		abilityList.push(ability);

	}
	abilityContainer.append(abilityList);
	container.append(nameContainer, abilityContainer)
	return container;
}

function initiateApp(){
  makeSkillFilterDomElements(heroAbilities);
  $("#findButton").click( findHeroes);
}










