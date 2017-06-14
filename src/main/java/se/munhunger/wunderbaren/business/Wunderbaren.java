package se.munhunger.wunderbaren.business;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jersey.repackaged.com.google.common.util.concurrent.ThreadFactoryBuilder;
import org.glassfish.jersey.process.JerseyProcessingUncaughtExceptionHandler;
import org.springframework.stereotype.Component;
import se.munhunger.oauth.business.UserBean;
import se.munhunger.oauth.model.error.ErrorMessage;
import se.munhunger.oauth.model.user.UserData;
import se.munhunger.wunderbaren.model.Item;
import se.munhunger.wunderbaren.model.Message;
import se.munhunger.wunderbaren.model.Transaction;
import se.munhunger.wunderbaren.util.database.jpa.Database;
import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;
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
	@Path("/update")
	@ApiOperation(value = "Gets all items of the same category if the hash does not equal. Empty list otherwise")
	public Response getUpdate(@QueryParam("hash") String hash, @QueryParam("category") String category) throws Exception
	{
		int intHash = -1;
		if(!"null".equals(hash) && hash != null)
			intHash = Integer.parseInt(hash);
		int newHash = intHash;
		int attempts = 0;
		List items = new ArrayList<>();
		while (newHash == intHash && attempts < 300)
		{
			Map<String, Object> param = new HashMap<>();
			param.put("category", category);
			items = Database.getObjects("from Item WHERE category = :category", param);
			newHash = getItemHash(items);
			if (attempts > 0)
				Thread.sleep(100);
			attempts++;
		}
		Map<String, Object> result = new HashMap<>();
		result.put("hash", newHash);
		if(newHash == intHash)
			result.put("list", new ArrayList<>());
		else
			result.put("list", items);
		return Response.ok(result).build();
	}

	@GET
	@Path("/message")
	@ApiOperation(value = "Gets all messages sent")
	@RolesAllowed({"USER"})
	public Response getMessages(@HeaderParam("Authorization") String accessToken) throws Exception
	{
		UserData userData = (UserData)new UserBean().getUserData(accessToken).getEntity();
		if("admin".equals(userData.username))
		{
			Map<String, Object> param = new HashMap<>();
			param.put("user", userData.username);
			return Response.ok(Database.getObjects("from Message", param)).build();
		}
		else
		{
			Map<String, Object> param = new HashMap<>();
			param.put("user", userData.username);
			return Response.ok(Database.getObjects("from Message WHERE username = 'admin' OR username = :user", param)).build();
		}
	}

	@POST
	@Path("/message")
	@ApiOperation(value = "send message")
	@RolesAllowed({"USER"})
	public Response sendMessage(@HeaderParam("Authorization") String accessToken, @FormParam("message") String message) throws Exception
	{
		UserData userData = (UserData)new UserBean().getUserData(accessToken).getEntity();
		Database.saveObject(new Message(userData.username, message));
		return Response.ok().build();
	}

	@POST
	@Path("/buy")
	@ApiOperation(value = "buy an item")
	@RolesAllowed({"USER"})
	public Response buyItem(@HeaderParam("Authorization") String accessToken, @QueryParam("item") String item) throws Exception
	{
		UserData userData = (UserData)new UserBean().getUserData(accessToken).getEntity();
		Type type = new TypeToken<Map<String, String>>() {}.getType();
		Map<String, String> balanceMap = new Gson().fromJson((String)this.getBalance(accessToken, "99999").getEntity(), type);
		Integer balance = Integer.parseInt(balanceMap.get("balance"));
		Map<String, Object> params = new HashMap<>();
		params.put("name", item);
		List items = Database.getObjects("from Item WHERE name = :name", params);
		if(items.isEmpty())
			return Response.status(HttpServletResponse.SC_NOT_FOUND).entity(new ErrorMessage("could not complete", "Could not find item")).build();
		Item i = (Item)items.get(0);
		if(i.amount < 1 || balance < i.price)
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).build();
		i.amount--;
		Transaction t = new Transaction(userData.username, -i.price, "buy " + item);
		Message m = new Message(userData.username, "----- Köpte en " + item + " -----");
		Database.saveObjects(Arrays.asList(i, t, m));
		return Response.status(HttpServletResponse.SC_OK).build();
	}

	@POST
	@Path("/swish")
	@ApiOperation(value = "top of a user")
	@RolesAllowed({"ADMIN"})
	public Response swish(@HeaderParam("Authorization") String accessToken, @QueryParam("user") String user, @QueryParam("amount") int amount) throws Exception
	{
		Transaction t = new Transaction(user, amount, "swish " + amount);
		Database.saveObject(t);
		return Response.status(HttpServletResponse.SC_OK).build();
	}

	@GET
	@Path("/balance")
	@ApiOperation(value = "Gets the balance of the currently logged in user")
	public Response getBalance(
			@HeaderParam("Authorization")
					String accessToken, @QueryParam("balance") String balance) throws Exception
	{
		UserData userData = (UserData)new UserBean().getUserData(accessToken).getEntity();
		int oldBalance = balance != null && !"null".equals(balance) ? Integer.parseInt(balance) : 0;
		int newBalance = oldBalance;
		int attempts = 0;
		while(oldBalance == newBalance && attempts < 300)
		{
			int intBalance = 0;
			Map<String, Object> params = new HashMap<>();
			params.put("user", userData.username);
			for(Object o : Database.getObjects("from Transaction WHERE user = :user", params))
				intBalance += ((Transaction) o).amount;
			newBalance = intBalance;
			Thread.sleep(100);
			attempts++;
		}
		return Response.ok("{\"balance\":" + newBalance + "}").build();
	}

	private int getItemHash(List items)
	{
		StringBuilder builder = new StringBuilder();
		for(Object o : items)
			builder.append(o.toString());
		return builder.toString().hashCode();
	}
}
