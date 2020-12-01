jQuery(document).ready(function($) {

	if (jQuery('.qode-news-holder.qode-layout1 .qode-news-filter').length!=0) {
		jQuery('.qode-news-holder.qode-layout1 .qode-news-filter').hide().after('<div class="qode-news-filter gp_dropdown_holder"></div>');
		
		jQuery('.gp_dropdown_holder').append('<a href="" itemprop="url" class="qode-news-filter-item qode-news-active-filter gp_news_filters" data-filter="">All</a>');
		
		jQuery('.gp_dropdown_holder').append('<div class="gp_dropdown_menu_wrapper gp_species"><a href="" itemprop="url" class="qode-news-filter-item gp_dropdown_has-submenu">Species</a><ul class="gp_dropdown_submenu"></ul></div>');
			jQuery('.gp_species .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="broilers">Broilers</a></li>');
			jQuery('.gp_species .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="layers">Layers</a></li>');
			jQuery('.gp_species .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="swine">Swine</a></li>');
			jQuery('.gp_species .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="dairy">Dairy</a></li>');
			jQuery('.gp_species .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="beef">Beef</a></li>');
			jQuery('.gp_species .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="aquaculture">Aquaculture</a></li>');
			jQuery('.gp_species .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="insects">Insects</a></li>');
			jQuery('.gp_species .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="horse">Horse</a></li>');
			jQuery('.gp_species .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="rabbits">Rabbits</a></li>');
			jQuery('.gp_species .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="pets">Pets</a></li>');
			

		jQuery('.gp_dropdown_holder').append('<div class="gp_dropdown_menu_wrapper gp_products"><a href="" itemprop="url gp_news_filters" class="qode-news-filter-item gp_dropdown_has-submenu">Products</a><ul class="gp_dropdown_submenu"></ul></div>');
			jQuery('.gp_products .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="actisaf">Actisaf</a></li>');
			jQuery('.gp_products .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="microsaf">Microsaf</a></li>');
			jQuery('.gp_products .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="nucleosaf">Nucleosaf</a></li>');
			jQuery('.gp_products .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="prosaf">Prosaf</a></li>');
			jQuery('.gp_products .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="safglucan">Safglucan</a></li>');
			jQuery('.gp_products .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="safwall">Safwall</a></li>');
			jQuery('.gp_products .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="safmannan">Safmannan</a></li>');
			jQuery('.gp_products .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="selsaf">Selsaf</a></li>');
			
			jQuery('.gp_dropdown_holder').append('<div class="gp_dropdown_menu_wrapper gp_programs"><a href="" itemprop="url" class="qode-news-filter-item gp_dropdown_has-submenu">Programs</a><ul class="gp_dropdown_submenu"></ul></div>');
			jQuery('.gp_programs .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="gut-health">Gut Health</a></li>');
			jQuery('.gp_programs .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="heat-stress">Heat Stress</a></li>');
			jQuery('.gp_programs .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="meat-profit">Meat profit</a></li>');
			jQuery('.gp_programs .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="milk-profit">Milk profit</a></li>');
			jQuery('.gp_programs .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="neonate">Neonate</a></li>');
			jQuery('.gp_programs .gp_dropdown_submenu').append('<li><a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="salmo-control">Salmo Control</a></li>');

		jQuery('.gp_dropdown_holder').append('<a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="feed-tech-service">Feed expert</a>');
		jQuery('.gp_dropdown_holder').append('<a href="" itemprop="url" class="qode-news-filter-item gp_news_filters" data-filter="farming">Farming</a>');
		

		jQuery('.gp_dropdown_holder').after('<div class="sorry_no_post">Sorry, no post matched with your criterias</div>');
		jQuery(document).on('click', '.gp_news_filters', function(e) {
			e.preventDefault();
			

			jQuery('.qode-news-holder').removeClass('gp_no_match');
			jQuery('.gp_dropdown_holder a').removeClass('qode-news-active-filter');

			jQuery(this).addClass('qode-news-active-filter');
			if (jQuery(this).parent().parent().hasClass('gp_dropdown_submenu')){
				jQuery(this).parent().parent().prev().addClass('qode-news-active-filter')
			}

			if (jQuery('.qode-news-filter:not(.gp_dropdown_holder) a[data-filter="'+jQuery(this).attr('data-filter')+'"]').length == 0) {
				jQuery('.qode-news-holder').addClass('gp_no_match');
				
			}

			jQuery('.qode-news-filter:not(.gp_dropdown_holder) a[data-filter="'+jQuery(this).attr('data-filter')+'"]').click();
		})

		jQuery(document).on('click', '.gp_dropdown_has-submenu', function(e) {
			e.preventDefault();
		})

	}
})