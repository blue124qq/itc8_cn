function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

var filterAng = null;

var app = angular.module("filteredList", ['ngSanitize']).config(function($sceProvider) {
  $sceProvider.enabled(false);
}); 
$(document).ready(function(){

})
app.controller("myCtrl", function($scope) {
	$scope.search_results = searchResults;
    $scope.filter_attrs = {};
    $scope.selectData = angular.fromJson(selectDataStr);
    filterAng = $scope;
	
	/*var filterComponent = $('.mod-testimonial-filter-list .filter').select2({
		tags : "true",
		allowClear: true,
		placeholder: "Select an option"
	});*/
	/*filterComponent.on("change", function(e){
		if(!showViewResults )
			$scope.update(e);
	})*/  

	/*Working default*/
	/*
	$('.mod-testimonial-filter-list .filter').each(
			function(e)
			{
				$(this).on("change", function(e){
					if(!showViewResults ){
						$scope.update(e);
					}
					//$scope.disableFilterOptions(e);		
				})
				
			});
			
	$('.mod-testimonial-filter-list .filter').each(
			function(e)
			{
				$(this).on("click", function(e){
					$scope.disableFilterOptions(e);		
				})
				
			});
	*/
	/*$('.mod-testimonial-filter-list .filter').each(
		function(e)
		{
			$(this).selectmenu({
				open: function( event, ui ) {$scope.disableFilterOptions(event);},
				change: function( event, ui ) {if(!showViewResults ){$scope.update(event);}}
			});
	})*/
	
	//$( ".filter" ).on( "click", function( event, ui ) {$scope.disableFilterOptions(event);} );
	//$( ".filter" ).on( "selectmenuchange", function( event, ui ) {$scope.disableFilterOptions(event);} );


    $scope.update = function(e){
		//alert("here");
		$scope.updateListView();   	
		//$scope.disableFilterOptions(e);
    }
    /*
    $scope.updateCPView = function(){
    	$('.mod-testimonial-filter-list .testimonial-item').each(function(i, obj){
    		//alert($(obj).data('filtervals'))
			var match = true;
    		var data = $(obj).data('filtervals').split('|');
    		
			//for(var j=1; j<= $scope.search_results['filters'].length; j++){
				//var match = true;
				$.each(data, function(index, value){
					var dataAttrName = value.split(':')[0];
					var dataAttrValue = value.split(':')[1];
					var filterNumber = $scope.search_results['filters'].indexOf(dataAttrName);
					if(filterNumber !== -1){
						var filterValue = $('#filter'+(filterNumber+1)+' :selected').text();
						if(match && (filterValue && filterValue !=='Any' && dataAttrValue.indexOf(filterValue) === -1))
							match = false
					}
				});
			
			if(match)
				$(obj).show();
			else
				$(obj).hide();				

    		
    	})
    }*/
    $scope.updateListView = function () {
		$(".mod-testimonial-filter-list .mod-results").show();
		$(".mod-testimonial-filter-list .mod-testimonial-container").show();
		var filterStr = "";
		for(var j=1; j<= $scope.search_results['filters'].length; j++){
				var filterValue = $('#filter'+j+' :selected').val();
				var filterAttrName = $scope.search_results['filters'][j-1];
				filterStr = filterStr + (j!=1?"::":"") + filterAttrName + ":" + filterValue;
			}
		var displayAttrs = searchAttr.toString();
		/*var srcJSON = $scope.search_results.results[0]
		$.each(srcJSON, function(key, value){
			if(key != '$$hashKey')
				displayAttrs = displayAttrs + key +",";
		})*/
		if(viewType==="List"){
				 
			$scope.search_results.results = [];
			$scope.$apply();	 
		}else{
			if($('.mod-testimonial-filter-list .mod-testimonial-inner-list').length){
				$('.mod-testimonial-filter-list .mod-testimonial-inner-list').html(""); 
			}
			else if($('.mod-testimonial-filter-list .mod-testimonial-white').length)
			{
				$('.mod-testimonial-filter-list .mod-testimonial-white > .row').html(""); 
			}
			else{
				$('.mod-testimonial-filter-list .mod-testimonial > .row').html(""); 
			}
		}  
		$('.mod-testimonial-filter-list .mod-testimonial-container').fadeOut();		 
		$('.mod-testimonial-filter-list .mod-filter-line').show();
		$('.mod-testimonial-filter-list .mod-filter-line-loading').fadeIn();
		$.ajax({
		    // The URL for the request
		    url: "/cs/ContentServer?d=&pagename=CCOM/AjaxHandlers/FilterListPaginationHandler",
		 
		    // The data to send (will be converted to a query string)
		    data: {
		        query_asset:filterAsset,
				module_asset:moduleAsset,
		        sort_by_attr:sortByAttr,
				sort_by_order:sortByOrder,
		        selected_filters: encodeURIComponent(filterStr),
		        display_attrs: displayAttrs,
		        result_start_index : 0,
        		view_type : viewType,
        		results_per_page : resultsPerPage,
				site : ft_site,
				sitepfx : ft_sitepfx,
        		max_results_count : maxResultsCount
		    },
		 
		    // Whether this is a POST or GET request
		    type: "GET",
		 
		    // The type of data we expect back
		    dataType : (viewType==="List")? "json":"html",
		})
		  // Code to run if the request succeeds (is done);
		  // The response is passed to the function
		  .done(function( response ) {
			  //alert(response);
			  $('.mod-testimonial-filter-list .load-more-loading').hide();
			  $('.mod-testimonial-filter-list .mod-filter-line-loading').fadeOut(
				function(){
				  if(viewType==="List")
				  { 
					  if(response.results){
						  $scope.search_results.results = response.results;
						  $scope.$apply();
						  //$scope.updateListView();
					  }
					  else{
						  $scope.search_results.results = [];
						  $scope.$apply();
					  }
					  if(response.hasMoreResults){
						  $('#fl-load-more').show();
					  }else{
						  $('#fl-load-more').hide();
					  }
				}else{
				  if($('.mod-testimonial-filter-list .mod-testimonial-inner-list').length){
					  $('.mod-testimonial-filter-list .mod-testimonial-inner-list').html(""); 
					  $('.mod-testimonial-filter-list .mod-testimonial-inner-list').append(response);
				  }
				  else if($('.mod-testimonial-filter-list .mod-testimonial-white').length)
				  {
					  $('.mod-testimonial-filter-list .mod-testimonial-white > .row').html(""); 
					  $('.mod-testimonial-filter-list .mod-testimonial-white > .row').append(response);

				  }
				  else{
					  $('.mod-testimonial-filter-list .mod-testimonial > .row').html(""); 
					  $('.mod-testimonial-filter-list .mod-testimonial > .row').append(response);
				  }
				  
				  /*var scrollLocation = document.body.scrollTop;*/
				  $('.mod-testimonial-filter-list .mod-testimonial-2 > .row').each(function() {
					$(this).children('.testimonial-item').children('.testimonial').matchHeight({
						byRow: true
					});
				  });
				  $('.mod-testimonial-filter-list .mod-testimonial-3 > .row').each(function() {
					$(this).children('.testimonial-item').children('.testimonial').matchHeight({
						byRow: true
					});
				  });
				  $('.mod-testimonial-filter-list .mod-testimonial-4 > .row').each(function() {
					$(this).children('.testimonial-item').children('.testimonial').matchHeight({
						byRow: true
					});
				  });
				  /*$('html, body').animate({
					scrollTop: scrollLocation
				  }, 0);*/
				  if($('#hasMoreResults').length && $('#hasMoreResults').val() == "true" ){
					  $('#fl-load-more').show();
				  }else{
					  $('#fl-load-more').hide();
				  }
				  $('#hasMoreResults').remove();
				  if(typeof viewType != 'undefined' && viewType == "Content Preview Accent Rules")
					{
						var count=0;
						var accentColor = getPageAccent();
						$(".mod-testimonial-filter-list .mod-testimonial-container .testimonial").each(
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
			  }
			  $('.mod-testimonial-filter-list .mod-testimonial-container').fadeIn();
				}
			  );
			  
		  })
		  // Code to run if the request fails; the raw request and
		  // status codes are passed to the function
		  .fail(function( xhr, status, errorThrown ) {
		    //alert( "Sorry, there was a problem!" );
		    console.log( "Error: " + errorThrown );
		    console.log( "Status: " + status );
		    console.dir( xhr );
		  })
		  // Code to run regardless of success or failure;
		  .always(function( xhr, status ) {
		    //alert( "The request is complete!" );
		  });
		/*var selectedFilter1 = $('#filter1 :selected').text()
		var selectedFilter2 = $('#filter2 :selected').text()
		var selectedFilter3 = $('#filter3 :selected').text()
		var i = $scope.search_results.results.length;
		while(i--){
			var match = true;
			for(var j=1; j<= $scope.search_results['filters'].length; j++){
				var filterValue = $('#filter'+j+' :selected').text();
				var filterAttrName = $scope.search_results['filters'][j-1];
				match = $scope.search_results.results[i][filterAttrName] === filterValue || $scope.search_results.results[i][filterAttrName].includes(filterValue+",") || $scope.search_results.results[i][filterAttrName].includes(","+filterValue) || filterValue === 'Any' || !filterValue;
				 if(!match)
					 break;
			}
			if(match){
				//alert("here1");
				$scope.search_results.results[i].display='block'
			}else{
				//alert("here2");
				$scope.search_results.results[i].display='none'
			}
		}
		$scope.$apply() 
		*/
		//alert(searchResults);

    }
    $scope.getFilteredResultForOption = function(){
		var results = [];
		
		if(viewType=='List'){
			var i = $scope.search_results.results.length;
			while(i--){
				var match = true;
				for(var j=1; j<= $scope.search_results['filters'].length; j++){
					var filterValue = $('#filter'+j+' :selected').val();
					var filterAttrName = $scope.search_results['filters'][j-1];
					if(typeof $scope.search_results.results[i][filterAttrName] != 'undefined')
					{
					match = $scope.search_results.results[i][filterAttrName] === filterValue || $scope.search_results.results[i][filterAttrName].indexOf(filterValue+",") > -1 || $scope.search_results.results[i][filterAttrName].indexOf(","+filterValue) > -1 || filterValue === 'Any' || !filterValue;
					 if(!match)
						 break;
					}
				}
				if(match){
					results.push( $scope.search_results.results[i])
				}
			}
		}else{
	    	$('.mod-testimonial-filter-list .testimonial-item').each(function(i, obj){
	    		//alert($(obj).data('filtervals'))
				var match = true;
	    		var data = $(obj).data('filtervals').split('|');
	    		var obj = {};
				$.each(data, function(index, value){
					var dataAttrName = value.split(':')[0];
					var dataAttrValue = value.split(':')[1];
					obj[dataAttrName] = dataAttrValue;
					var filterNumber = $scope.search_results['filters'].indexOf(dataAttrName);
					if(filterNumber !== -1){
						var filterValue = $('#filter'+(filterNumber+1)+' :selected').val();
						if(match && (filterValue && filterValue !=='Any' && dataAttrValue.indexOf(filterValue) === -1))
							match = false
					}
				});
				
				if(match){
					results.push(obj);
				}
	    	})			
		}
		return results;
    	
    }
    $scope.disableFilterOptions = function(e){
		//alert(e.currentTarget.id);
    	//var results = $scope.getFilteredResultForOption();
		var toReplace = e.currentTarget.id.replace("filter","");
    	$scope.disableFilters(toReplace);
    	//console.log(results)
    	//$('#filter1>optgroup>option[value=Afganistan]').prop('disabled',true);
    	//alert($scope.search_results['filters']);
		var filtMatch = "";
		var toReplace = e.currentTarget.id.replace("filter","");
		//$.each(results, function(index, value){
			var anyCount = 0;
        	for(var j=1; j<= $scope.search_results['filters'].length; j++){
				
    			var filterValue = $('#filter'+j+' :selected').val();
				var filtVal = filterValue;
				if(filterValue == "Any" || filterValue == "" || toReplace == j)
				{
					filtVal = "#"+j;
					anyCount++;
				}
				//if(typeof e != 'undefined' && e.currentTarget.id == '#filter'+j)
				//{
				//	filtVal = "?";
				//}
				filtVal = $scope.search_results['filters'][j-1]+":"+filtVal;
				filtMatch += (j!=1?";":"") + filtVal;
        	}
			
			
				$("#" + e.currentTarget.id + " > option").each(function() {
					//alert(this.text + ' ' + this.value);
					//alert(filtMatch);
					//for(var k=1; k<= $scope.search_results['filters'].length; k++){
						
						//alert(toReplace);
						var filtMatch2 = filtMatch.replace("#"+toReplace,($(this).val() != "Any"?$(this).val():"#"+toReplace))
						//console.log(filtMatch);
						console.log(filtMatch2);
						//alert(anyCount == $scope.search_results['filters'].length || fC.hasOwnProperty(filtMatch2) || $(this).val() == "Any");
						if (anyCount == $scope.search_results['filters'].length || fC.hasOwnProperty(filtMatch2) || $(this).val() == "Any")
						{
							//alert($(this).val());
							//this.attr('disabled', false);
							//document.getElementById($(this).attr('id')).disabled = false;
							$(this).removeAttr('disabled');
							//alert("here123");
						}
					//}
				});    		
			
        	$("#" + e.currentTarget.id).selectmenu("refresh");
			
    	//})

    }
    
    $scope.disableFilters = function(index){
    	//for(var j=1; j<= $scope.search_results['filters'].length; j++){
			//var filterValue = $('#filter'+j+' :selected').text();
			//var filterAttrName = $scope.search_results['filters'][j-1]; 
			$('#filter'+index+' option').each(function(){
				$('#filter'+index).find('option[value="'+$(this).val()+'"]').attr('disabled', 'true');
			});
			//$('#filter'+index).selectmenu("refresh");
    	//}
    }
    
    $('#show-results-btn').click(function (e,ui) {
    	$scope.update();
    });
    
    $('#show-results-new-page-btn').click(function (e,ui) {
    	var filterStr = '';
		for(var j=1; j<= $scope.search_results['filters'].length; j++){
			var filterValue = $('#filter'+j+' :selected').val();
			var filterAttrName = $scope.search_results['filters'][j-1];
			filterStr = filterStr + (j!=1?"::":"") + filterAttrName + ":" + filterValue;
		}
		
		var newWindowLoc = window.location.href;
		if(typeof searchResultNewPage != 'undefined' && searchResultNewPage.length > 0)
		{
			newWindowLoc = searchResultNewPage;
		}
    	
    	if(newWindowLoc.indexOf("?") == -1){
    		window.location.href = newWindowLoc+'?selected_filters='+encodeURIComponent(filterStr);
    	}else{
    		window.location.href = newWindowLoc+'&selected_filters='+encodeURIComponent(filterStr);
    	}
    	//$scope.update();
    });
    
	/*$('.mod-testimonial-filter-list .filter').on('selectmenuchange', function (e,ui) {
		alert("here");
		if(!showViewResults )
			$scope.update();
	});
	*/
	$('.mod-testimonial-filter-list .filter' ).each(function( index ) {
        $( this ).change(function() {
			//if(showViewResults )
				//$scope.disableFilterOptions();
		});
	});
	
	$('#fl-load-more').click(function(e, ui){
		var filterStr = '';
		$('.mod-testimonial-filter-list .load-more-loading').show();
		for(var j=1; j<= $scope.search_results['filters'].length; j++){
			var filterValue = $('#filter'+j+' :selected').val();
			var filterAttrName = $scope.search_results['filters'][j-1];
			filterStr = filterStr + (j!=1?"::":"") + filterAttrName + ":" + filterValue;

		}	
		var displayAttrs = searchAttr.toString();
		/*var srcJSON = $scope.search_results.results[0]
		$.each(srcJSON, function(key, value){
			if(key != '$$hashKey')
				displayAttrs = displayAttrs + key +",";
		})*/
		var result_start_index = 0;
		if((viewType!=="List")){
			result_start_index = $('.mod-testimonial-filter-list .testimonial-item').length;
		}else{
			result_start_index = $scope.search_results.results.length;
		}
		$.ajax({
			 
		    // The URL for the request
		    url: "/cs/ContentServer?d=&pagename=CCOM/AjaxHandlers/FilterListPaginationHandler",
		 
		    // The data to send (will be converted to a query string)
		    data: {
		        query_asset:filterAsset,
				module_asset:moduleAsset,
		        sort_by_attr:sortByAttr,
				sort_by_order:sortByOrder,
		        selected_filters: encodeURIComponent(filterStr),
		        display_attrs: displayAttrs,
		        result_start_index : result_start_index,
        		view_type : viewType,
        		results_per_page : resultsPerPage,
				site : ft_site,
				sitepfx : ft_sitepfx,
        		max_results_count : maxResultsCount
		    },
		 
		    // Whether this is a POST or GET request
		    type: "GET",
		 
		    // The type of data we expect back
		    dataType : (viewType==="List")? "json":"html",
		})
		  // Code to run if the request succeeds (is done);
		  // The response is passed to the function
		  .done(function( response ) {
			  //alert(response)
			  $('.mod-testimonial-filter-list .load-more-loading').hide();
			  if(viewType==="List"){
				  if(response.results){
					  $scope.search_results.results = $scope.search_results.results.concat(response.results);
					  $scope.$apply();
					  //$scope.updateListView();
				  }
				  else{
					  $scope.search_results.results = [];
					  $scope.$apply();
				  }
				  if(response.hasMoreResults){
					  $('#fl-load-more').show();
				  }else{
					  $('#fl-load-more').hide();
				  }
			  }else{
				  if($('.mod-testimonial-filter-list .mod-testimonial-inner-list').length){
					  $('.mod-testimonial-filter-list .mod-testimonial-inner-list').append(response);
				  }
				  else if($('.mod-testimonial-filter-list .mod-testimonial-white').length)
				  {
					  $('.mod-testimonial-filter-list .mod-testimonial-white > .row').append(response);

				  }
				  else{
					  $('.mod-testimonial-filter-list .mod-testimonial > .row').append(response);
				  }
				  /*var scrollLocation = document.body.scrollTop;*/
				  $('.mod-testimonial-filter-list .mod-testimonial-2 > .row').each(function() {
					$(this).children('.testimonial-item').children('.testimonial').matchHeight({
						byRow: true
					});
				  });
				  $('.mod-testimonial-filter-list .mod-testimonial-3 > .row').each(function() {
					$(this).children('.testimonial-item').children('.testimonial').matchHeight({
						byRow: true
					});
				  });
				  $('.mod-testimonial-filter-list .mod-testimonial-4 > .row').each(function() {
					$(this).children('.testimonial-item').children('.testimonial').matchHeight({
						byRow: true
					});
				  });
				  /*$('html, body').animate({
					scrollTop: scrollLocation
				  }, 0);*/
				  if($('#hasMoreResults').length && $('#hasMoreResults').val() == "true" ){
					  $('#fl-load-more').show();
				  }else{
					  $('#fl-load-more').hide();
				  }
				  $('#hasMoreResults').remove()
				  if(typeof viewType != 'undefined' && viewType == "Content Preview Accent Rules")
					{
						var count=0;
						var accentColor = getPageAccent();
						$(".mod-testimonial-filter-list .mod-testimonial-container .testimonial").each(
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
			  }
		  })
		  // Code to run if the request fails; the raw request and
		  // status codes are passed to the function
		  .fail(function( xhr, status, errorThrown ) {
		    //alert( "Sorry, there was a problem!" );
		    console.log( "Error: " + errorThrown );
		    console.log( "Status: " + status );
		    console.dir( xhr );
		  })
		  // Code to run regardless of success or failure;
		  .always(function( xhr, status ) {
		    //alert( "The request is complete!" );
		  });
	})
	$(document).ready(function(){
	$( ".filter" ).selectmenu();
	$( ".filter" ).on( "selectmenuopen", function( event, ui ) {filterAng.disableFilterOptions(event);} );
	$( ".filter" ).on( "selectmenuchange", function( event, ui ) {if(!showViewResults ){
						filterAng.update(event);
					}} );
	if($( ".mod-filter" ).length)
	{
		//$scope.disableFilterOptions();
	
		if(typeof resultsPerPage != 'undefined' && typeof searchResults != 'undefined')
		{
			if($scope.search_results.results.length < resultsPerPage || !(typeof hasMoreResults != 'undefined' && hasMoreResults.toLowerCase() === "true")){
				$('#fl-load-more').hide();
			}
			else{
				$('#fl-load-more').show();
			}
		}
	}
	if(typeof viewType != 'undefined' && viewType == "Content Preview Accent Rules")
	{
		var count=0;
		var accentColor = getPageAccent();
		$(".mod-testimonial-filter-list .mod-testimonial-container .testimonial").each(
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
})	
});
