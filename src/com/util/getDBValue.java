package com.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class getDBValue
 */
public class getDBValue extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getDBValue() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		String Token = request.getParameter("Token");
		String Parameters = request.getParameter("Parameters");
		if(Token.equals("GETPRODINFO")){
			try{
				String result="";
				if(Parameters.equalsIgnoreCase("1")){
				//result = obj.getData(Token, Parameters);
				String prodDesc="Computer", price="10.00";
				result="Computer"+price;
				out.write(result);
				out.close();
				}
			}catch (Exception e){
				throw (new ServletException(e));
			}
		}
	}
}
