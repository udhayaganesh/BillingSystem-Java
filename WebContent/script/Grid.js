// DataGrid.js
//Author	:	0789 - S.Rizwan Sha

/*
* Function to get the Reference of the table Input Tag
* (e.g) var tableRef=getTableObj("gridId");
*/
function getTableObj(tableid)
{
	for(var i=0;i < document.getElementsByTagName('table').length;i++)
	{	
		/*alert(i);
		alert(document.getElementsByTagName('table').item(i));
		alert(document.getElementsByTagName('table').item(i).getAttribute('id'));*/
		if(document.getElementsByTagName('table').item(i).getAttribute('id')==tableid)
		{
			return document.getElementsByTagName('table').item(i);
		}
	}
}
/*
	* Function to add row in grid
	* (e.g) addingRowToGrid(tableid,("egridid",2);
*/

function addingRowToGrid(tableid)
{
	var tableref=getTableObj(tableid);
	var mycurrent_row;
	var mytablebody=tableref.getElementsByTagName('tbody').item(0);	
	if(getRowCount(tableid)>0)
	{
		mycurrent_row=mytablebody.getElementsByTagName('tr').item(1).cloneNode(true);
	}
	var curr_rec_num=getRowCount(tableid);
	mycurrent_row.setAttribute('recnum',curr_rec_num);
	mytablebody.appendChild(mycurrent_row);
	var myrow=getRowObject(tableid,parseInt(curr_rec_num));
	for(var j=0;j<myrow.getElementsByTagName('td').length;j++)
	{
		var colref=myrow.getElementsByTagName('td').item(j);
		var temp=colref.getElementsByTagName('select').length;
		if(temp==0)
		{	 
			var temp1=colref.getElementsByTagName('span').length;
			if(temp1==0 && colref.getElementsByTagName('input').item(0)!=null)
			{
				if(colref.getElementsByTagName('input').item(0).getAttribute("id").substring(0,1)=="d" || colref.getElementsByTagName('input').item(0).getAttribute("name").substring(0,1)=="d")
				{
					var txtFldId=colref.getElementsByTagName('input').item(0).getAttribute("id");
					txtFldId=txtFldId.substring(0,txtFldId.length-1);
					colref.getElementsByTagName('input').item(0).setAttribute("id",txtFldId+curr_rec_num);
					var a="gridAnchor"+tableid+j+curr_rec_num;
					var click="cal3.select(document.all."+txtFldId+curr_rec_num+",'"+a+"','"+parent.w_DateFormat+"'); return false;"; 
					var imgref=colref.getElementsByTagName('A').item(0);
					var str="<img  src='images/ssCalendar.jpg' align='middle' id='"+a+"' onclick="+click+"></img>";
					imgref.innerHTML=str;
				}
			}
		}
	}
}

/*
	* Function to get No. of rows in table
	* (e.g) getRowCount("egrid");
*/

function getRowCount(tableid)
{
	var tableref=getTableObj(tableid);
	var mytablebody=tableref.getElementsByTagName('tbody').item(0);
	return mytablebody.getElementsByTagName('tr').length;
}

