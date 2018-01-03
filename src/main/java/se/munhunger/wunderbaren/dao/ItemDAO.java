package se.munhunger.wunderbaren.dao;

import org.hibernate.Session;
import se.munhunger.wunderbaren.model.persistant.Item;
import se.munhunger.wunderbaren.model.persistant.ItemGroup;

import java.util.Optional;

public class ItemDAO extends DatabaseDAO
{
    public void insert(Item item)
    {
        try (Session session = sessionFactory.openSession())
        {
            session.beginTransaction();
            session.saveOrUpdate(item);
            session.getTransaction().commit();
        }
    }

    public Optional<Item> getByBarcode(String barcode)
    {
        try (Session session = sessionFactory.openSession())
        {
            Item item = session.get(Item.class, barcode);
            return item != null ? Optional.of(item) : Optional.empty();
        }
    }
}
