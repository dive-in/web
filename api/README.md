# API Development guide

## Accessing the database through the DB admin panel

After the containers have started, the admin panel for the database can be accessed at `http://localhost:5050`.

To authenticate, use the following email/password combination:

- Email: admin@pgadmin.org
- Password: admin

After you have logged in, then you have to connect to the database itself. To do so, right click on `Servers` in the left pane, go to `Create` then `Server`. Name it however you'd like then go to the `Connection` tab. There, add the following data:

- Host name/address: db
- Port: 5432
- Username: dev_user
- Password: dev_pass

Optionally check the `Save password` checkbox. Click `Save` and now you should be connected to the database.

## Migrations

### Running migrations

To run the migrations against your local database, firstly make sure all of the containers are started. After, run the following command in terminal:

```
    $ make migrate
```

Or with Docker:

```
    $ docker exec -it api yarn migrate
```

This will run all of the pending migrations against your local database.

### Generating migrations

If you have made some changes to the entities or added new ones, then you have to make sure that you generate new migrations for those entities. To do so, run the following command:

```
    $ make generate_migrations -n <migration_name>
```

Or with Docker:

```
    $ docker exec -it api yarn migrate:generate -n <migration_name>
```

This will run the script to generate the migrations directly in the container. Those changes will reflect in your local files so ___make sure you commit them___!

### Creating empty migration

If, for some reason, you need to create an empty migration, you can do so using the following command:

```
    $ make empty_migration -n <migration_name>
```

Or with Docker:

```
    $ docker exec -it api yarn migrate:empty -n <migration_name>
```
