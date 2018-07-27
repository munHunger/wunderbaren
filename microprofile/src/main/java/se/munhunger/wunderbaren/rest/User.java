package se.munhunger.wunderbaren.rest;

import io.swagger.annotations.*;
import se.munhunger.wunderbaren.annotations.IgnoreAuth;
import se.munhunger.wunderbaren.annotations.UserAuth;
import se.munhunger.wunderbaren.model.ErrorMessage;
import se.munhunger.wunderbaren.service.UserService;
import se.munhunger.wunderbaren.util.exception.NotInDatabaseException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Api(value = "user", authorizations = @Authorization(
        value = "JWT_AUTHORIZATION"))
@Path("/user")
@UserAuth
@ApplicationScoped
public class User {
    @Inject
    private UserService userService;

    @POST
    @ApiOperation(value = "Creates a new user")
    @ApiResponses({@ApiResponse(code = 204, message = "The user was created")})
    @IgnoreAuth
    public Response createUser(@ApiParam(value = "The RFID id of the user") @FormParam("id") String id) {
        userService.createUser(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/{id}")
    @ApiOperation(value = "Gets a user from the database")
    @ApiResponses({@ApiResponse(code = 200, message = "The user", response = User.class),
                          @ApiResponse(code = 404, message = "The user could not be found in the database")})
    public Response getUser(@ApiParam(value = "The RFID id of the user") @PathParam("id") String id) {
        try {
            return Response.ok(userService.getUser(id)).build();
        } catch (NotInDatabaseException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorMessage("Could not fetch user", "No user found in db with that id")).build();
        }
    }

    @PUT
    @Path("/{id}")
    @ApiOperation(value = "Increases wallet")
    @ApiResponses({@ApiResponse(code = 200, message = "Wallet increased", response = User.class)})
    public Response increaseWallet(@ApiParam(value = "The RFID id of the user") @PathParam("id") String id, @ApiParam(value = "The amount to increase the wallet by") @FormParam("amount") int amount) {
        try {
            return Response.ok(userService.increaseWallet(id, amount)).build();
        } catch (NotInDatabaseException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ErrorMessage("Could not increase wallet", "Could not find the user with that ID")).build();
        }
    }
}
