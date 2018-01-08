package se.munhunger.wunderbaren.model.persistant;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@ApiModel(description = "A user object")
public class User
{
    @Id
    @Column(length = 64)
    public String userId;
    public int wallet;
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    @LazyCollection(LazyCollectionOption.FALSE)
    public List<Transaction> transactions = new ArrayList<>();

    public User() {}

    public User(String id) {
        this.userId = id;
    }
}
