package se.munhunger.wunderbaren.service;

import se.munhunger.wunderbaren.dao.ItemGroupDAO;
import se.munhunger.wunderbaren.model.ItemGroup;

import javax.inject.Inject;

public class StockService
{
    @Inject
    private ItemGroupDAO itemGroupDAO;

    public void createGroup(String name)
    {
        ItemGroup group = new ItemGroup(name);
        itemGroupDAO.insert(group);
    }
}
