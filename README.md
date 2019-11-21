# Starting the project

## Prerequisites

In order to run this project in development mode, you first need Docker installed on your machine.

Having Make on your machine is not required, however it does simplify the process.

## Building the Docker images

To build the Docker images, run the following command in the terminal:

```
    $ make dev_images
```

If you do not have Make, you can run the docker-compose command directly:

```
    $ docker-compose -f docker-compose.dev.yml build
```

## Running the containers

After the build is complete then you can start the containers by running:

```
    $ make dev_start
```

Or directly with docker-compose:

```
    $ docker-compose -f docker-compose.dev.yml up
```

This will start the following containers:

 The API on port 8050
- The frontend management app on port 3000
- The database on port 35432
- The Postgres Admin on port 5050

For instructions on running/creating migrations and accessing the database through the admin panel check the README.md in the api folder.