/*
	* Function to delete row in grid
	* (e.g) deleteRowGrid("egridid",2);
*/
/* Premnath-chn-06/06/2007-beg   changed for f7 and mainly for date contrl in grid	
function deleteRowGrid(tableid,whichRow)
{
	var tableref=getTableObj(tableid);
	var mytablebody=tableref.getElementsByTagName('tbody').item(0);
	var rowref=mytablebody.getElementsByTagName('tr').item(parseInt(whichRow));
	mytablebody.removeChild(rowref);
	for(var i=2;i<=getRowCount(tableid);i++)
	{
		mytablebody.getElementsByTagName('tr').item(i-1).setAttribute('recnum',i-1);
	}
}*/
function deleteRowGrid(tableid,whichRow)
{
	var tableref=getTableObj(tableid);
	var mytablebody=tableref.getElementsByTagName('tbody').item(0);
	var rowref=mytablebody.getElementsByTagName('tr').item(parseInt(whichRow));
	mytablebody.removeChild(rowref);
	for(var i=2;i<=getRowCount(tableid);i++)
	{
		mytablebody.getElementsByTagName('tr').item(i-1).setAttribute('recnum',i-1);
	}	
	for(var i=1;i<getRowCount(tableid);i++)
	{		
		var myrow=getRowObject(tableid,i);		
		for(var j=0;j<myrow.getElementsByTagName('td').length;j++)
		{
			var colref=myrow.getElementsByTagName('td').item(j);
			if (colref.getElementsByTagName('select').item(0)!= null){
				if(colref.getElementsByTagName('input').item(0).getAttribute("id").substring(0,1)=="d" || colref.getElementsByTagName('input').item(0).getAttribute("name").substring(0,1)=="d")
				{
					var txtFldId=colref.getElementsByTagName('input').item(0).getAttribute("id");
					txtFldId=txtFldId.substring(0,txtFldId.length-1);
					colref.getElementsByTagName('input').item(0).setAttribute("id",txtFldId+i);
					var a="gridAnchor"+tableid+j+i;
					//C.Premnath - 0920 - 29-06-2007 beg
					// var click="cal3.select(document.all."+txtFldId+i+",'"+a+"','DD-MM-YYYY'); return false;";
					var click="cal3.select(document.all."+txtFldId+i+",'"+a+"','"+parent.w_DateFormat+"'); return false;";	
					//C.Premnath - 0920 - 29-06-2007 end
					var imgref=colref.getElementsByTagName('A').item(0);
					var str="<img  src='images/ssCalendar.jpg' align='middle' id='"+a+"' onclick="+click+"></img>";
					imgref.innerHTML=str;
				}
			}
		}
	}
	
}  // Premnath-chn-06/06/2007-End
/*
	* Function to set Focus in cell 
	* (e.g) setFocusTo("egridid",2,3);
*/

function setFocusTo(tableid,rownum,colnum)
{
	var tableref=getTableObj(tableid);
	var mytablebody=tableref.getElementsByTagName('tbody').item(0);
	var rowref = mytablebody.getElementsByTagName('tr').item(rownum);
	var colref = rowref.getElementsByTagName('td').item(colnum);	
	if(colref.getElementsByTagName('input').length!=0)
		colref.getElementsByTagName('input').item(0).focus();
	else 
		colref.getElementsByTagName('select').item(0).focus();	
}


/*
	* Function to set value in cell to table
	* (e.g) setCellValue("egridid",,1,2,"ere")
*/
function setCellValue(tableid,rownum,colnum,value)
{
	var tableref=getTableObj(tableid);
	alert("table"+tableref+"rownum"+rownum);
	var rowref=tableref.rows[rownum];
	alert("check"+rowref);
	var colref=rowref.cells[colnum];
	alert('colref'+colref)
	if(colref=="null" || colref==null || colref=="undefined") 
			return;
	
	var temp=colref.getElementsByTagName('select').length;
	if(temp==0)
	{
		var temp1=colref.getElementsByTagName('span').length;
		if(temp1!=0)
		{
			colref.getElementsByTagName('span').item(0).innerText= value;
		}
		else
		{	
			switch(colref.getElementsByTagName('input').item(0).getAttribute("type"))
			{
				case "text":
					if(value=="" || value=="null" || value==null)
						value="";
					if(colref.getElementsByTagName('input').item(0).getAttribute("dataSrc")=="amt" && value!="")
					{					
			 			colref.getElementsByTagName('input').item(0).value=formatNumber(value+"",w_GridCurr,"R"); 
			 		}
			 		else
			 		{
			 			colref.getElementsByTagName('input').item(0).value=value; 
			 		}		
					break;
				case "checkbox":
					if(value=="" || value=="N" || value=="0"||value=="null" || value==null || value=="No")
						colref.getElementsByTagName('input').item(0).checked=false;
					else
						colref.getElementsByTagName('input').item(0).checked=true; 				
					break;
				case "image":
					if(value=="" || value=="N" || value=="0"||value=="null" || value==null || value=="No")
						colref.getElementsByTagName('input').item(0).checked=false;
					else
						colref.getElementsByTagName('input').item(0).checked=true; 				
					break;
			}
		}
	}
	else
	{
		if(value=="")
			colref.getElementsByTagName('select').item(0).value=0;
		else
			colref.getElementsByTagName('select').item(0).value=value;	
	}
}
/*
	* Function to set XMLString to table
	* (e.g) setXMLToGrid("egridid",w_RetVal)
*/
	
