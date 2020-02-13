from django.db import models


class MeasurementType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class MeasurementUnit(models.Model):
    name = models.CharField(max_length=100)
    type = models.ForeignKey(to=MeasurementType, on_delete=models.CASCADE, related_name='units')

    def __str__(self):
        return f'{self.type} ({self.name})'


class ProductType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    unit = models.ForeignKey(to=MeasurementUnit, on_delete=models.CASCADE, related_name='products')
    types = models.ManyToManyField(to=ProductType, related_name='products')

    def __str__(self):
        return f'{self.name} ({self.unit.name})'


class ProductFile(models.Model):
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE, related_name='product_files')
    file = models.FileField(upload_to="files/%Y/%m/%d")

    def __str__(self):
        return f'{self.product.name} - {self.file.name}'


class RawMaterialType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class RawMaterial(models.Model):
    name = models.CharField(max_length=100)
    unit = models.ForeignKey(to=MeasurementUnit, on_delete=models.CASCADE, related_name='raw_materials')
    types = models.ManyToManyField(to=RawMaterialType, related_name='raw_materials')

    def __str__(self):
        return f'{self.name} ({self.unit.name})'


class NecessaryRawMaterial(models.Model):
    quantity = models.FloatField()
    parent = models.ForeignKey(to=Product, on_delete=models.CASCADE, related_name='necessary_raw_materials')
    raw_material = models.ForeignKey(to=RawMaterial, on_delete=models.CASCADE, related_name='used_in')


class NecessaryProduct(models.Model):
    quantity = models.FloatField()
    parent = models.ForeignKey(to=Product, on_delete=models.CASCADE, related_name='necessary_products')
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE, related_name='used_in')
