package se.munhunger.wunderbaren.rest;

import io.swagger.annotations.*;
import se.munhunger.wunderbaren.model.ItemGroup;
import se.munhunger.wunderbaren.service.StockService;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Api
@Path("/stock")
public class Stock
{
    @Inject
    private StockService stockService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Get current stock")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_OK, message = "A list of current stock", responseContainer = "array", response = ItemGroup.class)})
    public Response getCurrentStock() {
        return Response.status(Response.Status.NOT_IMPLEMENTED).build();
    }

    @POST
    @Path("/group")
    @ApiOperation(value = "Creates a new item group")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_NO_CONTENT, message = "A group was created")})
    public Response createGroup(@ApiParam(value = "The name of the new group") @FormParam("name") String name) {
        stockService.createGroup(name);
        return Response.noContent().build();
    }
}
