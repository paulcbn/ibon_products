from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

from .models import Product
from .serializers import CreateProductSerializer, RetrieveProductSerializer, ListProductSerializer


class MultiSerializerViewSetMixin(object):
    serializer_classes = {}

    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, super(MultiSerializerViewSetMixin, self).get_serializer_class())


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class ProductViewSet(MultiSerializerViewSetMixin, viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = CreateProductSerializer
    pagination_class = StandardResultsSetPagination
    serializer_classes = {
        'retrieve': RetrieveProductSerializer,
        'list': ListProductSerializer
    }
    permission_classes = [AllowAny]
