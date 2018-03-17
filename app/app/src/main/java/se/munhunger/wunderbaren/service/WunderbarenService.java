package se.munhunger.wunderbaren.service;

import android.util.Log;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import se.munhunger.wunderbaren.model.User;

/**
 * Created by munHunger on 2018-03-12.
 */

public class WunderbarenService {
    private static final String BASE_URL = "http://munhunger.se:8083/wunderbaren/api";
    private Client client = ClientBuilder.newClient();

    public WunderbarenService() {}

    public User getUser(long id) {
        Response res = null;
        try {
            res = client.target(BASE_URL).path("user").path("" + id).request().get();
            if(res.getStatus() == 404) {
                createUser(id);
                return getUser(id);
            }
            return res.readEntity(User.class);
        }
        finally {
            if (res != null)
                res.close();
        }
    }

    private void createUser(long id) {
        Response res = null;
        try {
            res = client.target(BASE_URL).path("user").request().post(Entity.entity("" + id, MediaType.APPLICATION_FORM_URLENCODED));
            if(res.getStatus() != 200)
                Log.e("Creating user", "Got error code from server:" + res.getStatus());
        }
        finally {
            if(res != null)
                res.close();
        }
    }
}
