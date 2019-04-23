function xmlHTTPValidator(){
	var xmlDOM = null; 
	var validatorAction = null; 
	
	if (document.all) {
		/*For Internet Explorer*/
		xmlDOM = new ActiveXObject("Microsoft.XMLDOM") ;
		xmlDOM.loadXML("<Data><Record></Record></Data>");
	}else{
		/*For Mozilla implementation*/
		var objDOMParser = new DOMParser();
		xmlDOM = objDOMParser.parseFromString("<Data><Record></Record></Data>", "text/xml");
	}

		
	//this.resetData = resetDataX ; 
	//this.resetData = clearMapX ; 
	this.getValue = getValueX ; 
	this.setValue = setValueX ; 
	this.containsKey = containsKeyX ; 
	this.containsValue = containsValueX ; 
	this.sendAndReceive = sendAndReceiveX ; 
	this.getXMLDTDObject = getXMLDTDObjectX; //added by ranjith
	this.clearMap	= clearMapX;
	this.getAllXML = getAllXMLX;
	
	function getXMLDTDObjectX(dtdObj){		//added by ranjith
		return getValueX(dtdObj);
	}
	
	function clearMapX(){
		if (document.all) {
			xmlDOM.loadXML("<Data><Record></Record></Data>");
		}else{
			while (xmlDOM.documentElement.hasChildNodes())
  			xmlDOM.documentElement.removeChild(xmlDOM.documentElement.lastChild);
  			xmlDOM.documentElement.appendChild(document.createElement("Record")) ;
		}
	}
	/*
	function resetDataX(){
		if (document.all) {
			xmlDOM.loadXML("<Data><Record></Record></Data>");
		}else{
			while (xmlDOM.documentElement.hasChildNodes())
  			xmlDOM.documentElement.removeChild(xmlDOM.documentElement.lastChild);
  			xmlDOM.documentElement.appendChild(document.createElement("Record")) ;
		}
	}
	*/
	/*
	function getValueX(KeyName) {
		if (document.all) {
			return xmlDOM.documentElement.childNodes(0).getElementsByTagName(KeyName)(0).text ;
		}else{
			return xmlDOM.documentElement.childNodes[0].getElementsByTagName(KeyName)[0].firstChild.nodeValue;
		}
	}
	*/
	
	function getValueX(KeyName) {
		if (document.all) {
			try{
				return xmlDOM.documentElement.childNodes(0).getElementsByTagName(KeyName)(0).text ;
			}catch(e){
				return "";
			}
			
		}else{
			return xmlDOM.documentElement.childNodes[0].getElementsByTagName(KeyName)[0].firstChild.nodeValue;
		}
	}
	

	function setValueX(KeyName, Value){
		if (document.all) {
			var Element = xmlDOM.createNode("element",KeyName,"");
			xmlDOM.documentElement.childNodes[0].appendChild(Element);
			xmlDOM.documentElement.childNodes[0].getElementsByTagName(KeyName)(0).text = Value ; 
			
		}else{	
			xmlDOM.documentElement.childNodes[0].appendChild(document.createElement(KeyName)).appendChild(document.createTextNode(Value)) ; 
			var xmlstr = getXML(xmlDOM);
			xmlDOM = null;
			xmlDOM = objDOMParser.parseFromString(xmlstr, "text/xml");
		}
	}


	function containsKeyX(keyName) {
		
		if (document.all) {
			nodeListObj = xmlDOM.documentElement.childNodes(0).getElementsByTagName(keyName)(0) ;
		}else{
			nodeListObj = xmlDOM.documentElement.childNodes[0].getElementsByTagName(keyName)[0] ;
		}	

		if (nodeListObj==null) {
			return false ;
		}else{
			return true ;
		}
	}//end of containsKeyX()


	function containsValueX(keyName){

		if (containsKeyX(keyName)) {
			if (document.all) {
				textNodeValue = xmlDOM.documentElement.childNodes(0).getElementsByTagName(keyName)(0).text ;
			}else{
				textNodeValue = xmlDOM.documentElement.childNodes[0].getElementsByTagName(keyName)[0].firstChild.nodeValue ;
			}	

			if ((textNodeValue==null)||(textNodeValue=="")) {
				return false ;
			}else{
				return true ;
			}

		}else{
			return false;
		}
	}

	function setAction(actionName){
		validatorAction = actionName ;
	}
	
	function getAction(){
		return validatorAction
	}

	function sendAndReceiveX(){
		if (document.all){
			var objXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP"); // InternetExplorer
		}else{
			var objXMLHTTP = new XMLHttpRequest(); //Mozilla 
		}
		var xmlStr = xmlDOM.xml ;
		xmlStr  = replaceall(xmlStr,"<Data>","");
		xmlStr  = replaceall(xmlStr,"</Data>","");
		xmlDOM.loadXML(xmlStr);    
		var urlstr = "" ;
		var frmlength = xmlDOM.documentElement.childNodes.length ;
		alert("xml"+xmlStr)
		for (var j=0;j<frmlength;j++){
			if (j==0) {
				itemName = xmlDOM.documentElement.childNodes(0).tagName  ; 
			}else{
				itemName=  "&" + xmlDOM.documentElement.childNodes(j).tagName  ; 
			}	
			try{
				urlstr = urlstr + itemName+"="+ xmlDOM.documentElement.childNodes(j).childNodes(0).text;
			}catch(e){
				urlstr = urlstr + itemName+"=" ;
			}
		}
		/*objXMLHTTP.open("POST","XMLDTHttpServlet",false);
		urlstr = URLEncode(urlstr); 
		objXMLHTTP.setRequestHeader("content-type", "application/x-www-form-urlencoded") ;
		objXMLHTTP.send(urlstr);
		var rtnXML = objXMLHTTP.responseText;*/
		
		
		var URL = "ajaxcall.action?xml="+urlstr;
	    loadAjax();
	    xmlHttp.onreadystatechange = function(){
			if(xmlHttp.readyState==4)
		    {
		       	alert("got result")
		       	clearMapX();
				//ajaxResult=xmlHttp.responseText;
		       	xmlDOM.loadXML(xmlHttp.responseXml);
		       	return true;
		    }
		}
	    xmlHttp.open("GET", URL, true);
	    xmlHttp.send(null);
	    
		
		
		//alert(rtnXML);
		/*if (objXMLHTTP.statusText == "OK" ) {
			clearMapX();
			xmlDOM.loadXML(rtnXML);
			return true;
		}else{
			return false;
		}*/
	  }//end of sendAndReceiveX() 
}//end of xmlHTTPValidator()


