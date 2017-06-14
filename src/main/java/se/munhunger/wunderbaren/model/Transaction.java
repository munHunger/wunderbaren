package se.munhunger.wunderbaren.model;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by marcu on 2017-06-12.
 */
@Entity
@Table(name = "transaction")
public class Transaction
{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	@Column(name = "user")
	public String user;
	@Column(name = "amount")
	public int amount;
	@Column(name = "reason")
	public String reason;
	@Column(name = "date")
	public String date;

	public Transaction(String user, int amount, String reason)
	{
		this.user = user;
		this.amount = amount;
		this.reason = reason;
		date = new SimpleDateFormat("dd-MM-yyyy").format(new Date());
	}

	public Transaction(){}
}
