package se.munhunger.wunderbaren.model;

import org.springframework.stereotype.Component;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by marcu on 2017-06-04.
 */
@Entity
@Table(name = "item")
public class Item
{
	@Id
	@Column(name = "name")
	public String name;
	@Column(name = "category")
	public String category;
	@Column(name = "amount")
	public int ammount;
	@Column(name = "price")
	public int price;

	public Item()
	{

	}

	public Item(String name, String category, int amount, int price)
	{
		this.name = name;
		this.category = category;
		this.ammount = amount;
		this.price = price;
	}
}
