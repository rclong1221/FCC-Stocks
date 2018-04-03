var active = { id: "" };

$(document).ready(function () {
  var initialId = "y-b";
  $(`#${initialId}`).addClass("active");
  active.id = initialId;

  // $.get("", function(data) {
  //   console.log(data);
  // })
});

function handleAdd() {

}

function handleTFClick(id) {
  $(`#${active.id}`).removeClass("active");
  $(`#${id}`).addClass("active");
  active.id = id;
}
