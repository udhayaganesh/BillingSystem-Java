package com.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

public class AjaxAction extends ActionSupport implements ServletResponseAware, ServletRequestAware 
{
	HttpServletResponse response;
	HttpServletRequest request;
	String delimiter = "\\,";
	
    public HttpServletResponse ajaxcall() throws IOException {
    	PrintWriter out = response.getWriter();
    	String Token;
		String[] temp;
		String dbResponse = "";
		try {
	        String token= request.getParameter("token");
	        String param= request.getParameter("param");
	        if(token!=null && token.trim().length()!=0)
	        {
	        	temp=param.split(delimiter);
	        	if(token.equals("GETPRODINFO"))
	        	{
	        		System.out.println(temp[0]);
	        		dbResponse="Computer";
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
    public void setServletResponse(HttpServletResponse response) {
        this.response = response;
    }
    public void setServletRequest(HttpServletRequest request) {
        this.request = request;
    }
}