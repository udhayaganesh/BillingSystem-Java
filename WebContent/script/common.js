
	/* Global Constants **/
	var xmlHttp;
	var g_Req = "Y";
	var g_PrgReq = "Y"; 
	var KEY_BACKSPACE = 8;
	var KEY_TAB = 9;
	var KEY_ENTER = 13;	
	var KEY_ESC = 27;		
	var KEY_SPACE = 32;
	var KEY_LEFTARROW = 37;
	var KEY_UPARROW = 38;
	var KEY_RIGHTARROW = 39;
	var KEY_DOWNARROW = 40;
	var KEY_OPEN = 40;
	var KEY_CLOSE = 41;
	var KEY_PLUS = 43;
	var KEY_HYPHEN = 45;
	var KEY_DELETE = 46;
	var KEY_DOT = 46;
	var KEY_FWDSLASH = 47;
	var KEY_NUMBER_0 = 48;
	var KEY_F9 = 49;
	var KEY_NUMBER_9 = 57;
	var KEY_UPPERCASE_A = 65;
	var KEY_UPPERCASE_Z = 90;
	var KEY_LOWERCASE_A = 97;
	var KEY_F1 = 112;
	var KEY_F2 = 113;
	var KEY_F3 = 114;
	var KEY_F4 = 115;
	var KEY_F5 = 116;
	var KEY_F6 = 117;		
	var KEY_F7 = 118;
	var KEY_F8 = 119;
	var KEY_F10 = 121;
	var KEY_F11 = 122;
	var KEY_LOWERCASE_Z = 122;
	var KEY_F12=123;
	/* Global Messages */
	var INVALID = "is Invalid.";
	var RECORD_PRESENT = "Record Already Exists";
	var RECORD_NOT_PRESENT = "Record Does Not Exists";
	var BLANK_CHECK = " Should Not Be Blank";
	var ZERO_CHECK = " Should Not Be Zero";
	var NEGATIVE_CHECK = " Should Not Be Negative";
	var OPTION_MESSAGE = "Select Option ";
	var HELP_LEGEND =", F5 - Help";
	var FUNCTION_LEGEND = "F2 - Back Track, ESC - Cancel";
	var OPTION_LEGEND="ESC - Exit";
	var SAVE_MESSAGE = "Press Enter Or Spacebar To Save ";
	var CANCEL_MESSAGE = "Press Enter Or Spacebar To Cancel ";
	var DELETE_MESSAGE = "Press Enter Or Spacebar To Delete ";
	var EXIT_MESSAGE = "Press Enter Or Spacebar To Exit ";
	var PRINT_MESSAGE = "Press Enter Or Spacebar To Print ";
	var CANCEL_PAGE = "Do You Want To Cancel?";
	var EXIT_PAGE = "Do You Want To Exit?";
	var ERRMSG_TEL="Only Numeric And Special Characters Like ()- Is Allowed";
	var panes;
	var tabs;
	var tabNumber;
	var decimal;
	var menuStripCount=0;
	var PDF_MESSAGE="Press Enter Or Spacebar To View PDF ";
	var WELCOME_PAGE = "../welcome.jsp";
	//var WELCOME_PAGE = "/CapitalWeb/ACC/FRMMMENULOAD.jsp";	
	var num;
	var dec;
	var decPos;
	var decFlag;
	var keycode;
	var intLen;
	var decLen;
	var inputNum;
	var localIntLen;
	var localDecLen;
	var numericCount=0;
	var alphabetCount=0;
	var pwdLen;
	intLen=10;
	decLen=2;
	
	var StringLen; var num; var num1; var newnumString; var numreplace; 
	var newUnFormatStr; var intPart; var decPart; var dotPos;
	var	refString; var refStrIndex;   var j; var fld; var fldObj; 
	var thisNum; var outPutNum1; var outPutNum2; var dd;var mm; var yyyy;var difarr;
	newnumString=""; newUnFormatStr="";
	difarr=new Array();

	decimal=0;
	/* function to restrict the default functionality keys for IE*/
	document.onhelp=chkkey;
	document.onkeydown=chkkey;
	function chkkey(){
	  if( (window.event.keyCode==0) ||(window.event.keyCode==KEY_F1) ||(window.event.keyCode==KEY_F5) || (window.event.keyCode==KEY_F3)|| (window.event.keyCode==KEY_ESC) || (window.event.keyCode==KEY_F11))
		{
			window.event.returnValue = false;
			window.event.keyCode=0;
			return;
		}
	}

//Dynamic security Number values 030807
//Manogaran - Beg
function closeUserForm(){
	parent.window.close();
	//window.top.document.frames[1].frames[2].location.href=WELCOME_PAGE;
	//window.top.document.all.TopFr.rows="104,*,0";	
	//parent.document.all.Fr1.cols="0,0,*,0";
	//parent.parent.Label="";
	//parent.parent.document.title="Welcome to Asset Management";
}
function OpenFullScrn(){
	//parent.document.all.Fr1.cols="0,0,*,0";
	parent.document.all.Fr1.cols="39,40%,*,0";
}
//Manogaran - End
function isNegNumber(keycode){
	if ((keycode >= KEY_NUMBER_0 && keycode <=KEY_NUMBER_9) || (keycode==KEY_BACKSPACE)|| (keycode==KEY_ENTER)||(keycode == KEY_DOT) || (keycode == KEY_HYPHEN)) {
		return true;	
	}else{
		return false;
	}
}
	function setSecNumValues(w_fldObj, w_CboCusNum, w_CboCusGrpCode)
	{	
		
		w_Token="INITCBOSECURITYNUMBER";
		w_RtnVal= lookupDatabase(w_Token,w_CboCusNum + "|" + w_CboCusGrpCode);
		if(w_RtnVal!="Invalid")
		{
			xmlCBOSECNUM.loadXML(w_RtnVal);
			if (w_RtnVal !=""){			
				for (iCnt = 0 ;  iCnt < xmlCBOSECNUM.documentElement.childNodes.length; iCnt++) 
				{
					w_NewOpt = document.createElement("OPTION");
					w_NewOpt.text = xmlCBOSECNUM.documentElement.childNodes(iCnt).childNodes(0).text;
					w_NewOpt.value = xmlCBOSECNUM.documentElement.childNodes(iCnt).childNodes(0).text;
					//document.all.cboSecNum.add(w_NewOpt);fldObj
					w_fldObj.add(w_NewOpt);
				}
			}
		}	
		else
		{
			reLogin();
		}
	}

//function to validate password with alphanumeric character count

function validatePwdFld(){
	if((keycode >= KEY_NUMBER_0 && keycode <=KEY_NUMBER_9)){
		numericCount=eval(numericCount+1);
//		return numericCount;
	}else if(keycode >= KEY_UPPERCASE_A && keycode <=KEY_UPPERCASE_Z || keycode>=KEY_LOWERCASE_A && keycode<=KEY_LOWERCASE_Z){
		alphabetCount=eval(alphabetCount+1);
//		return alphabetCount;
	}
	
//	pwdLen=eval(numericCount+alphabetCount);
//  return pwdLen;
}//end function
	
	
	function functionAlphaNumericCheck(textValue){
     var checkOK = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var checkStr =  textValue;
    var allValid = true;
    for (i = 0;  i < checkStr.length;  i++){
	ch = checkStr.charAt(i);
	//alert(ch);
	   for (j = 0;  j < checkOK.length;  j++)
	  
	       if (ch == checkOK.charAt(j))
	       //alert(checkOK.charAt(j));
		   break;
	       if (j == checkOK.length){
		   allValid = false;
		   break;
	       }
    }
    if (!allValid){
         return false;
    }
    return true;

}
/*function to check whether the keyCode value is for Alphabets or not*/
	function isGrade(ch){
		if ((ch >= KEY_UPPERCASE_A && ch <=KEY_UPPERCASE_Z ) || (ch>=KEY_LOWERCASE_A && ch<=KEY_LOWERCASE_Z) ||
			(ch >= KEY_NUMBER_0 && ch <=KEY_NUMBER_9) || (ch==KEY_BACKSPACE)|| (ch==KEY_ENTER) ||  (ch == KEY_PLUS) || (ch == KEY_HYPHEN)){
			return true;
		}else{
			return false;
		}	
	}//end isAlpha()
