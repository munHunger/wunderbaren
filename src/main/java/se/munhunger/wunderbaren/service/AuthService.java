package se.munhunger.wunderbaren.service;

public class AuthService {

    public boolean initiate(String pin) {
        if (pin.equals("12345"))
        return true;
        return false;
    }

    public boolean verifyUser(String pin) {
        if (pin != null)
            return true;
        return false;
    }

}
