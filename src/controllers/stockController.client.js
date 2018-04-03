var active = { id: "" };

$(document).ready(function () {
  var initialId = "y-b";
  $(`#${initialId}`).addClass("active");
  active.id = initialId;

  getData();
});

function getData() {
  $.get("/api/stocks", function(data) {
    console.log(data);
  })
}

function handleAdd() {
  var s = $("#s-i").val()
  // To limit API calls, eliminate the possibility of sending surely invalid ticker symbols
  if (s !== "" || s.length < 6) {
  $.ajax({
      type: "POST",
      url: `/api/stock/${s}`,
      data: { symbol: s },
      dataType: "JSON",
      success: function () {
        getData();
        console.log("success");
      },
      error: function (err) {
        console.log(err);
        console.log("failure");
      }
    });
  }
}

function handleTFClick(id) {
  $(`#${active.id}`).removeClass("active");
  $(`#${id}`).addClass("active");
  active.id = id;
}
