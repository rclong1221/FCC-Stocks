var socket,
    data = [];

var active = { id: "" };

$(document).ready(function () {
  socket = io('/my-namespace');

  socket.on('initial data', function(d){
    // data = d;
    console.log(d);
  });

  socket.on('add stock', function(d){
    data.push(d);
    console.log(d);
    $('#t-c').append(`
      <div id="${d.dataset_code}">
        <button class="btn" type="button" onclick={handleRemove("${d.dataset_code}")}>X</button>
        ${d.dataset_code}
      </div>`)
  });

  socket.on('remove stock', function(d){
    for(var i = 0; i < data.length; i++) {
      if(data[i].dataset_code === d) {
        data.splice(i, 1);
        break;
      }
    }
    console.log(data)
    console.log(`+++++++++++${d}+++++++++++++`)
    $(`#${d}`).remove();
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
