# Log into mysql console, drop the 'escape' database, and create it again.
mysql -u root -p

## While inside the mysql console:
drop database escape;
create database escape;
ctrl-d

# Import SQL commands into MySQL to create starting mock data
Change into the directory 'escape-reality/db' and run this command:
mysql -u root -p escape < sql-to-mock-database.txt 
