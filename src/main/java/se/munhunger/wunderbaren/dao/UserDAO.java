package se.munhunger.wunderbaren.dao;

import org.hibernate.Session;
import se.munhunger.wunderbaren.model.persistant.User;

import java.util.Optional;

public class UserDAO extends DatabaseDAO
{
    public void createUser(String id)
    {
        try (Session session = sessionFactory.openSession())
        {
            session.beginTransaction();
            session.saveOrUpdate(new User(id));
            session.getTransaction().commit();
        }
    }

    public Optional<User> getUser(String id)
    {
        try (Session session = sessionFactory.openSession())
        {
            User user = session.get(User.class, id);
            return user != null ? Optional.of(user) : Optional.empty();
        }
    }

    public void saveUser(User user)
    {
        try (Session session = sessionFactory.openSession())
        {
            session.beginTransaction();
            session.save(user);
            session.getTransaction().commit();
        }
    }
}