function setXMLToGrid(tableid,xmlStr)
{
	var rowCount=getRowCount(tableid);
	deleteNRows(tableid,rowCount-1);
	var xmlDOM = null; 
	if (document.all) 
	{
		/*For Internet Explorer*/
		xmlDOM = new ActiveXObject("Microsoft.XMLDOM");
		xmlDOM.loadXML(xmlStr);
	}
	else
	{
		/*For Mozilla implementation*/
		objDOMParser=new DOMParser();
		xmlDOM = objDOMParser.parseFromString(xmlStr,"text/xml");
	}
	var norows=xmlDOM.documentElement.childNodes.length;
	var noCols=xmlDOM.documentElement.childNodes[0].childNodes.length;

	addNRowsToGrid(tableid,norows-1);
	for(var r=0;r<parseInt(norows);r++)
	{
		for(var c=0;c<noCols;c++)
		{
			var cellvalue=xmlDOM.documentElement.childNodes[r].childNodes[c].text;
			setCellValue(tableid,parseInt(r)+1,c,cellvalue);
		}
	}
}
	
function deleteNRows(tableid,rows)
{

	var tableref=getTableObj(tableid);
	var mytablebody=tableref.getElementsByTagName('tbody').item(0);
	var rowCount=getRowCount(tableid);
	if(rows>=rowCount)
		alert("No of Rows should be less than actual rows");
	else
		for(var i=2;i<=rows;i++)
			deleteRowGrid(tableid,rowCount-i);
}
	
/*
	* Function to add n no. of rows in a gid
	* (e.g) getXMLFromGrid("egridid")
*/
	
function addNRowsToGrid(tableid,n)
{
	for(var i=0;i<n;i++)
	{	
		addingRowToGrid(tableid);
	}
}
/*
	* Function to get XML format of grid
	* (e.g) getXMLFromGrid("egridid")
*/
//0863 c.vakula 31-08-2007 beg (for encoding &,-,',")
function encodeXML(argData)  	{
	 	if(argData == null) return(argData);
		argData = replaceXMLValue(argData,"&","&amp;");
		argData = replaceXMLValue(argData,"<","&lt;");
		argData = replaceXMLValue(argData,">","&gt;");
		argData = replaceXMLValue(argData,"\"","&quot;");
		argData = replaceXMLValue(argData,"\'","&apos;");
		return argData;
  	}
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
	}
	//0863 c.vakula 31-08-2007 end (for encoding &,-,',")
  

	
function getXMLFromGrid(tableid)
{
	var tableref=getTableObj(tableid);
	var xmlString="<Data>";
	var mytablebody=tableref.getElementsByTagName('tbody').item(0);

	for(var i=1;i<mytablebody.getElementsByTagName('tr').length;i++)
	{
		var rowref=mytablebody.getElementsByTagName('tr').item(i); 
		xmlString=xmlString+"<Record>";
		for(var j=0;j<rowref.getElementsByTagName('td').length;j++)
		{
			var colref=rowref.getElementsByTagName('td').item(j);
			var temp=colref.getElementsByTagName('select').length;
			if(temp==0)
			{
				if(colref.getElementsByTagName('input').item(0).getAttribute("type")=="text")
					//0863 c.vakula 31-08-2007 beg (for encoding &,-,',")
					//xmlString=xmlString+"<col" + j + ">"+colref.getElementsByTagName('input').item(0).value;
					//Jainudeen chn 03/09/2007 for amount format in grid beg
					//xmlString=xmlString+"<col" + j + ">"+encodeXML(colref.getElementsByTagName('input').item(0).value);
					if(colref.getElementsByTagName('input').item(0).getAttribute("dataSrc")=="amt" && colref.getElementsByTagName('input').item(0).value!="")
					{
					  xmlString=xmlString+"<col" + j + ">"+unFormatNumber(colref.getElementsByTagName('input').item(0).value,"R");
					}
					else
					{
						//xmlString=xmlString+"<col" + j + ">"+colref.getElementsByTagName('input').item(0).value;
						xmlString=xmlString+"<col" + j + ">"+encodeXML(colref.getElementsByTagName('input').item(0).value);
					}  
					//Jainudeen chn 03/09/2007 for amount format in grid end
					//0863 c.vakula 31-08-2007 end (for encoding &,-,',")
				else if(colref.getElementsByTagName('input').item(0).getAttribute("type")=="checkbox")
				{
					if(colref.getElementsByTagName('input').item(0).checked==false)				
						xmlString=xmlString+"<col" + j + ">"+0;
					else
						xmlString=xmlString+"<col" + j + ">"+1;
				}
				else if(colref.getElementsByTagName('input').item(0).getAttribute("type")=="span")
				//0863 c.vakula 31-08-2007 beg (for encoding &,-,',")
					//xmlString=xmlString+"<col" + j + ">"+colref.getElementsByTagName('input').item(0).innerText;
					xmlString=xmlString+"<col" + j + ">"+encodeXML(colref.getElementsByTagName('input').item(0).innerText);
					//0863 c.vakula 31-08-2007 end (for encoding &,-,',")
			}
			else
				xmlString=xmlString+"<col" + j + ">"+colref.getElementsByTagName('select').item(0).value

			xmlString=xmlString+"</col"+j+">";
		}
		xmlString=xmlString+"</Record>";
	}
	xmlString=xmlString+"</Data>";
	return xmlString;
}