//THIS FUNCTION IS TO CHECK FOR THE SECOND DOT
function isSecondDot(textValue){
var textValue1;
textValue1 = textValue;

    var j=0;
    for (i = 0;  i < textValue.length;  i++){
		ch = textValue.charAt(i);
		if(ch==".")
			j=j+1;
		if(j > 1)
		   break;
		   
    }
    if(j>1)
      	return true;
    else  
    	return false;
}
/* added for email & telephone no.*/
function isSecondAt(textValue){
    var j=0;
    for (i = 0;  i < textValue.length;  i++){
		ch = textValue.charAt(i);
		if(ch=="@")
			j=j+1;
		if(j > 1)
		   break;
		   
    }
    if(j>1)
      	return true;
    else  
    	return false;
}
function isSecondOpenParen(textValue){
    var j=0;
    for (i = 0;  i < textValue.length;  i++){
		ch = textValue.charAt(i);
		if(ch=="(")
			j=j+1;
		if(j > 1)
		   break;
		   
    }
    if(j>1)
      	return true;
    else  
    	return false;
}
function isSecondCloseParen(textValue){
    var j=0;
    for (i = 0;  i < textValue.length;  i++){
		ch = textValue.charAt(i);
		if(ch==")")
			j=j+1;
		if(j > 1)
		   break;
		   
    }
    if(j>1)
      	return true;
    else  
    	return false;
}
function isSecondHypen(textValue){
    var j=0;
    for (i = 0;  i < textValue.length;  i++){
		ch = textValue.charAt(i);
		if(ch=="-")
			j=j+1;
		if(j > 1)
		   break;
		   
    }
    if(j>1)
      	return true;
    else  
    	return false;
}
function isSecondPlus(textValue){
    var j=0;
    for (i = 0;  i < textValue.length;  i++){
		ch = textValue.charAt(i);
		if(ch=="+")
			j=j+1;
		if(j > 1)
		   break;
		   
    }
    if(j>1)
      	return true;
    else  
    	return false;
}
function formatAcNum(num,units) {
		var w_Len;
		w_Len = num.length;
		for (i = 1; i <= units; i++) {
			if (num.length < i ) {
				num = "0" + num;
			}
		}
		return num;
	}
	
//added by priya for frmesecstockstmt
function formatNumberWithoutCurr(num1) {
	var chkFlg = 0;
	var x;
	var k;
	j=0;
	
	decLen = 2;
	if (num1.substring(0,1) == "-") {
		chkFlg = 1;
		num1 = num1.substring(1,num1.length);
	}
	refString = "000000000000000";
	refStrIndex = refString.length-1;
	newRefIndex = refString.length-1;
	newnumString = "";
	dotPos = num1.indexOf(".");
	if(num1.indexOf(".") >=0) {
		intPart = num1.substring(0,dotPos);
		decPart = num1.substring(dotPos+1,num1.length);
		k=eval(decLen-decPart.length);
		if(k<decLen || decPart==""){
			for(i=1;i<=k;i++){
					decPart=decPart+"0";
				}
				decPart = "."+decPart;
			} else {
			decPart = "."+decPart;
		}
		StringLen = intPart.length;
	} else {
		intPart = num1.substring(0,num1.length);
		decPart="";
		
		for(i=1;i<=decLen;i++){
		decPart = decPart+"0";
		}
		decPart="."+decPart;
		StringLen = intPart.length;
	}

	for(x=StringLen-1; x>=0; x--) {
		refStrIndex = eval(newRefIndex - j);
		if(refString.charAt(refStrIndex) == ",") {
			numreplace=num1.charAt(x)+",";
			newnumString = numreplace+newnumString;
			newRefIndex=newRefIndex-1;
		} else {
			newnumString = num1.charAt(x)+newnumString;
		}
		j=j+1;
	}

	if(newnumString.charAt(0)=="") {
	}
	if(newnumString.charAt(0)=="," || newnumString.charAt(0)=="0") {
		newnumString=newnumString.substring(1,newnumString.length)+decPart;
//		num1 = newnumString;  609
//		return trimNumber(newnumString);
	} else {
		newnumString=newnumString+decPart;
//		num1 = newnumString;
//		return trimNumber(newnumString);
	}
	/* 609 */
	num1 = newnumString;
	if (chkFlg == 1) {
		if (num1 == 0) {
			num1 = "0.00";
		}else if (intPart == "0" ) {
			num1 = "0" + num1;
		}
		num1 = "-" + num1;
	}else {
		if (num1 == 0) {
			num1 = "0.00";
		}else if (intPart == "0" ) {
			num1 = "0" + num1;
		}
	}
	return trimNumber(num1);		
}
//end of format number With Currency

