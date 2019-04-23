<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<title>Bill Soft</title>
<LINK rel=stylesheet type=text/css	href="./css/t1_core_logged_out.bundle.css">
<LINK rel=stylesheet type=text/css href="./css/t1_more.bundle.css">
<LINK rel=stylesheet type=text/css href="./css/newstyle.css">
</head>
<BODY dir=ltr class="t1 front-page" background="./images/bg.jpg">
<h2></h2>
<s:actionerror />
<s:form action="login.action" method="post">
<div align="center"><font class="front-welcometxt">Welcome to BillSoft</font></div>
	<DIV style="POSITION: absolute; WIDTH: 325px; HEIGHT: 158px; TOP: 180px; LEFT: 780px; background-color: F5F5F5">
	<table style="POSITION: absolute; TOP: 200px; LEFT: 806px;" cellpadding="3" cellspacing="3">
		<tr>
			<td><s:textfield name="username" key="label.username" size="20" /></td>
			<td><s:password name="password" key="label.password" size="20" /></td>
		</tr>
	</table>
	</DIV>
	<DIV class=remember-forgot style="POSITION: absolute; TOP: 365px; LEFT: 950px;">
<s:submit method="execute" class="newbutton" key="label.login"/>
</DIV>
</s:form>
</body>
</html>

