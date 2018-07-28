package se.munhunger.wunderbaren.rest;

import io.swagger.jaxrs.config.BeanConfig;
import io.swagger.jaxrs.config.SwaggerContextService;
import io.swagger.models.Swagger;
import io.swagger.models.auth.ApiKeyAuthDefinition;
import io.swagger.models.auth.In;
import org.glassfish.jersey.jackson.JacksonFeature;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashMap;
import java.util.Map;


@ApplicationPath("/api")
public class RestApplication extends Application {

    public RestApplication() {
        Swagger swagger = new Swagger();
        swagger.securityDefinition("JWT_AUTHORIZATION", new ApiKeyAuthDefinition("access_token", In.HEADER));
        new SwaggerContextService().updateSwagger(swagger);

        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setDescription("Wunderbaren backend bar service");
        beanConfig.setTitle("Wunderbaren");
        beanConfig.setVersion("3.0");
        beanConfig.setSchemes(new String[]{"http"});
        beanConfig.setBasePath("/wunderbaren-3.0/api");
        beanConfig.setResourcePackage("se.munhunger.wunderbaren");
        beanConfig.setScan(true);
    }

    @Override
    public Map<String, Object> getProperties() {
        String classnames = JacksonFeature.class.getName();
        Map<String, Object> props = new HashMap<>();
        props.put("jersey.config.server.provider.classnames", classnames);
        props.put("jersey.config.disableMoxyJson", true);
        return props;
    }
}
