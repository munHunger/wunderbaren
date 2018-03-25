package se.munhunger.wunderbaren.util.filter;

import javax.annotation.Priority;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

import static se.munhunger.wunderbaren.util.filter.CORSFilter.VALID_METHODS;

@Provider
@Priority(Priorities.HEADER_DECORATOR)
public class HeaderFilter implements ContainerResponseFilter
{
    @Context
    private ResourceInfo resourceInfo;

    @Context
    HttpServletRequest httpRequest;

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException
    {
        String origin = requestContext.getHeaders().getFirst("origin");
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
    }
}