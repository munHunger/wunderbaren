package se.munhunger.wunderbaren.model;

import javax.persistence.*;

/**
 * Created by marcu on 2017-06-12.
 */
@Entity
@Table(name = "message")
public class Message
{
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private int id;
	@Column(name = "sender")
	public String sender;
	@Column(name = "message")
	public String message;
	@Column(name = "read")
	public boolean read;

	public Message(String sender, String message)
	{
		this.read = false;
		this.sender = sender;
		this.message = message;
	}
}
