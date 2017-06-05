package se.munhunger.wunderbaren.business;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jersey.repackaged.com.google.common.util.concurrent.ThreadFactoryBuilder;
import org.glassfish.jersey.process.JerseyProcessingUncaughtExceptionHandler;
import org.springframework.stereotype.Component;
import se.munhunger.wunderbaren.model.Item;
import se.munhunger.wunderbaren.util.database.jpa.Database;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

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
		item.amount--;
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
		item.amount++;
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
		return Response.ok(items).header("hash", "" + getItemHash(items)).build();
	}

	@GET
	@ApiOperation(value = "Gets all items of the same category if the hash does not equal. plain 200 OK otherwise")
	public Response getUpdate(@HeaderParam("hash")int hash, @QueryParam("category") String category) throws Exception
	{
		int newHash = hash;
		int attempts = 0;
		List items = new ArrayList<>();
		while (newHash == hash && attempts < 300)
		{
			Map<String, Object> param = new HashMap<>();
			param.put("category", category);
			items = Database.getObjects("from Item WHERE category = :category", param);
			newHash = getItemHash(items);
			if (attempts > 0)
				Thread.sleep(100);
			attempts++;
		}
		if(newHash == hash)
			return Response.ok().build();
		return Response.ok(items).header("hash", "" + getItemHash(items)).build();
	}

	private int getItemHash(List items)
	{
		StringBuilder builder = new StringBuilder();
		for(Object o : items)
			builder.append(o.toString());
		return builder.toString().hashCode();
	}
}
