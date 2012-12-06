var me = {};
dpd.members.me(function(result, errors) {
    me.id = result.id;
    dpd.couffin.get({memberId: me.id}, function(couffin) {
      if(couffin.length>0)
        me.couffin = couffin[0];
    });
});

$(function(){

  dpd.members.me(function(result, error) {
    if(!result){
      window.location.replace("http://"+window.location.host + "/");    
    }else{
      alertify.success( "Welcome back !" );
    }
  });

  $("#logout").click(function(){
    dpd.members.logout(function() {
        window.location.replace("http://"+window.location.host + "/");    
    });
  });

  $(".toggle-button").toggleButtons();

  dpd.members.me(function(result, errors) {
    console.log(result);
    if(result.id !== undefined){
      dpd.couffin.get({memberId: result.uid}, function(couffins) {
        $.each(couffins,function(index, couffin){
          if(couffin.id !== undefined) {
            dpd.event.get({couffinId: couffin.id}, function(events) {
              console.log(events);
              $.each(events, function(index,el){
                filltable(el);
              });
            });
          }
        });
      });
    } else {
      console.log("undefined id");
    }
  });

  $("#event").submit(function(e){
    e.preventDefault();
    var data = JSON.stringify($(this).serializeObject());
    $.ajax({
      contentType: 'application/json',
      dataType: 'json',
      url: '/event',
      type: 'POST',
      data: data,
      success: function(data) {
        filltable(data);
      }
    });
    return false;
  });
});

function filltable(data){
  $("table").find('tbody')
    .prepend($('<tr>')
        .append($('<td>')
            .append($('<p>')
                .text(data.createdDate)
            )
        ).append($('<td>')
            .append($('<p>')
                .text(data.feces)
            )
        ).append($('<td>')
            .append($('<p>')
                .text(data.urine)
            )
        ).append($('<td>')
            .append($('<p>')
                .text(data.bath)
            )
        ).append($('<td>')
            .append($('<p>')
                .text(data.change)
            )
        ).append($('<td>')
            .append($('<p>')
                .text(data.comments)
            )
        ).append($('<td>')
            .append($('<p>')
                .html("<div class='btn'>save</div>")
            )
        )
    )
}