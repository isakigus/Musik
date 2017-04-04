from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^genres$', views.Genres.as_view()),
    url(r'^genre/(?P<genre_id>[0-9]+)/chart', views.GenreChart.as_view()),
    url(r'^genre/(?P<genre_id>[0-9]+)/table/(?P<page>\d+)$',
        views.GenreTable.as_view()),
]