/*
	* Function to get Value of Cell
	* (e.g) getCellValue("egridid",1,2)
*/

function getCellValue(tableid,rownum,colnum)
{
		var tableref=getTableObj(tableid);
		var mytablebody=tableref.getElementsByTagName('tbody').item(0);
		var rowref = mytablebody.getElementsByTagName('tr').item(rownum);
		var colref = rowref.getElementsByTagName('td').item(colnum);
		var value;
		var temp=colref.getElementsByTagName('select').length;
		
		if(temp==0)
		{
			if(colref.getElementsByTagName('input').item(0).getAttribute("type")=="text")
				return colref.getElementsByTagName('input').item(0).value;
			else if(colref.getElementsByTagName('input').item(0).getAttribute("type")=="checkbox")
			{
				if(colref.getElementsByTagName('input').item(0).checked==false)				
					return 0;
				else
					return 1;
			}
			else if(colref.getElementsByTagName('input').item(0).getAttribute("type")=="span")
				return colref.getElementsByTagName('input').item(0).innerText;
		}
		else
			return colref.getElementsByTagName('select').item(0).value;
				
	}
/*
	* Function to check row is empty or not 
	* (e.g) isEmptyRow("egridid",2)
*/

function isEmptyRow(tableid,rowid)
{
 	var colcount = getColumnCount(tableid);   	
	for(var j=1;j<colcount;j++)
	{
		if(getCellValue(tableid,rowid,j) != "")
   			return false;
	}
	return true;
}	
/*
	* Function to get number of columns in a row
	* (e.g) getColumnCount("egridid")
*/
   	
function getColumnCount(tableid)
{
	var tableref=getTableObj(tableid);
	var mytablebody=tableref.getElementsByTagName('tr').item(0);
	return mytablebody.getElementsByTagName('td').length;
}  	
/*
	* Function to Clear Row of  table
	* (e.g) clearRow("egridid","1")
*/

function clearRow(tableid,rownum)
{
	for(var j=0;j<getColumnCount(tableid);j++)
	{
		setCellValue(tableid,rownum,j,"");
   	}
}
/*
	* Function to get Row Object of  table
	* (e.g) getRowObject("egrid",1)
*/
function getRowObject(tableid,rowid)
{
	var tableref=getTableObj(tableid);
	var mytablerow=tableref.getElementsByTagName('tr').item(rowid);
	return mytablerow;
}
/*
	* Function to get Cell Object to the table
	* (e.g) getCellObject("egridid",1,1)
*/
function getCellObject(tableid,rowid,colid)
{
	var tableref=getTableObj(tableid);
	var mytablerow=tableref.getElementsByTagName('tr').item(rowid);
	var colobj=mytablerow.getElementsByTagName('td').item(colid);
	return colobj;
}



