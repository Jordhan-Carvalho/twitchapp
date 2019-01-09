// Inico do api by FreeCodeCamp
var channels = ["freecodecamp","test_channel","ESL_SC2","skipnho"];

function getChannelInfo() {
  channels.forEach(function(channel) {
    function makeURL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };
    $.getJSON(makeURL("streams", channel), function(data) {
      var game,
          status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      $.getJSON(makeURL("channels", channel), function(data) {
        var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
          name = data.display_name != null ? data.display_name : channel,
          description = status === "online" ? ': ' + data.status : "";
          html = '<div class="row ' + 
          status + '"><div class="col-3" id="icon"><img src="' + 
          logo + '" class="logo"></div><div class="col-3" id="name"><a href="' + 
          data.url + '" target="_blank">' + 
          name + '</a></div><div class="col-6" id="streaming">'+ 
          game + '<span class="hidden-xs">' + 
          description + '</span></div></div>';
        status === "online" ? $("#display").prepend(html) : $("#display").append(html);
        
        
       
        })
        
        
      });
    });
 
  
};

// fim da api
// Funcoes

// fim

$(document).ready(function(){
  getChannelInfo();
  
  
  $(".bonline").on("click",function(){
    $(".offline").hide();
    $(".online").show();
        });
  
  $(".boffline").on("click",function(){
    $(".online").hide();
    $(".offline").show();   
  });
  
  $(".ball").on("click",function(){
    $(".offline").show();
    $(".online").show();
  });
  
   $('#submit').on('click', function(){
    var valor= $('#addcanal').val();
     channels.push(valor);
  })
  $(document).keypress(function(e) {
    //13 is enter on the keyboard.
    if(e.which == 13) {
      var valor= $('#addcanal').val();
     channels.push(valor);
    }
  });
  

  
  
  
  
});