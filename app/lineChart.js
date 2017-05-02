var Chart = require('chart.js')
var axios = require('axios');

axios.get('/api/votes.json').then(function(result) {

  var datas = result.data

  var datasLabels = {
    abstention_pourcentage:"Pourcentage d'abstention sur le total des inscrits",
    vote_fn_pourcentage_exprimes:"Pourcentage des votes FN sur le total des votes exprimés**",
    vote_fn_pourcentage_inscrits:"Pourcentage des votes FN sur le total des inscrits*",
    blancs_nuls_pourcentage:"Pourcentage des votes blancs et nuls",
    blancs_nuls_abstention_pourcentage:"Pourcentage des votes blancs, nuls et abstention",
  }

  var labels = [];
  var datasets = {
    abstention_pourcentage:{
      data:[]
    },
    vote_fn_pourcentage_exprimes:{
      borderColor: "rgba(75,192,192,0.4)",
      backgroundColor: "rgba(75,192,192,0.4)",
      data:[]
    },
    vote_fn_pourcentage_inscrits:{
      borderColor: "rgba(50,100,192,1)",
      backgroundColor: "rgba(50,100,192,0.4)",
      data:[]
    }
  }

  for (var year in datas ) {
    labels.push(year);
    for (key in datas[year]) {
      if (datasets[key] !== undefined) {
        datasets[key].label = datasLabels[key];
        datasets[key].data.push(datas[year][key]);
      }
    }
  }

  // construction de l'objet data à passer à chartJS
  var data = {
    labels:labels,
    datasets:[]
  }

  for (var key in datasets) {
    data.datasets.push(datasets[key]);
  }

  var ctx = document.getElementById("lineChart")
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data
  })

})
