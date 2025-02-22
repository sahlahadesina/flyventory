from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Supplier, Product, Asset, Identification, Employee, ProductQuantity

# Serialization allows the data to be translated into a format that can be transmitted

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    # supplier = SupplierSerializer()
    class Meta:
        model = Product
        fields = '__all__'

class AssetSerializer(serializers.ModelSerializer):
    # product = ProductSerializer()
    class Meta:
        model = Asset
        fields = '__all__'

class IdentificationSerializer(serializers.ModelSerializer):
    # asset = AssetSerializer()
    class Meta:
        model = Identification
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class QuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductQuantity
        fields = '__all__'
