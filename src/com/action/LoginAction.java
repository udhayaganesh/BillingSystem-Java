package com.action;

import java.util.Map;
import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;
import com.opensymphony.xwork2.ActionSupport;
import com.dao.LoginDao;

public class LoginAction extends ActionSupport implements SessionAware {
	private String username, password;
	SessionMap sessionmap;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String execute() {
		if (LoginDao.validate(username, password)) {
			return "success";
		} else {
			return "error";
		}
	}
	public void validate() {
		if (getUsername().length() == 0) {
			addFieldError("username", "Username Mandatory");
		} 
		if (getPassword().length() == 0) {
			addFieldError("password", "Password Mandatory");
		}
	}
	public void setSession(Map map) {
		sessionmap = (SessionMap) map;
		sessionmap.put("login", "true");
	}

	public String logout() {
		sessionmap.invalidate();
		return "success";
	}

}