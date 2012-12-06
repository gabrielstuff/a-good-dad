dpd.email.post({
  to: this.mail,
  subject: "A good dad offer you your next mission",
  text: this.username + ",\n\n" +
        "Thank you for registering for A good dad!"
}, function() {});