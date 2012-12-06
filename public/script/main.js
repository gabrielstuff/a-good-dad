$(function(){

  dpd.members.me(function(result, error) {
    if(result){
      window.location.replace("http://"+window.location.host + "/dashboard.html");
    }
  });


  $("#signup").submit(function(e){
    e.preventDefault();
    var data = JSON.stringify($(this).serializeObject());
    $.ajax({
      contentType: 'application/json',
      dataType: 'json',
      url: '/members',
      type: 'POST',
      data: data,
      success: function(data) {
        console.log(data);
      }
    });
    return false;
  });
  $("#login").submit(function(e){
    e.preventDefault();
    var data = $(this).serializeObject();
    dpd.members.login(data, function(result, error) {
      console.log(result);
      dpd.couffin.get({memberId: result.uid}, function(couffin) {
        console.log(couffin);
        if (couffin.length > 0) {
          window.location.replace("http://"+window.location.host + "/dashboard.html");
        }else{
          alertify.prompt( "Please enter your Couffin name", function (e, str) {
            if (e) {
                if(str.length > 0){
                 dpd.couffin.post({name:str},function(result){
                  console.log(result);
                 });
              } 
            } else {
                 alertify.error("You've clicked '" + alertify.labels.cancel + " ! Why that :( ?'");
            }
          });
        }
      });
    });
    return false;
  });
});