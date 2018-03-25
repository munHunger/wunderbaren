package se.munhunger.wunderbaren.util.filter;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.Provider;
import java.io.IOException;


@Provider
public class HeaderFilter implements ContainerResponseFilter
{
    @Context
    private ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException
    {
        String origin = requestContext.getHeaders().getFirst("origin");
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
    }
}