//added by priya for frmeappllcorp
function formatNumbercurr(num1,sUnits) {
	var chkFlg = 0;
	var x;
	var k;
	j=0;
	
	if (sUnits >= 1000) {
		decLen = 3;
	}else if ((sUnits != 0) && (sUnits < 1000)){
		decLen = 2;
	}else if (sUnits == 0) {
		decLen = 0;
	}
	
	if (num1.substring(0,1) == "-") {
		chkFlg = 1;
		num1 = num1.substring(1,num1.length);
	}
	
	refString = "000,000,000,000,000";
	refStrIndex = refString.length-1;
	newRefIndex = refString.length-1;
	newnumString = "";
	dotPos = num1.indexOf(".");
	if(num1.indexOf(".") >=0) {
		intPart = num1.substring(0,dotPos);
		decPart = num1.substring(dotPos+1,num1.length);
		k=eval(decLen-decPart.length);
		if(k<decLen || decPart==""){
			for(i=1;i<=k;i++){
					decPart=decPart+"0";
				}
				decPart = "."+decPart;
			} else {
			decPart = "."+decPart;
		}
		StringLen = intPart.length;
	} else {
		intPart = num1.substring(0,num1.length);
		decPart="";
		
		for(i=1;i<=decLen;i++){
		decPart = decPart+"0";
		}
		decPart="."+decPart;
		StringLen = intPart.length;
	}

	for(x=StringLen-1; x>=0; x--) {
		refStrIndex = eval(newRefIndex - j);
		if(refString.charAt(refStrIndex) == ",") {
			numreplace=num1.charAt(x)+",";
			newnumString = numreplace+newnumString;
			newRefIndex=newRefIndex-1;
		} else {
			newnumString = num1.charAt(x)+newnumString;
		}
		j=j+1;
	}

	if(newnumString.charAt(0)=="") {
	}
	if(newnumString.charAt(0)=="," || newnumString.charAt(0)=="0") {
		newnumString=newnumString.substring(1,newnumString.length)+decPart;
//		num1 = newnumString;  609
//		return trimNumber(newnumString);
	} else {
		newnumString=newnumString+decPart;
//		num1 = newnumString;
//		return trimNumber(newnumString);
	}
	/* 609 */
	num1 = newnumString;
	if (chkFlg == 1) {
		num1 = "-" + num1;
	}
	if (num1 == 0) {
		num1 = "0.00";
	}
	return trimNumber(num1);		
}
//end of format number



	function functionNumericCheck(textValue){
    var checkOK = "0123456789";
    var checkStr =  textValue;
    var allValid = true;
    for (i = 0;  i < checkStr.length;  i++){
	ch = checkStr.charAt(i);
	//alert(ch);
	   for (j = 0;  j < checkOK.length;  j++)
	  
	       if (ch == checkOK.charAt(j))
	       //alert(checkOK.charAt(j));
		   break;
	       if (j == checkOK.length){
		   allValid = false;
		   break;
	       }
    }
    if (!allValid){
         return false;
    }
    return true;

}
	/* This function is to restrict the Right click of the Mouse */
	
	function disableRightClick(e){
	  var message = "Operation Not Allowed";
	  if(!document.rightClickDisabled){// Intialize
	    if(document.layers){
	      document.captureEvents(Event.MOUSEDOWN);
	      document.onmousedown = disableRightClick;
	    }else 
	    	document.oncontextmenu = disableRightClick;
	    return document.rightClickDisabled = true;
	  }
	  if(document.layers || (document.getElementById && !document.all)){
	    if (e.which==2||e.which==3){
		//alert(message);
	     return false;
	    }
	  }else {
		//alert(message);
	    return false;
	  }
	}//end disableRightClick
	

	/*function to check whether the keyCode value is for Numeric or not*/
	function isNumeric(keycode,decFlag){
		if((keycode >= KEY_NUMBER_0 && keycode <=KEY_NUMBER_9) || (keycode==KEY_BACKSPACE)|| (keycode==KEY_ENTER))
			return true;	
		else{
			if(decFlag == "Y"){
				if ((keycode>=KEY_NUMBER_0 && keycode<=KEY_NUMBER_9) || (keycode == KEY_DOT) || (keycode==KEY_BACKSPACE)|| (keycode==KEY_ENTER)){
					if(isDotPressed(keycode))
						return true;
					else
						return false;
				}
			}else{
				if(keycode == KEY_ENTER)
					return true;
				else{
					window.event.keyCode = 0;
					return false;	
				}
			}		
		}		
	}//end isNumeric()

	function isDot(keycode){
		if(keycode == KEY_DOT){
			return true;		
		}else{
			//window.event.keyCode = 0;
			return false;
		}
	}
	
		
	
	
	function addZeroes(str){
		//var number = str.value;	
		var dotPos = str.indexOf(".");
		if(dotPos == -1){
			return str + ".00";
		}else{
			var decLength = (str.substring(dotPos+1,str.length)).length;
			if (decLength == 1)
			   return str + "0";
			else if(decLength == 0)
			   return str + "00";			   
			else
				return str.substring(0,dotPos + 3);
			   //return str;   
		
			/*var intPart = str.substring(0,dotPos);
			var decPart = str.substring(dotPos+1,str.length);
			if(intPart.length > intLen)
				return false;
			if(decPart.length > decLen)
				return false;*/
		}
		
	}
	
	/* function to check whether Dot is Pressed or Not*/
	
	
	function isDotPressed(keycode,strVal){
		if(keycode == KEY_DOT){
			return true;		
		}else{
			window.event.keyCode = 0;
			return false;
		}			
	}//end isDotPressed()
	
	
	/*function to check whether the Enter Key is Pressed or Not*/
	function isEnterKeyPressed(){
		if (window.event.keyCode ==KEY_ENTER) {
			window.event.returnValue=false;
			return true
		}else
			return false;		
	}//end isEnterKeyPressed()
	
	
	
	
	
	
	
	
	
	
	
	
	/*function to check whether the keyCode value is for Alphabets or not*/
	function isAlpha(ch){
		if(ch >= KEY_UPPERCASE_A && ch <=KEY_UPPERCASE_Z || ch>=KEY_LOWERCASE_A && ch<=KEY_LOWERCASE_Z)
			return true;
		else
			return false;
	}//end isAlpha()

	/*function to check whether the keyCode value is for AlphaNumeric or not */
	function isAlphaNumeric(ch){
		if ((ch >= KEY_UPPERCASE_A && ch <=KEY_UPPERCASE_Z ) || (ch>=KEY_LOWERCASE_A && ch<=KEY_LOWERCASE_Z) ||
			(ch >= KEY_NUMBER_0 && ch <=KEY_NUMBER_9) || (ch==KEY_BACKSPACE)|| (ch==KEY_ENTER)){
			return true;
		}else{
			return false;
		}
	}//end isAlphaNumeric()
	
	/*function to check whether the keyCode value is for TeleFaxNumber or not */
	function isTeleFaxNumber(ch){
		if ((ch >= KEY_NUMBER_0 && ch <=KEY_NUMBER_9) || (ch==KEY_BACKSPACE)|| (ch==KEY_ENTER)
		     || (ch==KEY_OPEN)|| (ch==KEY_CLOSE)|| (ch==KEY_HYPHEN)){
			return true;
		}else{
			return false;
		}
	}//end isTeleFaxNumber()
	/*function to check whether the keyCode value is for MobileNumber or not */
	function isMobileNumber(ch){
		if ((ch >= KEY_NUMBER_0 && ch <=KEY_NUMBER_9) || (ch==KEY_BACKSPACE)|| (ch==KEY_ENTER)
		     || (ch==KEY_PLUS)){
			return true;
		}else{
			return false;
		}
	}//end isMobileNumber()
	

if((keycode >= KEY_NUMBER_0 && keycode <=KEY_NUMBER_9) || (keycode==KEY_BACKSPACE)|| (keycode==KEY_ENTER))
	/*function to check whether the keyCode value is for Spaces or not*/
	function isSpace(ch){
		if(ch == KEY_SPACE)
			return true;
		else
			return false;
	}//end isSpace()
	
	/* function to get the Applet Object*/
	
	function getDHttpAppletObj(){
		return objApplet;
	}//end getDHttpApplet()	
	
	/* function to check whether the given Numeric value is a proper decimal format 
	 * with the specified integer & decimal lengths
	 */
		
	
	
	/*function to handle triming of data*/
	function trim( str ) {
		var resultStr = "";
		resultStr = trimLeft(str);
		resultStr = trimRight(resultStr);
		return resultStr;
	} // end Trim

//modified by Uday Shenoy	
//Dated 14/02/2006

	function SODDateFormat(sod){
  var mon=sod.substring(3,5);
 
	var mm;
	switch(mon){
    	case "01" :  mm="JAN";
      break;
		case "02" :  mm="FEB";
      break;
		case "03" :  mm="MAR";
      break;
		case "04" :  mm="APR";
      break;
		case "05" :  mm="MAY";
      break;
		case "06" :  mm="JUN";
      break;
		case "07" :  mm="JUL";
      break;
		case "08" :  mm="AUG";
      break;
		case "09" :  mm="SEP";
      break;
		case "10" :  mm="OCT";
      break;
		case "11" :  mm="NOV";
			break;
		case "12" :  mm="DEC";
			break;
	}
  sodformat=sod.substring(0,2)+ "/" +mm+"/"+sod.substring(6,11);
	return sodformat;
}//end SODDateFormat
//end Modification	





	/* function to handle left Trimming of Data*/ 
	function trimLeft( str ) {
		var resultStr = "";
		var i = len = 0;
		
		// Return immediately if an invalid value was passed in
		if (str+"" == "undefined" || str == null)	
			return null;
	
		// Make sure the argument is a string
		str += "";
		if (str.length == 0) 
			resultStr = "";
		else {	
	 		// Loop through string starting at the beginning as long as there
	  		// are spaces.
			//	  	len = str.length - 1;
			len = str.length;
	  		while ((i <= len) && (str.charAt(i) == " "))
				i++;
		
		   	// When the loop is done, we're sitting at the first non-space char,
	 		// so return that char plus the remaining chars of the string.
	  		resultStr = str.substring(i, len);
	  	}				
	  	return resultStr;
	}// end TrimLeft
			
	/* function to handle right trimming of Data*/
	function trimRight( str ) {
		var resultStr = "";
		var i = 0;
		
		// Return immediately if an invalid value was passed in
		if (str+"" == "undefined" || str == null)	
			return null;
	
		// Make sure the argument is a string
		str += "";
			
		if (str.length == 0) 
			resultStr = "";
		else {
	  		// Loop through string starting at the end as long as there
	 		// are spaces.
	  		i = str.length - 1;
	  		while ((i >= 0) && (str.charAt(i) == " "))
	 			i--;
				 			
	 			// When the loop is done, we're sitting at the last non-space char,
		 		// so return that char plus all previous chars of the string.
		  		resultStr = str.substring(0, i + 1);
		  	}
		  	
		  	return resultStr;  	
	} // end TrimRight
	/* 628 */
	function setHeaderTxt(val){
	
	//LSudhakar-chn-04/04/2007-beg
	if(parent.OpenDialogue==false){
		parent.document.all.Fr1.cols="4,0,*,0";
	}
	//LSudhakar-chn-04/04/2007-end	
	parent.parent.parent.document.title= val;
	//parent.parent.Label=val;
	/*
	if(document.all.lblOption!=null && document.all.lblOption!="undefined")
		document.all.lblOption.innerText=w_FormOption; // S.Sathishkumar 0796- 01/06/2007 -- for Multilingual
	
	AssignControlKeys();
	**/
	}
	function setFooterColor(val){
		if (val=="Q"){
			top.frames[2].tdFldMsg.className = "msgfldQuery"
			top.frames[2].tdUsrid.className = "msgfldQuery"
		}else if (val=="E"){
			top.frames[2].tdFldMsg.className = "msgfldEntry"
			top.frames[2].tdUsrid.className = "msgfldEntry"
		} 
		
	}
	 
	/* 628 */
	
	/*function to set the Error Message Field with the given Error Message*/
	function setErrMsg(val,fld){
		document.getElementById("errMsg").innerHTML = "<font size='2' color='red'> "+val +"</font>";
		document.getElementById("mydiv").style.visibility = "visible";
		document.getElementById(fld).focus();
	}//end setErrMsg()
	
	/* function to set the Field and Help Message Fields with the Given Messages*/
	function setFldHlpMsg(txt1,txt2){
		document.all.fldmsg.innerHTML =txt1 ;
	   	document.all.hlpmsg.innerHTML = txt2 ;
	}//end setFldHlpMsg()
	
	/*function to set the User ID Field With the Given User ID*/
	//function setUserId(userID,w_Status){
	function setUserId(userID){
		/*VManogaran-Chn-22/08/07-Beg*/
		/*if(w_Status == "null"){
			parent.document.all.Fr1.cols="4,0,*,0";
		}*/
		/*VManogaran-Chn-22/08/07-End*/
		if (g_Req == "Y" ) {
			document.all.VerId.innerHTML = "Ver 1.0.0";
		}else if (g_Req != "Y" ) {
			document.all.VerId.innerHTML = " ";
		}
		document.all.usrid.innerHTML = userID;
	}//end setUserId
	
	/*function to set the Version Id */
	function setVersionId(vno){
		if (g_Req == "Y" && g_PrgReq == "Y" ) {
			document.all.VerId.innerHTML = "Ver 1.0." + vno;
		}else {
			document.all.VerId.innerHTML = " ";
		}
	}
	/* end setVersionId */
	
	
	
	
	/* function to generate the XML based on the row & col values for the specified gridID*/
	function generateGridData(gridID,recNum,noOfCols){
		var sendXml;
		rowCount = gridID.documentElement.childNodes.length;
		if(rowCount != 0){
			sendXml = "\n";
			for(j=0;j<noOfCols;j++){
				sendXml += "<Col" + j + ">";
				sendXml += gridID.documentElement.childNodes(recNum).childNodes(j).text;
				sendXml += "</Col" + j +  ">";
			}
		}else{
			sendXml = "";
		}
		return sendXml;
	}//end generateGridData()		

