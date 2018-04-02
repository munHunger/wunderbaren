package se.munhunger.wunderbaren.dao;

import org.hibernate.Session;
import se.munhunger.wunderbaren.model.persistant.Transaction;

import javax.inject.Singleton;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Singleton
public class TransactionDAO extends DatabaseDAO
{
    public void create(Transaction transaction) {
        try (Session session = sessionFactory.openSession())
        {
            session.beginTransaction();
            session.saveOrUpdate(transaction);
            session.getTransaction().commit();
        }
    }

    @PersistenceContext
    public List<Transaction> getTransactions(String userID) {
        try (Session session = sessionFactory.openSession()) {
            String hql = "from Transaction where user.userId = ?1";
            Query query = session.createQuery(hql);
            query.setParameter(1, userID);
            return query.getResultList();
        }
    }

    public List<Transaction> getAll() {
        try (Session session = sessionFactory.openSession()) {
            String hql = "from Transaction";
            Query query = session.createQuery(hql);
            return query.getResultList();
        }
    }
}

