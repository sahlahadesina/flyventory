-- Creating the Database
CREATE DATABASE Warehouse

-- Creating the Tables

CREATE Table Supplier (
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierName VARCHAR(255) NOT NULL,
    ContactInfo VARCHAR(255) NOT NULL
);

CREATE Table Product (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
	SupplierID INT, 
    ProductName VARCHAR(255) NOT NULL,
    ProductCategory VARCHAR(255),
    ProductDescription TEXT,
    ProductPrice DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID) ON DELETE SET NULL
);

CREATE TABLE Asset (
    AssetID INT AUTO_INCREMENT PRIMARY KEY,
    ProductID INT NOT NULL, 
    AssetLocation VARCHAR(255) NOT NULL, 
    AssetCondition ENUM('Good', 'Damaged', 'Missing') NOT NULL DEFAULT 'Good',
    DateAdded DATE NOT NULL,
    AssetFound BOOLEAN DEFAULT FALSE, 
    AssetDispatched BOOLEAN DEFAULT FALSE, 
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID) ON DELETE CASCADE
);

CREATE Table Identification (
    ScanID INT AUTO_INCREMENT PRIMARY KEY,
    AssetID INT NOT NULL,
    IdentifierType ENUM('Barcode', 'QRCode') NOT NULL,
    IdentifierValue VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (AssetID) REFERENCES Asset(AssetID) ON DELETE CASCADE
);

CREATE Table Employee (
	Username VARCHAR(255) PRIMARY KEY,
    Password VARCHAR(255) NOT NULL, 
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Role ENUM('Manager', 'Worker', 'Drone Operator') NOT NULL 
);

-- Loading Data into the Database

INSERT INTO Supplier (SupplierName, ContactInfo) VALUES
('Precision Electronics Ltd.', 'support@precisionelec.com'),
('Tech Lab Supplies', 'sales@techlabsupplies.com'),
('Engineering Tools Co.', 'info@engtools.com');

INSERT INTO Product (SupplierID, ProductName, ProductCategory, ProductDescription, TotalQuantity, ProductPrice) VALUES
(1, 'Oscilloscope', 'Testing Equipment', '100MHz digital storage oscilloscope',  599.99),
(1, 'Function Generator', 'Testing Equipment', 'Arbitrary waveform function generator', 349.99),
(2, 'Soldering Station', 'Assembly Tools', 'Temperature-controlled soldering station', 129.99),
(2, 'Multimeter', 'Testing Equipment', 'True RMS digital multimeter with auto-ranging', 89.50),
(3, 'Power Supply', 'Power Equipment', 'Adjustable DC power supply (0-30V, 5A)', 199.99),
(3, 'Logic Analyzer', 'Testing Equipment', '16-channel USB logic analyzer for digital circuits', 249.99);

INSERT INTO Asset (ProductID, AssetLocation, AssetCondition, DateAdded, AssetFound, AssetDispatched) VALUES
(1, 'Shelf A', 'Good', '2024-02-01', TRUE, FALSE),
(2, 'Shelf B', 'Good', '2024-02-03', TRUE, TRUE),
(3, 'Shelf C', 'Damaged', '2024-02-05', FALSE, FALSE),
(4, 'Shelf A', 'Good', '2024-02-07', TRUE, FALSE),
(5, 'Shelf C', 'Missing', '2024-02-09', FALSE, FALSE),
(6, 'Shelf B', 'Good', '2024-02-11', TRUE, TRUE);

INSERT INTO employee (username, password, firstname, lastname, role) VALUES
('Aaminah_A', 'Aaminah23', 'Aaminah', 'Arif', 'Supervisor'),
('Sahlah_A', 'Sahlah45', 'Sahlah', 'Adesina', 'Worker'),
('Tasneem_A', 'Tasneem67', 'Tasneem', 'Ahmed', 'Worker'),
('Rahika_R', 'Rahika89', 'Rahika', 'Roza', 'Drone Operator');

INSERT INTO Identification (AssetID, IdentifierType, IdentifierValue) VALUES
(1, 'Barcode', 'OSC123456'),
(2, 'QRCode', 'FG789012'),
(3, 'Barcode', 'SDR345678'),
(4, 'QRCode', 'DMM901234'),
(5, 'Barcode', 'PSU567890'),
(6, 'QRCode', 'LGA432109');
