package se.munhunger.wunderbaren.service;

import se.munhunger.wunderbaren.dao.ItemDAO;
import se.munhunger.wunderbaren.dao.TransactionDAO;
import se.munhunger.wunderbaren.dao.UserDAO;
import se.munhunger.wunderbaren.model.persistant.Item;
import se.munhunger.wunderbaren.model.persistant.Transaction;
import se.munhunger.wunderbaren.model.persistant.User;
import se.munhunger.wunderbaren.util.exception.InsufficientFundsException;
import se.munhunger.wunderbaren.util.exception.NotInDatabaseException;
import se.munhunger.wunderbaren.util.exception.PaymentNotCompletedException;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.*;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Singleton
public class PurchaseService {

    @Inject
    private ItemDAO itemDAO;

    @Inject
    private UserDAO userDAO;

    @Inject
    private AuthService authService;

    @Inject
    private TransactionDAO transactionDAO;

    private static Map<String, List<String>> orders = new HashMap<>();
    private static Map<String, Semaphore> initiatedOrders = new HashMap<>();

    public void createTransaction(String rfid, List<String> barcodes) throws NotInDatabaseException, InsufficientFundsException {
        User user = userDAO.getUser(rfid).orElseThrow(NotInDatabaseException::new);
        List<Item> items = barcodes.stream().map(b -> itemDAO.getByBarcode(b)).filter(Optional::isPresent).map(Optional::get).collect(Collectors.toList());
        if(items.size() != barcodes.size())
            throw new NotInDatabaseException();
        int cost = 0;
        for(Item item : items) {
            cost += item.cost;
        }
        int wallet = user.wallet;
        if(wallet > cost) {
            user.wallet -= cost;
            userDAO.saveUser(user);
            Map<String, Item> itemMap = new HashMap<>();
            for(Item item : items) {
                item = itemMap.getOrDefault(item.barcode, item);
                item.stock--;
                itemDAO.saveItem(item);
                transactionDAO.create(new Transaction(user, item, item.cost));
                itemMap.put(item.barcode, item);
            }
        }
        else {
            throw new InsufficientFundsException();
        }
    }

    public List<Transaction> getTransactionsByUser(String rfid) throws NotInDatabaseException {
        return transactionDAO.getTransactions(rfid);
    }

    public void initiatePayment(List<String> barcodes, String jwt) throws PaymentNotCompletedException {
        String rfid = authService.getCode(jwt);
        orders.put(rfid, barcodes);
        initiatedOrders.put(rfid, new Semaphore(0));
        try {
            if(!initiatedOrders.get(rfid).tryAcquire(30, TimeUnit.SECONDS))
                throw new PaymentNotCompletedException();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void completePayment(String jwt, String userID) throws InsufficientFundsException, NotInDatabaseException {
        String rfid = authService.getCode(jwt);
        List<String> barcodes = orders.remove(rfid);
        initiatedOrders.get(rfid).release();
        createTransaction(userID, barcodes);
    }

    public List<Item> getInitiatedPayment(String jwt) {
        String rfid = authService.getCode(jwt);
        List<String> barcodes = orders.get(rfid);
        if(barcodes == null)
            return null;
        return barcodes.stream().map(b -> itemDAO.getByBarcode(b)).filter(Optional::isPresent).map(Optional::get).collect(Collectors.toList());
    }
}