//functions below are added at VGC
	
//function to show and hide message pane

function hideMsgPane()
{
	window.top.document.all.TopFr.rows="123,*,0";
}
function showMsgPane()
{
	window.top.document.all.TopFr.rows="123,*,44";
//	window.top.document.all.TopFr.rows="78,*,44";
}


//function to show the particular div based on the tab clicked
/*
function HideMenuBar()
{
//	alert("hello");
//	window.top.document.all.TopFr.rows="78,*,44";
	alert(parent.document.all.Fr1.cols);
	parent.document.all.Fr1.cols="1,1,102%";
	alert(parent.document.all.Fr1.cols);
}
function ShowMenuBar()
{
//	window.top.document.all.TopFr.rows="78,*,0";
	alert(parent.document.all.Fr1.cols);
	parent.document.all.Fr1.cols="30,1,102%";
	alert(parent.document.all.Fr1.cols);
}
*/


//BEGIN FUNCTION showPane()
	function showPane(paneid,tabs){
//	alert(paneid);
//	alert(tabs);
			for(i=1;i<=tabs;i++)
			{
				var t="tab"+i;
				var tab = document.getElementById(t)
//				alert(tab);
				tab.style.visibility = "hidden";
			}
//			alert(paneid);
			tabNumber = paneid;
			var tab="tab"+paneid;
			var tab = document.getElementById(tab)
			tab.style.visibility = "visible";
 //The following function has to be written in individual forms according to the requirements
			scrollTab(paneid);

			for(i=1;i<=tabs;i++){
				var t="td"+i;
				var obj = document.getElementById(t)
				obj.className="style2";
			}
			var t1="td"+paneid;
			var obj = document.getElementById(t1)
			obj.className="style1";
	}
//END FUNCTION - showPane()


//BEGIN FUNCTION showPane()
	function showPaneQuery(paneid,tabs){
//	alert(paneid);
//	alert(tabs);
			for(i=1;i<=tabs;i++)
			{
				var t="tab"+i;
				var tab = document.getElementById(t)
//				alert(tab);
				tab.style.visibility = "hidden";
			}
//			alert(paneid);
			tabNumber = paneid;
			var tab="tab"+paneid;
			var tab = document.getElementById(tab)
			tab.style.visibility = "visible";
 //The following function has to be written in individual forms according to the requirements
			scrollTab(paneid);

			for(i=1;i<=tabs;i++){
				var t="td"+i;
				var obj = document.getElementById(t)
				obj.className="style2Query";
			}
			var t1="td"+paneid;
			var obj = document.getElementById(t1)
			obj.className="style1Query";
	}
//END FUNCTION - showPane()





//Validations with Master Table - Begin
//////////******************************************

// for lastFld - the value should be "Y" if is the last field in that pane, 
// otherwise no need of passing any value for this argument

	
function isAmtNumeric(num,decFlag,intLen,decLen){
	//Magesh K - Begin	
	var chkFlg = 0;
	if (num.substring(0,1) == "-") {
		chkFlg = 1;
		num = num.substring(1,num.length);
	}
	//Magesh K - End
	num = unFormat(num);	
	StringLen = num.length;
	if(decFlag == "Y"){
		if(num.indexOf(".")== -1){
			if(StringLen <= intLen){
				return true;
			}else{
				document.all.errmsg.className = "msgfld1"
				document.all.errmsg.innerHTML = "Integer Length Exceeds";
				return false;
			}
		}else {
			localIntLen = num.indexOf(".");
			localDecLen = (num.substring(num.indexOf(".")+1,num.length)).length;
			if ((localIntLen <= intLen) && (localDecLen <= decLen)){
				return true;			
			}else if (localIntLen > intLen) {
				document.all.errmsg.className = "msgfld1"
				document.all.errmsg.innerHTML = "Integer Length Exceeds"; 
				return false;
			}else if (localDecLen > decLen) {
				document.all.errmsg.className = "msgfld1"
				document.all.errmsg.innerHTML = "Decimal Length Exceeds"; 
				return false;				
			}
		}
	}else {
		if(StringLen <= intLen){
			return true;
		}else{
			return false;
		}
	}
}//end isAmtNumeric()
//

//num1="1234.56789";
/*
function trimAmtFld(num1)
{
	var numLen"";
	var fraction="";
	dotPos = num1.indexOf(".");
	
	numLen = num1.length;
	
	if(num1.indexOf(".") >=0)
	{
		intPart = num1.substring(0,dotPos);
		decPart = num1.substring(dotPos+1,num1.length);
	//	decPart = "."+decPart;
		StringLen = intPart.length;
	}

	if(decPart.length > decLen)
	{
		decPart = num1.substring(dotPos+1,decLen)	
	}
	alert("decPart  =  "+decPart);
	return num1;
}
*/

//function to format number



function formatNumber(num1)
{
	var chkFlg = 0;
	var x;
	j=0;
	if (num1.substring(0,1) == "-") {
		chkFlg = 1;
		num1 = num1.substring(1,num1.length);
	}
	refString = "00,00,00,00,00,00,00,00,00,000";
	refStrIndex = refString.length-1;
	newRefIndex = refString.length-1;
	newnumString = "";
	dotPos = num1.indexOf(".");
	if(num1.indexOf(".") >=0) {
		intPart = num1.substring(0,dotPos);
		decPart = num1.substring(dotPos+1,num1.length);
	var k=eval(decLen-decPart.length);
		if(k<decLen || decPart==""){
			for(i=1;i<=k;i++){
					decPart=decPart+"0";
				}
				decPart = "."+decPart;
			} else {
			decPart = "."+decPart;
		}
		StringLen = intPart.length;
	} else {
		intPart = num1.substring(0,num1.length);
		decPart="";
		
		for(i=1;i<=decLen;i++){
			decPart = decPart+"0";
		}
		decPart="."+decPart;
		StringLen = intPart.length;
	}

	for(x=StringLen-1; x>=0; x--) {
		refStrIndex = eval(newRefIndex - j);
		if(refString.charAt(refStrIndex) == ",") {
			numreplace=num1.charAt(x)+",";
			newnumString = numreplace+newnumString;
			newRefIndex=newRefIndex-1;
		} else {
			newnumString = num1.charAt(x)+newnumString;
		}
		j=j+1;
	}

	if(newnumString.charAt(0)=="") {
	}
	if(newnumString.charAt(0)=="," || newnumString.charAt(0)=="0") {
		newnumString=newnumString.substring(1,newnumString.length)+decPart;
//		num1 = newnumString;  609
//		return trimNumber(newnumString);
	} else {
		newnumString=newnumString+decPart;
//		num1 = newnumString;
//		return trimNumber(newnumString);
	}
	/* 609 */
	num1 = newnumString;
	if (chkFlg == 1) {
		num1 = "-" + num1;
	}
	if (num1 == 0) {
		num1 = "0.00";
	}
	return trimNumber(num1);		
}
//end of format number

