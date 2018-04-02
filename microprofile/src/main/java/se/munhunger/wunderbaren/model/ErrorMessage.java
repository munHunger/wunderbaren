package se.munhunger.wunderbaren.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.ArrayList;
import java.util.List;

@ApiModel(value = "A message indicating that something went wrong")
public class ErrorMessage
{
    @ApiModelProperty(value = "A shorthand message of what went wrong")
    public String message;
    @ApiModelProperty(value = "A list of all that went wrong")
    public List<String> details = new ArrayList<>();

    public ErrorMessage() {}

    public ErrorMessage(String message, String details) {
        this.message = message;
        this.details.add(details);
    }

    public void addDetail(String detail) {
        this.details.add(detail);
    }
}
