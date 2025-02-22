from django.db import models
from django.contrib.auth.models import User

from django.db import models

class Supplier(models.Model):
    SupplierID = models.AutoField(primary_key=True)
    SupplierName = models.CharField(max_length=255)
    ContactInfo = models.CharField(max_length=255)
    class Meta:
        db_table = "supplier"  

    def __str__(self):
        return self.SupplierName

class Product(models.Model):
    ProductID = models.AutoField(primary_key=True, db_column="ProductID")
    SupplierID = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True, blank=True, db_column="SupplierID")
    ProductName = models.CharField(max_length=255, db_column="ProductName")
    ProductCategory = models.CharField(max_length=255, null=True, blank=True)
    ProductDescription = models.TextField(null=True, blank=True)
    # TotalQuantity = models.IntegerField()
    ProductPrice = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        db_table = "product"  

    def __str__(self):
        return self.ProductName

class Asset(models.Model):
    AssetID = models.AutoField(primary_key=True, db_column="AssetID")
    ProductID = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True, db_column="ProductID")
    AssetLocation = models.CharField(max_length=255)
    AssetCondition = models.CharField(
        max_length=10, 
        choices=[('Good', 'Good'), ('Damaged', 'Damaged'), ('Missing', 'Missing')],
        default='Good'
    )
    DateAdded = models.DateField()
    AssetFound = models.BooleanField(default=False)
    AssetDispatched = models.BooleanField(default=False)
    
    class Meta:
        db_table = "asset"  

    def __str__(self):
        return f"{self.ProductID.ProductName} - {self.AssetLocation}"

class Identification(models.Model):
    ScanID = models.AutoField(primary_key=True)
    AssetID = models.ForeignKey(Asset, on_delete=models.CASCADE, null=True, blank=True, db_column="AssetID")
    IdentifierType = models.CharField(
        max_length=10, 
        choices=[('Barcode', 'Barcode'), ('QRCode', 'QRCode')]
    )
    IdentifierValue = models.CharField(max_length=255, unique=True)
    
    class Meta:
        db_table = "identification"  

    def __str__(self):
        return f"{self.IdentifierType}: {self.IdentifierValue}"

# Employee Table
class Employee(models.Model):
    Username = models.CharField(max_length=255, primary_key=True)  
    Password = models.CharField(max_length=255)  
    FirstName = models.CharField(max_length=255)
    LastName = models.CharField(max_length=255)
    Role = models.CharField(
        max_length=20,
        choices=[('Manager', 'Manager'), ('Worker', 'Worker'), ('Drone Operator', 'Drone Operator')]
    )

    class Meta:
        db_table = "employee"  

    def __str__(self):
        return f"{self.FirstName} {self.LastName} - {self.role}"

class ProductQuantity(models.Model):
    ProductID = models.IntegerField(primary_key=True)
    TotalQuantity = models.IntegerField()
    
    class Meta:
        managed = False
        db_table = "ProductQuantities"  


