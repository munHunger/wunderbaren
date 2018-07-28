package se.munhunger.wunderbaren.rest;

import io.swagger.annotations.*;
import se.munhunger.wunderbaren.annotations.IgnoreAuth;
import se.munhunger.wunderbaren.annotations.UserAuth;
import se.munhunger.wunderbaren.model.ErrorMessage;
import se.munhunger.wunderbaren.model.persistant.Item;
import se.munhunger.wunderbaren.model.persistant.ItemGroup;
import se.munhunger.wunderbaren.service.StockService;
import se.munhunger.wunderbaren.util.exception.NotInDatabaseException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Logger;

@Api(value = "stock", authorizations = @Authorization(
        value="JWT_AUTHORIZATION"))
@Path("/stock")
@UserAuth
@ApplicationScoped
public class Stock
{
    private static final Logger LOG = Logger.getLogger(Stock.class.getName());

    @Inject
    private StockService stockService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Get current stock")
    @IgnoreAuth
    @ApiResponses({@ApiResponse(code = 200, message = "A list of current stock", responseContainer = "array", response = ItemGroup.class)})
    public Response getCurrentStock() {
        LOG.info(() -> "Getting current stock");
        return Response.ok(stockService.getAll()).build();
    }

    @PUT
    @Path("/increase")
    @ApiOperation(value = "Increase the stock of an item by one")
    @ApiResponses({@ApiResponse(code = 204, message = "The item was increased by one"), @ApiResponse(code = 204, message = "The item was not found", response = ErrorMessage.class)})
    public Response increaseItem(@ApiParam(value = "The barcode of an item") @FormParam("barcode") String barcode) {
        try
        {
            stockService.alterBy(barcode, 1);
        } catch (NotInDatabaseException e)
        {
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorMessage("Could not alter stock of item", "Could not find the item noted by the supplied barcode")).build();
        }
        return Response.noContent().build();
    }

    @PUT
    @Path("/decrease")
    @ApiOperation(value = "Decreases the stock of an item by one")
    @ApiResponses({@ApiResponse(code = 204, message = "The item was decreased by one"), @ApiResponse(code = 404, message = "The item was not found", response = ErrorMessage.class)})
    public Response decreaseItem(@ApiParam(value = "The barcode of an item") @FormParam("barcode") String barcode) {
        try
        {
            stockService.alterBy(barcode, -1);
        } catch (NotInDatabaseException e)
        {
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorMessage("Could not alter stock of item", "Could not find the item noted by the supplied barcode")).build();
        }
        return Response.noContent().build();
    }

    @POST
    @Path("/{group}/item")
    @Consumes(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Creates a new item")
    @ApiResponses({@ApiResponse(code = 204, message = "An item was created"), @ApiResponse(code = 404, message = "Could not find the containing group", response = ErrorMessage.class)})
    public Response createItem(@ApiParam(value = "The item to be created") Item item, @ApiParam(value = "The name of the containing group") @PathParam("group") String groupName) {
        try
        {
            stockService.createItem(item, groupName);
        } catch (NotInDatabaseException e)
        {
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorMessage("Could not create item", "Could not find the containing group")).build();
        }
        return Response.noContent().build();
    }

    @POST
    @Path("/group")
    @Consumes(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Creates a new item group")
    @ApiResponses({@ApiResponse(code = 204, message = "A group was created")})
    public Response createGroup(@ApiParam(value = "The group to be created") ItemGroup itemGroup) {
        stockService.createGroup(itemGroup);
        return Response.noContent().build();
    }
}
