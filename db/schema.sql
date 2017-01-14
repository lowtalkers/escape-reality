USE escape;

CREATE TABLE users (
	id integer(11) PRIMARY KEY AUTO_INCREMENT,
	email varchar(255),
	password varchar(255),
	profilePic varchar(255),
	firstName varchar(255),
	lastName varchar(255),
	lobbyPic varchar(255),
	createdAt dateTime,
	updatedAt dateTime
);
