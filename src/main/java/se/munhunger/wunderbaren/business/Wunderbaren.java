package se.munhunger.wunderbaren.business;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Component;
import se.munhunger.wunderbaren.model.Item;
import se.munhunger.wunderbaren.util.database.jpa.Database;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

/**
 * Created by marcu on 2017-06-04.
 */
@Component
@Path("wunderbaren")
@Api(value = "Wunderbaren")
public class Wunderbaren
{
	@POST
	@ApiOperation(value = "Create a new item")
	public Response createNewItem(@FormParam("name") String name, @FormParam("category") String category, @FormParam("amount") int amount, @FormParam("price") int price)
	{
		Database.saveObject(new Item(name, category, amount, price));
		return Response.ok().build();
	}
}
