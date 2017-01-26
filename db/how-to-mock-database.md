# Log into mysql console, drop the 'escape' database, and create it again.
mysql -u root -p

drop database escape;
create database escape;
ctrl-d

# Force tables to be initialized
For the file 'escape-reality/db/models/index.js',
Uncomment 'sequelize.sync({force: true});' on line 63, 
then make line 64 a comment: 
sequelize.sync();

# Restart your node server

# Import multiple SQL statements into MySQL
Change into the directory 'escape-reality/db' and run this command:
mysql -u root -p escape < sql-to-mock-database.txt 

5)
Comment out the line in step 2 again and make sure this line is uncommented:
sequelize.sync();
