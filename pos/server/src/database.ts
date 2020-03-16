import * as util from "./util";
const logger = require("./logger").logger("database");
const datason = require("datason");

const dbDir = util.resolveHome("~/.wunderbaren/data");
logger.info(`Writing database to ${dbDir}`);

datason.connect(dbDir).then((db: any) => {
  db.createTable("cards");
  db.createTable("stock");

  db.stock.register("drink", [
    {
      name: "Negroni",
      image: "https://drinkoteket.se/wp-content/uploads/negroni-1.jpg",
      price: 22
    }
  ]);
  db.stock.register("beer", [
    {
      name: "Lapin Kulta",
      image:
        "https://cdn1.matsmart.se/sites/se/files/styles/product_zoom/public/products/lapin_kulta_fresh_lager.jpg?itok=WwRdjet8",
      price: 8
    }
  ]);
});

export function load(): Promise<any> {
  return datason.connect(dbDir).then((data: any) => {
    return data;
  });
}
