package se.munhunger.wunderbaren.rest;

import io.swagger.annotations.*;
import se.munhunger.wunderbaren.dao.UserDAO;
import se.munhunger.wunderbaren.model.ErrorMessage;
import se.munhunger.wunderbaren.service.UserService;
import se.munhunger.wunderbaren.util.exception.NotInDatabaseException;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Api(value = "user")
@Path("/user")
public class User
{
    @Inject
    private UserService userService;

    @POST
    @ApiOperation(value = "Creates a new user")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_NO_CONTENT, message = "The user was created")})
    public Response createUser(@ApiParam(value = "The RFID id of the user") @FormParam("id") String id) {
        userService.createUser(id);
        return Response.noContent().build();
    }

    @PUT
    @ApiOperation(value = "Increases wallet")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_OK, message = "Wallet increased", response = User.class)})
    public Response increaseWallet(@ApiParam(value = "The RFID id of the user") @FormParam("id") String id, @ApiParam(value = "The amount to increase the wallet by") @FormParam("amount") int amount) {
        try
        {
            return Response.ok(userService.increaseWallet(id, amount)).build();
        } catch (NotInDatabaseException e)
        {
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorMessage("Could not increase wallet", "Could not find the user with that ID")).build();
        }
    }
}
