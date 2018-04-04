// var chartData = [];
// var chartData2 = [];
// var chartData3 = [];
// var chartData4 = [];
//
// generateChartData();
//
// console.log(chartData);
//
// function generateChartData() {
//   var firstDate = new Date();
//   firstDate.setDate(firstDate.getDate() - 500);
//   firstDate.setHours(0, 0, 0, 0);
//
//   for (var i = 0; i < 500; i++) {
//     var newDate = new Date(firstDate);
//     newDate.setDate(newDate.getDate() + i);
//
//     var a1 = Math.round(Math.random() * (40 + i)) + 100 + i;
//     var a2 = Math.round(Math.random() * (100 + i)) + 200 + i;
//     var a3 = Math.round(Math.random() * (100 + i)) + 200;
//     var a4 = Math.round(Math.random() * (100 + i)) + 200 + i;
//
//     chartData.push({
//       date: newDate,
//       value1: a1,
//       value2: a2,
//       value3: a3,
//       value4: a4
//     });
//   }
// }
//
// var chart = AmCharts.makeChart("g-c", {
//   type: "stock",
//   "theme": "light",
//
//   "dataSets": [{
//     "fieldMappings": [{
//       "fromField": "value1",
//       "toField": "value1"
//     }, {
//       "fromField": "value2",
//       "toField": "value2"
//     }, {
//       "fromField": "value3",
//       "toField": "value3"
//     }, {
//       "fromField": "value4",
//       "toField": "value4"
//     }],
//     "dataProvider": chartData,
//     "categoryField": "date"
// }],
//
// "panels": [{
//   "title": "Value",
//   "stockLegend": {
//       "periodValueTextComparing": "[[value.close]]",
//       "periodValueTextRegular": "[[value.close]]"
//   },
//   "stockGraphs": [{
//       "id": "g1",
//       "title": "Graph #1",
//       "lineThickness": 2,
//       "valueField": "value1",
//       "useDataSetColors": false
//   }, {
//       "id": "g2",
//       "title": "Graph #2",
//       "lineThickness": 2,
//       "valueField": "value2",
//       "useDataSetColors": false
//   }, {
//       "id": "g3",
//       "title": "Graph #3",
//       "lineThickness": 2,
//       "valueField": "value3",
//       "useDataSetColors": false
//   }, {
//       "id": "g4",
//       "title": "Graph #4",
//       "lineThickness": 2,
//       "valueField": "value4",
//       "useDataSetColors": false
//   }]
// }],
//
// "chartScrollbarSettings": {
//   "graph": "g1"
// },
//
// "chartCursorSettings": {
//   "valueBalloonsEnabled": true,
//   "fullWidth": true,
//   "cursorAlpha": 0.1,
//   "valueLineBalloonEnabled": true,
//   "valueLineEnabled": true,
//   "valueLineAlpha": 0.5
// },
//
// "periodSelector": {
//   "position": "left",
//   "periodsText": "Matrix :",
//   "inputFieldsEnabled": false,
//   "periods": [
//     {
//         "period": "DD",
//         "selected": true,
//         "count": 7,
//         "label": "1 Minggu"
//       },
//       {
//         "period": "MM",
//         "count": 1,
//         "label": "1 Bulan"
//       }, {
//         "period": "YYYY",
//         "count": 1,
//         "label": "1 Tahun"
//       }, {
//         "period": "YTD",
//         "label": "YTD"
//       }, {
//         "period": "MAX",
//         "label": "MAX"
//       }
//     ]
//   }
// });
