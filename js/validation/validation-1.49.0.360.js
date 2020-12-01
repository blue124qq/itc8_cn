function applyFormValidation(){$('[data-validation="validateform"]').on("mousedown",function(){formValidationInitiated=!0});$('[data-validation="validateform"]').on("click",function(){return validateForm(this)})}function applyValidationEvent(){$(".form--wide").on("blur",".validatefield",function(){if(!formValidationInitiated){var t=[],n=$(this).closest(".form__row").find("span[data-element='fieldlabel']").first().text();n=n.replace("*","").toLowerCase();t.push({FieldId:$(this).attr("id"),Value:$(this).attr("value"),Validator:$(this).attr("data-validatorname"),FieldName:n});validate(t)}})}function applyValidationEventHandler(){$("body").on("validate",function(){var t="",n=[],i="",r;$.each(validationList,function(){if($("#"+this.FieldId).closest(".form__row").find(".hint").first().html(this.Message),this.IsValid==!0&&($("#"+this.FieldId).parent().addClass("succes"),$("#"+this.FieldId).closest(".form__row").find(".hint").first().removeClass("error")),this.IsValid==!1&&($("#"+this.FieldId).parent().removeClass("succes"),$("#"+this.FieldId).closest(".form__row").find(".hint").first().addClass("error")),this.ErrorType=="Required"){var i=$("#"+this.FieldId).closest(".form__row").find("span[data-element='fieldlabel']").first().text();i=i.replace("*","").toLowerCase();n.push(i)}else this.Message&&(t+=this.Message+"<br />")});n.length>1?i=window.resources.esp_registrationpage_error_required_plural+": "+n:n.length==1&&(i=window.resources.esp_registrationpage_error_required_single+": "+n);t+=i;r=$("div[data-message=error]");r.html(t);showHideInfobar();styleErrorMessages()})}function validate(n){var t=[];return t.push($.ajax({type:"POST",url:"/js/general/validationhandler.ashx",contentType:"application/json; charset=utf-8",data:JSON.stringify(n),dataType:"json",cache:!1,success:function(n){$.each(n,function(){var n=this.FieldId,t=this.Message;validationList=$.grep(validationList,function(t){return t.FieldId!=n});validationList.push({FieldId:this.FieldId,IsValid:this.IsValid,Message:this.Message,ErrorType:this.ErrorType})})},fail:function(n){console.log("Validation call failed."+n)},complete:function(){$("body").trigger(validateEvent,validationList)}})),t}function validateForm(n){var t,i;return formIsValid?(formIsValid=!1,!0):(t=[],$.each($("[data-validatorname]"),function(){t.push({FieldId:$(this).attr("id"),Value:$(this).attr("value"),Validator:$(this).attr("data-validatorname")})}),i=validate(t,!1),$.when.apply(null,i).done(function(){if(formIsValid=isFormValid(),formIsValid)n.click();else{function t(){var n=!1,t;try{t=document.createElement("div");t.scrollTo({top:0,get behavior(){return n=!0,"smooth"}})}catch(i){}return n}var i=$("div[data-message=error]");i.is(":visible")&&(t()?window.scrollTo({left:0,top:106,behavior:"smooth"}):window.scrollTo(0,106))}}),formValidationInitiated=!1,!1)}function validateMagazineSubscriptionForm(n){var t,i;return formIsValid?(formIsValid=!1,!0):(t=[],$.each($("[data-field='subscription'][data-validatorname]"),function(){t.push({FieldId:$(this).attr("id"),Value:$(this).attr("value"),Validator:$(this).attr("data-validatorname")})}),i=validate(t,!1),$.when.apply(null,i).done(function(){formIsValid=isFormValid();formIsValid&&__doPostBack(""+n,"")}),formValidationInitiated=!1,!1)}function isFormValid(){validationList=$.grep(validationList,function(n){return $("#"+n.FieldId).length==0||!$("#"+n.FieldId).is(":visible")},!0);var n=!0;return $.each(validationList,function(){this.IsValid==!1&&(n=!1)}),n}function styleErrorMessages(){var n=$(".fieldinput>input").first().width(),t;n+=$(".fieldinput>input").first().hasClass("error")?2:4;t=$(".form__controls.fieldinput").position();$(".hint").each(function(){$(this).css("width",n)});$(".hint.error:not(:empty)").each(function(){var n=$(this).html();n+='<span class="rbi-icon-notification"><\/span>';$(this).html(n)});$('div[data-message="error"]').each(function(){var n=$(this).html();$(this).html(n)});$(".hint.error").parent().each(function(){$(this).find("input").addClass("error")});$(".hint").not(".error").parent().each(function(){$(this).find("input").removeClass("error")})}function showHideInfobar(){var n=$('div[data-message="error"]'),t=$("div.infobar__succes");$('div[data-message="error"], div.infobar__succes').each(function(){$.trim($(this).html()).length>0?$(this).show():$(this).hide()});n.is(":visible")&&!$(n).hasClass("infobar__succes")&&$(t).hide()}function validateMagazineSubscription(){var n=!0;return $("[data-field='subscription']").each(function(){$(this).hasClass("error")&&(n=!1)}),n&&(n=validateMagazineSubscriptionForm(btnSubscribeMagazineId)),n?($("#subscribeMagazineError").removeClass("infobar__error"),$("#subscribeMagazineError").hide()):($("#subscribeMagazineError").addClass("infobar__error"),$("#subscribeMagazineError").show()),n}var validationList=[],validateEvent=$.Event("validate"),formValidationInitiated=!1,formIsValid=!1;$(document).ready(function(){applyFormValidation();applyValidationEvent();applyValidationEventHandler();showHideInfobar();styleErrorMessages()})