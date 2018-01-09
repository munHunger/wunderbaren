package se.munhunger.wunderbaren.rest;


import io.swagger.annotations.*;
import se.munhunger.wunderbaren.service.AuthService;
import se.munhunger.wunderbaren.util.exception.UnauthorizedException;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;
import java.util.concurrent.ExecutionException;

@Api
@Path("/auth")
public class Auth {

    @Inject
    private AuthService authservice;

    @POST
    @Path("/initiate")
    @ApiOperation(value = "Setting the pin", notes = "The pin is used for user authentication")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_OK, message = "The pin was set")})
    public Response initiate(@ApiParam(value = "The verification code") @QueryParam("pin") int pin) throws ExecutionException, UnauthorizedException, UnsupportedEncodingException {
        authservice.initiate(pin);
        return Response.ok().build();
    }

    @POST
    @Path("/complete")
    @ApiOperation(value = "Authenticates the user", notes = "Returns a jwt token")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_OK, message = "Here is the jwt")})
    public Response complete(@ApiParam(value = "The verification code") @QueryParam("pin") int pin, @ApiParam(value = "The rfid") @QueryParam("rfid") String rfid) throws ExecutionException, UnsupportedEncodingException {
        try {
            String jwt = authservice.complete(pin, rfid);
        }
        catch (UnauthorizedException e) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("message: Not authorized")
                    .build();
        }
        return Response.ok().build();
    }
}
