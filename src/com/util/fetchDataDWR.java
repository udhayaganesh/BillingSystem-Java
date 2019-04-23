package com.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bean.ProductDTO;

public class fetchDataDWR extends HttpServlet{
	
	public void init(ServletConfig config) throws ServletException{
	}
	 
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
		throws ServletException, IOException {
			doPost(req,resp);
	}	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException  {
		
		PrintWriter out = response.getWriter();
		String Token = request.getParameter("Token");
		String Parameters = request.getParameter("Parameters");
		if(Token.equals("GETPRODINFO")){
			try{
				String result="";
				//result = obj.getData(Token, Parameters);
				String prodDesc="Computer", price="";
				out.write(result);
				out.close();
			}catch (Exception e){
				throw (new ServletException(e));
			}
		}
	}
	public ProductDTO getString1(String s1)
	{
		ProductDTO prod=new ProductDTO();
		System.out.println(s1);
		if(s1.equals("09382793225"))
		{
			prod.setProdAmt("1000");
			prod.setProdDesc("Reliance");
			prod.setProdUnit("1");
		}
		else if(s1.equals("9788177227833"))
		{

			prod.setProdAmt("230");
			prod.setProdDesc("Oracle Book");
			prod.setProdUnit("1");
		
		}
		return prod;
	}
	public String getProdDesc(String prodCode)
	{
		String prodDesc="Computer", price="";
		return prodDesc;
	}
}
