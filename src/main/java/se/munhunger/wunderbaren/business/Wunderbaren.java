package se.munhunger.wunderbaren.business;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Component;
import se.munhunger.wunderbaren.model.Item;
import se.munhunger.wunderbaren.util.database.jpa.Database;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by marcu on 2017-06-04.
 */
@Component
@Path("/wunderbaren")
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

	@PUT
	@Path("/decrease")
	@ApiOperation(value = "Decreases an item by one")
	public Response decreaseItem(@FormParam("name") String name) throws Exception
	{
		Map<String, Object> param = new HashMap<>();
		param.put("name", name);
		List items = Database.getObjects("from Item WHERE name = :name", param);
		Item item = (Item)items.get(0);
		item.ammount--;
		Database.updateObject(item);
		return Response.ok().build();
	}

	@PUT
	@Path("/increase")
	@ApiOperation(value = "Increases an item by one")
	public Response increaseItem(@FormParam("name") String name) throws Exception
	{
		Map<String, Object> param = new HashMap<>();
		param.put("name", name);
		List items = Database.getObjects("from Item WHERE name = :name", param);
		Item item = (Item)items.get(0);
		item.ammount++;
		Database.updateObject(item);
		return Response.ok().build();
	}

	@GET
	@ApiOperation(value = "Gets all items of the same category")
	public Response getItems(@QueryParam("category") String category) throws Exception
	{
		Map<String, Object> param = new HashMap<>();
		param.put("category", category);
		List items = Database.getObjects("from Item WHERE category = :category", param);
		return Response.ok(items).build();
	}
}
