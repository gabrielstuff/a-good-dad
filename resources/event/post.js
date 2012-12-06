date = new Date();
this.createdDate = date.toString();
var self = this;
dpd.couffin.get({memberId: me.id}, function(couffin) {
        if (couffin.length > 0) {
         self.couffinId = couffin[0].id; 
        }
});