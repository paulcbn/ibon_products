from django.urls import include, path

urlpatterns = [
    path('auth/', include('api_auth.urls')),
    path('product-management/', include('api_products.urls')),
]
