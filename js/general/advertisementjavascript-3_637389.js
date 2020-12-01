$( document ).ready(function() {
    $(".service-link, .services-link-mobile").hover(          
          function() { ChangeColor(this) }, 
          function() { ResetColor(this) });        
});

function ChangeColor(me){    
   if(!$(me).find("i").hasClass("rbi-img-portal") && $(me).find("i").hasClass("rbi-icon-leave")){              
	   $(me).find("i").removeClass("rbi-icon-leave");
	   $(me).find("i").addClass("rbi-icon-leave-filled");
	   switch($(me).attr('title').toLowerCase())
	   {
		   case 'pig progress':
			   $(me).css('color','#b20070');
			   break;
		   case 'dairy global':
			   $(me).css('color','#056ab1');
			   break;
		  case 'world poultry':
			   $(me).css('color','#d18313');
			   break;
		  case 'all about feed':
			   $(me).css('color','#97b327');
			   break;
		}
	}
}

function ResetColor(me){  
    if(!$(me).find("i").hasClass("rbi-img-portal") && $(me).find("i").hasClass("rbi-icon-leave-filled")){           
      $(me).find("i").removeClass("rbi-icon-leave-filled");
      $(me).find("i").addClass("rbi-icon-leave");
      $(me).css('color','');
	}
}