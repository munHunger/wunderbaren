package se.munhunger.wunderbaren.service;

import se.munhunger.wunderbaren.dao.ItemDAO;
import se.munhunger.wunderbaren.dao.TransactionDAO;
import se.munhunger.wunderbaren.dao.UserDAO;
import se.munhunger.wunderbaren.model.persistant.Item;
import se.munhunger.wunderbaren.model.persistant.Transaction;
import se.munhunger.wunderbaren.model.persistant.User;
import se.munhunger.wunderbaren.util.exception.InsufficientFundsException;
import se.munhunger.wunderbaren.util.exception.NotInDatabaseException;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class PurchaseService {

    @Inject
    private ItemDAO itemDAO;

    @Inject
    private UserDAO userDAO;

    @Inject
    TransactionDAO transactionDAO;
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
            for(Item item : items) {
                item.stock--;
                transactionDAO.create(new Transaction(user, item, item.cost));
            }
        }
        else {
            throw new InsufficientFundsException();
        }
    }

}
