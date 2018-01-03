package se.munhunger.wunderbaren.util.injection;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import se.munhunger.wunderbaren.dao.ItemGroupDAO;
import se.munhunger.wunderbaren.model.ItemGroup;
import se.munhunger.wunderbaren.service.StockService;

public class Binder extends AbstractBinder
{

    @Override
    protected void configure() {
        bind(StockService.class).to(StockService.class);
        bind(ItemGroupDAO.class).to(ItemGroupDAO.class);
    }
}