/*
	* Function to insert a Row beween the rows to the table
	* (e.g) insertRowAt("egridid",2)
*/
function insertRowAt(tableid,rowid)
{
	var tableref=getTableObj(tableid);
	var mycurrent_row;
	var mytablebody=tableref.getElementsByTagName('tbody').item(0);	
	if(getRowCount(tableid)>0)
	{
		mycurrent_row=mytablebody.getElementsByTagName('tr').item(1).cloneNode(true);
	}
	var rowCnt=getRowCount(tableid);
	var colCnt=getColumnCount(tableid);
	
	//2d arry
	if(rowid>getRowCount(tableid)-1)
	{
		alert("Invalid Row Id");
		return false;
	}
	addingRowToGrid(tableid);	
	var rowArray = new Array(rowCnt);
	for(var i=1;i<=rowCnt;i++)
	{
		rowArray[i]= new Array(colCnt);
	}
	var rowObj;
	for(var i=1;i<=rowCnt;i++)
	{
		rowObj=getRowObject(tableid,i);
		for(var j=1;j<=colCnt;j++)
		{				
			rowArray[i][j]=rowObj.getElementsByTagName('td').item(j-1).innerHTML;
		}
	}
	for(var i=1;i<rowCnt;i++)
	{
		if(i==rowid)
		{
			for(var j=i+1;j<=rowCnt;j++)
			{
				var myrow=getRowObject(tableid,j);				
				for(var k=0;k<myrow.getElementsByTagName('td').length;k++)				
				{
					var colref=myrow.getElementsByTagName('td').item(k);					
					colref.innerHTML=rowArray[j-1][k+1];
				}
			}
			break;
		}
	}
	clearRow(tableid,rowid);	
	for(var i=1;i<getRowCount(tableid);i++)
	{
		mytablebody.getElementsByTagName('tr').item(i).setAttribute('recnum',i);
		var myrow=getRowObject(tableid,i);		
		for(var j=0;j<myrow.getElementsByTagName('td').length;j++)
		{
			var colref=myrow.getElementsByTagName('td').item(j);
			var temp=colref.getElementsByTagName('select').length;
			if(temp==0)
			{
				var temp1=colref.getElementsByTagName('span').length;
				if(temp1==0)
				{
					if(colref.getElementsByTagName('input').item(0).getAttribute("id").substring(0,1)=="d" || colref.getElementsByTagName('input').item(0).getAttribute("name").substring(0,1)=="d")
					{
						var txtFldId=colref.getElementsByTagName('input').item(0).getAttribute("id");
						txtFldId=txtFldId.substring(0,txtFldId.length-1);
						colref.getElementsByTagName('input').item(0).setAttribute("id",txtFldId+i);
						var a="gridAnchor"+j+i;
						var click="cal3.select(document.all."+txtFldId+i+",'"+a+"','DD-MM-YYYY'); return false;";
						var imgref=colref.getElementsByTagName('A').item(0);
						var str="<img  src='images/ssCalendar.jpg' align='middle' id='"+a+"' onclick="+click+"></img>";
						imgref.innerHTML=str;
					}
				}
			}			
		}
	}	
}
/*
	* Function to sort the rows in a grid
	* (e.g) sort("egridid",this,0,sortType) 
	* Author Rizwan Sha .S
*/

var w_sortType ="A";
function sort(tableid,rowObj,colNo,ScrnDateFmt)
{
	w_sortType=w_sortType=="D"?"A":"D";
	if(w_sortType.toUpperCase()=="A")
		sortAsc(tableid,rowObj,colNo,ScrnDateFmt);
	else
		sortDsc(tableid,rowObj,colNo,ScrnDateFmt);
}

/*
	* Function to sort the rows in a grid
	* (e.g) sortAsc("egridid",this,0) 
	* Author Rizwan Sha .S
*/

