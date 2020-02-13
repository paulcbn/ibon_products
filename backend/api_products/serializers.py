from rest_framework import serializers

from api_products.models import MeasurementUnit, ProductType, Product, MeasurementType, NecessaryRawMaterial, \
    NecessaryProduct, RawMaterial, RawMaterialType


class MeasurementTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeasurementType
        fields = ['id', 'name']


class ListRetrieveMeasurementUnitSerializer(serializers.ModelSerializer):
    type = MeasurementTypeSerializer()

    class Meta:
        model = MeasurementUnit
        fields = ['id', 'name', 'type']


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = ['id', 'name']


class CreateProductSerializer(serializers.ModelSerializer):
    unit = serializers.PrimaryKeyRelatedField(queryset=MeasurementUnit.objects)
    types = serializers.PrimaryKeyRelatedField(many=True, queryset=ProductType.objects)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'unit', 'types', 'necessary_raw_materials', 'necessary_products']


class RawMaterialTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawMaterialType
        fields = ['id', 'name']


class ListRetrieveRawMaterialSerializer(serializers.ModelSerializer):
    unit = ListRetrieveMeasurementUnitSerializer()
    types = RawMaterialTypeSerializer(many=True)

    class Meta:
        model = RawMaterial
        fields = ['id', 'name', 'unit', 'types']


class ListProductSerializer(serializers.ModelSerializer):
    unit = ListRetrieveMeasurementUnitSerializer()
    types = ProductTypeSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'unit', 'types']


class ListRetrieveNecessaryRawMaterialSerializer(serializers.ModelSerializer):
    raw_material = ListRetrieveRawMaterialSerializer()

    class Meta:
        model = NecessaryRawMaterial
        fields = ['id', 'quantity', 'raw_material']


class ListRetrieveNecessaryProductSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    def get_product(self, obj):
        return RetrieveProductSerializer(obj.product).data

    class Meta:
        model = NecessaryProduct
        fields = ['id', 'quantity', 'product']


class RetrieveProductSerializer(serializers.ModelSerializer):
    unit = ListRetrieveMeasurementUnitSerializer()
    types = ProductTypeSerializer(many=True)
    necessary_raw_materials = ListRetrieveNecessaryRawMaterialSerializer(many=True)
    necessary_products = ListRetrieveNecessaryProductSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'unit', 'types', 'necessary_raw_materials', 'necessary_products']
