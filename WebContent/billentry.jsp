<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ include file ="common.jsp" %>
<html>
<head>
<LINK rel=stylesheet type=text/css href="css/newstyle.css">
<LINK rel=stylesheet type=text/css href="css/style.css">
<LINK rel=stylesheet type=text/css href="css/t1_more.bundle.css">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Bill Entry</title>
<script language="JavaScript" src="script/jquery-latest.js"></script>
<SCRIPT language="JavaScript" src="script/common.js"></SCRIPT>
<SCRIPT language="JavaScript" src="script/Grid.js"></SCRIPT>
<script src="script/jquery-1.9.1.min.js"></script>
<script src="script/jquery.ui.core.js"></script>
<script>
var gridVal=false;
var delflag=false;
var type;
var w_getRecNum=1;
var ajaxResult="";
 
$(document).ready(function() {
	//var type = "<%=(String) session.getAttribute("type")%>";
	type = "T";
	document.getElementById("pcode").focus();
	//document.getElementById("divMyFooter").style.top = "635px";
    $('#selectCust').click(function() {
    if(this.checked){
      $("#msg").text("Yes");
      $("#cust").show();
    }
    else{
      $("#msg").text("No");
      $("#cust").hide();
      }
  });
});
 
function OpenInNewTab(url )
{
 window.open(url, '_blank', 'toolbar=0,location=0,menubar=0,height=350,width=350,scrollbars=0');
}
function getRecNum(recno) {
	alert("set num");
	w_getRecNum =recno.rowIndex;
	if(delflag)
	  deleteRow(w_getRecNum);
}
function holdBill()
{
	openFormModal();
}
function clearForm()
{
	closeFormModal();
}
function  exit()
{
	window.exit(0);
}
function addRow(tableID,colCnt,values) { 
	var table = document.getElementById(tableID);
	var rowCount = table.rows.length;             
	var row = table.insertRow(rowCount);
	var colCount = table.rows[0].cells.length;
	var split = values.split('|');
	for(var i=0; i<colCnt; i++) 
	{
		    var newcell = row.insertCell(i);
		    row.setAttribute('recnum',rowCount+1);  
		    row.setAttribute('onclick','getRecNum(this);');
		    newcell.innerHTML = table.rows[0].cells[i].innerHTML;
			switch(newcell.childNodes[0].type) 
			{                     
				case "text":                             
					newcell.childNodes[0].value = split[i];                             
					break;                     
				case "img":                             
					newcell.childNodes[0].value= "<center><img src='./images/delete.png' width='30px' align='center' height='22px'/></center>";                             
					break; 
   			}
   	}	
   	w_getRecNum = w_getRecNum+1;
   	//if(rowCount==1)
   		//deleteRow('egridRegDtl',0);
  }   
 function productHelpMaster()
 {
	window.event.returnValue=false;
	w_FldObj =document.getElementById("pcode");
	var w_Value= document.getElementById("pcode").value;
	//window.open('helpWindow.jsp', 'popup', parameters);
	showHelp("getProductDetails","pcode","470px","150px",w_Value);
	
 }
 function deleteRequired(no)
 {
 	delflag =true;
 }
 
 function deleteRow(rowNo) { 
 try { 
 	alert('deleting......');
 	var table = document.getElementById('egridRegDtl');
	table.deleteRow(rowNo); 
   }catch(e){
   	alert(e); 
   } 
}

function setValues()
{
	var value=document.getElementById("pcode").value+"|"+document.getElementById("pdesc").value+"|"+document.getElementById("unitprice").value+"|"+document.getElementById("qty").value+"|"+document.getElementById("pcode").value+"|"+document.getElementById("pcode").value;
	addRow("egridRegDtl",7,value);
	document.getElementById("pcode").value="";
	document.getElementById("pdesc").value="";    
	document.getElementById("unitprice").value="";
	document.getElementById("tax").value="";    
	document.getElementById("qty").value="";         
	document.getElementById("pcode").focus();
}
 
