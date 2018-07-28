package se.munhunger.wunderbaren.model.persistant;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.io.Serializable;

@ApiModel(description = "An item such as Lapin Kulta or Slippery Nipple")
@Entity
@Table(name = "item")
public class Item implements Serializable
{
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinColumn(name = "parentGroup")
    private ItemGroup group;

    @ApiModelProperty(value = "The value from scanning a barcode")
    @Id
    private String barcode;
    @ApiModelProperty(value = "The name of the item")
    @Column(length = 128)
    private String title;
    @ApiModelProperty(value = "The type of the item")
    @Column(length = 64)
    private String type;
    @ApiModelProperty(value = "The description of the item")
    @Column(length = 2048)
    private String description;
    @ApiModelProperty(value = "A non negative integer representing the cost of one item in SEK")
    private int cost;
    @ApiModelProperty(value = "The amount remaining")
    private int stock;

    public Item(){}

    public Item(ItemGroup group, String title, String description, int cost) {
        this.group = group;
        this.title = title;
        this.description = description;
        this.cost = cost;
    }

    @JsonIgnore
    public ItemGroup getGroup() {
        return this.group;
    }

    public int getStock() {
        return this.stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public int getCost() {
        return this.cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setGroup(ItemGroup group) {
        this.group = group;
    }

    public String getBarcode() {
        return this.barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }
}
