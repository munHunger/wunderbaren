package se.munhunger.wunderbaren.util.filter;

import jdk.nashorn.internal.ir.annotations.Ignore;
import se.munhunger.wunderbaren.annotations.IgnoreAuth;
import se.munhunger.wunderbaren.annotations.UserAuth;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.lang.reflect.Method;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthFilter implements ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        Method method = resourceInfo.getResourceMethod();
        Class containerClass = resourceInfo.getResourceClass();
        if ((method.isAnnotationPresent(UserAuth.class) || containerClass.isAnnotationPresent(UserAuth.class)) &&
                !method.isAnnotationPresent(IgnoreAuth.class)) {
            MultivaluedMap<String, String> headers = requestContext.getHeaders();
            if (!headers.containsKey("access_token"))
                requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED.getStatusCode())
                        .entity("{\"error\":\"Missing access token\"}")
                        .build());
        }
    }
}
