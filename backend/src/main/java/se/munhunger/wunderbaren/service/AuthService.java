package se.munhunger.wunderbaren.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import se.munhunger.wunderbaren.dao.UserDAO;
import se.munhunger.wunderbaren.util.exception.UnauthorizedException;

import javax.inject.Inject;
import java.io.UnsupportedEncodingException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

public class AuthService {

    @Inject
    private UserDAO userDAO;

    //change duration for pins to live longer
    private static LoadingCache<Integer,String> cache = CacheBuilder.newBuilder().refreshAfterWrite(30,TimeUnit.SECONDS).
            build(new CacheLoader<Integer, String>() {
                @Override
                public String load(Integer key) throws Exception {
                    return Integer.toString(key);
                }
            });

    public void initiate(int pin) throws UnauthorizedException, ExecutionException, UnsupportedEncodingException {
        cache.put(pin, "000000");
    }

    private static String makeToken(String rfid) throws UnsupportedEncodingException {
        String jwt = Jwts.builder()
                .setSubject("wunder")
                .claim("user", rfid)
                .signWith(SignatureAlgorithm.HS256, "SECRET".getBytes("UTF-8"))
                .compact();
        return jwt;
    }

    public String complete(int pin, String rfid) throws ExecutionException, UnauthorizedException, UnsupportedEncodingException {
        if(cache.get(pin).equals("000000") && userDAO.getUser(rfid).isPresent()) {
            cache.put(pin, rfid);
            return makeToken(rfid);
        }
        throw new UnauthorizedException();
    }
}