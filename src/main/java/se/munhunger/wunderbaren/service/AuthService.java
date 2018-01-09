package se.munhunger.wunderbaren.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import se.munhunger.wunderbaren.util.exception.UnauthorizedException;

import java.io.UnsupportedEncodingException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

public class AuthService {

    private static int addcache(int key) {
        return key;
    }

    private static LoadingCache<Integer,String> cache = CacheBuilder.newBuilder().refreshAfterWrite(30,TimeUnit.SECONDS).
            build(new CacheLoader<Integer, String>() {
                @Override
                public String load(Integer key) throws Exception {
                    return Integer.toString(addcache(key));
                }
            });

    public void initiate(int pin) throws UnauthorizedException, ExecutionException, UnsupportedEncodingException {
        cache.put(pin, "none");
        complete(pin, "proper");
    }

    //private static final String SECRET = "SECRET";

    private static String makeToken() throws UnsupportedEncodingException {
        String jwt = Jwts.builder()
                .setSubject("wunder")
                .claim("bar", "bar")
                .signWith(SignatureAlgorithm.HS256, "SECRET".getBytes("UTF-8"))
                .compact();
        return jwt;
    }

    public String complete(int pin, String rfid) throws ExecutionException, UnauthorizedException, UnsupportedEncodingException {
        if(cache.get(pin).equals("none"))
            cache.put(pin, rfid);
        else if(!cache.get(pin).equals(rfid))
            throw new UnauthorizedException();
        return makeToken();
    }
}