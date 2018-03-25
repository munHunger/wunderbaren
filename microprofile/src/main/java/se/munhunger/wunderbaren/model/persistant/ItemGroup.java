package se.munhunger.wunderbaren.model.persistant;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import se.munhunger.wunderbaren.model.persistant.Item;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "item_group")
@ApiModel(description = "An item type such as beer or wine")
public class ItemGroup
{
    @Id
    @Column(length = 64)
    @ApiModelProperty(value = "Name of the group, such as beer or wine")
    public String name;

    @OneToMany(mappedBy = "group", cascade = {CascadeType.ALL})
    @LazyCollection(LazyCollectionOption.FALSE)
    @ApiModelProperty(value = "A list of items in the group")
    public List<Item> items = new ArrayList<>();

    public ItemGroup(){}

    public ItemGroup(String name) {
        this.name = name;
    }
}
