package se.munhunger.wunderbaren.dao;

import org.hibernate.Session;
import se.munhunger.wunderbaren.model.persistant.Transaction;

import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

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
    public List<Transaction> getTransactions(String user) {

        try (Session session = sessionFactory.openSession()) {
            String hql = "from Transaction";
            Query query = session.createQuery(hql);
            //query.setParameter(1, user);
            return query.getResultList();

        }
    }

}

