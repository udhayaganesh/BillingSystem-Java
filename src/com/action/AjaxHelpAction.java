package com.action;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.opensymphony.xwork2.ActionSupport;

public class AjaxHelpAction extends ActionSupport implements ServletResponseAware, ServletRequestAware 
{
	HttpServletResponse response;
	HttpServletRequest request;
	String delimiter = "\\,";
	private static Document doc; 
    public HttpServletResponse helpcall() throws IOException {
    	PrintWriter out = response.getWriter();
    	String token;
		String dbResponse = "";
		String paramName="" ;
		try {
	        String xml= request.getParameter("xml");
	        token= xmlValue("HelpToken",xml);
	        paramName = xmlValue("Args",xml);
	        if(token!=null && token.trim().length()!=0)
	        {
	        	if(token.equals("GETPRODINFO"))
	        	{
	        		dbResponse="<Data><Record><HelpData><ProductCode>Computer</ProductCode>Computer Desc<ProductDesc></ProductDesc><HelpData><TotPages>1<TotPages><HelpDataType></HelpDataType><HelpDisplayFldNames>Product Info</HelpDisplayFldNames><HelpName>Product</HelpName></Record></Data>";
	        	}
	        }
	        out.write(dbResponse);
			out.close();
	        response.setContentType("text/html");
	        response.setHeader("Cache-Control", "no-cache");
	       	response.getWriter().write(dbResponse);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
        return response;
    }
    private static Document getDoc(String xml) throws ParserConfigurationException, SAXException, IOException
    {
    	if(doc==null){
	    	DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance(); 
	        DocumentBuilder db = dbf.newDocumentBuilder(); 
	        InputSource is = new InputSource(new ByteArrayInputStream(xml.getBytes()));
	        doc = db.parse(is);
    	}
        return doc;
    }
    public String xmlValue(String xmltag,String xml)
    {
    	String locStr="";
	    try 
	    { 
	    	doc=getDoc(xml);
	        NodeList nl1 = doc.getElementsByTagName(xmltag);
	        for(int i=0;i<nl1.getLength();i++)
	        {
	        	Node tmpNode = nl1.item(i);
	            locStr = tmpNode.getNodeValue();
	        }
	    } 
	    catch(Exception e)
	    { 
	    	System.out.println("Error: "+e);
	    	e.printStackTrace();
	    } 
    return locStr;
    } 
   
    public void setServletResponse(HttpServletResponse response) {
        this.response = response;
    }
    public void setServletRequest(HttpServletRequest request) {
        this.request = request;
    }
}