var app =  angular.module("HustleApp", ['ngAnimate','ngMaterial']);
app.controller('dancerController', ['$scope', function($scope) { 
  //Declare scope's data here
  $scope.dancer = getDancer();
  dancerId = $scope.dancer.id;

  $scope.results = [];

  var classes = ['E','D','C','B','A'];
  var ares = [];
  for(var i in classes) {
    res = loadResults(dancerId, classes[i]);
    if (res.length!=0){
      ares.push({class:classes[i], results:res});
    }
  }
  $scope.results.push({type:"Выступления в классике", results:ares});

  classes = ['Bg','RS','M','S','Ch'];
  ares = [];
  for(var i in classes) {
    res = loadResultsJnJ(dancerId, classes[i]);
    if (res.length!=0){
      ares.push({class:classes[i], results:res});
    }
  }
  $scope.results.push({type:"Выступления в JnJ", results:ares});

  function getDancer() {
    var allDancers = $('#dancer').data('dancer');
    return {
      id: allDancers[0].id,
      fio: allDancers[0].fio,
      club: allDancers[0].club,
      class: allDancers[0].class,
      class_dnd: allDancers[0].class_dnd,
      e_points: allDancers[0].e_points,
      d_points: allDancers[0].d_points,
      c_points: allDancers[0].c_points,
      b_points: allDancers[0].b_points,
      a_points: allDancers[0].a_points,
      bg_points: allDancers[0].bg_points,
      rs_points: allDancers[0].rs_points,
      m_points: allDancers[0].m_points,
      s_points: allDancers[0].s_points,
      ch_points: allDancers[0].ch_points,
    }
  };

  function loadResults(dancerId, cl) {
    var allResults = $('#participating').data('participating');
    var allCompetions = $('#competions').data('competions'); 
    var results =[];
    for(var i in allResults) {
      if(dancerId === allResults[i].dancer_id && cl === allResults[i].class){
        for(var j in allCompetions) {
          if(allResults[i].competion_id === allCompetions[j].id && 'pair' === allCompetions[j].type){
            var partner = "";
            partner_id = 0;
            if (allResults[i].partner!=0){
              partner_id = allResults[i].partner;
          //    partner = findDancerById(allResults[i].partner).fio;
            }
            results.push({competion_name: allCompetions[j].name, competion_date: allCompetions[j].date, class: allResults[i].class, points: allResults[i].points, place: allResults[i].result, partner_id: partner_id, partner: partner});
          }
        }
      }
    }
    return results;
  };

  function loadResultsJnJ(dancerId, cl) {
    var allResults = $('#participatingjnj').data('participatingjnj');
    var allCompetions = $('#competions').data('competions'); 
    var results =[];
    for(var i in allResults) {
      if(dancerId === allResults[i].dancer_id && cl === allResults[i].class){
        for(var j in allCompetions) {
          if(allResults[i].competion_id === allCompetions[j].id && 'jnj' === allCompetions[j].type){
            results.push({competion_name: allCompetions[j].name, competion_date: allCompetions[j].date, class: allResults[i].class, points: allResults[i].points, place: allResults[i].result});
          }
        }
      }
    }
    return results;
  };

}]);