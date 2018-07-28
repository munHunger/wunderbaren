package se.munhunger.wunderbaren.util.filter;

import javax.annotation.Priority;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.Provider;
import java.io.IOException;


@Provider
@Priority(Priorities.HEADER_DECORATOR)
@ApplicationScoped
public class HeaderFilter implements ContainerResponseFilter {
    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws
            IOException {
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "*");
        responseContext.getHeaders().add("Access-Control-Expose-Headers", "*");
    }
}