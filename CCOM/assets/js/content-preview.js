
var getNextPage = function(id, assetInfo, moduleInfo, columns, sortBy, sortOrder, resultsPerPage, maxResultsCount ){

	var result_start_index = $('#mod-testimonial-container-'+id+' .testimonial-item').length;
	 $('#fl-load-more-loading-'+id).show();
	$.ajax({
        
	    url: "/cs/ContentServer?d=&pagename=CCOM/Util/ContentPreviewPaginationHandler",
  	    data: {
	        query_asset:assetInfo,
			module_asset:moduleInfo,
	        result_start_index : result_start_index,
    		view_type : 'Preview',
    		sort_by_attr : sortBy,
			columns : columns,
			sort_by_order : sortOrder,
    		results_per_page : resultsPerPage,
			site : ft_site,
			sitepfx : ft_sitepfx,
    		max_results_count : maxResultsCount
	    },
	    type: "GET",
	    dataType : "html",
	}).done(function( response ) {
			  if(columns == 1)
			  {
				   $('#mod-testimonial-container-'+id).append("<span id='testimonial-group-load-" + result_start_index + "'></span>" + response);
			  }
			  else{
				  if($('#mod-testimonial-container-'+id +" .mod-testimonial-white .row").length > 0)
				  {
					  $('#mod-testimonial-container-'+id +" .mod-testimonial-white .row").append("<span id='testimonial-group-load-" + result_start_index + "'></span>" + response);
				  }
				  else
				  {
					  $('#mod-testimonial-container-'+id +" .mod-testimonial .row").append("<span id='testimonial-group-load-" + result_start_index + "'></span>" + response);
				  } 
			  }
			 
			  $('#fl-load-more-loading-'+id).hide();
			  //$scope.updateCPView();
			  
			  if($('#hasMoreResults').length && $('#hasMoreResults').val() == "true" ){
				  $('#fl-load-more-'+id).show();
			  }else{
				  $('#fl-load-more-'+id).hide();
			  }
			  $('#hasMoreResults').remove();
			  
			  /*var scrollLocation = document.body.scrollTop;*/
			  $('.mod-testimonial-2 > .row').each(function() {
				$(this).children('.testimonial-item').children('.testimonial').matchHeight({
					byRow: true
				});
			  });
			  $('.mod-testimonial-3 > .row').each(function() {
				$(this).children('.testimonial-item').children('.testimonial').matchHeight({
					byRow: true
				});
			  });
			  $('.mod-testimonial-4 > .row').each(function() {
				$(this).children('.testimonial-item').children('.testimonial').matchHeight({
					byRow: true
				});
			  });
			  
			  if(typeof previewDisplayStyle != 'undefined' && previewDisplayStyle == "Accent Rules")
				{
					var count=0;
					var accentColor = getPageAccent();
					$("#mod-testimonial-container-"+id+" .testimonial").each(
						function(){
							var appliedColor = getPaletteColor(accentColor,count,3);
							if(!$(this).hasClass(appliedColor))
							{
								$(this).addClass(getPaletteColor(accentColor,count,3));
							}
							count++;
						}
					);
				}
				
				/*$('html, body').animate({
					scrollTop: scrollLocation
				}, 0);*/
			  
	  }).fail(function( xhr, status, errorThrown ) {
	    //alert( "Sorry, there was a problem!" );
	    console.log( "Error: " + errorThrown );
	    console.log( "Status: " + status );
	    console.dir( xhr );
	  })
}