/**
 * Live Pigs Production Tool
 *
 * TODO: use MATERIAL charts? 
 * https://developers.google.com/chart/interactive/docs/gallery/linechart#creating-material-line-charts
 * 
 */

// console.log('PATW loaded...');
/**
 * ID" *global* object
 * Use as global: e.g. `PATW.init()`
 * Optionally: `module.exports = function PATW () { .. }`
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
var PATW = (function(win, doc) {
	/**
	 * 'Privates'
	 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	 */
	var priv = {
		'API': {
		    'data': '/js/specific/pigsaroundtheworld/data/data.noempty.json',
		    'countries': '/js/specific/pigsaroundtheworld/data/country-codes.json',
			'chart': 'https://localfocus2.appspot.com/588b3d7dc7dc9?api=1'
		},
		'data': {
			'countries': null,
			'data': null
		},
		'elements': {
			'app': null,
			// 'filters': null,
			'regionSelect': null,
			'regionWidget': null
		},
		'ids': {
			'countryFilter': 'lpCountryFilter',
			'yearFilter': 'lpYearFilter',
			'chart': 'lpChart'
		},
		'classes': {
			'app': 'lp-tool',
			'spinner': 'lp-tool__spinner',
			'filter': 'lp-tool__filters',
			'select': 'lp-tool__select',
			'chart': 'lp-tool__chart',
			'active': 'is-active'
		},
		'chart': {
			'id': 'lpChart',
			'widget': null,
			'dataTable': null,
			'dashboard': null,
			// 'urlParams': '?region={1}&from={2}&to={3}',
			'urlParams': '?region={region}',
			// `region: 150` == initial country to select (Netherlands = 150, US = 231)
			'state': {
				'region': [231]
				// ,
				// 'from': null,
				// 'to': null
			},
			'options': {
				'title': 'Live Pigs Around The World',
				'curveType': 'function',
				'legend': { 'position': 'bottom', 'alignment': 'center' },
				'chartArea': {
					'width': '100%',
					'height': '85%'
				},
				'pointSize': 4,
				'hAxis': { 'textPosition': 'in', 'viewWindowMode': 'pretty' },
				'vAxis': { 'textPosition': 'in', 'format': 'short', 'title': 'Head' },
				'explorer': {
					'axis': 'horizontal',
					'keepInBounds': true
				},
				'animation': {
					'duration': 400,
					'easing': 'inAndOut',
					'startup': true
				}
			}
		}
	};

	/**
	 * initializes PATW module
	 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	 */
	var onInit = function() {
		// console.log('onInit()');

		// Run stuff
		// and on DOM ready:
		doc.addEventListener('DOMContentLoaded', onDomReady);
	};

	/**
	 * initializes PATW methods on DomReady
	 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	 */
	var onDomReady = function() {
		// console.log('onDomReady()');

		priv.elements.app = doc.querySelector('.' + priv.classes.app);
		// priv.elements.filters = doc.querySelector('.' + priv.classes.filter);
		priv.elements.regionSelect = doc.getElementById(priv.ids.countryFilter);

		getAllData();
	};

	/**
	 * Loads all data from /data/data.json in memory
	 * and add it to priv.data.data
	 * --------------------------------------------------------------------- */
	var getAllData = function () {
		spinner(1);
		getJSON(priv.API.countries, function(data) {
			// Load Country Data:
			priv.data.countries = data;
			// Load ALL Data:
			getJSON(priv.API.data, function(data) {
				// console.table(data);
				priv.data.data = data;
				// priv.data.items = prepareData(data);
		
				// We have ze data: load ze charrt!
				initChart();

				// Success
				spinner(0);
			}, function(status) { console.error('Could not load DATA: %s', status); });
		}, function(status) { console.error('Could not load COUNTRIES: %s', status);});
	};

	/**
	 * Start/Stop spinner
	 * --------------------------------------------------------------------- */
	var spinner = function (state) {
		var spinEl = doc.querySelector('.' + priv.classes.spinner);
		if (spinEl) spinEl.style.display = state ? 'block' : 'none';
	};


	/**
	 * Initialize Google Chart (Dashboard)
	 * --------------------------------------------------------------------- */
	var initChart = function () {
		// Load the Visualization API and the corechart package.
		google.charts.load('current', {'packages':['corechart', 'controls']});

		// Set a callback to run when the Google Visualization API is loaded.
		google.charts.setOnLoadCallback(drawInitialChart);
	};


	/**
	 * draw Chart and fill with 1st option (Netherlands [150])
	 * --------------------------------------------------------------------- */
	var drawInitialChart = function () {
		// console.log('drawInitialChart()');

		// https://developers.google.com/chart/interactive/docs/gallery/controls#skeleton
  		var dashboard = new google.visualization.Dashboard(priv.elements.app);

		// Create the data table.
		var dataTable = new google.visualization.DataTable();
		dataTable.addColumn( { id: 'year', label: 'Year', type: 'date' } );

		// Create a country Select, passing some options
		// var yearSelect = new google.visualization.ControlWrapper({
		// 	'controlType': 'ChartRangeFilter',
		// 	'containerId': priv.ids.yearFilter,
		// 	'options': {
		// 		'filterColumnIndex': 0,
		// 		'ui': {
		// 			'chartType': 'LineChart', 
		// 			'chartOptions': {
		// 				'enableInteractivity': false,
		// 				'chartArea': {'width': '97%', 'height': '100%' },
		// 				'legend': { 'position': 'none' },
		// 				'hAxis': { 
		// 					'textPosition': 'in',
		// 					'viewWindowMode': 'pretty'
		// 				},
		// 				'vAxis': {
		// 					'textPosition': 'none',
		// 					'gridlines': { 'color': 'none' }
		// 				}
		// 			},
		// 			'chartView': {
		// 				// 'columns': [0, 1]
		// 			},
 	// 			}
		// 	}
		// 	// ,
		// 	// 'state': {
		// 	// 	'range': {
		// 	// 		'start': new Date('2010'), 
		// 	// 		'end': new Date('2014')
		// 	// 	}
		// 	// }
		// });

		var yearSelect = new google.visualization.ControlWrapper({
			'controlType': 'DateRangeFilter',
			'containerId': priv.ids.yearFilter,
			'options': {
				'filterColumnIndex': 0,
				'ui': {
					'label': 'Select year',
					'labelStacking': 'vertical',
					'format': {pattern: "yyyy"}
 				}
			}
		});

		// Add our Chart as Dashboard widget
		var chart = new google.visualization.ChartWrapper({
			'chartType': 'LineChart',
			'containerId': priv.ids.chart,
			'options': priv.chart.options
		});

		dashboard.bind(yearSelect, chart);

		// chart.draw(dataTable, priv.chart.options);

		// Add our Google Chart stuff to Private Object
		priv.chart.dataTable = dataTable;
		priv.chart.dashboard = dashboard;
		priv.chart.widget = chart;

		// .. add it also to Public Object
		_public.chart = chart;

		dashboard.draw(dataTable);

		// If we have NO state(.region) set
		// BUT do have URL params..
		// set state
		initFilters();
	};


	/**
	 * Adds a line to chart by adding a new Column to dataTable
	 * @param {Number} countryCode to add
	 * --------------------------------------------------------------------- */
	var addLine = function (countryCode) {
		var currCountry = priv.data.countries.filter(function(c){ return c.code === countryCode.toString(); });
		if (currCountry.length) { currCountry = currCountry[0]; }
		var currCountryData = priv.data.data.filter(function(d){ return d['Value'] && d['Area Code'] === currCountry.code; });
		var colNr = priv.chart.dataTable.getNumberOfColumns();

		// console.log('Adding Line: %s (%s)', currCountry.name,  currCountry.code);
		// console.log('How Many Columns? %s', colNr);

		// if (colNr > 1) {
		// 	// console.log('#### %s ', priv.chart.dataTableTable.getColumnId(1));
		// }

		if (currCountryData.length) {
			// // Update column Country label
			// priv.chart.dataTable.setColumnLabel(1, currCountry.name);

			// Add Line by *adding a Column* and updating Rows in that column
			priv.chart.dataTable.addColumn( { id: 'head', label: currCountry.name, type: 'number' } ) ;

			// Fill dataTable
			currCountryData.forEach(function(d, i){

				// priv.chart.dataTable.addRow( [{ v: new Date(d['Year']), f: d['Year']}, null, parseInt(d['Value'])] );

				var year =  new Date(d['Year']) || null;
				// var value = parseInt(d['Value']) || null;
				var value = Number(d['Value']) || null;

				if (year && value) {
					var arrRowData = [];
					arrRowData.push( { v: year, f: d['Year'] } );
					for (var k = 1; k < colNr; k++) {
						arrRowData.push( null );
					}
					arrRowData.push(value);

					// Add data for current Country to Chart
					priv.chart.dataTable.addRow(arrRowData);
				}
			});

		} else {
			// console.log('No data for country: %s', currCountry.name);
			// Add empty row
			priv.chart.dataTable.addColumn( { id: 'head', label: currCountry.name + '(No Data)', type: 'number' } ) ;
			var arrRowData = [{ v: new Date('1961'), f: 'No Data' }];
			for (var k = 1; k < colNr; k++) { arrRowData.push( null ); }
			arrRowData.push(0);

			// Add data for current Country to Chart
			priv.chart.dataTable.addRow(arrRowData);

		}
	};


	/**
	 * Add MULTIPLE lines
	 * @param {Array} arrCountryCodes
	 * --------------------------------------------------------------------- */
	var addLines = function (arrCountryCodes) {
		if (arrCountryCodes && arrCountryCodes.length) {
			for (var i = 0; i < arrCountryCodes.length; i++) {
				addLine(arrCountryCodes[i]);
			}
			priv.chart.dashboard.draw(priv.chart.dataTable);
		}
	};


	/**
	 * Remove a Line from the Chart
	 * --------------------------------------------------------------------- */
	var removeLine = function (colIndex) {
		// console.log('removeLine(%s) of %s', colIndex, priv.chart.dataTable.getNumberOfColumns());
		priv.chart.dataTable.removeColumn(colIndex);
	};


	/**
	 * Fills Country Select with Options from data.json
	 * And initializes Selectize.js plugin
	 * --------------------------------------------------------------------- */
	var initFilters = function () {
		// console.log('initialize Filter events');

		var rS = 'region=',
			urlCountryCode,
			initialCountryCode,
			lenCountries;

		if (location.search.indexOf(rS) > -1) {
			// We have a region in the URL, use that
			urlCountryCode = location.search.substring(location.search.indexOf(rS) + rS.length).split(',');
			if (!urlCountryCode.toString().length) { urlCountryCode = null; }

		}
		initialCountryCode = urlCountryCode ?  urlCountryCode : priv.chart.state.region || ['150'];

		lenCountries = priv.data.countries.length;
		if (lenCountries) {
			// Create Country <option>
			for (var i = 0; i < lenCountries; i++) {
				var country = doc.createElement('option');
				country.value = priv.data.countries[i].code;
				country.innerText = priv.data.countries[i].name;

				if (initialCountryCode.length > 1) {
					// initialCountryCode is an Array
					for (var j = 0; j < initialCountryCode.length; j++) {
						if (priv.data.countries[i].code === initialCountryCode[j].toString()) { country.selected = 'selected'; }
					}
				} else {
					// initialCountryCode is a single String in an Array
					if (priv.data.countries[i].code === initialCountryCode[0].toString()) { country.selected = 'selected'; }
				}

				priv.elements.regionSelect.appendChild(country);
			}

			updateState('region', initialCountryCode);

			// Initialize jQuery Selectize plugin
			// for Country Selector
			// ----------------------------------------------------------------
			var $selectize = $(priv.elements.regionSelect).selectize({
 				plugins: ['remove_button'],
				maxItems: 6,
				placeholder: 'Select a country/Region',
				hideSelected: true,
				onInitialize: onUpdateChart,
				onChange: function (value) {
					if (value) {
						// console.log('Changed: %s', value.toString());
						onUpdateChart(null, value);
						updateState('region', value.toString());
					} else {
						clearChart(true);
						updateState('region', '');
					}
				}
			});
			
			priv.elements.regionWidget = $selectize[0].selectize;
		}

		// Add Event for POPSTATE
		win.onpopstate = function (evt) {
			if (evt && evt.state && evt.state.region) {
				priv.elements.regionWidget.setValue(evt.state.region.toString().split(','));
			}
		}

	};


	/**
	 * Empties Line Chart, removes all lines
	 * @param  {Boolean} drawPlaceholderLine Should an empty Legend be displayed?
	 * --------------------------------------------------------------------- */
	var clearChart = function (drawPlaceholderLine) {
		var nrCols = priv.chart.dataTable.getNumberOfColumns();
		while (nrCols > 1) {
			removeLine(nrCols-1);
			nrCols--;
		}

		// Add empty row
		if (drawPlaceholderLine) {
			priv.chart.dataTable.addColumn( { id: 'empty', label: 'Select a Country', type: 'number' } ) ;
			priv.chart.dataTable.addRow([new Date(), 0]);
			priv.chart.dashboard.draw(priv.chart.dataTable);
		}
	};


	/**
	 * Callback for every update to State data.
	 * Add / Remove lines from Chart
	 * --------------------------------------------------------------------- */
	var onUpdateChart = function (evt, items) {

		// console.log('onUpdateChart');

		// Check to see if we've passed `items`
		// if so: we do not need the Event (`evt`) to figure
		// out selected options, but can draw the items directly
		// ..
		// This is added because Selectize.js allows for it
		if (items && items.length) {
			clearChart();
			addLines(items);
		} else {
			// console.log(evt);
			if (evt && evt.type) {
				if (evt.type === 'change') {
					// FILTER CHANGE
					var select = evt.target;

					// UPDATE option
					var selectedOptions = select.querySelectorAll(':checked');
					clearChart();
					addLines(selectedOptions);
				}
			} else {
				// Simply draw the [selected] value for our <select>
				// console.log('Draw (default) selected option');
				var currentValue = [].slice.call(priv.elements.regionSelect.querySelectorAll(':checked')).map(function(o){ return o.value; });
				if (currentValue) {
					addLines(currentValue);
				}
			}
		}

	};


	/**
	 * Updates the current STATE and updates URL params
	 * @param  {String} state what to update, e.g. 'region'
	 * @param  {String} value value of state, e.g. '150,68'
	 *
	 * NOTE: only state = `region`, for now...
	 * --------------------------------------------------------------------- */
	var updateState = function (state, value) {
		if (state) {
			// console.log('updateState: %s', value.toString());
			priv.chart.state[state] = value;

			// Update URL Params
			var urlParams = priv.chart.urlParams.replace('{' + state + '}', value.toString());
				// .replace('{2}', priv.elements.fromSelect.value)
				// .replace('{3}', priv.elements.toSelect.value);
			win.history.pushState(priv.chart.state, state + ': ' + value.toString(), location.origin + location.pathname + urlParams);

			// Track GWA microView
			// // console.log(Array.prototype.map.call(priv.elements.regionSelect.querySelectorAll('option[selected="selected"]'), function(i){ return i.innerText; }).toString());
			// if (typeof gwa_trackMicroView === 'function') {
			// 	gwa_trackMicroView('PigsAroundTheWorld new selection: ' + value.toString());
			// }
		}
	};


	// var onUpdateSelectizeChart = function (evt) {

	// };

	/**
	 * getJSON AJAX
	 * https://mathiasbynens.be/notes/xhr-responsetype-json
	 * @param  {[type]} url            [description]
	 * @param  {[type]} successHandler [description]
	 * @param  {[type]} errorHandler   [description]
	 * @return {[type]}                [description]
	 * --------------------------------------------------------------------- */
	var supportsJSON = (function() {
		if (typeof XMLHttpRequest == 'undefined') {
			return false;
		}
		var xhr = new XMLHttpRequest();
		xhr.open('get', '/', true);
		try {
			// some browsers throw when setting `responseType` to an unsupported value
			xhr.responseType = 'json';
		} catch(error) {
			return false;
		}
		return 'response' in xhr && xhr.responseType == 'json';
	}());
	var getJSON = function(url, successHandler, errorHandler) {
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		if (supportsJSON) { xhr.responseType = 'json'; }
		xhr.onload = function() {
			var status = xhr.status;
			if (status == 200) { successHandler && successHandler(supportsJSON ? xhr.response : JSON.parse(xhr.responseText)); } 
			else { errorHandler && errorHandler(status); }
		};
		xhr.send();
	};

	/**
	* 'Public' object, containing 'public' aliases of 'private' methods
	* @type {Object}
	 * --------------------------------------------------------------------- */
	var _public = {
		init: onInit,
		chart: null
	};
	return _public;
})(window, document);
/**
 * RUN / Initialize as
 */
PATW.init();


/**
 * Debounce Function
 * --
 * from: http://davidwalsh.name/javascript-debounce-function
 *
 * @param  {[type]} a 		`function` to execute
 * @param  {[type]} b 		`wait` — milliseconds to wait before re-calling function
 * @param  {[type]} c 		`immediate` — if passed: trigger on leading (instead of trailing) edge
 * @return {[type]}              function (`a`)
 *
 * USAGE:
 *     var myEfficientFn  =  debounce(function() {
 *         doSomethingExpensive();
 *     }, 250);
 *     window.addEventListener('resize', myEfficientFn);
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
// function debounce(a, b, c) {
// 	var d = null;

// 	return function () {
// 		var e = this;
// 		var f = arguments;

// 		clearTimeout(d);

// 		d = setTimeout(function () {
// 			d = null, c || a.apply(e, f);
// 		}, b), c && !d && a.apply(e, f);
// 	};
// };
