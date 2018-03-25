package se.munhunger.wunderbaren.swagger;

import io.swagger.jaxrs.config.BeanConfig;
import io.swagger.jaxrs.config.SwaggerContextService;
import io.swagger.models.Swagger;
import io.swagger.models.auth.ApiKeyAuthDefinition;
import io.swagger.models.auth.In;

import javax.annotation.PostConstruct;
import javax.ejb.Startup;
import javax.ejb.Singleton;

@Startup
@Singleton
public class SwaggerBootstrap
{
    @PostConstruct
    public void init()
    {
        Swagger swagger = new Swagger();
        swagger.securityDefinition("JWT_AUTHORIZATION", new ApiKeyAuthDefinition("access_token", In.HEADER));

        new SwaggerContextService().updateSwagger(swagger);

        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion("1.0.0");
        beanConfig.setSchemes(new String[]{"http", "https"});
        beanConfig.setBasePath("/wunderbaren-3.0/api");
        beanConfig.setResourcePackage("se.munhunger.wunderbaren");
        beanConfig.setScan(true);
    }
}