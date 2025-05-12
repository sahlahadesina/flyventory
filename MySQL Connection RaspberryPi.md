# Connecting Raspberry Pi to a MySQL Database
## Prerequisites
- MySQL server installed and running (either locally or on a remote server)
- Access credentials to the MySQL database
- Required Python packages:
  - `mysql-connector-python` 

## Step 1: Install Required Python Packages
Install mariadb on raspberry pi 

Install `mysql-connector-python` 

then edit the server50-conf file inside etc/mysql/mariadb to set bind-address = 0.0.0.0 to allow connections from any ip

then on my sql on laptop run this
CREATE USER 'your_user'@'%' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON your_database.* TO 'your_user'@'%' IDENTIFIED BY 'your_password';
FLUSH PRIVILEGES;

then on raspi terminal run: mysql -h <host ip> -u root -p
it will ask for ur pass and then if conneciton is succesful it logs u in 
once logged u can double check by doing 
SHOW DATABASES;
to see if ur db appears
to exit this do EXIT;

then in the code update ur host with ur laptops ip and the remaining info as well
import mysql.connector

def connect_db():
    return mysql.connector.connect(
        host="your_host_or_ip",  # Use "localhost" if local
        user="raspiuser",
        password="yourpassword",
        database="inventory"
    )
