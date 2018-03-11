package se.munhunger.wunderbaren.rest;

import io.swagger.annotations.*;
import se.munhunger.wunderbaren.annotations.IgnoreAuth;
import se.munhunger.wunderbaren.annotations.UserAuth;
import se.munhunger.wunderbaren.model.ErrorMessage;
import se.munhunger.wunderbaren.model.persistant.ItemGroup;
import se.munhunger.wunderbaren.model.persistant.Transaction;
import se.munhunger.wunderbaren.service.PurchaseService;
import se.munhunger.wunderbaren.util.exception.InsufficientFundsException;
import se.munhunger.wunderbaren.util.exception.NotInDatabaseException;
import se.munhunger.wunderbaren.util.exception.PaymentNotCompletedException;

import javax.inject.Inject;
import javax.print.attribute.standard.Media;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Api(value = "purchase", authorizations = @Authorization(
        value="JWT_AUTHORIZATION"))
@UserAuth
@Path("/purchase")
public class Purchase {

    @Inject
    public PurchaseService purchaseService;

    @POST
    @Path("/initiatePayment")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Initiate a purchase")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_OK, message = "A transaction is made"),
                          @ApiResponse(code = HttpServletResponse.SC_REQUEST_TIMEOUT, message = "The payment was not finished on the app side", response = ErrorMessage.class)})
    public Response initiatePayment(@FormParam("List of barcodes") List<String> barcodes, @HeaderParam("access_token") String jwt) {
        try {
            purchaseService.initiatePayment(barcodes, jwt);
        } catch (PaymentNotCompletedException e) {
            return Response.status(Stat)
        } catch (InsufficientFundsException e) {
            e.printStackTrace();
        } catch (NotInDatabaseException e) {
            e.printStackTrace();
        }
        return Response.noContent().build();
    }


    @POST
    @Path("/buy")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Make a purchase")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_OK, message = "A transaction is made")})
    @Deprecated
    public Response purchase(@ApiParam(value = "user rfid") @FormParam("rfid") String rfid, @FormParam("List of barcodes") List<String> barcodes) {
        try {
            purchaseService.createTransaction(rfid, barcodes);
        }
        catch (InsufficientFundsException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("message: Insufficient funds")
                    .build();
        }
        catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("message: Something went wring with the database")
                    .build();
        }
        return Response.noContent().build();
    }

    @GET
    @Path("/history")
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Returns a list of transaction for a user")
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_OK, message = "A history of transactions", responseContainer = "array", response = Transaction.class)})
    public Response getHistory(@ApiParam(value = "user rfid") @QueryParam("rfid") String rfid) throws NotInDatabaseException {
        return Response.ok(purchaseService.getTransactionsByUser(rfid)).build();
    }
}