function sortAsc(tableid,rowObj,colNo,ScrnDateFmt)
{
	var tableref=getTableObj(tableid);
//	var mytablebody=tableref.getElementsByTagName('tbody').item(0);	
	var datatype=rowObj.childNodes(colNo).childNodes(0).getAttribute("DATATYPE");	
	var rowCnt=getRowCount(tableid);
	var colCnt=getColumnCount(tableid);	
	var cellArrValue= new Array(getRowCount(tableid));
	var tblValues= new Array(getRowCount(tableid));
	for(var i=1;i<=rowCnt;i++)
	{
		tblValues[i]= new Array(colCnt+1);
	}

	for(var q=0;q<colCnt;q++)
	{
			if(q==colNo)
			{	rowObj.childNodes(q).childNodes(0).style.color="activecaption";}
			else
			{	rowObj.childNodes(q).childNodes(0).style.color="black";}
	}
	
	// Assigning values from grid to Array start
	for(var i=1;i<rowCnt;i++)
	{
		
		for(var j=0;j<colCnt;j++)
		{
			
			if(rowObj.childNodes(j).childNodes(0).getAttribute("DATATYPE")=="INT")
			{
				
				tblValues[i][j]=unFormatNumber(getCellValue(tableid,i,j)+"","R");
				
			}
			else
			{
				tblValues[i][j]=getCellValue(tableid,i,j);
			}
		}
		var gridBodyrowObj=getRowObject(tableid,i);
		tblValues[i][colCnt]=gridBodyrowObj.style.backgroundColor;
		//alert(tblValues[i][colCnt] +" Last Column");
	}
	// Assigning values from grid to Array end
	

	// Sorting the rows in Array Begin
	for(var i=1;i<rowCnt;i++)
	{
		for(var j=i+1;j<rowCnt;j++)
		{
			if(datatype.toUpperCase()=="INT")
			{
				var tempCellvalue1=tblValues[i][colNo];
				var tempCellvalue2=tblValues[j][colNo];
				if(tempCellvalue1=="" || tempCellvalue1==" ")
					tempCellvalue1=0;
				if(tempCellvalue2=="" || tempCellvalue2==" ")
					tempCellvalue2=0;	
				if(parseFloat(tempCellvalue1)>parseFloat(tempCellvalue2))
				{
					
					for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
					{
						temp=tblValues[i][k];
						tblValues[i][k]=tblValues[j][k];
						tblValues[j][k]=temp;
						
						
					}
						
				}
			}
			else if(datatype.toUpperCase()=="STRING")
			{
				if(tblValues[i][colNo]>tblValues[j][colNo])
				{
					for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
					{
						temp=tblValues[i][k];
						tblValues[i][k]=tblValues[j][k];
						tblValues[j][k]=temp;
					}
				}
			}
			else if(datatype.toUpperCase()=="DATE")
			{
				var tempCellvalue1=tblValues[i][colNo];
				var tempCellvalue2=tblValues[j][colNo];
				if(tempCellvalue1=="" || tempCellvalue2=="")
				{

					for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
					{
						temp=tblValues[i][k];
						tblValues[i][k]=tblValues[j][k];
						tblValues[j][k]=temp;
					}
				}
				else
				{
					if(compareDates(tblValues[i][colNo],ScrnDateFmt,tblValues[j][colNo],ScrnDateFmt)==1)
					{
						for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
						{
							temp=tblValues[i][k];
							tblValues[i][k]=tblValues[j][k];
							tblValues[j][k]=temp;
						}
					}
				}	
			}
			else if(datatype.toUpperCase()=="DATETIME")
			{
				var tempCellvalue1=tblValues[i][colNo];
				var tempCellvalue2=tblValues[j][colNo];

				if(tempCellvalue1=="" || tempCellvalue2=="")
				{
					for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
					{
						temp=tblValues[i][k];
						tblValues[i][k]=tblValues[j][k];
						tblValues[j][k]=temp;
					}
				}
				else
				{
					if(tempCellvalue1!="" || tempCellvalue2!="")
					{
						var Date1=ConvertNDate(tblValues[i][colNo],w_ScrnDateFmt,"DD-MM-YYYY")
						var Time1=tblValues[i][colNo].substring(11,tblValues[i][colNo].length);						

						var Date2=ConvertNDate(tblValues[j][colNo],w_ScrnDateFmt,"DD-MM-YYYY")
						var Time2=tblValues[j][colNo].substring(11,tblValues[j][colNo].length);
						
						var tempDate=Date1.split("-"); //Date1 splitting
						var day1=tempDate[0];
						var month1=tempDate[1];
						var year1=tempDate[2];

						var tempTime=Time1.split(":"); //Time1 splitting
						var hh1=tempTime[0];
						var mm1=tempTime[1];
						var ss1=tempTime[2];
						
						/*
						//var suffix1 = "AM";
						if (hh1 >= 12)
						{
						  //suffix1 = "PM";
						  hh1= hh1 - 12;
						}
						if (hh1 == 0) 
						{
						  hh1= 12;
						}
						*/
					  	if (mm1 < 10)
						 mm1 = "0" + mm1;

							
						var d1=new Date(year1, (month1)-1, day1, hh1, mm1, ss1);
						
						var tempDate1=Date2.split("-"); //Date2 splitting
						var day2=tempDate1[0];
						var month2=tempDate1[1];
						var year2=tempDate1[2];

						var tempTime1=Time2.split(":"); //Time2 splitting
						var hh2=tempTime1[0];
						var mm2=tempTime1[1];
						var ss2=tempTime1[2];
						/*//var suffix2 = "AM";
						if (hh2 >= 12)
						{
						  //suffix2 = "PM";
						  hh2= hh2 - 12;
						}
						if (hh2 == 0) 
						{
						  hh2= 12;
						}
						*/
					  	if (mm2 < 10)
						 mm2 = "0" + mm2;
						
						var d2=new Date(year2, (month2)-1, day2, hh2, mm2, ss2);
						if(d1>d2)
						{
							for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
							{
								temp=tblValues[i][k];
								tblValues[i][k]=tblValues[j][k];
								tblValues[j][k]=temp;
							}
						}	

					}
				}
			}			
		}
	}
	// Sorting the rows in Array End
	
	//setting Values from Array to Grid Begin
	for(var i=1;i<parseInt(getRowCount(tableid));i++)
	{
		for(var j=0;j<colCnt;j++)
		{
			
			setCellValue(tableid,i,j,tblValues[i][j]);
			
		}
		var gridRowObj=rowObj=getRowObject(tableid,i);
		gridRowObj.style.backgroundColor=tblValues[i][colCnt];	
	}
	
	//setting Values from Array to Grid End
	
}

