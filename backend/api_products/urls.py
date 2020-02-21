from rest_framework import routers

from api_products.views import ProductViewSet, NecessaryProductViewSet, NecessaryRawMaterialViewSet

router = routers.SimpleRouter()
router.register(r'products', ProductViewSet)
router.register(r'necessary-products', NecessaryProductViewSet)
router.register(r'necessary-raw-materials', NecessaryRawMaterialViewSet)
urlpatterns = router.urls
