package se.munhunger.wunderbaren.service;

import se.munhunger.wunderbaren.dao.ItemDAO;
import se.munhunger.wunderbaren.dao.ItemGroupDAO;
import se.munhunger.wunderbaren.model.persistant.Item;
import se.munhunger.wunderbaren.model.persistant.ItemGroup;
import se.munhunger.wunderbaren.util.exception.NotInDatabaseException;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

public class StockService
{
    @Inject
    private ItemGroupDAO itemGroupDAO;

    @Inject
    private ItemDAO itemDAO;

    public List<ItemGroup> getAll() {
        return itemGroupDAO.getAll();
    }

    public void createGroup(String name)
    {
        ItemGroup group = new ItemGroup(name);
        itemGroupDAO.insert(group);
    }

    public void createItem(Item item, String groupName) throws NotInDatabaseException
    {
        Optional<ItemGroup> itemGroup = itemGroupDAO.getGroupByName(groupName);
        item.group = itemGroup.orElseThrow(NotInDatabaseException::new);
        itemDAO.insert(item);
    }
}
