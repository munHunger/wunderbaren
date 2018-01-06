package se.munhunger.wunderbaren.service;

import se.munhunger.wunderbaren.dao.UserDAO;
import se.munhunger.wunderbaren.model.persistant.User;
import se.munhunger.wunderbaren.util.exception.NotInDatabaseException;

import javax.inject.Inject;

public class UserService
{
    @Inject
    private UserDAO userDAO;

    public void createUser(String id)
    {
        userDAO.createUser(id);
    }

    public User increaseWallet(String id, int amount) throws NotInDatabaseException
    {
        User user = userDAO.getUser(id).orElseThrow(NotInDatabaseException::new);
        user.wallet += amount;
        userDAO.saveUser(user);
        return user;
    }
}