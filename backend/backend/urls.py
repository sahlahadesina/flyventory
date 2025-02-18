from django.contrib import admin
from django.urls import path, include
# from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path("api/user/register/", CreateUserView.as_view(),name="register"),
#     path("api/token", TokenObtainPairView.as_view(), name="get_token"),
#     path("api/token/refresh",TokenRefreshView.as_view(), name = "refresh"),
#     path("api-auth/", include("rest_framework.urls")),
# ]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import SupplierViewSet, ProductViewSet, AssetViewSet, IdentificationViewSet, EmployeeViewSet

router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet)
router.register(r'products', ProductViewSet)
router.register(r'assets', AssetViewSet)
router.register(r'identifications', IdentificationViewSet)
router.register(r'employees', EmployeeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # Exposes endpoints like /api/products/
]
