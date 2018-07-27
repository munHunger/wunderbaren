package se.munhunger.wunderbaren.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import se.munhunger.wunderbaren.dao.UserDAO;
import se.munhunger.wunderbaren.util.exception.PaymentNotCompletedException;
import se.munhunger.wunderbaren.util.exception.UnauthorizedException;

import javax.inject.Inject;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

public class AuthService {

    @Inject
    private UserDAO userDAO;

    private static Map<Integer, Semaphore> waitingAuth = new HashMap<>();
    private static Map<Integer, String> jwtMap = new HashMap<>();

    //change duration for pins to live longer
    private static LoadingCache<Integer,String> cache = CacheBuilder.newBuilder().refreshAfterWrite(30,TimeUnit.SECONDS).
            build(new CacheLoader<Integer, String>() {
                @Override
                public String load(Integer key) throws Exception {
                    return Integer.toString(key);
                }
            });

    public String initiate(int pin) throws PaymentNotCompletedException {
        cache.put(pin, "000000");
        waitingAuth.put(pin, new Semaphore(0));
        try {
            if(!waitingAuth.get(pin).tryAcquire(30, TimeUnit.SECONDS)) {
                throw new PaymentNotCompletedException();
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return jwtMap.remove(pin);
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
            String jwt = makeToken(rfid);
            jwtMap.put(pin, jwt);
            if(waitingAuth.get(pin) != null) {
                waitingAuth.get(pin).release();
                waitingAuth.remove(pin);
            }
            return jwt;
        }
        throw new UnauthorizedException();
    }

    String getCode(String jwt) {
        return Jwts.parser().parseClaimsJwt(jwt).getBody().get("user", String.class);
    }
}