function bindChangeEventToCombinedDataFields(){$(".form--wide").on("change","[data-fieldtype='combined-data']",function(){changeEventHandler($(this))})}function addAnotherCascadingDropdownField(n,t,i,r,u){n.parent().toggle();$("body").find("[data-fieldindex='"+(t-1)+"']").find("[data-type='removecascadingdropdown']").toggle();$.ajax({type:"GET",url:"/js/general/cascadingdropdownfieldhandler.ashx",contentType:"application/json; charset=utf-8",data:{fieldId:i,fieldIndex:t,fieldName:r,fieldPrefix:u,action:"newfield"},cache:!1,success:function(t){n.parent().after(t)},error:function(n){console.log(n)}})}function changeEventHandler(n){var r=n.find(":selected").data("identifier"),u=n.find(":selected").val(),i=n.data("profilefieldid"),f=n.data("fieldprefix"),e=n.data("fieldlevel"),t=n.data("fieldindex")?n.data("fieldindex"):1;$.ajax({type:"GET",url:"/js/general/cascadingdropdownfieldhandler.ashx",contentType:"application/json; charset=utf-8",data:{fieldId:i,valueId:r,fieldIndex:t,fieldPrefix:f,fieldLevel:e,value:u},cache:!1,success:function(r){n.closest(".form__controls").find("span.hint").first().hasClass("error")&&(n.closest(".form__controls").find("span.hint").first().removeClass("error"),n.closest(".form__controls").find("span.hint").first().html(""));r!="<!-- -->"&&(n.parent("[data-type]").length>0?(n.nextAll("[data-type='select'][data-fieldindex='"+t+"']").remove(),n.nextAll("[data-type='multipleselect'][data-fieldindex='"+t+"']").remove()):n.closest("[data-type='select']").next("[data-type='multipleselect']").length==0&&n.closest("[data-type='select']").nextAll("div[data-fieldindex='"+t+"']").remove(),n.parent("[data-type]").length>0?n.next().after(r):n.closest("[data-type='select']").after(r),n.parent("[data-type]").length>0?n.parent().find("select[data-profilefieldid='"+i+"'][data-fieldtype='combined-data']:last").focus():n.closest("[data-type='select']").next().find("select[data-fieldtype='combined-data']").last().focus())},error:function(n){console.log(n)}})}function removeCascadingDropDown(n,t){n.closest("[data-type='field']").find("[data-type='addanotherlink'][data-fieldindex='"+t+"']").toggle();n.closest("[data-type='field']").find("[data-fieldindex='"+(t-1)+"']").find("[data-type='removecascadingdropdown']").toggle();n.closest("[data-type='field']").find("[data-type='addanotherlink'][data-fieldindex='"+(t+1)+"']").remove();n.closest("[data-type='field']").find("[data-fieldindex='"+t+"'][data-type='multipleselect']").remove();n.closest("[data-type='field']").find("[data-fieldindex='"+t+"'][data-type='select']").remove()}$(document).ready(function(){typeof $.datepicker!="undefined"&&($.datepicker.regional.nl={closeText:"Sluiten",prevText:"←",nextText:"→",currentText:"Vandaag",monthNames:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],monthNamesShort:["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],dayNames:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],dayNamesShort:["zon","maa","din","woe","don","vri","zat"],dayNamesMin:["zo","ma","di","wo","do","vr","za"],weekHeader:"Wk",dateFormat:"dd-mm-yy",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},$.datepicker.setDefaults($.datepicker.regional.nl),$("input.date").datepicker(),$("input.datenl").datepicker());$("input.avatar:file").change(function(){var n=$(this).attr("id");$("input#"+n+"radio_3").attr("checked",!0)});bindChangeEventToCombinedDataFields()})