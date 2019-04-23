package com.action;

import java.util.ArrayList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class ProductEntryAction extends ActionSupport {

	private List measureList;
	private String measure;
	public String getMeasure() {
		return measure;
	}
	public void setMeasure(String measure) {
		this.measure = measure;
	}
	public String execute() {
		measureList = new ArrayList();
		measureList.add("Kg");
		measureList.add("Litre");
		measureList.add("Dozen");
		measureList.add("Packets");
		return "SUCCESS";
	}
}
