<html>
<head>
<LINK href="./css/obcstyle.css" rel="stylesheet" type="text/css">
<SCRIPT language="JavaScript">
	var eventObj;
	function hideHelp() {
		document.getElementById("helpframe").style.visibility="hidden" ;
	}
	 
	function showHelp(helpToken,SearchTextObj,helpLeft,helpTop,strArgs) {
		eventObj = SearchTextObj ;	
 		document.getElementById("helpframe").style.left="270px";
		document.getElementById("helpframe").style.top="150px";		
		document.getElementById("helpframe").style.visibility="visible";
		helpframe.help(helpToken,SearchTextObj.value,strArgs);
	}
	function eventobjectfocus() {
		eventObj.focus();
	}
</SCRIPT>
</head>

<body>
	<iframe	id = "helpframe"  src = "helpWindow.jsp" style = "background-color:transparent; width: 494px; height:302px;position:absolute; visibility:hidden; z-index:202">
 	</iframe>
 	<input type="hidden" name="hid"/>
</body>
</html>