function getXML(DOMobj){
		if (document.all) {	
			return DOMobj.xml ;
		}else{
    		var objXMLSerializer = new XMLSerializer;
   			var strXML = objXMLSerializer.serializeToString(DOMobj);
    		return strXML;
		}
}



function URLEncode(urlstr ){
		var SAFECHARS = "0123456789" +	"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	"abcdefghijklmnopqrstuvwxyz" + "-_.!~*'()=?&";
		var HEX = "0123456789ABCDEF";
		var plaintext = urlstr;
		var encoded = "";
		for (var i = 0; i < plaintext.length; i++ ) {
			var ch = plaintext.charAt(i);
		    if (ch == " "){
			    encoded += "+";				
			}else if (SAFECHARS.indexOf(ch) != -1) {
			    encoded += ch;
			}else {
			    var charCode = ch.charCodeAt(0);
				if (charCode > 255) {
				    alert( "Unicode Character '" + ch + "' cannot be encoded using standard URL encoding.\n" +
					        "(URL encoding only supports 8-bit characters.)\n" +
							"A space (+) will be substituted." );
					encoded += "+";
				}else {
					encoded += "%";
					encoded += HEX.charAt((charCode >> 4) & 0xF);
					encoded += HEX.charAt(charCode & 0xF);
				}
			}
		}
		return encoded;
}

function replaceall(str,findStr,replaceStr){
		while(str.lastIndexOf(findStr) >= 0 ){
			str = str.replace(findStr,replaceStr); 
		}
		return str;
}


function getAllXMLX(){
	if (document.all) {	
		return xmlDOM.xml ;
	}else{
    	var objXMLSerializer = new XMLSerializer;
   		var strXML = objXMLSerializer.serializeToString(xmlDOM);
   		return strXML;
	}
}
