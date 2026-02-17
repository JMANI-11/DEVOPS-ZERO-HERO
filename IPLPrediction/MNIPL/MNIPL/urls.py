"""MNIPL URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, patterns, include
from django.contrib import admin
from django.contrib.auth import views as auth_views

from IMPLEMENTATION.views import MainView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
                       url(r'^admin/', admin.site.urls),
                       url(r'^play/$', MainView.as_view()),
                       url(r'^twomatchresult/$', 'IMPLEMENTATION.views.twomatchresult', name='twomatchresult'),
                       url(r'^singlematchresult/$', 'IMPLEMENTATION.views.singlematchresult', name='singlematchresult'),
                       url(r'^knowyourscore/$', 'IMPLEMENTATION.views.score', name='score'),
                       url(r'^$', auth_views.login, {'template_name': 'login.html'}, name='login'),
                       url(r'login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
                       url(r'^logout/$', auth_views.logout, {'template_name': 'logged_out.html'}, name='logout'),
                       url(r'^signup/$', 'IMPLEMENTATION.views.signup', name='signup'),
                       url(r'^leaderboard/$', 'IMPLEMENTATION.views.leaderboard', name='leaderboard'),
                       url('^', include('django.contrib.auth.urls')),
                       ) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)



