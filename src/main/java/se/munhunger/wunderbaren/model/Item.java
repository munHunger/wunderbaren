package se.munhunger.wunderbaren.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@ApiModel(description = "An item such as Lapin Kulta or Slippery Nipple")
@Entity
@Table(name = "item")
public class Item
{
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinColumn(name = "parent_group")
    public ItemGroup group;

    @ApiModelProperty(value = "The name of the item")
    @Id
    @Column(length = 128)
    public String title;
    @ApiModelProperty(value = "The description of the item")
    @Column(length = 2048)
    public String description;
    @ApiModelProperty(value = "A non negative integer representing the cost of one item in SEK")
    public int cost;
    @ApiModelProperty(value = "The amount remaining")
    public int stock;
}
