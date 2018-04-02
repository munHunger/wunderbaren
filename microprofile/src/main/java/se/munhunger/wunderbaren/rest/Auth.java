package se.munhunger.wunderbaren.rest;

import io.swagger.annotations.*;
import se.munhunger.wunderbaren.model.ErrorMessage;
import se.munhunger.wunderbaren.service.AuthService;
import se.munhunger.wunderbaren.util.exception.PaymentNotCompletedException;
import se.munhunger.wunderbaren.util.exception.UnauthorizedException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;
import java.util.concurrent.ExecutionException;

@Api(value = "authentication")
@Path("/auth")
@ApplicationScoped
public class Auth {

    @Inject private AuthService authservice;

    @POST
    @Path("/initiate")
    @ApiOperation(value = "Setting the pin", notes = "The pin is used for user authentication")
    @ApiResponses({@ApiResponse(code = 200, message = "The pin was set")})
    public Response initiate(@ApiParam(value = "The verification code") @QueryParam("pin") int pin) {
        try {
            return Response.ok().header("access_token", authservice.initiate(pin)).build();
        } catch (PaymentNotCompletedException e) {
            return Response.status(Response.Status.REQUEST_TIMEOUT).entity(new ErrorMessage("Could not login", "The server timed out waiting for login completion")).build();
        }
    }

    @POST
    @Path("/complete")
    @ApiOperation(value = "Authenticates the user", notes = "Returns a jwt token")
    @ApiResponses({@ApiResponse(code = 204, message = "Here is the jwt"), @ApiResponse(code = 401, message = "You are either too drunk or not authorized")})
    public Response complete(@ApiParam(value = "The verification code") @QueryParam("pin") int pin, @ApiParam(value = "The rfid") @QueryParam("rfid") String rfid)
            throws ExecutionException, UnsupportedEncodingException {

        try {
            String jwt = authservice.complete(pin, rfid);
            return Response.noContent().header("access_token", jwt).build();
        } catch (UnauthorizedException e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("message: Not authorized").build();
        }

    }
}
