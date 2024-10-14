CREATE DATABASE ngscdb;
CREATE USER 'ngscuser'@'localhost' IDENTIFIED BY 'ngsc';
GRANT ALL PRIVILEGES ON ngscdb.* TO 'ngscuser'@'localhost';
FLUSH PRIVILEGES;
quit
mysql -u ngscuser -p
USE ngscdb

CREATE TABLE Sensor (
    sensor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Data (
    data_id INT PRIMARY KEY AUTO_INCREMENT,
    value DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20),
    sensor_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES Sensor(sensor_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
