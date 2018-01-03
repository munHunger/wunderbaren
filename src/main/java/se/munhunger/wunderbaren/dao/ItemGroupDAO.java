package se.munhunger.wunderbaren.dao;

import org.hibernate.Session;
import se.munhunger.wunderbaren.model.persistant.ItemGroup;

import javax.persistence.Query;
import java.util.List;
import java.util.Optional;

public class ItemGroupDAO extends DatabaseDAO {

    public void insert(ItemGroup group) {
        try (Session session = sessionFactory.openSession())
        {
            session.beginTransaction();
            session.saveOrUpdate(group);
            session.getTransaction().commit();
        }
    }

    public Optional<ItemGroup> getGroupByName(String groupName)
    {
        try (Session session = sessionFactory.openSession())
        {
            ItemGroup itemGroup = session.get(ItemGroup.class, groupName);
            return itemGroup != null ? Optional.of(itemGroup) : Optional.empty();
        }
    }

    public List<ItemGroup> getAll()
    {
        try (Session session = sessionFactory.openSession())
        {
            String hql = "from ItemGroup";
            Query query = session.createQuery(hql);
            return query.getResultList();
        }
    }
}
