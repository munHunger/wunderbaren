package se.munhunger.wunderbaren;

import org.glassfish.jersey.server.ResourceConfig;
import se.munhunger.wunderbaren.util.injection.Binder;

public class Startup extends ResourceConfig
{
    public Startup() {
        register(new Binder());
        packages(true, "se.munhunger.wunderbaren");
    }
}