/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tsvhk3ntb6zo03v",
    "created": "2024-01-23 23:00:40.820Z",
    "updated": "2024-01-23 23:00:40.820Z",
    "name": "coordinates",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2vlrrr6w",
        "name": "Name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "7jhxc3uv",
        "name": "north",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "io2ee3wb",
        "name": "east",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tsvhk3ntb6zo03v");

  return dao.deleteCollection(collection);
})
