<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="script/jquery-1.4.4.js"></script>
<script language="JavaScript" src="script/jquery-latest.js"></script>
<script type="text/javascript" src="script/scripts-pack.js"></script>
<style>
a{  color:black; text-decoration: none;}
a:link {color:black;}      /* unvisited link */
a:visited {color:black;}  /* visited link */
a:hover {color:black;}  /* mouse over link */
a:active {color:black;}  
.odd{background-color: white;} 
  .even{background-color: #6D7B8D;}
   
</style>
<%
	String org = request.getParameter("val");
	System.out.println(org);
%>

<script language="javascript">
var flg=true;
var classflg=true;
var helpToken,SearchTextVal,strArgs;

function help(helpToken,SearchTextVal,strArgs)
{
	helpToken=helpToken;
	SearchTextVal=SearchTextVal;
	strArgs=strArgs;
}
$(document).ready(function() {  
    $('#tableView').mouseover(function() 
    {  
     if(flg)
     {
     	var options = {clearFiltersControls: [$('#cleanfilters')]};
  	 	$('#tableShow').tableFilter(options);
  	 	flg=false;
  	 }
    }); 
});	
function setValue(value)
{
	var getValue=SearchTextVal;
	/*var obj=parent.document.getElementById(getValue);
	obj.value=value;
	alert(parent.eventObj);
	parent.eventObj.value=value;
	alert(parent.eventObj);
	parent.document.getElementById("hid").value=value;*/
	parent.document.getElementById("helpframe").style.visibility="hidden" ;
}
function formTable(header,dbValues)
{
	var THeadStr,TDStr ;
	var headerVal= header.split('|');
	var value= dbValues.split('|');
	//Build Header Table
		THeadStr = "<table id='tableShow'>"  ;
		THeadStr = THeadStr+ "<thead><tr>" ;
		for (var i = 0 ;i < 2; i++) {
	      	THeadStr = THeadStr + "<th>" + headerVal[i] + "</th>"  ;
		}
		THeadStr = THeadStr + "</tr></thead>" ;
		//Build Data Table 
		TableStr = ""  ;
		TDStr = "<tbody><tr class='even'>" ;
		var colFlag=0;
		var setValue=0;
		for (var j = 0 ; j<value.length; j++ ) {
		
			if(j%2==0)
				setValue=value[j];
				
		    TDStr = TDStr + "<td onclick='setValue("+setValue+");'>"+value[j]+"</td>";
		    colFlag=colFlag+1;
		    if(colFlag==2)
		    {
		    	colFlag=0;
		    	if(value.length==j+1)
		    		TDStr =TDStr +"</tr>";
				else
				{	
					if(classflg)
					{
						TDStr =TDStr +"</tr><tr class='odd'>";
						classflg=false;
					}
					else
					{
						TDStr =TDStr +"</tr><tr class='even'>";
						classflg = true;
					}
				}		    	
		    }
		}
		TDStr =TDStr +"</tbody></table>";
		var tableView=document.getElementById("tableView");
		//alert(THeadStr +TDStr);
		tableView.innerHTML = THeadStr +TDStr;
		return THeadStr +TDStr;
}
</script>
</head>
<body width=100% topmargin=0px leftmargin=0px
	style="cursor: hand; border: 5px outset SILVER;"
	onload="formTable('Product Code|Product Description','3|4|5|6|7|8|3|4|5|6|7|8|3|4|5|6|7|8|3|4|5|6|7|8|3|4|5|6|7|8|3|4|5|6|7|8|3|4|5|6|7|8|3|4|5|6|7|8|3|4|5|6|7|8|3|4|5|6|7|8|3|4|5|6|7|8|3|4|5|6|7|8');">
<form name="f1"><input type=button align="left" value="X" onclick=parent.document.getElementById("helpframe").style.visibility="hidden" 
	style="color: white; background-color: #517B96; border: 2px outset; border-color: lightgrey; width: 20px; height: 19px; font: bold 8pt verdana;"
	onclick="window.close()" id=button1 name=button1>
<div id=tableView></div>
<!-- <table id=tableView ></table>--></form>
</body>
</html>