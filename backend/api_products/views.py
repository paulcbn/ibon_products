from collections import OrderedDict

from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Product
from .serializers import CreateProductSerializer, RetrieveProductSerializer, ListProductSerializer


class MultiSerializerViewSetMixin(object):
    serializer_classes = {}

    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, super(MultiSerializerViewSetMixin, self).get_serializer_class())


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = 'page_size'
    max_page_size = 200

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('page_count', self.page.paginator.num_pages),
            ('count', self.page.paginator.count),
            ('page_size', self.page.paginator.per_page),
            ('current_page', self.page.number),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))


class ProductViewSet(MultiSerializerViewSetMixin, viewsets.ModelViewSet):
    queryset = Product.objects.order_by('name')
    serializer_class = CreateProductSerializer
    pagination_class = StandardResultsSetPagination
    serializer_classes = {
        'retrieve': RetrieveProductSerializer,
        'list': ListProductSerializer
    }

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'types__name', 'unit__name']
