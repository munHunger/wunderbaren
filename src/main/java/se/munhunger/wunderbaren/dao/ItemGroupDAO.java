package se.munhunger.wunderbaren.dao;

import org.hibernate.Session;
import se.munhunger.wunderbaren.model.ItemGroup;

public class ItemGroupDAO extends DatabaseDAO {

    public void insert(ItemGroup group) {
        try (Session session = sessionFactory.openSession())
        {
            session.beginTransaction();
            session.saveOrUpdate(group);
            session.getTransaction().commit();
        }
    }
}
