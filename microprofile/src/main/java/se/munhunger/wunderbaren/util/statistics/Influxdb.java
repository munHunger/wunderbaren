package se.munhunger.wunderbaren.util.statistics;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.BatchPoints;
import org.influxdb.dto.Point;
import org.influxdb.dto.Pong;
import se.munhunger.wunderbaren.dao.ItemGroupDAO;
import se.munhunger.wunderbaren.dao.TransactionDAO;
import se.munhunger.wunderbaren.model.persistant.Item;
import se.munhunger.wunderbaren.model.persistant.ItemGroup;
import se.munhunger.wunderbaren.model.persistant.Transaction;
import se.munhunger.wunderbaren.service.StockService;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

@Startup
@Singleton
public class Influxdb {
    private static final Logger logger = Logger.getLogger(Influxdb.class.getName());

    @PostConstruct
    public static void init() {
        String url = System.getenv("INFLUX_URL");
        String user = System.getenv("INFLUX_USER");
        String pass = System.getenv("INFLUX_PASS");
        String namespace = System.getenv("INFLUX_DATABASE");
        if(url == null)
            return;
        if(user == null)
            user = "admin";
        if(pass == null)
            pass = "admin";
        if(namespace == null)
            namespace = "wunderbaren";
        new Influxdb().startProducer(url, user, pass, namespace);
    }

    private void startProducer(String url, String user, String pass, String namespace) {

        ItemGroupDAO stockDAO = new ItemGroupDAO();
        TransactionDAO transactionDAO = new TransactionDAO();

        logger.info(() -> "Connecting to influxDB");
        InfluxDB db = InfluxDBFactory.connect(url, user, pass);
        Pong response = db.ping();
        if (response.getVersion().equalsIgnoreCase("unknown")) {
            logger.warning(() -> "Could not connect to influx server");
            return;
        }
        logger.info(() -> "Creating retention policy 'stock' in namespace: " + namespace);
        db.createRetentionPolicy("stock", namespace, "30d", 1, true);

        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {
                logger.info(() -> "Logging stock to influx");
                List<ItemGroup> stock = stockDAO.getAll();
                Point.Builder stockBuilder = Point.measurement("stock").time(System.currentTimeMillis(), TimeUnit.MILLISECONDS);
                Point.Builder valueBuilder = Point.measurement("value").time(System.currentTimeMillis(), TimeUnit.MILLISECONDS);
                for(ItemGroup group : stock) {
                    int total = 0;
                    int value = 0;
                    for(Item item : group.items) {
                        total += item.stock;
                        value += item.stock * item.cost;
                    }
                    stockBuilder = stockBuilder.addField(group.name, total);
                    valueBuilder = valueBuilder.addField(group.name, value);
                }
                int totalStock = stock.stream().mapToInt(group -> group.items.stream().mapToInt(item -> item.stock).sum()).sum();
                int totalValue = stock.stream().mapToInt(group -> group.items.stream().mapToInt(item -> item.stock*item.cost).sum()).sum();
                stockBuilder.addField("total", totalStock);
                valueBuilder.addField("total", totalValue);

                List<Transaction> transactions = transactionDAO.getAll();
                int totalSold = transactions.stream().mapToInt(transaction -> transaction.amount).sum();
                Point.Builder salesBuilder = Point.measurement("sales").time(System.currentTimeMillis(), TimeUnit.MILLISECONDS);
                salesBuilder = salesBuilder.addField("sold", totalSold);

                BatchPoints batch = BatchPoints.database(namespace).build();
                batch.point(stockBuilder.build());
                batch.point(valueBuilder.build());
                batch.point(salesBuilder.build());
                db.write(batch);
            }
        };
        //running timer task as daemon thread
        Timer timer = new Timer(true);
        logger.info(() -> "Starting timertask");
        timer.scheduleAtFixedRate(timerTask, 0, 1000);
    }
}
