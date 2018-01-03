package se.munhunger.wunderbaren.swagger;

import io.swagger.jaxrs.config.BeanConfig;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class Bootstrap extends HttpServlet
{
    @Override
    public void init(ServletConfig config) throws ServletException
    {
        super.init(config);

        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion("1.0.0");
        beanConfig.setSchemes(new String[]{"http", "https"});
        beanConfig.setBasePath("/api");
        beanConfig.setResourcePackage("se.munhunger.wunderbaren");
        beanConfig.setScan(true);
    }
}