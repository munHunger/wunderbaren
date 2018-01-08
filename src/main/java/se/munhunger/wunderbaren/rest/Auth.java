package se.munhunger.wunderbaren.rest;


import io.swagger.annotations.*;
import se.munhunger.wunderbaren.service.AuthService;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Api
@Path("/auth")
public class Auth {

    @Inject
    private AuthService authservice;

    @POST
    @Path("/initiate")
    @ApiOperation(value = "Setting the pin", notes = "The pin is used for user authentication")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_OK, message = "The pin was set")})
    public Response initiate(@ApiParam(value = "The verification code") @QueryParam("pin") String pin) {
        if(authservice.initiate(pin))
        return Response.ok().build();
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @POST
    @Path("/complete")
    @ApiOperation(value = "Authenticates the user", notes = "Returns a jwt token")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_OK, message = "Here is the jwt")})
    public Response complete(@ApiParam(value = "The verification code") @QueryParam("pin") String pin) {
        authservice.verifyUser(pin);
        return Response.ok().build();
    }
}