function unFormat(num)
{
	newUnFormatStr="";
	for(i=0;i<num.length;i++) {
		if(num.charAt(i)!= ",") {
			newUnFormatStr=newUnFormatStr+num.charAt(i);
		}
		
	}
	var numLen;
	num = newUnFormatStr;
	numLen = num.length;
	
	for(i=0;i<numLen;i++) {
		if(num.charAt(0)== "0") {
			num=num.substring(1,num.length);//newUnFormatStr+num.charAt(i);
		}
	}
	
	return num;
	
}

function trimNumber(inputNum) {
	var totLen;
//	alert(decLen);
//	decLen=3;
	decLen=parseInt(decLen);
//	inputNum = document.all.txtNumber.value;
	dotPos = inputNum.indexOf(".");
	//alert(dotPos);
	totLen = eval(dotPos+decLen+1);
	if(inputNum.indexOf(".") >=0) {
		intPart = inputNum.substring(0,dotPos);
		decPart = inputNum.substring(dotPos+1,inputNum.length);
		decPart = "."+decPart;
		StringLen = intPart.length;
	} else {
		intPart = inputNum.substring(0,inputNum.length);
		decPart = "";
		StringLen = intPart.length;
	}
	

	if(decPart.length > decLen) {
		decPart = inputNum.substring(dotPos+1,totLen);
		decPart = "."+decPart;
		//alert(decPart);
	}

	inputNum = intPart+decPart;
	//inputNum =replace(inputNum,'-','dt');
	//alert(inputNum);
//	document.all.txtNumber.value = inputNum;

	return inputNum;

}

	
/* functin to get the decimal value */
//function created by by Mugesh
//dated 30/03/06
	function getDecimal(objVal){
		var dtSym;
		var fldVal;
		var stObjVal;
		var frmVal;
		stObjVal=objVal.toString();
		dtSym=stObjVal.indexOf(".");
		if (dtSym==-1){
			fldVal=stObjVal + ".00";
			return fldVal;
		}else{
			//fldVal=formatNumber(objVal);
			return objVal;
		}
	}//end of getDecimal()*/

//function for reverse Date
	function reverseDate(date, dateFormat) {
		var reversedDate = null;
		if (dateFormat.equalsIgnoreCase("DD-MM-YYYY")) {
			reversedDate = date.substring(6,10) + "-" +  date.substring (3,5) + "-" + date.substring(0,2);
		} else if (dateFormat.equalsIgnoreCase("YYYY-MM-DD")) {
			reversedDate = date.substring(8,10) + "-" +  date.substring (5,7) + "-" + date.substring(0,4);
		}
		return reversedDate;
	}//end reverseDate()
	
	function closeBrowser()	{
		top.window.close();
	}

//function to add days for a perticular date
	function addDays(days,date){
		var w_Date;
		var w_Day;
		var w_Mon;
		var w_Year;
		var w_NewDay;
		var w_NewMon;
		var w_NewDate;
		var w_LeapYr;
		var w_AddVal;
		w_Date = date;
		w_AddVal = days;
		sptArr = w_Date.split("/");
		w_Day = sptArr[0];
		w_Mon = sptArr[1];
		w_Year = sptArr[2];
		w_NewDay = eval(w_Day) + eval(w_AddVal);
		if ((w_Mon == "01") || (w_Mon == "03") || (w_Mon == "05") || (w_Mon == "07") || (w_Mon == "08") || (w_Mon == "10") || (w_Mon == "12")) {
			while (w_NewDay > 31 ) {
				w_NewDay = w_NewDay - getDays(w_Mon , w_Year);
				w_Mon++;
				if (w_Mon > 12 ) {
					w_Mon = w_Mon - 12;
					w_Year++;
				}
			}
		}else if ((w_Mon == "04") || (w_Mon == "06") || (w_Mon == "09") || (w_Mon == "11")) {
			while (w_NewDay > 30 ) {
				w_NewDay = w_NewDay - getDays(w_Mon , w_Year);
				w_Mon++;
				if (w_Mon > 12 ) {
					w_Mon = w_Mon - 12;
					w_Year++;
				}
			}
		
		}else if (w_Mon == "02") {
			w_LeapYr = chkLeapYr(w_Year);
			while (w_NewDay > w_LeapYr ) {
				w_NewDay = w_NewDay - getDays(w_Mon , w_Year);
				w_Mon++;
				if (w_Mon > 12 ) {
					w_Mon = w_Mon - 12;
					w_Year++;
				}
			}
		
		}
		
		w_NewDay = checkLen(w_NewDay);
		w_NewMon = checkLen(w_Mon);
		w_NewDate = w_NewDay + "/" + w_NewMon + "/" + w_Year;
		return w_NewDate;
	}
	function checkLen(newVal) {
		var w_Len;
		var w_NewVal;
		w_Len = newVal.toString().length;
		w_NewVal =newVal.toString(); 
		
		if (w_Len == "1") {
			w_NewVal = "0" + w_NewVal; 	
			return (w_NewVal);
		}else {
			return (newVal.toString());
		}
	}
	
	function chkLeapYr(year){
		if (year % 4 == 0 ) {
			return "29";
		} else {
			return "28";
		}
	}
	
	function getDays(Mon,Year){
		var w_LeapYear;
		if ((Mon == "01") || (Mon == "03") || (Mon == "05") || (Mon == "07") || (Mon == "08") || (Mon == "10") || (Mon == "12")) {
			return "31";
		}else if ((Mon == "04") || (Mon == "06") || (Mon == "09") || (Mon == "11")) {
			return "30";
		}else if (Mon == "02") {
			w_LeapYear = chkLeapYr(Year);
			return w_LeapYear;
		}
	}
//end of function to add days from perticular date	

//added by Magesh - FRMQCLIENTENQ
	
function cSetFooterColor(val){
		if (val=="Q"){
			document.all.tdFldMsg.className = "msgfldQuery";
			document.all.tdUsrid.className = "msgfldQuery";
		}else if (val=="E"){
			document.all.tdFldMsg.className = "msgfldEntry";
			document.all.tdUsrid.className = "msgfldEntry";
		} 
	}


function cSetErrMsg(val){	
		if(val==""){
			document.all.errmsg.className = "msgfld"
		}else{
			document.all.errmsg.className = "msgfld1"
		}
		document.all.errmsg.innerHTML = val
	}//end cSetErrMsg()


function cSetFldHlpMsg(txt1,txt2){		
		document.all.fldmsg.innerHTML=txt1;		
		document.all.hlpmsg.innerHTML=txt2;
	}//end cSetFldHlpMsg()



