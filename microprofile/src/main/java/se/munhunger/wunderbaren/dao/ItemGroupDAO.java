package se.munhunger.wunderbaren.dao;

import org.hibernate.Session;
import se.munhunger.wunderbaren.model.persistant.ItemGroup;

import javax.inject.Singleton;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Singleton
public class ItemGroupDAO extends DatabaseDAO {

    private static final Logger LOG = Logger.getLogger(ItemGroupDAO.class.getName());

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
        LOG.info(() -> "Fetching all item groups");
        try (Session session = sessionFactory.openSession())
        {
            String hql = "from ItemGroup";
            LOG.info(() -> "Creating query from HQL: " + hql);
            Query query = session.createQuery(hql);
            return query.getResultList();
        }
        catch (Exception e)
        {
            LOG.severe(() -> "Unhandled exception: " + e.getMessage());
            return new ArrayList<>();
        }
    }
}
