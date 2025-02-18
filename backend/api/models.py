from django.db import models
from django.contrib.auth.models import User

from django.db import models

class Supplier(models.Model):
    supplier_name = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)

    def __str__(self):
        return self.supplier_name

class Product(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True, blank=True)
    product_name = models.CharField(max_length=255)
    product_category = models.CharField(max_length=255, null=True, blank=True)
    product_description = models.TextField(null=True, blank=True)
    total_quantity = models.IntegerField()
    product_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.product_name

class Asset(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    asset_location = models.CharField(max_length=255)
    asset_condition = models.CharField(
        max_length=10, 
        choices=[('Good', 'Good'), ('Damaged', 'Damaged'), ('Missing', 'Missing')],
        default='Good'
    )
    date_added = models.DateField()
    asset_found = models.BooleanField(default=False)
    asset_dispatched = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.product.product_name} - {self.asset_location}"

class Identification(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    identifier_type = models.CharField(
        max_length=10, 
        choices=[('Barcode', 'Barcode'), ('QRCode', 'QRCode')]
    )
    identifier_value = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.identifier_type}: {self.identifier_value}"

# Employee Table
class Employee(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)  # Ideally, use Django's User model for authentication
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    role = models.CharField(
        max_length=20,
        choices=[('Manager', 'Manager'), ('Worker', 'Worker'), ('Drone Operator', 'Drone Operator')]
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.role}"