function cSetUserId(userID){
		document.all.usrid.innerHTML = userID;
	}//end cSetUserId	
	
	
	function formatCurrency(currName){	
		var w_SubUnit;		
		w_Token="GETSUBUNITS";
		w_SubUnit=lookupDatabase(w_Token, currName); 			
		if(w_SubUnit != ""){
			return w_SubUnit;
		}else {
			return "0";
		}
	}
		
	function checkAt(arg){
		var w_Flag=0;
		for(var i=0;i<arg.length;i++) {
			if(arg.charAt(i)=="@"){
				w_Flag++;
			}
	 	}
	 	if(w_Flag == 1){
			return true;
	 	}else {
	 		return false;
	 	}
	}	
	//Magesh - begin
	function genGridDataColumn(gridID,recNum,noOfCols){
		var sendXml;
		rowCount = gridID.documentElement.childNodes.length;
		if(rowCount != 0){
			sendXml = "\n";
			for(j=0;j<noOfCols;j++){
				sendXml += "<Column" + (j+1) + ">";
				sendXml += gridID.documentElement.childNodes(recNum).childNodes(j).text;
				sendXml += "</Column" + (j+1) +  ">";
			}
		}else{
			sendXml = "";
		}
		return sendXml;
	}// end of function genGridDataColumn()
	
	function genGridDataSepFormat(gridID, noOfCols, rowSep, colSep, zeroReq){
		var sendSepFormat = "";
		rowCount = gridID.documentElement.childNodes.length;
		if(rowCount != 0){
			for(rx = 0; rx < rowCount; rx++){
				for(cx = 0; cx < noOfCols; cx++){
					if(zeroReq == "Y"){
						if(gridID.documentElement.childNodes(rx).childNodes(cx).text == "" ||
						   gridID.documentElement.childNodes(rx).childNodes(cx).text == "null" ||
						   gridID.documentElement.childNodes(rx).childNodes(cx).text == null){
							gridID.documentElement.childNodes(rx).childNodes(cx).text = "0";
						}
					}
					if(sendSepFormat == ""){
						sendSepFormat = gridID.documentElement.childNodes(rx).childNodes(cx).text;
					}else{
						sendSepFormat += gridID.documentElement.childNodes(rx).childNodes(cx).text;
					}
					if(parseInt(cx) < parseInt(noOfCols)-1)
					{
						sendSepFormat += colSep;
					}
				}
				if(parseInt(rx) < parseInt(rowCount)-1)
				{
					sendSepFormat += rowSep;
				}
			}
		}
		return sendSepFormat;
	}// end of function genGridDataSepFormat()
	
	function genGridDataXmlFormat(gridData, rowSep, colSep, zeroChk){			
		var sendXmlFormat = "";
		if(gridData != ""){
			sptGridRow = gridData.split(rowSep);
			sendXmlFormat = "<Data>";
			for(rx = 0; rx < sptGridRow.length; rx++){
				sptGridCol = sptGridRow[rx].split(colSep);
				sendXmlFormat += "<Record>";
				for(cx = 0; cx < sptGridCol.length; cx++){
					sendXmlFormat += "<Column" + (cx+1) + ">";
					if(zeroChk==null || zeroChk=="Y")
					{
						if(sptGridCol[cx] == 0){
							sptGridCol[cx] = "";
						}
					}
					sendXmlFormat += encodeXML(sptGridCol[cx]);
					sendXmlFormat += "</Column" + (cx+1) +  ">";
				}
				sendXmlFormat += "</Record>";
			}
			sendXmlFormat += "</Data>";		
		}		
		return sendXmlFormat;
	}// end of function genGridDataXmlFormat()
	//Magesh - End
/* CRE22 - Beg	*/
	function checkEmail(arg){		
		var w_AtFlag=0;
		var w_DotFlag=0;
		for(var i=0;i<arg.length;i++) {
			if(arg.charAt(i)=="@"){
				w_AtFlag++;
			}
			if(arg.charAt(i)==" "){
				setErrMsg("Don't Allow Spaces");
				return false;
			}
			if(arg.charAt(i)=="."){
				w_DotFlag++;
			}								
	 	}
	 	if((w_AtFlag == 1) && (w_DotFlag != 0)){
			return true;
	 	}else{
	 		if((w_AtFlag == 0) || (w_AtFlag > 1) || (w_DotFlag == 0)){
	 			if(w_AtFlag > 1){
			 		setErrMsg("Only One (@) Is Allowed");
					return false;
			 	}
			 	if(w_AtFlag == 0){
			 		setErrMsg("Enter (@) Symbol");
			 		return false;	 		
			 	}
			 	if (w_DotFlag == 0){
					setErrMsg("Enter (.) Symbol");
			 		return false;
				}
	 		}
	 	}		 	
	}
/* CRE22 - End  */

/* CRE41 - Beg  */
	function formKeyDown(){
		if(window.event.altKey || window.event.ctrlKey){
			if(window.event.keyCode == KEY_F5){
				window.event.keyCode = 0;				
			}
		}
	}
