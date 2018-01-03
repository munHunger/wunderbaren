package se.munhunger.wunderbaren.model.persistant;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
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
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    public Item product;

    public Transaction() {
        this.id = UUID.randomUUID().toString();
    }
}
