package se.munhunger.wunderbaren.service;

import se.munhunger.wunderbaren.dao.ItemDAO;
import se.munhunger.wunderbaren.dao.ItemGroupDAO;
import se.munhunger.wunderbaren.model.persistant.Item;
import se.munhunger.wunderbaren.model.persistant.ItemGroup;
import se.munhunger.wunderbaren.util.exception.NotInDatabaseException;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.Optional;

@Singleton
public class StockService
{
    @Inject
    private ItemGroupDAO itemGroupDAO;

    @Inject
    private ItemDAO itemDAO;

    public List<ItemGroup> getAll() {
        return itemGroupDAO.getAll();
    }

    public void createGroup(ItemGroup itemGroup)
    {
        itemGroupDAO.insert(itemGroup);
    }

    public void createItem(Item item, String groupName) throws NotInDatabaseException
    {
        Optional<ItemGroup> itemGroup = itemGroupDAO.getGroupByName(groupName);
        item.setGroup(itemGroup.orElseThrow(NotInDatabaseException::new));
        itemDAO.insert(item);
    }

    public void alterBy(String barcode, int amount) throws NotInDatabaseException
    {
        Item item = itemDAO.getByBarcode(barcode).orElseThrow(NotInDatabaseException::new);
        item.setStock(item.getStock()+amount);
        itemDAO.insert(item);
    }
}
