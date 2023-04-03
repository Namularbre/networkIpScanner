<h1>Network IP Scanner</h1>

<h2>Description</h2>

Network IP scanner is a starting nodeJS project created to track the status of the server in a domestic network.

For the moment, it still in developpement, and it's not ready yet.

<h2>Dependency</h2>

You need a mariadb server to use it. I will maybe later try to make it available with MySQL, and MS SQL Server.
You also need NodeJS v16.17.1 or later

<h2>Installation</h2>

First, install dependencies by running "npm i" in a command prompt. You also need to create the db. I will make a script later that you can run.

You also need to create a .env file in the project folder, containing this fields :

# http config
HOST=the web server IP
PORT=80 (you can replace it by what you want)

# the network you want to scan
NETWORK=192.168.1. the network you want to scan, with the last number removed. (I will upgrade this later)

#db config
DB_HOST=ip of your db
DB_USER=the user of your db
DB_PASS=his password
DB_NAME=the name of your db

<h2>Running</h2>

Just run "node index" to launch the application.
