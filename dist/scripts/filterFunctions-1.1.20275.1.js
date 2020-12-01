var filterFunctions = {
    constants: {
        ACTIVE_FILTER_CLASS: 'js-active-filter'
    },
    initFilters: function () {
        if ($('.filter-inner').length) {
            // filters
            $('.dropdown-wrapper .selected-txt').click(function () {
                if ($(this).hasClass('open')) {
                    $(this).removeClass('open');
                    $(this).siblings('.overlay').hide();
                    $(this).siblings('.dropdown-list').stop().slideUp();
                } else {
                    $(this).addClass('open');
                    $(this).siblings('.overlay').show();
                    $(this).siblings('.dropdown-list').stop().slideDown();
                }
            });

            $('.dropdown-wrapper .overlay').click(function () {
                $(this).hide();
                $(this).siblings('.dropdown-list').stop().slideUp();
                $(this).siblings('.selected-txt').removeClass('open');
            });

            // filters - single
            $('.dropdown-wrapper.single-select .dropdown-list label').click(function () {
                $(this).parent().parent().stop().slideUp();
                $(this).parent().parent().siblings('.overlay').hide();
                $(this).parent().parent().siblings('.selected-txt').removeClass('open');
            });

            // filters - select all
            $('.dropdown-wrapper .dropdown-list li.select-all input').change(function () {
                filterFunctions.detachResultsHandle();

                var allOptions = $(this).parents('.dropdown-list').find('li:visible input:checkbox');

                if ($(this).prop('checked')) {
                    var allNotCheckedOptions = $(this).parents('.dropdown-list').find('li:visible input:checkbox:not(:checked)');
                    allNotCheckedOptions.trigger('filter-change-check');
                } else {
                    var allCheckedOptions = $(this).parents('.dropdown-list').find('li:visible input:checkbox:checked');
                    allCheckedOptions.trigger('filter-change-check');
                }

                allOptions.prop('checked', $(this).prop('checked'));

                filterFunctions.reloadFilterResults();
                filterFunctions.handleResults();
            });

            // remove filter
            $('.filters-wrapper .chosen-filters').on('click', 'a', function () {
                $(this).parent().remove();
                var checkBoxItem = $('input[data-id=' + this.getAttribute('data-id') + ']');
                checkBoxItem.prop('checked', false);
                $('.dropdown-wrapper').removeClass(filterFunctions.constants.ACTIVE_FILTER_CLASS);
                checkBoxItem.parents('.dropdown-wrapper').addClass(filterFunctions.constants.ACTIVE_FILTER_CLASS);

                if ($('.js-job-list').length) {
                    $('.filter-inner .multi-select .dropdown-list input[data-title="' + $(this).parent().text().replace('+', '') + '"]').prop('checked', false);
                    filterFunctions.jobs.filterJobItems();
                    filterFunctions.jobs.saveFilterStateInHistory();
                }
            });

            filterFunctions.initSearchFilter();
            filterFunctions.initFilterPopup();

            if ($('.js-job-list').length) {
                // Handle for job list page
                filterFunctions.jobs.handleJobFilterSelection();
                filterFunctions.jobs.checkUrlForFilters();
            } else {
                filterFunctions.handleFilterSelection();
                var filterFromUrlParameter = commonFunctions.getUrlParameter('filter');

                if (filterFromUrlParameter && filterFromUrlParameter.length) {
                    if (filterFromUrlParameter.indexOf(',') !== -1) {
                        var filtersFromUrl = filterFromUrlParameter.split(',');

                        filterFunctions.detachResultsHandle();

                        filtersFromUrl.forEach(
                            function (element) {
                                filterFunctions.addFilterFromUrl(element);
                            }
                        );

                        filterFunctions.reloadFilterResults();
                        filterFunctions.handleResults();
                    } else {
                        filterFunctions.addFilterFromUrl(filterFromUrlParameter);
                    }
                } else {
                    filterFunctions.getFilterResults(null, null);
                }
            }

            if ($(window).width() < 961) {
                filterFunctions.handleFilterPopup();
            }
        }
    },
    initSearchFilter: function () {
        $('#gridsearchFilter').click(function () {
            var chosenFiltersContainer = $('.chosen-filters');
            var activeFilterItems = chosenFiltersContainer.find('span');
            filterFunctions.getFilterResults(activeFilterItems, null);
        });
        $('#gridsearchFilterInput').on('keydown', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                var chosenFiltersContainer = $('.chosen-filters');
                var activeFilterItems = chosenFiltersContainer.find('span');
                filterFunctions.getFilterResults(activeFilterItems, null);
            }
        });
    },
    initFilterPopup: function () {
        // popup
        $('.filters-wrapper .open-popup').click(function () {
            $('.filter-popup').stop().fadeIn();
            commonFunctions.popupPosition();
        });
        $('.popup .popup-overlay, .popup .popup-close').click(function () {
            $('.popup').stop().fadeOut();
        });
    },
    addFilterFromUrl: function (filterFromUrlParameter) {
        var filterItem = $('.filter-inner input[data-id="' + filterFromUrlParameter + '"]');

        if (filterItem.length) {
            if (filterItem.is(':checked')) {
                filterItem.trigger('filter-change-check');
            } else {
                filterItem.click();
            }

            filterFunctions.setActiveFilter(filterItem);
        }
    },
    setActiveFilter: function (current) {
        $('.dropdown-wrapper').removeClass(filterFunctions.constants.ACTIVE_FILTER_CLASS);
        $(current).parents('.dropdown-wrapper').addClass(filterFunctions.constants.ACTIVE_FILTER_CLASS);
    },
    jobs: {
        itemsPerPage: 9,
        handleJobFilterSelection: function () {
            var allMultiSelectOptions = $('.filter-inner .multi-select .dropdown-list input, .popup-inner .filter-items .dropdown-list input').not('.select-all input');
            var chosenFiltersContainer = $('.chosen-filters');

            allMultiSelectOptions.on('filter-change-check', function () {
                var self = $(this);

                filterFunctions.jobs.setActiveFilter(self);

                var ulElement = self.parents('ul').first();
                var chosenFiltersWithCurrentValue = chosenFiltersContainer.find('span:contains("' + self.attr('data-title') + '")');

                if (chosenFiltersWithCurrentValue.length) {
                    chosenFiltersWithCurrentValue.remove();
                } else {
                    filterFunctions.jobs.addChosenFilterItemToChosenFiltersContainer(ulElement.attr('data-filter-id'), self.attr('data-title'));
                }

                filterFunctions.jobs.filterJobItems();
                filterFunctions.jobs.saveFilterStateInHistory();
            });

            filterFunctions.handleMultiSelectOptionClick(allMultiSelectOptions);
            filterFunctions.jobs.filterJobItems();
        },
        addChosenFilterItemToChosenFiltersContainer: function (dataFilterId, dataTitle) {
            var chosenFiltersContainer = $('.chosen-filters');
            chosenFiltersContainer.append('<span data-filter-id="' + dataFilterId + '"><a href="javascript:;">+</a>' + dataTitle + '</span>');
        },
        saveFilterStateInHistory: function () {
            var filterItemsString = '';
            var activeFilterItems = filterFunctions.jobs.getFilterItems();

            if (activeFilterItems !== null && activeFilterItems !== undefined && activeFilterItems.length) {
                $.each(activeFilterItems, function (index, element) {
                    filterItemsString += encodeURIComponent(element) + ',';
                });
            }

            if (window.location.pathname.substr(window.location.pathname.length - 1) === '/') {
                history.replaceState(history.state, 'filter page', window.location.origin + window.location.pathname + '?filter=' + filterItemsString);
            } else {
                history.replaceState(history.state, 'filter page', window.location.origin + window.location.pathname + '/?filter=' + filterItemsString);
            }
        },
        getFilterItems: function () {
            var filterItems = $('.chosen-filters span');
            var filterItemTexts = [];

            $.each(filterItems, function (index, element) {
                filterItemTexts.push($(element).text().replace('+', ''));
            });

            return filterItemTexts;
        },
        checkUrlForFilters: function () {
            var filterFromUrlParameter = commonFunctions.getUrlParameter('filter');

            if (filterFromUrlParameter && filterFromUrlParameter.length) {
                var filtersFromUrl = filterFromUrlParameter.split(',');

                filtersFromUrl.forEach(
                    function (element) {
                        filterFunctions.jobs.addFilterFromUrl(decodeURIComponent(element));
                    }
                );
            }
        },
        addFilterFromUrl: function (filterFromUrlParameter) {
            var filterItem = $('.filter-inner input[data-title="' + filterFromUrlParameter + '"]');

            if (filterItem.length) {
                if (filterItem.is(':checked')) {
                    filterItem.trigger('filter-change-check');
                } else {
                    filterItem.click();
                }
            }
        },
        setActiveFilter: function (current) {
            $('.js-job-list ul.dropdown-list').removeClass(filterFunctions.constants.ACTIVE_FILTER_CLASS);
            $(current).parents('ul').addClass(filterFunctions.constants.ACTIVE_FILTER_CLASS);
        },
        filterJobItems: function () {
            $('.job-list .col').hide();
            filterFunctions.jobs.getJobsToShow().slice(0, filterFunctions.jobs.itemsPerPage).show();
            commonFunctions.pagination.initNumbers();
            commonFunctions.pagination.currentPaginationPage = 0;
            commonFunctions.pagination.init(filterFunctions.jobs.showJobsForActivePageNumber, filterFunctions.jobs.showJobsForActivePageNumber, filterFunctions.jobs.showJobsForActivePageNumber);
        },
        getJobsToShow: function () {
            var allJobs = $('.job-list .col');
            var jobsToShow = allJobs.slice(0, allJobs.length);

            jobsToShow = filterFunctions.jobs.returnFilterJobsThatContainAnyOfFilterItems('1', jobsToShow);
            jobsToShow = filterFunctions.jobs.returnFilterJobsThatContainAnyOfFilterItems('2', jobsToShow);
            jobsToShow = filterFunctions.jobs.returnFilterJobsThatContainAnyOfFilterItems('3', jobsToShow);
            jobsToShow = filterFunctions.jobs.returnFilterJobsThatContainAnyOfFilterItems('4', jobsToShow);

            filterFunctions.jobs.displayOptionsFromJobs(jobsToShow);

            return jobsToShow;
        },
        displayOptionsFromJobs: function (jobList) {
            var filterOptionsToShow1 = [];
            var filterOptionsToShow2 = [];
            var filterOptionsToShow3 = [];
            var filterOptionsToShow4 = [];

            var tmp1 = '';
            var tmp2 = '';
            var tmp3 = '';
            var tmp4 = '';

            $.each(jobList, function (index, element) {
                tmp1 = $(element).attr('data-filter1');
                if (tmp1 !== '||') {
                    filterOptionsToShow1.push(tmp1);
                }

                tmp2 = $(element).attr('data-filter2');
                if (tmp2 !== '||') {
                    filterOptionsToShow2.push(tmp2);
                }

                tmp3 = $(element).attr('data-filter3');
                if (tmp3 !== '||') {
                    filterOptionsToShow3.push(tmp3);
                }

                tmp4 = $(element).attr('data-filter4');
                if (tmp4 !== '||') {
                    filterOptionsToShow4.push(tmp4);
                }

                tmp1 = tmp2 = tmp3 = tmp4 = '';
            });

            $.unique(filterOptionsToShow1);
            $.unique(filterOptionsToShow2);
            $.unique(filterOptionsToShow3);
            $.unique(filterOptionsToShow4);

            if (!filterOptionsToShow1.length && !filterOptionsToShow2.length && !filterOptionsToShow3.length && !filterOptionsToShow4.length) {
                filterFunctions.jobs.showAllFiltersWithAllOptions();
            } else {
                filterFunctions.jobs.displayCustomFilterOptions(1, filterOptionsToShow1);
                filterFunctions.jobs.displayCustomFilterOptions(2, filterOptionsToShow2);
                filterFunctions.jobs.displayCustomFilterOptions(3, filterOptionsToShow3);
                filterFunctions.jobs.displayCustomFilterOptions(4, filterOptionsToShow4);
            }

            if (!$('.chosen-filters span').length) {
                filterFunctions.jobs.showAllFiltersWithAllOptions();
            }
        },
        showAllFiltersWithAllOptions: function () {
            $('.js-job-list .col, .js-job-list li').show();
        },
        displayCustomFilterOptions: function (filterId, filterOptionsToShow) {
            var filter = $('ul[data-filter-id=' + filterId + ']');

            if ($(filter).hasClass(filterFunctions.constants.ACTIVE_FILTER_CLASS)) {
                return;
            }

            if (filterOptionsToShow.length) {
                filter.find('li').hide();
                $(filter).parents('.col').show();

                $.each(filterOptionsToShow, function (index, element) {
                    var item = filter.find('[data-title="' + filterFunctions.jobs.stripDelimiters(element) + '"]');
                    if (item.length) {
                        $(item).parents('li').show();
                    }
                });
            } else {
                $(filter).parents('.col').hide();
            }
        },
        stripDelimiters: function (element) {
            return element.replace('|', '').replace('|', '');
        },
        filterJobsBySelectedOptionsOfTheFilter: function (filterNumber, jobsToShow) {
            var filterSelectedOptions = $('.chosen-filters span[data-filter-id="' + filterNumber + '"]');
            filterSelectedOptions.each(function (index, element) {
                var filterItemText = $(element).text().replace('+', '');
                var elementsToRemove = jobsToShow.filter(':not([data-filter' + filterNumber + '*="|' + filterItemText + '|"])');

                if (elementsToRemove.length) {
                    jobsToShow = jobsToShow.filter(function (indexOfEl, el) { //eslint-disable-line
                        return elementsToRemove.index(el) < 0;
                    });
                }
            });

            return jobsToShow;
        },
        returnFilterJobsThatContainAnyOfFilterItems: function (filterNumber, jobsToShow) {
            var returnArray = [];
            var filterSelectedOptions = $('.chosen-filters span[data-filter-id="' + filterNumber + '"]');

            if (filterSelectedOptions.length === 0) {
                return jobsToShow;
            }

            filterSelectedOptions.each(function (index, element) {
                var filterItemText = $(element).text().replace('+', '');
                var elementsToAdd = $(jobsToShow).filter('[data-filter' + filterNumber + '*="|' + filterItemText + '|"]');

                if (elementsToAdd.length) {
                    $.merge(returnArray, elementsToAdd);
                }
            });

            // return jobsToShow;
            return $.unique($(returnArray));
        },
        returnFilterJobsThatContainAnyOfFilterItems2: function (filterNumber, jobsToShow) {
            var returnArray = [];
            var filterSelectedOptions = $('.chosen-filters span[data-filter-id="' + filterNumber + '"]');

            if (filterSelectedOptions.length === 0) {
                return returnArray;
            }

            filterSelectedOptions.each(function (index, element) {
                var filterItemText = $(element).text().replace('+', '');
                var elementsToAdd = $(jobsToShow).filter('[data-filter' + filterNumber + '*="|' + filterItemText + '|"]');

                if (elementsToAdd.length) {
                    $.merge(returnArray, elementsToAdd);
                }
            });

            // return jobsToShow;
            return $.unique($(returnArray));
        },
        showJobsForActivePageNumber: function () {
            var jobsToShow = filterFunctions.jobs.getJobsToShow();
            jobsToShow.hide();
            jobsToShow.slice(commonFunctions.pagination.currentPaginationPage * filterFunctions.jobs.itemsPerPage, (commonFunctions.pagination.currentPaginationPage + 1) * filterFunctions.jobs.itemsPerPage).show();
            window.scrollTo(0, 0);
        }
    },
    handleFilterPopup: function () {
        var selectedFilters = $('.popup-inner .filter-items .dropdown-list input:checked:not(.select-all)');
        var filtersContainers = $('.filters-wrapper.has-popup .filter-inner .col');
        filterFunctions.handleMultiSelectOptionClick(selectedFilters);

        if (filtersContainers.length <= 3) {
            $('.filters-wrapper.has-popup .open-popup').hide();
        } else {
            $('.filters-wrapper.has-popup .open-popup').show();

            if (!$('.job-list').length) {
                filtersContainers.hide();
            }
        }

        var filterSubmitButton = $('#filter-search');
        filterSubmitButton.on('click', function () {
            $('.popup').stop().fadeOut();
        });
    },
    handleFilterSelection: function () {
        var allSingleSelectOptions = $('.filter-inner .single-select .dropdown-list input').not('.select-all input');
        var allMultiSelectOptions = $('.filter-inner .multi-select .dropdown-list input, .popup-inner .filter-items .dropdown-list input').not('.select-all input');
        var chosenFiltersContainer = $('.chosen-filters');

        allSingleSelectOptions.click(function () {
            filterFunctions.manageSelectedFilters(chosenFiltersContainer, $(this).attr('data-id'), $(this).attr('data-filter-container-id'), $(this).attr('data-title'));
        });

        allMultiSelectOptions.on('filter-change-check', function () {
            var filterContainer = $(this).parents('.dropdown-wrapper');
            if (!filterContainer.hasClass(filterFunctions.constants.ACTIVE_FILTER_CLASS)) {
                $('.dropdown-wrapper').removeClass(filterFunctions.constants.ACTIVE_FILTER_CLASS);
                filterContainer.addClass(filterFunctions.constants.ACTIVE_FILTER_CLASS);
            }

            filterFunctions.manageSelectedFilters(chosenFiltersContainer, $(this).attr('data-id'), $(this).attr('data-filter-container-id'), $(this).attr('data-title'));
        });

        filterFunctions.handleMultiSelectOptionClick(allMultiSelectOptions);
        filterFunctions.handleResults();
        commonFunctions.pagination.init(filterFunctions.reloadFilterResults, filterFunctions.reloadFilterResults, filterFunctions.reloadFilterResults);
    },
    getFilterResults: function (activeFilterItems, pageNumber) {
        filterFunctions.saveFilterStateInHistory(activeFilterItems);

        if (pageNumber !== null) {
            commonFunctions.pagination.currentPaginationPage = pageNumber;
        } else {
            commonFunctions.pagination.currentPaginationPage = 0;
        }

        var data = filterFunctions.organizeSelectedFilters(activeFilterItems);
        var searchValue = $('#gridsearchFilterInput').val();
        var pageId = $('#PageId').val();
        var preferredCulture = $('#PreferredCulture').val();
        var boxesContainer = $('.three-cols-wrap .wrapper')[0];
        var paginationContainer = $('.pagination')[0];
        var noResultsContainer = $('.three-cols-wrap .wrapper')[1];
        var $whiteStripeEl = $('.white-stripe');

        $(boxesContainer).empty();
        $(paginationContainer).empty();

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: 'GetFilteredItems',
            traditional: true,
            data: JSON.stringify({
                'filterData': data,
                'searchValue': searchValue,
                'pageId': pageId,
                'currentPaginationPage': commonFunctions.pagination.currentPaginationPage,
                'preferredCulture': preferredCulture
            }),
            success: function (resultData) {
                $(boxesContainer).first().append(resultData.boxes);

                var loaded = 0;
                var resultImages = $('.three-cols-wrap .wrapper img');
                $(resultImages).on('load', function () {
                    loaded += 1;

                    if (loaded === $(resultImages).length) {
                        nuscienceFunctions.threeColsHeight();
                    }
                });

                // If it doesn't have any images, don't wait to load images apply height correction function (Nuscience job list doesn't have images)
                if (resultImages.length === 0) {
                    nuscienceFunctions.threeColsHeight();
                }

                var paginationWrapper = $(paginationContainer);

                if (resultData.pagination === '') {
                    paginationWrapper.hide();
                } else {
                    paginationWrapper.show();
                    paginationWrapper.append(resultData.pagination);
                }

                if (resultData.filteredNumberOfResults === 0) {
                    $(noResultsContainer).show();
                    $whiteStripeEl.hide();
                } else {
                    $(noResultsContainer).hide();
                    $whiteStripeEl.show();
                }

                // Manage filter items from results
                if (resultData.filters.length) {
                    filterFunctions.displayFilterContainersThatHaveAvailableOptions(resultData);
                }
            },
            error: function (e, a) {
                console.log(e, a);
            }
        });
    },
    displayFilterContainersThatHaveAvailableOptions: function (resultData) {
        var allFilterContainers = $('.dropdown-wrapper');

        if (!$('.' + filterFunctions.constants.ACTIVE_FILTER_CLASS + ' ul li input:not(.select-all):checked').length) {
            $(allFilterContainers).removeClass(filterFunctions.constants.ACTIVE_FILTER_CLASS);
        }

        var allFilterItems = allFilterContainers.not('.' + filterFunctions.constants.ACTIVE_FILTER_CLASS).find('.dropdown-list input:not(.select-all)');
        var filterContainersThatShouldBeHidden = allFilterContainers.filter(
            function (index, obj) {
                var containerId = $(obj).attr('data-filter-container-id');
                var containsFilterItem = false;

                $.each(resultData.filters, function (index2, element) {
                    if (element.FilterContainerId === containerId) {
                        containsFilterItem = true;
                        return false;
                    }
                    return true;
                });

                return !containsFilterItem;
            });

        if (filterContainersThatShouldBeHidden.length) {
            filterFunctions.displayParentCustomElement(allFilterContainers, '.col', false);
            filterFunctions.displayParentCustomElement(filterContainersThatShouldBeHidden, '.col', true);
        }

        if (resultData.filters.length) {
            filterFunctions.displayParentCustomElement(allFilterItems, 'li', true);

            // get all filter items that should be displyed
            var filterItemsThatShouldBeShown = [];
            $.each(resultData.filters, function (index, element) {
                $.each(element.FilterItemIds, function (index2, element2) {
                    var filterItemElement = $(allFilterItems).filter('[data-id="' + element2.FilterItemId + '"]');

                    if (filterItemElement !== null && filterItemElement !== undefined && filterItemElement.length) {
                        $.merge(filterItemsThatShouldBeShown, filterItemElement);
                    }
                });
            });

            filterFunctions.displayParentCustomElement($(filterItemsThatShouldBeShown), 'li', false);
        }
    },
    displayParentCustomElement: function (elementsArray, parentSelector, shouldHide) {
        elementsArray.each(function (index, element) {
            var column = $(element).parent(parentSelector);
            if (shouldHide) {
                column.hide();
            } else {
                column.show();
            }
        });
    },
    organizeSelectedFilters: function (activeFilterItems) {
        var filterContainers = [];

        if (activeFilterItems !== null && activeFilterItems !== undefined) {
            activeFilterItems.each(function (index, element) {
                var containsFilterContainerId = filterContainers.filter(
                    function (e) {
                        return e.FilterContainerId === $(element.firstChild).attr('data-filter-container-id');
                    });

                if (containsFilterContainerId.length > 0) {
                    var containerIndexInArray = filterContainers.indexOf(containsFilterContainerId[0]);
                    filterContainers[containerIndexInArray].FilterItemIds.push({
                        'FilterItemId': $(element.firstChild).attr('data-id')
                    });
                } else {
                    filterContainers.push({
                        'FilterContainerId': $(element.firstChild).attr('data-filter-container-id'),
                        'IsActiveFilter': $('[data-filter-container-id="' + $(element.firstChild).attr('data-filter-container-id') + '"]').hasClass(filterFunctions.constants.ACTIVE_FILTER_CLASS),
                        'FilterItemIds':
                        [
                            {
                                'FilterItemId': $(element.firstChild).attr('data-id')
                            }
                        ]
                    });
                }
            });
        }

        return filterContainers;
    },
    handleMultiSelectOptionClick: function (allMultiSelectOptions) {
        allMultiSelectOptions.click(function () {
            $(this).trigger('filter-change-check');
        });
    },
    manageSelectedFilters: function (container, dataId, dataFilterContainerId, dataTitle) {
        var existingSelectedFilter = container.find('a[data-id="' + dataId + '"]');

        if (existingSelectedFilter.length) {
            existingSelectedFilter.parent().remove();
        } else {
            var newItem = $('<span><a href="javascript:;" data-id="' + dataId + '" data-filter-container-id="' + dataFilterContainerId + '">+</a>' + dataTitle + '</span>');
            container.append(newItem);
        }
    },
    handleResults: function () {
        var chosenFiltersContainer = $('.chosen-filters');

        chosenFiltersContainer.on('DOMNodeRemoved', 'span', filterFunctions.getFilterResultsForRemovedNodeEvent);
        chosenFiltersContainer.on('DOMNodeInserted', 'span', filterFunctions.getFilterResultsForInsertedNodeEvent);
    },
    detachResultsHandle: function () {
        var chosenFiltersContainer = $('.chosen-filters');

        chosenFiltersContainer.off('DOMNodeRemoved', 'span', filterFunctions.getFilterResultsForRemovedNodeEvent);
        chosenFiltersContainer.off('DOMNodeInserted', 'span', filterFunctions.getFilterResultsForInsertedNodeEvent);
    },
    getFilterResultsForRemovedNodeEvent: function (e) {
        var chosenFiltersContainer = $('.chosen-filters');
        var itemToBeDeleted = e.target;
        var activeFilterItems = chosenFiltersContainer.find('span');

        activeFilterItems.splice($.inArray(itemToBeDeleted, activeFilterItems), 1);
        filterFunctions.getFilterResults(activeFilterItems, null);
    },
    getFilterResultsForInsertedNodeEvent: function (e) {
        if (e.target.nodeName === 'SPAN') {
            var chosenFiltersContainer = $('.chosen-filters');
            var activeFilterItems = chosenFiltersContainer.find('span');

            filterFunctions.getFilterResults(activeFilterItems, null);
        }
    },
    removeSelectedFilterItem: function () {
        var dataId = $(this).attr('data-id');
        var optionToUpdate = $('.dropdown-wrapper.multi-select ul li input[data-id="' + dataId + '"]');

        if (optionToUpdate.length) {
            optionToUpdate.prop('checked', !optionToUpdate.prop('checked'));
        }

        $(this).parent().remove();
    },
    reloadFilterResults: function () {
        var activeFilterItems = $('.chosen-filters span');
        filterFunctions.getFilterResults(activeFilterItems, commonFunctions.pagination.currentPaginationPage);
    },
    saveFilterStateInHistory: function (activeFilterItems) {
        var filterItemsString = '';
        if (activeFilterItems !== null && activeFilterItems.length) {
            var selectedFilterItems = activeFilterItems.find('a');

            $.each(selectedFilterItems, function (index, element) {
                filterItemsString += $(element).attr('data-id') + ',';
            });
        }

        if (window.location.pathname.substr(window.location.pathname.length - 1) === '/') {
            history.replaceState(history.state, 'filter page', window.location.origin + window.location.pathname + '?filter=' + filterItemsString);
        } else {
            history.replaceState(history.state, 'filter page', window.location.origin + window.location.pathname + '/?filter=' + filterItemsString);
        }
    }
};
