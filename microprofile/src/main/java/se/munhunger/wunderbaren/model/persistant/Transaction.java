package se.munhunger.wunderbaren.model.persistant;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "transaction")
@ApiModel(description = "Notes a purchase from a user")
public class Transaction
{
    @Id
    @Column(length = 64)
    public String id;
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinColumn(name = "user")
    public User user;
    public Date date;
    @OneToMany
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.REFRESH})
    public Item product;
    public int amount;

    public Transaction() {}

    public Transaction(User user, Item product, int amount) {

        this.id = UUID.randomUUID().toString();
        this.user = user;
        this.date = Calendar.getInstance().getTime();
        this.product = product;
        this.amount = amount;
    }
}
