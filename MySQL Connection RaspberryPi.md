# Connecting Raspberry Pi to a MySQL Database
## Prerequisites
- MySQL server installed and running (either locally or on a remote server)
- Access credentials to the MySQL database
- Required Python packages:
  - `mysql-connector-python` 

## Step 1: Install Required Python Packages
Install mariadb on raspberry pi - THIS IS DONE

Install `mysql-connector-python` - THIS IS DONE

then edit the server50-conf file inside etc/mysql/mariadb to set bind-address = 0.0.0.0 to allow connections from any ip - THIS IS DONE

# START FROM HERE!!!
then on my sql on laptop run this:

CREATE USER 'your_user'@'%' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON warehouse.* TO 'your_user'@'%' IDENTIFIED BY 'your_password';
FLUSH PRIVILEGES;

then on raspi terminal run: mysql -h <host ip> -u root -p

it will ask for ur pass of mysql so enter it and then if conneciton is succesful it logs u in 
once logged u can double check by doing:
SHOW DATABASES;
to see if ur db appears 

to exit this do EXIT;

then in the following code of barcode detection with AI camera:
import mysql.connector
def connect_db():
    return mysql.connector.connect(
        host="your_host_or_ip",  
        user="your_user",
        password="yourpassword",
        database="warehouse"
    )

update ur host with ur laptops ip and the password of ur mysql and the remaining info as well

