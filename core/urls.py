from django.conf.urls import url
from .views import UserProfileView, RegisterView
from django.contrib.auth.views import login, logout, LoginView, LogoutView
from django.contrib.auth.decorators import login_required
from application.settings import LOGIN_URL
# from django.contrib.auth.forms import AuthenticationForm


urlpatterns = [
    # url(r'^social/myauth/$', VkView.as_view(), name='vkauth'),
    url(r'^login/$', LoginView.as_view(template_name='core/login.html'), name='login'),
    url(r'^logout/$', login_required(LogoutView.as_view()), name='logout'),
    url(r'^registration/$', RegisterView.as_view(), name='registration'),
    url(r'^profile/$', UserProfileView.as_view(), name='profile'),
]