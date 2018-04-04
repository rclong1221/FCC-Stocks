var socket,
    keys = [],
    data = [],
    selected = [false, false, false, false, true];

var active = { id: "" };

$(document).ready(function () {
  socket = io('/my-namespace');

  socket.on('initial data', function(d){
    console.log(d);
  });

  socket.on('add stock', function(d){

    $('#t-c').append(`
      <div id="${d.dataset_code}">
        <button class="btn" type="button" onclick={handleRemove("${d.dataset_code}")}>X</button>
        ${d.dataset_code}
      </div>`)

    if (data.length === 0) {
      // console.log("++++++IN++++++");
      for (var i = d.data.length - 1; i >= 0; i--) {
        var entry = {};
        // TODO: Convert to date?
        entry["date"] = d.data[i][0];
        entry[`${d.dataset_code}`] = d.data[i][4];
        data.push(entry);
      }
      keys.push(d.dataset_code);
    }
    else if (data.length !== d.data.length) {
      $(`#${d.dataset_code}`).addClass("missing-data");
    }
    else {
      for (var i = d.data.length - 1; i >= 0; i--) {
        var entry = {};
        data[i][`${d.dataset_code}`] = d.data[i][4];
      }
      keys.push(d.dataset_code);
    }

    console.log(keys);
    console.log(data);

    makeChart();
  });

  socket.on('remove stock', function(d){
    for (var i = 0; i < data.length; i++) {
      if(keys[i] === d) {
        keys.splice(i, 1);
        break;
      }
    }

    if (keys.length === 0) data = [];
    else {
      data.forEach(function(v) {
        delete v[`${d}`];
      });
    }

    console.log(keys);
    console.log(data);

    $(`#${d}`).remove();

    makeChart();
  });

  socket.on('invalid symbol', function(d){
    console.log(`d is an invalid symbol`);
  })

  var initialId = "y-b";
  $(`#${initialId}`).addClass("active");
  active.id = initialId;
});

function handleAdd() {
  var s = $("#s-i").val();
  // To limit API calls, eliminate the possibility of sending surely invalid ticker symbols
  if (s.length > 0 && s.length < 6) {
    socket.emit('add stock', s.toUpperCase());
    $("#s-i").val("");
  }
}

function handleRemove(symbol) {
  socket.emit('remove stock', symbol.toUpperCase());
}

function handleTFClick(id) {
  $(`#${active.id}`).removeClass("active");
  $(`#${id}`).addClass("active");
  active.id = id;
}

function makeChart() {
  var chart = AmCharts.makeChart("g-c", {
    type: "stock",
    "theme": "light",
    // callback
    "dataSets": [{
      "fieldMappings": [{
        "fromField": keys[0],
        "toField": keys[0]
      }, {
        "fromField": keys[1],
        "toField": keys[1]
      }, {
        "fromField": keys[2],
        "toField": keys[2]
      }, {
        "fromField": keys[3],
        "toField": keys[3]
      }],
      "dataProvider": data,
      "categoryField": "date"
  }],

  "panels": [{
    "title": "Value",
    "stockLegend": {
        "periodValueTextComparing": "[[value.close]]",
        "periodValueTextRegular": "[[value.close]]"
    },
    // callback
    "stockGraphs": [{
        "id": "g1",
        "title": keys[0],
        "lineThickness": 2,
        "valueField": keys[0],
        "useDataSetColors": false
    }, {
        "id": "g2",
        "title": keys[1],
        "lineThickness": 2,
        "valueField": keys[1],
        "useDataSetColors": false
    }, {
        "id": "g3",
        "title": keys[2],
        "lineThickness": 2,
        "valueField": keys[2],
        "useDataSetColors": false
    }, {
        "id": "g4",
        "title": keys[3],
        "lineThickness": 2,
        "valueField": keys[3],
        "useDataSetColors": false
    }]
  }],

  "chartScrollbarSettings": {
    "graph": "g1"
  },

  "chartCursorSettings": {
    "valueBalloonsEnabled": true,
    "fullWidth": true,
    "cursorAlpha": 0.1,
    "valueLineBalloonEnabled": true,
    "valueLineEnabled": true,
    "valueLineAlpha": 0.5
  },

  "periodSelector": {
    "position": "top",
    "periodsText": "Timeframe: ",
    "inputFieldsEnabled": false,
    "periods": [
      {
          "period": "DD",
          "selected": false,
          "count": 7,
          "label": "Day"
        }, {
          "period": "MM",
          "selected": false,
          "count": 1,
          "label": "Month"
        }, {
          "period": "YYYY",
          "selected": false,
          "count": 1,
          "label": "Year"
        }, {
          "period": "YTD",
          "selected": false,
          "label": "YTD"
        }, {
          "period": "MAX",
          "selected": true,
          "label": "MAX"
        }
      ]
    }
  });



}
