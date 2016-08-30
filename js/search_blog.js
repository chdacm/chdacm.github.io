$(document).ready(function () {
  var names = new Array(); //文章名字等
  var urls = new Array(); //文章地址

  $("#search-btn").click(function(){
    //$("#search-text").val("");
    $("#search-text").focus();
  });

  //$("#search-text").blur(function(){
  //$("ul.typeahead.dropdown-menu").css("display", "none");
  //})

  $.getJSON("/search/search_blog_data.json").done(function (data) {
    if (data.code == 0) {
      for (var index in data.data) {
        var item = data.data[index];
        names.push(item.title);
        urls.push(item.url);
      }

      $("#search-text").typeahead({
        source: names,
        items: 8, /*max matched item to show*/
        minLength: 2,/*min matched sub-string*/

        afterSelect: function (item) {
          //$("ul.typeahead.dropdown-menu").css("display", "none");
          window.location.href = ""+(urls[names.indexOf(item)]);
          return item;
        }
      });
    }
  });

});