/*
	* Function to sort the rows in a grid
	* (e.g) sortDsc("egridid",this,0) 
	* Author Rizwan Sha .S
*/

function sortDsc(tableid,rowObj,colNo,w_ScrnDateFmt)
{
	var tableref=getTableObj(tableid);
	//var mytablebody=tableref.getElementsByTagName('tbody').item(0);	
	var datatype=rowObj.childNodes(colNo).childNodes(0).getAttribute("DATATYPE");
	var rowCnt=getRowCount(tableid);
	var colCnt=getColumnCount(tableid);	
	var cellArrValue= new Array(getRowCount(tableid));
	var tblValues= new Array(getRowCount(tableid));
	
	for(var i=1;i<=rowCnt;i++)
	{
		tblValues[i]= new Array(colCnt+1);
	}

	for(var q=0;q<colCnt;q++)
	{
			if(q==colNo)
			{	rowObj.childNodes(q).childNodes(0).style.color="activecaption";}
			else
			{	rowObj.childNodes(q).childNodes(0).style.color="black";}
	}

	// Assigning values from grid to Array start
	for(var i=1;i<rowCnt;i++)
	{
		
		for(var j=0;j<colCnt;j++)
		{
			
			if(rowObj.childNodes(j).childNodes(0).getAttribute("DATATYPE")=="INT")
			{
				//alert(tblValues[i][j]);
				tblValues[i][j]=unFormatNumber(getCellValue(tableid,i,j)+"","R");
				
			}
			else
			{
				tblValues[i][j]=getCellValue(tableid,i,j);
			}
		}
		var gridBodyrowObj=getRowObject(tableid,i);
		tblValues[i][colCnt]=gridBodyrowObj.style.backgroundColor;
		//alert(tblValues[i][colCnt] +" Last Column");	
	}
	// Assigning values from grid to Array End

	
	// Sorting the rows in Array Begin
	for(var i=1;i<rowCnt;i++)
	{
		for(var j=i+1;j<rowCnt;j++)
		{
			if(datatype.toUpperCase()=="INT")
			{
			
				var tempCellvalue1=tblValues[i][colNo];
				var tempCellvalue2=tblValues[j][colNo];
				if(tempCellvalue1=="" || tempCellvalue1==" ")
					tempCellvalue1=0;
				if(tempCellvalue2=="" || tempCellvalue2==" ")
					tempCellvalue2=0;	
				if(parseFloat(tempCellvalue1)<parseFloat(tempCellvalue2))
				{
					for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
					{
						temp=tblValues[i][k];
						tblValues[i][k]=tblValues[j][k];
						tblValues[j][k]=temp;
					}
				}
			}
			else if(datatype.toUpperCase()=="STRING")
			{
				//alert(tblValues[i][colNo]+"--"+tblValues[j][colNo])
				if(tblValues[i][colNo]<tblValues[j][colNo])
				{
					for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
					{
						temp=tblValues[i][k];
						tblValues[i][k]=tblValues[j][k];
						tblValues[j][k]=temp;
					}
				}
			}
			else if(datatype.toUpperCase()=="DATE")
			{
				var tempCellvalue1=tblValues[i][colNo];
				var tempCellvalue2=tblValues[j][colNo];

				if(tempCellvalue1=="" || tempCellvalue2=="")
				{
					for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
					{
						temp=tblValues[i][k];
						tblValues[i][k]=tblValues[j][k];
						tblValues[j][k]=temp;
					}
				}
				else
				{
					if(tempCellvalue1!="" || tempCellvalue2!="")
					{
						if(compareDates(tblValues[i][colNo],w_ScrnDateFmt,tblValues[j][colNo],w_ScrnDateFmt)==0)
						{
							for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
							{
								temp=tblValues[i][k];
								tblValues[i][k]=tblValues[j][k];
								tblValues[j][k]=temp;
							}
						}	
					}
				}		
			}
			else if(datatype.toUpperCase()=="DATETIME")
			{
				var tempCellvalue1=tblValues[i][colNo];
				var tempCellvalue2=tblValues[j][colNo];

				if(tempCellvalue1=="" || tempCellvalue2=="")
				{
					for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
					{
						temp=tblValues[i][k];
						tblValues[i][k]=tblValues[j][k];
						tblValues[j][k]=temp;
					}
				}
				else
				{
					if(tempCellvalue1!="" || tempCellvalue2!="")
					{
						var Date1=ConvertNDate(tblValues[i][colNo],w_ScrnDateFmt,"DD-MM-YYYY")
						var Time1=tblValues[i][colNo].substring(11,tblValues[i][colNo].length);						

						var Date2=ConvertNDate(tblValues[j][colNo],w_ScrnDateFmt,"DD-MM-YYYY")
						var Time2=tblValues[j][colNo].substring(11,tblValues[j][colNo].length);
						
						var tempDate=Date1.split("-"); //Date1 splitting
						var day1=tempDate[0];
						var month1=tempDate[1];
						var year1=tempDate[2];

						var tempTime=Time1.split(":"); //Time1 splitting
						var hh1=tempTime[0];
						var mm1=tempTime[1];
						var ss1=tempTime[2];
						
						/*
						//var suffix1 = "AM";
						if (hh1 >= 12)
						{
						  //suffix1 = "PM";
						  hh1= hh1 - 12;
						}
						if (hh1 == 0) 
						{
						  hh1= 12;
						}
						*/
					  	if (mm1 < 10)
						 mm1 = "0" + mm1;

							
						var d1=new Date(year1, (month1)-1, day1, hh1, mm1, ss1);
						
						var tempDate1=Date2.split("-"); //Date2 splitting
						var day2=tempDate1[0];
						var month2=tempDate1[1];
						var year2=tempDate1[2];

						var tempTime1=Time2.split(":"); //Time2 splitting
						var hh2=tempTime1[0];
						var mm2=tempTime1[1];
						var ss2=tempTime1[2];
						/*//var suffix2 = "AM";
						if (hh2 >= 12)
						{
						  //suffix2 = "PM";
						  hh2= hh2 - 12;
						}
						if (hh2 == 0) 
						{
						  hh2= 12;
						}
						*/
					  	if (mm2 < 10)
						 mm2 = "0" + mm2;
						
						var d2=new Date(year2, (month2)-1, day2, hh2, mm2, ss2);
						if(d1<d2)
						{
							for(var k=0;k<(parseInt(colCnt)+parseInt(1));k++)
							{
								temp=tblValues[i][k];
								tblValues[i][k]=tblValues[j][k];
								tblValues[j][k]=temp;
							}
						}	
					}
				}	
			}
		}
	}
	// Sorting the rows in Array End
	
	//setting Values from Array to Grid Begin
	for(var i=1;i<parseInt(getRowCount(tableid));i++)
	{
		for(var j=0;j<colCnt;j++)
		{
			setCellValue(tableid,i,j,tblValues[i][j]);
		}
		var gridRowObj=rowObj=getRowObject(tableid,i);
		gridRowObj.style.backgroundColor=tblValues[i][colCnt];	
	}
	//setting Values from Array to Grid End
}