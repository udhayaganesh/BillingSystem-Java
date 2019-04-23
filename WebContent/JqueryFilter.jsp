<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="./script/jquery-1.4.4.js"></script>
<script language="JavaScript" src="./script/jquery-latest.js"></script>
<script type="text/javascript" src="./script/scripts-pack.js"></script>
<script language="javascript">
$(document).ready(function() {  
	
    // Initialise Plugin
    var options = {
        clearFiltersControls: [$('#cleanfilters')]           
    };
    $('#tab2').tableFilter(options);
});	
function callServlet() 
{ 
	 try
	 { 
		 var oForm = document.forms[0];
		 var sBody = getRequestBody(oForm);
		 $.ajax({         
			 type: "post",         
			 url:  "TestServlet?curDate="+new Date().getTime(),
			 dataType: 'text',
			 data: sBody,  
			 success: function(result) 
			 {
				 alert(result);
			 }    
		 });     
		 return false; 
	 }
	catch(e)
	{
		alert(e);
	}
} 

function getRequestBody(oForm) {
	
	 var aParams = new Array();
	 for (var i=0 ; i < oForm.elements.length; i++) {
	 var sParam = encodeURIComponent(oForm.elements[i].name);
	 sParam += "=";
	 sParam += encodeURIComponent(oForm.elements[i].value);
	 aParams.push(sParam);
	 } 
	 
	 return aParams.join("&"); 
	 }
	/* 
var filesizeinfo=0;
function GetXmlHttpObject() {

var xmlreq = false;

// Create XMLHttpRequest object in non-Microsoft browsers

if (window.XMLHttpRequest) {

xmlreq = new XMLHttpRequest();

} else if (window.ActiveXObject) {

try {

// Try to create XMLHttpRequest in later versions

// of Internet Explorer

xmlreq = new ActiveXObject("Msxml2.XMLHTTP");

} catch (e1) {

// Failed to create required ActiveXObject

try {

// Try version supported by older versions

// of Internet Explorer

xmlreq = new ActiveXObject("Microsoft.XMLHTTP");

} catch (e2) {

// Unable to create an XMLHttpRequest by any means

xmlreq = false;

}

}

}

return xmlreq;

}
function callMailcommonmailrovedServlet() 
{
	 try
	 {
	 	var url="TestServlet?curDate="+new Date().getTime()
 		httpRequest = GetXmlHttpObject();
 		
		if (httpRequest == null)
		{
	       return;
	   	}
		
		httpRequest.open("GET", url, true);
	 	httpRequest.onreadystatechange=responseData;	
	 	httpRequest.send(null);
	}
	catch(e)
	{
		alert("Test"+e);
	}
}

function responseData(result)
{
	if (httpRequest.readyState==4)
	     {
		   if (httpRequest.status==200)
		   {
				alert(result);
		   }
	 	 }	
}*/
</script>
</head>
<body>
<form name="f1">User name : <input type="text" name="n1" id="n1" />
Password : <input type="text" name="p1" id="p1" /> <input type="button"
	name="b1" value="Submit" onclick="callServlet()" /><br />
<table id="tab1">
	<thead>
		<tr>
			<th>Name</th>
			<th>Address</th>
		</tr>
	</thead>
	<tbody>
		<%
			for (int i = 0; i < 100; i++) {
		%>
		<tr>
			<td>Raj<%=i%></td>
			<td>123<%=i%></td>
		</tr>
		<%
			}
		%>
	</tbody>
</table>

<table id='tab2'>
	<thead>
		<tr>
			<th>Product Code</th>
			<th>Product Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>3</td>
			<td>4</td>
		</tr>
		<tr>
			<td>5</td>
			<td>6</td>
		</tr>
		<tr>
			<td>7</td>
			<td>8</td>
		</tr>
	</tbody>
</table>
<%-- <menu:renderMenuFromDB roleid="<%=userDetail.getRoleId()%>"/> --%>
</form>
</body>
</html>