function ajaxEditFunctionCall(token,param){
	var result="";
    var URL = "ajaxcall.action?token="+token+"&param="+param;
    loadAjax();
    xmlHttp.onreadystatechange = function(){
	if(xmlHttp.readyState==4)
       {
       	ajaxResult=xmlHttp.responseText;
       	document.getElementById("pdesc").value=ajaxResult;
        return ajaxResult;
       }
	}
    xmlHttp.open("GET", URL, true);
    xmlHttp.send(null);
}
function clearFirst()
{
	if(gridVal==true)
	{
		document.getElementById("txtDisc").value="";
		gridVal =false;
	}
}
function keyPressEvents(w_FldObj)
{				
	document.getElementById("mydiv").style.visibility = "hidden";
	if(window.event.keyCode == 33 && w_FldObj.name=="pcode")
	{
		var table = document.getElementById('egridRegDtl');
		var rowCount = table.rows.length;
		if( rowCount >0)
		{
			document.getElementById("txtDisc").focus();
			gridVal =true;
		}
	}
	
	if(isEnterKeyPressed() || window.event.keyCode == KEY_TAB)
	{   
		switch(w_FldObj.name)
		{
			case "pcode"		: validateProduct();break;
			case "unitprice"    : validateAmt();break;
			case "qty"          : validateQuantity();break;
			case "tax"          : validateTax();break;
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
function validateProduct()
{
	
	var prdCode = document.getElementById("pcode").value;
    if (prdCode == "") 
	{
		    setErrMsg("Product Code " + BLANK_CHECK,'pcode');
	}
	else if(prdCode == 0) 
	{
		    setErrMsg("Product Code " + ZERO_CHECK,'pcode');
	}
	else
	{
		ajaxEditFunctionCall("GETPRODINFO",trim(prdCode));
		document.getElementById("unitprice").focus();
	}
}
function validateTax()
{	
	document.getElementById("qty").focus();
}

function validateAmt()
{
	var unitprice = document.getElementById("unitprice").value;
    if (unitprice == "") 
	{
		    setErrMsg("Unit Price " + BLANK_CHECK,'unitprice');
	}
	else if(unitprice == 0) 
	{
		    setErrMsg("Unit Price " + ZERO_CHECK,'unitprice');
	}
	else if(!functionNumericCheck(unitprice))
	{
		setErrMsg("Unit Price " + INVALID,'unitprice');
	}
	else
	{
		document.getElementById("tax").focus();
	}
}

function validateQuantity()
{
	var qty = document.getElementById("qty").value;
    if (qty == "") 
	{
		    setErrMsg("Quantity " + BLANK_CHECK,'qty');
	}
	else if(qty == 0) 
	{
		    setErrMsg("Quantity " + ZERO_CHECK,'qty');
	}
	else if(!functionNumericCheck(qty))
	{
		setErrMsg("Quantity " + INVALID,'unitprice');
	}
	else
	{
		setValues();
	}
}

</script>
</head>
<body style="overflow-x:hidden;">
<html:form action="/Bill">
	<div style="TOP: 150px; width: 200px; left: 30px"></div>
	<div style="POSITION: absolute; TOP: 20px; left: 450px">
	<table align="left" > 
	<tr>
		<td align="left">
			Welcome: Guest
		</td>
		<td style="" width="85%" align="right">
		<b><span id="date_time"></span></b>
			<script type="text/javascript">window.onload = date_time('date_time')</script>
		</td>
	</tr>
	</table>
	</div>
	<div style="POSITION: absolute; TOP: 50px; left: 80px">
	<table class="bgFilter" width="95%" cellspacing="4" cellpadding="4" border="0">
	<tr>
			<td><b>
			 Bill Number : ### 
			</b></td>
			<td style="" width="85%" align="right">
			&nbsp;&nbsp;&nbsp;&nbsp;Customer: &nbsp;&nbsp;
				<select>
			  		<option value="volvo">Cash </option>
			  		<option value="saab">Credit</option>
				</select>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="radio" name="group1" value="Manual Entry" checked>  Manual Select  
				&nbsp;&nbsp;&nbsp;&nbsp;
				 <input type="radio" name="group1" value="Bar Code">   Bar Code
			</td>
			
	</tr>
	<tr>
			<td style="" width="60%" align="center" >Goto Bill Number: <input
				id="SimpleSearcher" placeholder="Search" autocomplete="off" />&nbsp;<a
				href="#"><img align="center" src="images/go.png" width="25px"
				height="25px"></img></a>&nbsp;&nbsp;<a href="#">Show Holding Bill#</a></td>
			<td style="" width="31%"></td>
		</tr>
	</table>
	</div>
	<div style="POSITION: absolute; TOP: 150px; width: 100%">
	<table class="bgFilter" width="100%" cellspacing="0" cellpadding="0">
		<tr style="height: 30px">
			<td style="" width="26%">
				<a href="" onclick="productHelpMaster()"> <img src="images/Help-icon.png" width="30px" height="22px" align="center"></img></a>
				Product Code <s:textfield name="pcode" cssClass="text-input" size="20" theme="simple" onkeypress="keyPressEvents(this)" /> &nbsp; 
				<a onclick="OpenInNewTab('productEntry.jsp')"><img src="images/Add-icon.png" width="30px" height="22px" align="center"></img></a>
			</td>
			<td style="" width="19%">Product Description: <s:textfield name="pdesc" cssClass="text-input" cssStyle="border: 0px solid;" size="20" theme="simple" readonly="true"/></td>
			<td style="" width="15%">Unit Price: <s:textfield name="unitprice" cssClass="text-input" size="20" theme="simple" onkeypress="keyPressEvents(this)"/></td>
			<td style="" width="12%">Tax(%): <s:textfield name="tax" cssClass="text-input" size="2" maxlength="2" theme="simple" onkeypress="keyPressEvents(this)"/></td>
			<td width="12%">Quantity<s:textfield name="qty" size="3" theme="simple" onkeypress="keyPressEvents(this)" cssClass="text-input" /></td>
		</tr>
	</table>
	</div>
	<div id="header" style="POSITION: absolute; width: 99%; TOP: 185px; left: -10px">
	<table class="dataTable" width="100%" cellspacing="0" cellpadding="0">
		<THEAD>
		<tr>
			<td width="15%" align="center" class="headerTxt" style="border-right: #d3d3d3 1px solid;">Product Code</td>
			<td align="center" width="15%"  class="headerTxt"	style="border-right: #d3d3d3 1px solid;">Product Description</td>
			<td align="center" width="15%" class="headerTxt" style="border-right: #d3d3d3 1px solid;">Unit Price</td>
			<td align="center" width="15%" class="headerTxt"	style="border-right: #d3d3d3 1px solid;">Quantity</td>
			<td align="center" width="15%" class="headerTxt"	style="border-right: #d3d3d3 1px solid;">Price</td>
			<td align="center" width="15%" class="headerTxt"	style="border-right: #d3d3d3 1px solid;">Tax</td>
			<td align="center" width="15%" class="headerTxt"	style="border-right: #d3d3d3 1px solid;">Delete Option</td>
		</tr>
		</THEAD>
	</table>
	</div>	
	<DIV id="divTable2" style="POSITION: absolute; width: 100.2%; TOP: 223px;height:23%;overflow:scroll;">
	<TABLE id='egridRegDtl' align=center width='100%' cellpadding=0 cellspacing=0 border=1  >
			<tr style="background-color: white;" onclick="getRecNum(this);" recnum="1" class="lbltxt" >
				<td align=center height="28" width="15%"><input type="text" readonly="readonly" style="border: 0px solid;" width="100%" name="txt1[]"/></td>
				<td align=center height="28" width="15%"><input type="text" readonly="readonly" style="border: 0px solid;" width="100%" name="txt2[]"/></td>
				<td align=center height="28" width="15%"><input type="text" readonly="readonly" style="border: 0px solid;" width="100%" name="txt3[]"/></td>
				<td align=center height="28" width="15%"><input type="text" readonly="readonly" style="border: 0px solid;" width="100%" name="txt4[]"/></td>
				<td align=center height="28" width="15%"><input type="text" readonly="readonly" style="border: 0px solid;"  width="100%" name="txt5[]"/></td>
				<td align=center height="28" width="15%"><input type="text" readonly="readonly" style="border: 0px solid;"  width="100%" name="txt6[]"/></td>
				<td align=center height="28" width="15%"><center><img src="images/delete.png" width="30px" height="22px" onclick="deleteRequired(this.recnum)"/><center></td>
			</tr>
	</TABLE>
	</DIV>
	<div style="POSITION: absolute; width: 100%; TOP: 405px; left: 200px">
	<table width="70%" cellspacing="0" cellpadding="7">
		<tr>
			<td width="10%" align="left" style="font-size: 14px">Discount </td>
			<td width="29%" style="font-size: 14px"><s:textfield name="txtDisc" cssClass="text-input" theme="simple" size="2" maxlength="2" onfocus="clearFirst()" /> %</td>
			<td rowspan="4" align="center"><font style="font-size: 23px;">Amount:1000</font>&nbsp;&nbsp;&nbsp;<img border="0" src="images/rs.png" width="10" 	height="15"></td>
		</tr>
		<tr>
			<td width="10%" align="left" style="font-size: 14px">Vat </td>
			<td width="29%"><s:textfield name="txtVat" cssClass="text-input" theme="simple" size="2" maxlength="2" /> %</td>
		</tr>
		<tr>
			<td style="font-size: 14px">Total Amount:</td>
			<td style="font-size: 14px">1000rs</td>
		</tr>
		<tr>
			<td style="font-size: 14px">Delivery to Customer</td>
			<td><input type="checkbox" id="selectCust" /> <span id="msg">No</span>
			</td>
		</tr>
	</TABLE>
	</div>
	<div id="cust" style="POSITION: absolute; TOP: 575px; left: 200px; display: none;">
	<table width="50%" cellspacing="0" cellpadding="0">
		<tr style="height: 30px">
			<td style="" width="25%" style="font-size:14px">Address: <s:textfield name="txtCustAddr" cssClass="text-input" theme="simple" /></td>
		</tr>
		<tr>
			<td style="" width="25%" style="font-size:14px">Contact Number: <s:textfield name="txtCustNo" cssClass="text-input" theme="simple" /></td>
		</tr>
	</table>
	</div>
	<div style="POSITION: absolute; TOP: 575px; left: 500px">
	<table width="70%" cellspacing="10" cellpadding="7">
		<tr>
			<td align="center">
			<BUTTON type=button id="signbut1" class="newbutton" >Print</BUTTON>
			</td>
			<td align="center">
			<BUTTON type=button id="signbut2" class="newbutton" onclick="holdBill()">Hold</BUTTON>
			</td>
			<td align="center">
			<BUTTON type=button id="signbut3" class="newbutton" onclick="clearForm()">Clear</BUTTON>
			</td>
			<td align="center">
			<BUTTON type=button id="signbut4" class="newbutton" onclick="exit()">Exit</BUTTON>
			</td>
		</tr>
	</table>
	</div>
	<s:hidden name="ajaxValue" id="ajaxValue" />
	
<div id="mydiv" style="position:absolute; left=0; top:100%; visibility:hidden;" >
<table border="0" width="100%">
	<tbody>
		<tr>
			<td width="75%" style="color: 'Red'">Error :<span id="errMsg"></td>
			<td width="25%"></td>
		</tr>
	</tbody>
</table>
</div>	

</html:form>
</body>
</html>