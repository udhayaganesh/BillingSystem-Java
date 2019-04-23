<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<title>Bill Soft</title>
<LINK rel=stylesheet type=text/css href="./css/t1_core_logged_out.bundle.css">
<LINK rel=stylesheet type=text/css href="./css/t1_more.bundle.css">
<SCRIPT language="JavaScript" src="./script/common.js"></SCRIPT>
<script> 
var w_FldObj;
function keyPressEvents(w_FldObj)
{				
	if(isEnterKeyPressed() || window.event.keyCode == KEY_TAB)
	{   
		switch(w_FldObj.name)
		{
			case "option"		  : validateOption();break;
			case "category"       : validateCat();break;
			case "pcode"          : validatePCode();break;
			case "pdesc"          : validatePDesc();break;
			case "punit"          : validateUnit();break;
			case "measure"          : validateMeas();break;
		}
	}
	else if(window.event.keyCode == KEY_ESC) 
	  {
	  	  var r=confirm("Are you sure to Exit?");
		  if (r==true)
		  {
		  	exitPage();
		  }
		  else
		  {
		  	cancelPage();
		  } 
	  }
}
function validateMeas()
{
	document.getElementById("save").focus();
}
function validateOption()
{
	document.getElementById("category").focus();
}
function validateCat()
{
	var category = document.getElementById("category").value;
	if (category == "") 
	{
		    setErrMsg("category Code " + BLANK_CHECK,"category");
		    document.getElementById("category").focus();
	}
	else if(category == 0) 
	{
		    setErrMsg("category Code " + ZERO_CHECK,"category");
		    document.getElementById("category").focus();
	}
 	else
	{
		if(functionAlphaNumericCheck(category))
		{
			document.getElementById("pcode").focus();
		}
		else
		{
			setErrMsg("category Code " + INVALID,"category");
		    document.getElementById("category").focus();
		}
	}
}
function validatePCode()
{
	var pcode = document.getElementById("pcode").value;
	if (pcode == "") 
	{
		    setErrMsg("Product Code " + BLANK_CHECK,"pcode");
		    document.getElementById("pcode").focus();
	}
	else if(pcode == 0) 
	{
		    setErrMsg("Product Code " + ZERO_CHECK,"pcode");
		    document.getElementById("pcode").focus();
	}
 	else
	{
		if(functionAlphaNumericCheck(pcode))
		{
			document.getElementById("pdesc").focus();
		}
		else
		{
			setErrMsg("Product Code " + INVALID,"pcode");
		    document.getElementById("pcode").focus();
		}
	}
}
function validatePDesc()
{
	var pdesc = document.getElementById("pdesc").value;
	if (pdesc == "") 
	{
		    setErrMsg("Product Description " + BLANK_CHECK,"pdesc");
	}
	else if(pdesc == 0) 
	{
		    setErrMsg("Product Description " + ZERO_CHECK,"pdesc");
		    document.getElementById("pdesc").focus();
	}
 	else
	{
		if(functionAlphaNumericCheck(pdesc))
		{
			document.getElementById("punit").focus();
		}
		else
		{
			setErrMsg("Product Description " + INVALID,"pdesc");
		    document.getElementById("pdesc").focus();
		}
	}
}
function validateUnit()
{
	var punit = document.getElementById("punit").value;
	if(punit == 0) 
	{
		    setErrMsg("Unit Price " + ZERO_CHECK,"punit");
		    document.getElementById("punit").focus();
	}
 	else
	{
		if(functionNumericCheck(punit))
		{
			document.getElementById("measure").focus();
		}
		else
		{
			setErrMsg("Unit Price " + INVALID,"punit");
		    document.getElementById("punit").focus();
		}
	}
}
</script>
</head>
<BODY dir=ltr class="t1 front-page" background="./images/bg.jpg" onload="window.history.forward(-1);document.getElementById('category').focus();">
<h2></h2>
<s:actionerror />
<s:form action="prodEntry" method="post">
	<DIV
		style="POSITION: absolute; WIDTH: 325px; HEIGHT: 258px; TOP: 0px; LEFT: 0px; background-color: F5F5F5">
	<table style="POSITION: absolute; TOP: 10px; LEFT: 6px;"
		cellpadding="8" cellspacing="5" bgcolor="#FAFAFA">
		<tr>
			<td><s:combobox label="option" headerKey="1"   list="{'Add','Update','Delete'}"  name="option" onkeypress="keyPressEvents(this);"/></td>
			<td><s:textfield name="category" key="label.cat" size="20" onkeypress="keyPressEvents(this);"/></td>
			<td><s:textfield name="pcode" key="label.code" size="20" onkeypress="keyPressEvents(this)"/></td>
			<td><s:textfield name="pdesc" key="label.desc" size="20" onkeypress="keyPressEvents(this)"/></td>
			<td><s:textfield name="punit" key="label.unit" size="20" onkeypress="keyPressEvents(this)"/></td>
			<td><s:combobox label="measure" headerKey="-1" headerValue="--- Select ---" readonly="true" list="{'Packet','Kg','Litre'}"  name="measure" onkeypress="keyPressEvents(this);"/></td>
			<td><s:submit method="execute" value="save"  style="width:30%;height:20%;background: url('./images/tabs_right_bg2.jpg')"/></td>
		</tr>
	</table>
	</DIV>
	<div id="mydiv" style="position:absolute; left=0; top=92%;  " >
	<table border="0" width="100%">
	<tbody>
		<tr>
			<td width="75%" style="font-size='13' ;color: 'Red'">Error :<span id="errMsg"></td>
			<td width="25%"></td>
		</tr>
	</tbody>
</table>
</div>	
</s:form>
</body>
</html>

