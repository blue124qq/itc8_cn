function defaultPageID()
{
	var pageName=window.location.pathname;
	var tempIndex1=pageName.indexOf("?");

	if(tempIndex1!=-1)
	{
		pageName=pageName.substr(0,tempIndex1);
	}

	var tempIndex2=pageName.indexOf("#");

	if(tempIndex2!=-1)

	{
		pageName=pageName.substr(0,tempIndex2);
	}

	var tempIndex3=pageName.indexOf(";");

	if(tempIndex3!=-1)
	{
		pageName=pageName.substr(0,tempIndex3);
	}

	var filenamePos1=pageName.lastIndexOf("/index.");
	var filenamePos2=pageName.lastIndexOf("/default.");
	if(filenamePos1 > -1)
	{
		pageName=pageName.substr(0,filenamePos1+1);
	}
	else if(filenamePos2 > -1)
	{
		pageName=pageName.substr(0,filenamePos2+1);
	}

	while(pageName.indexOf("/")==0)
	{
		pageName=pageName.substr(1,pageName.length);
	}
	
	if(pageName.length==0){pageName="/";}

	return(pageName);
}

function cmCustomLinkClickHandler(link) { 
        if ((link.href.indexOf(".doc") > -1) || (link.href.indexOf(".docx") > -1) || (link.href.indexOf(".xls") > -1) || (link.href.indexOf(".xlsx") > -1) || (link.href.indexOf(".ppt") > -1) || (link.href.indexOf(".pps") > -1) || (link.href.indexOf(".pdf") > -1) || (link.href.indexOf(".jpg") > -1) || (link.href.indexOf(".gif") > -1) || (link.href.indexOf(".tif") > -1) || (link.href.indexOf(".eps") > -1) || (link.href.indexOf(".png") > -1) || (link.href.indexOf(".mp3") > -1) || (link.href.indexOf(".pdf") > -1)) { 
                cmCreatePageviewTag(link.href, "FILE DOWNLOADS");
				cmCreateConversionEventTag(link.href,2,"FILE DOWNLOADS");
        }
} 
