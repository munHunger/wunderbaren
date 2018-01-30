package se.munhunger.wunderbaren.util.injection;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import se.munhunger.wunderbaren.dao.ItemDAO;
import se.munhunger.wunderbaren.dao.ItemGroupDAO;
import se.munhunger.wunderbaren.rest.Auth;
import se.munhunger.wunderbaren.service.AuthService;
import se.munhunger.wunderbaren.dao.TransactionDAO;
import se.munhunger.wunderbaren.dao.UserDAO;
import se.munhunger.wunderbaren.service.PurchaseService;
import se.munhunger.wunderbaren.service.StockService;
import se.munhunger.wunderbaren.service.UserService;

public class Binder extends AbstractBinder
{

    @Override
    protected void configure() {
        bind(StockService.class).to(StockService.class);
        bind(ItemGroupDAO.class).to(ItemGroupDAO.class);
        bind(ItemDAO.class).to(ItemDAO.class);
        bind(AuthService.class).to(AuthService.class);
        bind(UserService.class).to(UserService.class);
        bind(UserDAO.class).to(UserDAO.class);
        bind(TransactionDAO.class).to(TransactionDAO.class);
        bind(PurchaseService.class).to(PurchaseService.class);
    }
}