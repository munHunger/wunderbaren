package se.munhunger.wunderbaren.rest;

import io.swagger.annotations.*;
import se.munhunger.wunderbaren.annotations.IgnoreAuth;
import se.munhunger.wunderbaren.model.persistant.ItemGroup;
import se.munhunger.wunderbaren.service.PurchaseService;
import se.munhunger.wunderbaren.util.exception.InsufficientFundsException;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Api(value = "purchase")
@Path("/purchase")
public class Purchase {

    @Inject
    public PurchaseService purchaseService;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Make a purchase")
    @IgnoreAuth
    @ApiResponses({@ApiResponse(code = HttpServletResponse.SC_OK, message = "A list of current stock", responseContainer = "array", response = ItemGroup.class)})
    public Response purchase(@ApiParam(value = "user rfid and list of barcodes") @FormParam("rfid") String rfid, @FormParam("List of barcodes") List<String> barcodes) {
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
}
