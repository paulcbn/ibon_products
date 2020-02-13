from django.contrib import admin

from .models import ProductFile, Product, NecessaryRawMaterial, NecessaryProduct, MeasurementUnit, RawMaterialType, \
    ProductType, RawMaterial, MeasurementType


class ProductFileInline(admin.TabularInline):
    model = ProductFile


class ProductNecessaryRawMaterialInline(admin.StackedInline):
    model = NecessaryRawMaterial
    fk_name = 'parent'


class ProductNecessaryProductInline(admin.TabularInline):
    model = NecessaryProduct
    fk_name = 'parent'


class ProductAdmin(admin.ModelAdmin):
    inlines = [
        ProductFileInline,
        ProductNecessaryProductInline,
        ProductNecessaryRawMaterialInline
    ]


admin.site.register(Product, ProductAdmin)


@admin.register(MeasurementUnit)
class MeasurementUnitAdmin(admin.ModelAdmin):
    pass


@admin.register(RawMaterialType)
class RawMaterialTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(RawMaterial)
class RawMaterialAdmin(admin.ModelAdmin):
    pass


@admin.register(NecessaryRawMaterial)
class NecessaryRawMaterialAdmin(admin.ModelAdmin):
    pass


@admin.register(NecessaryProduct)
class NecessaryProductAdmin(admin.ModelAdmin):
    pass


@admin.register(MeasurementType)
class MeasurementTypeAdmin(admin.ModelAdmin):
    pass
