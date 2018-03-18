package se.munhunger.wunderbaren.service;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import se.munhunger.wunderbaren.FullscreenActivity;
import se.munhunger.wunderbaren.model.Item;
import se.munhunger.wunderbaren.model.User;

/**
 * Created by munHunger on 2018-03-12.
 */

public class WunderbarenService {

    private static final String BASE_URL = "http://192.168.0.196:8085/wunderbaren/api";

    public static String jwt = "";

    public WunderbarenService() {}

    public User getUser(long id) {
        HttpClient client = new DefaultHttpClient();
        HttpGet get = new HttpGet(BASE_URL + "/user/" + id);
        get.addHeader("access_token", jwt);
        try {
            HttpResponse response = client.execute(get);
            String json = IOUtils.toString(response.getEntity().getContent());
            if (response.getStatusLine().getStatusCode() > 401) {
                createUser(id);
                return getUser(id);
            }
            return new Gson().fromJson(json, User.class);
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private void createUser(long id) {
        HttpClient client = new DefaultHttpClient();
        HttpPost post = new HttpPost(BASE_URL + "/user");
        List<NameValuePair> body = new ArrayList<>();
        body.add(new BasicNameValuePair("id", "" + id));
        try {
            post.setEntity(new UrlEncodedFormEntity(body));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        try {
            HttpResponse response = client.execute(post);
            if(response.getStatusLine().getStatusCode() != 204)
                Log.e("Creating user", "Got error code from server:" + response.getStatusLine().getStatusCode());
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public boolean login(String pin, String rfid) {
        HttpClient client = new DefaultHttpClient();
        HttpPost post = new HttpPost(BASE_URL + "/auth/complete?pin=" + pin + "&rfid=" + rfid);
        try {
            HttpResponse response = client.execute(post);
            if(response.getStatusLine().getStatusCode() != 204)
                Log.e("Logging in", "Got error code from server:" + response.getStatusLine().getStatusCode());
            jwt = response.getFirstHeader("access_token").getValue();
            Timer timer = new Timer();
            TimerTask task = new TimerTask() {
                @Override
                public void run() {
                    HttpClient client = new DefaultHttpClient();
                    HttpPost get = new HttpPost(BASE_URL + "/purchase/initiated");
                    get.addHeader("access_token", jwt);
                    try {
                        HttpResponse response = client.execute(get);
                        String json = IOUtils.toString(response.getEntity().getContent());
                        if (response.getStatusLine().getStatusCode() == 200) {
                            Type type = new TypeToken<ArrayList<Item>>(){}.getType();
                            List<Item> items = new Gson().fromJson(json, type);

                            int cost = 0;
                            for(Item i : items)
                                cost += i.cost;

                            final int finalCost = cost;
                            Handler mainHandler = new Handler(Looper.getMainLooper());
                            mainHandler.post(() -> {
                                Toast.makeText(FullscreenActivity.context, "Scan card now for payment of " + finalCost, Toast.LENGTH_LONG).show();
                            });
                        }
                    } catch (ClientProtocolException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            };
            timer.scheduleAtFixedRate(task, 0, 2000);
            return true;
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }
}