/* CRE41 - End  */
	
	//M.K. KRISHNAKUMAR changes - CHENNAI 25.02.09 Beg
	//document.onmousedown=disableRightClick;
	//document.onmousedown=disableRightClick;
	//M.K. KRISHNAKUMAR changes - CHENNAI 25.02.09 End
	
	/* This function is to restrict the Right click of the Mouse for IE*/
	function disableRightClick()
	{
	  	if(document.all)
	  	{	  		
	  		if(!document.rightClickDisabled)
	  		{
			    document.oncontextmenu = disableRightClick;		
			    //M.K. KRISHNAKUMAR changes - CHENNAI 25.02.09 Beg	    
		//	  	return document.rightClickDisabled = false;
				return document.rightClickDisabled = true;
				//M.K. KRISHNAKUMAR changes - CHENNAI 25.02.09 End
			}
			return false;						 
	  	}
	}// end of function disableRightClick()
	
	function generateGridDataXmlFormat(gridID, noOfCols)
	{			
		var sendXmlFormat = "";
		rowCount = gridID.documentElement.childNodes.length
		sendXmlFormat = "<Data>";
		for(rx = 0; rx < rowCount; rx++)
		{
			sendXmlFormat += "<Record>";
			for(cx = 0; cx < noOfCols; cx++)
			{
				sendXmlFormat += "<Column" + (cx+1) + ">";
				sendXmlFormat += gridID.documentElement.childNodes(rx).childNodes(cx).text;
				sendXmlFormat += "</Column" + (cx+1) +  ">";
			}
			sendXmlFormat += "</Record>";
		}
		sendXmlFormat += "</Data>";
		return sendXmlFormat;
	}// end of function generateGridDataXmlFormat()
	
	var w_AscDecFlg=0, w_ColNo;
		
	function sortValue(argColNo, argNoOfCols, argDataType, argXMLId)
	{
		var sortColOrder = "" ;
		var sortString = "";
		var rtnValue = "";
		if(w_AscDecFlg == 0 ) {
			if(argColNo == w_ColNo){
				w_AscDecFlg = 1 ;
			}else{
				w_AscDecFlg = 0 ;
				w_ColNo = argColNo;
			}
		}else {
			w_AscDecFlg = 0 ;
			w_ColNo = argColNo ;
		}			
		sortString="<?xml version='1.0'?>" 
				+"<xsl:stylesheet xmlns:xsl='http://www.w3.org/TR/WD-xsl'>" 
				+"<xsl:template match='/'><Data>" ;
		switch(argDataType){
			case "VARCHAR2"			:	sortColOrder = "Column"+ (argColNo) ; break;
			case "DATE"				:	sortColOrder = "date(Column"+ (argColNo) +")";break; 
			case "NUMBER" 			:	sortColOrder = "number(Column"+ (argColNo) +")";break;
			default 				:	sortColOrder = "Column"+ (argColNo) ; break;
		} 
		
		if (w_AscDecFlg == 1 ){
			sortColOrder = "-" + sortColOrder ;
			sortColOrder = sortColOrder.replace(";",";-") ;
		}
		sortString = sortString + "<xsl:for-each order-by='" + sortColOrder + "' select='//Record'>" ;
		sortString = sortString + "  <Record>" ;
		for (j=1 ;j<= argNoOfCols;j++){  
		   	sortString=sortString + "<Column"+j+"><xsl:value-of select='Column"+j+"' /></Column"+j+">" ;
		}
		sortString = sortString + "</Record></xsl:for-each></Data></xsl:template></xsl:stylesheet> " ;
		//alert(sortString);
		var xslDOM= new ActiveXObject("Microsoft.xmlDOM");
		xslDOM.loadXML(sortString);
		rtnValue = argXMLId.transformNode(xslDOM);
		argXMLId.async=false;
		argXMLId.loadXML(rtnValue); 
	} // end of function sortValue()
	
	function encodeXML(argData)  	{
	 	if(argData == null) return(argData);
		argData = replaceXMLValue(argData,"&","&amp;");
		argData = replaceXMLValue(argData,"<","&lt;");
		argData = replaceXMLValue(argData,">","&gt;");
		argData = replaceXMLValue(argData,"\"","&quot;");
		argData = replaceXMLValue(argData,"\'","&apos;");
		return argData;
  	}// end of function encodeXML()
  	
	function encodeXML1(argData)  	{
	 	if(argData == null) return(argData);
		argData = replaceXMLValue(argData,"&","amp;");
		argData = replaceXMLValue(argData,"<","lt;");
		argData = replaceXMLValue(argData,">","gt;");
		argData = replaceXMLValue(argData,"\"","quot;");
		argData = replaceXMLValue(argData,"\'","apos;");
		return argData;
  	}// end of function encodeXML()
  	
  	function dcodeXML1(argData) {
	 	if(argData == null) return(argData);
		argData = replaceXMLValue(argData,"amp;","&");
		argData = replaceXMLValue(argData,"lt;","<");
		argData = replaceXMLValue(argData,"gt;",">");
		argData = replaceXMLValue(argData,"quot;","\"");
		argData = replaceXMLValue(argData,"apos;","\'");
		return argData;
  	}// end of function encodeXML()
  	
	function replaceXMLValue(argData, argSptChar, argRepChar)	{
		var xmlSym = argData.indexOf(argSptChar);
		if (xmlSym == -1) return argData;
		else{
			var repValue = "";		
			sptData = argData.split(argSptChar);
			for(spx = 0; spx < sptData.length; spx++){
				if(spx == 0) repValue = sptData[spx] + argRepChar;
				else if(spx == (sptData.length-1)) repValue += sptData[spx];
				else repValue += sptData[spx] + argRepChar;
			}
			return repValue;
		}
	}// end of function replaceXMLValue()
	/* function to generate the XML based on the row & col values for the specified gridID*/
	function generateSpGridData(gridID,recNum,noOfCols){
		var sendXml;
		rowCount = gridID.documentElement.childNodes.length;
		if(rowCount != 0){
			sendXml = "\n";
			for(j=0;j<noOfCols;j++){
				sendXml += "<Col" + j + ">";
				sendXml += encodeXML(gridID.documentElement.childNodes(recNum).childNodes(j).text);
				sendXml += "</Col" + j +  ">";
			}
		}else{
			sendXml = "";
		}
		return sendXml;
	}//end generateGridData()
	function generateSpGridDataXmlFormat(gridID, noOfCols)
	{			
		var sendXmlFormat = "";
		rowCount = gridID.documentElement.childNodes.length
		sendXmlFormat = "<Data>";
		for(rx = 0; rx < rowCount; rx++)
		{
			sendXmlFormat += "<Record>";
			for(cx = 0; cx < noOfCols; cx++)
			{
				sendXmlFormat += "<Column" + (cx+1) + ">";
				sendXmlFormat += encodeXML(gridID.documentElement.childNodes(rx).childNodes(cx).text);
				sendXmlFormat += "</Column" + (cx+1) +  ">";
			}
			sendXmlFormat += "</Record>";
		}
		sendXmlFormat += "</Data>";
		return sendXmlFormat;
	}// end of function generateGridDataXmlFormat()
	function genPDFGridData(gridID,noOfCols,rSep,cSep){
		var sendXml="";
		var noOfRows = 0;
		noOfRows = gridID.documentElement.childNodes.length;
		if(noOfRows != 0){
			for (rCnt = 0; rCnt < noOfRows; rCnt++){
				for(cCnt = 0; cCnt < noOfCols;cCnt++){
					sendXml += encodeXML1(gridID.documentElement.childNodes(rCnt).childNodes(cCnt).text);
					if (cCnt+1 != noOfCols) {
						sendXml += cSep;
					}
				}
				if (rCnt+1 != noOfRows) {
					sendXml += rSep
				}
			}
		}
		return sendXml;
	}
	function sortValueTableID(argColNo, argNoOfCols, argDataType, argXMLId, argTableId, argAscDecFlg)
	{
		var sortColOrder = "" ;
		var sortString = "";
		var rtnValue = "";
		sortString="<?xml version='1.0'?>" 
				+"<xsl:stylesheet xmlns:xsl='http://www.w3.org/TR/WD-xsl'>" 
				+"<xsl:template match='/'><Data>" ;
		switch(argDataType){
			case "DATE"				:	sortColOrder = "date(Column"+ (argColNo) +")"; break; 
			case "TIMESTAMP(6)"		:	sortColOrder = "date(Column"+ (argColNo) +")"; break; 
			case "NUMBER" 			:	sortColOrder = "number(Column"+ (argColNo) +")"; break;
			case "LONG" 			:	sortColOrder = "number(Column"+ (argColNo) +")"; break;
			default 				:	sortColOrder = "Column"+ (argColNo); break;
		}		
		if (argAscDecFlg == 1 ){
			sortColOrder = "-" + sortColOrder ;
			sortColOrder = sortColOrder.replace(";",";-") ;
		}
		sortString = sortString + "<xsl:for-each order-by='" + sortColOrder + "' select='//Record'>" ;
		sortString = sortString + "  <Record>" ;
		for (j=1 ;j<= argNoOfCols;j++){  
		   	sortString=sortString + "<Column"+j+"><xsl:value-of select='Column"+j+"' /></Column"+j+">" ;
		}
		sortString = sortString + "</Record></xsl:for-each></Data></xsl:template></xsl:stylesheet> " ;
		var xslDOM= new ActiveXObject("Microsoft.xmlDOM");
		xslDOM.loadXML(sortString);
		rtnValue = argXMLId.transformNode(xslDOM);
		argXMLId.async=false;
		argXMLId.loadXML(rtnValue); 
		setXMLToGrid(argTableId, rtnValue);
	} // end of function sortValueTableID()
	
	function loadXMLSat(text){
	
	// code for IE
	if (window.ActiveXObject){
		var doc=new ActiveXObject("Microsoft.XMLDOM");
		doc.async="false";
		doc.loadXML(text);
	}else{// code for Mozilla, Firefox, Opera, etc.
		var parser=new DOMParser();
		var doc=parser.parseFromString(text,"text/xml");
	}// documentElement always represents the root node
	var x=doc.documentElement;
	return x;
}
/*
function validateToolBar(rolecode,pgmid,userid)
   	{		
   		   //SELECT  PGMPSGSR_GSR_PGM_ID FROM PGMPSGSR WHERE PGMPSGSR_SYS_CODE=? AND PGMPSGSR_ID=? AND  PGMPSGSR_PGM_USER_CODE=?
   		   //SELECT MPGM_ICON_ID,MPGM_ICON_DESCN ,MPGM_DESCN FROM MPGM WHERE MPGM_ID=?
   		   var w_Token;
   		   var w_Rolecode=rolecode;
   		   w_PgmId=pgmid;
   		   w_UserId=userid;
   		   //w_Token = "VALIDATETOOL";
   		   //var Tool=lookupDatabase(w_Token,w_UserId + "|" + w_Syscode + "|" + w_PgmId);
			w_Token = "VALIDATEUSERTOOL";
   		    var Tool=lookupDatabase(w_Token,w_UserId + "|" + w_PgmId);
	        if(Tool!="")
	        {   
	        	//alert(Tool);
	       		xmlToolBar.loadXML(Tool);
		       	getToolBarDetails();
	       		
   			}
   			else
   			{
   			
   			w_Token = "VALIDATEROLETOOL";
   		    var RoleTool=lookupDatabase(w_Token,w_Rolecode + "|" + w_PgmId);
   		     if(RoleTool!="")
	        		{
	        		xmlToolBar.loadXML(RoleTool);
	        		getToolBarDetails();
	        		}   
   		    
   			}
   			

   	}
   	**/
   	function validateToolBar(rolecode,pgmid,userid)
   	{		
   		   //SELECT  PGMPSGSR_GSR_PGM_ID FROM PGMPSGSR WHERE PGMPSGSR_SYS_CODE=? AND PGMPSGSR_ID=? AND  PGMPSGSR_PGM_USER_CODE=?
   		   //SELECT MPGM_ICON_ID,MPGM_ICON_DESCN ,MPGM_DESCN FROM MPGM WHERE MPGM_ID=?
   		   var w_Token;
   		   var w_Rolecode=rolecode;
   		   w_PgmId=pgmid;
   		   w_UserId=userid;
   		   //w_Token = "VALIDATETOOL";
   		   //var Tool=lookupDatabase(w_Token,w_UserId + "|" + w_Syscode + "|" + w_PgmId);
			w_Token = "POPUPCOMBONEW";
   		    var Tool=lookupDatabase(w_Token,w_UserId + "|" +w_Rolecode + "|" + w_PgmId);
   		    alert(Tool);
	        if(Tool!="")
	        {   
	        	//alert(Tool);
	       		xmlToolBar.loadXML(Tool);
		       	getToolBarDetails();
	       		
   			}
   			/*
   			else
   			{
   			
   			w_Token = "VALIDATEROLETOOL";
   		    var RoleTool=lookupDatabase(w_Token,w_Rolecode + "|" + w_PgmId);
   		     if(RoleTool!="")
	        		{
	        		xmlToolBar.loadXML(RoleTool);
	        		getToolBarDetails();
	        		}   
   		    
   			}
   			**/
   			toolBar();

   	}
   	
   	
   	function getToolBarDetails()
   		{
   			w_Arrpgm=new Array(xmlToolBar.documentElement.childNodes.length);
	       		for(i=0;i<xmlToolBar.documentElement.childNodes.length;i++)
	       		{
	       			w_Arrpgm[i]=xmlToolBar.documentElement.childNodes(i).childNodes(0).text;
	       		}
	       		/*
	       		w_Token = "VALIDATEMPGM";
	       		for(k=0;k<w_Arrpgm.length;k++)
	       		{
	       			var mpgm=lookupDatabase(w_Token,w_Arrpgm[k]);
	       			xmlToolBar.loadXML(mpgm);
	       			w_Image=w_Image+xmlToolBar.documentElement.childNodes(0).childNodes(0).text+"#";
	       			w_ShortDescn=w_ShortDescn+xmlToolBar.documentElement.childNodes(0).childNodes(1).text+"#";
	       			w_ToolTip=w_ToolTip+xmlToolBar.documentElement.childNodes(0).childNodes(2).text+"#";
	       			w_Module=w_Module+xmlToolBar.documentElement.childNodes(0).childNodes(3).text+"#";
	       			
	         	}
	         	w_Image=w_Image.substring(0,w_Image.length-1);
	        // 	alert(w_Image);
	         	w_ShortDescn=w_ShortDescn.substring(0,w_ShortDescn.length-1);
	         	w_ToolTip=w_ToolTip.substring(0,w_ToolTip.length-1);
	         	//alert(w_ToolTip);
	         	w_ArrImage=w_Image.split("#");
	         	w_Image="";
	         	w_ArrShortDescn=w_ShortDescn.split("#");
	         	w_ShortDescn="";
	         	w_ArrToolTip=w_ToolTip.split("#");
	         	w_ToolTip="";
	         	w_ArrModule=w_Module.split("#");
	         	w_Module="";
	         	**/
	         	toolBar();
   		}
 function toolBar()
   	{		

   			var j=1;
   			document.getElementById('tooltable').style.visibility="visible";
   			var tool=null;

   			//var aToolBar=new dhtmlXToolbarObject(document.getElementById('toolbar_zone'),'100%','30',"Mutual Funds");
			var aToolBar=new dhtmlXToolbarObject(document.getElementById('toolbar_zone'),'98%','30',"Customised Toolbar");
			//aToolBar.setOnClickHandler(onButtonClick);
			aToolBar.loadXML("images/_toolbar.xml");
			
			//aToolBar.addItem(new dhtmlXImageButtonObject('images/folderopen.gif',20,18,0,'folderopen','tooltip1'));
			for(i=0;i<w_Arrpgm.length;i++)
	       	{
	       			if(i<7)
	       			{
		       			aToolBar.addItem(new dhtmlXImageButtonObject('images/'+w_ArrImage[i],35,25,0,w_Arrpgm[i],w_ArrToolTip[i],"","",w_ArrShortDescn[i]));
		       			aToolBar.addItem(new dhtmlXToolbarDividerXObject('b_'+(new Date()).valueOf()));
		       		}	
	       			if(i==7)
	       			{
	       				aToolBar.addItem(new dhtmlXImageButtonObject('images/down.GIF',100,35,0,"down",'More',"","","Down"));
	       			}		
	       	}
	       	aToolBar.showBar();			
   	}
	function onButtonClick(itemId,itemValue)
	{	
		
		for(i=0;i<w_Arrpgm.length;i++)
	    {
	       	if(w_Arrpgm[i]==itemId)
			{
			//	file="?toolbar="+w_PgmId+".jsp&fname="+w_Arrpgm[i]+".jsp&Desc="+w_ArrToolTip[i];
			
					file="?toolbar="+w_PgmId+".jsp&fname="+w_ArrModule[i]+"/"+w_Arrpgm[i]+".jsp&Desc="+w_ArrToolTip[i];
					
				
			
				showModalDialog("../ToolBarContent.jsp"+file,"", "dialogWidth:1024px;dialogHeight:940px;dialogLeft:200px;dialogTop:0px;help:0;scrollbars=1;status");		
				break;
			}	       	
	    }
	    if(itemId=="down")
	    {
	    	ItemSelMenu(event);
	    }
		
	}
	
	
	function loadAjax()
	{
		try{
	    	xmlHttp=new XMLHttpRequest();
		}catch (e){
	    	try{
	             xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
	           }catch (e){
	        	try{
	        		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	                }catch (e){
	                	alert("Your browser does not support AJAX!");
	                    return false;
	                   }
	               }
	           }
	}
	var w=window.innerWidth;
	var h=window.innerHeight;

	var FORM_MODAL = document.createElement('DIV');
	FORM_MODAL.innerHTML = "<div style='width:"+w+"%;height:"+h+"%;'><table style='position:absolute;top:40%;left:45%;height:40%;font-size:small;font-family:tahoma;font-weight:bold;color:black'><tr><td><img src='./images/p1.gif' height='40%' width='20%'></img>&nbsp;&nbsp;<span style='position:relative;top:-12px;'>Processing Request...</span></td><tr></table></div>";
	
	var FORM_IFRAME = document.createElement('IFRAME');
	FORM_IFRAME.src = "blank.html";
	FORM_IFRAME.className = "iframe-hidden";
	
	function openFormModal()  {
	    FORM_MODAL.visibility = "visible";
	    FORM_MODAL.className = "form-modal-visible";
	    document.body.appendChild(FORM_IFRAME);
	    document.body.appendChild(FORM_MODAL);
	}
	function closeFormModal()  {
		FORM_MODAL.visibility = "hidden";
		FORM_MODAL.visibility = "block";
		FORM_MODAL.className = "form-modal-hidden";
	    document.body.removeChild(FORM_IFRAME);
	    document.body.removeChild(FORM_MODAL);
	}

	
	var options = {
	        height: 300, // sets the height in pixels of the window.
	        width: 300, // sets the width in pixels of the window.
	        toolbar: 0, // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
	        scrollbars: 1, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
	        status: 0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
	        resizable: 1, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
	        left: 0, // left position when the window appears.
	        top: 0, // top position when the window appears.
	        center: 0, // should we center the window? {1 (YES) or 0 (NO)}. overrides top and left
	        createnew: 0, // should we create a new window for each occurance {1 (YES) or 0 (NO)}.
	        location: 0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
	        menubar: 0 // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
	    };

	    var parameters = "location=" + options.location +
	                     ",menubar=" + options.menubar +
	                     ",height=" + options.height +
	                     ",width=" + options.width +
	                     ",toolbar=" + options.toolbar +
	                     ",scrollbars=" + options.scrollbars +
	                     ",status=" + options.status +
	                     ",resizable=" + options.resizable +
	                     ",left=" + options.left +
	                     ",screenX=" + options.left +
	                     ",top=" + options.top +
	                     ",screenY=" + options.top;

	    
	    
	    
	    function date_time(id){ date = new Date; year = date.getFullYear();
	    month = date.getMonth(); months = new Array('January',
	    'February', 'March', 'April',
	    'May', 'June', 'Jully',
	    'August', 'September', 'October',
	    'November', 'December'); d = date.getDate(); day =
	    date.getDay(); days = new Array('Sunday', 'Monday',
	    'Tuesday', 'Wednesday', 'Thursday',
	    'Friday', 'Saturday'); h = date.getHours(); if(h<10)
	    { h = "0"+h; } m = date.getMinutes(); if(m<10) { m = "0"+m; } s =
	    date.getSeconds(); if(s<10) { s = "0"+s; } result =
	    ''+days[day]+' '+months[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
	    document.getElementById(id).innerHTML = result;
	    setTimeout('date_time("'+id+'");','1000');
	    return true;}
