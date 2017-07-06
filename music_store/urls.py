from django.conf.urls import url, include

from . import views
from . import views_sets

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'albumes', views_sets.AlbumViewSet)
router.register(r'artists', views_sets.ArtistViewSet)
router.register(r'customers', views_sets.CustomerViewSet)
router.register(r'employees', views_sets.EmployeeViewSet)
router.register(r'genres', views_sets.GenreViewSet)
router.register(r'invoices', views_sets.InvoiceSiewSet)
router.register(r'playlists', views_sets.PlaylistViewSet)
router.register(r'playlisttracks', views_sets.PlaylisttrackViewSet)
router.register(r'tracks', views_sets.TrackViewSet)
router.register(r'mediatype', views_sets.MediatypeViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^genres$', views.Genres.as_view()),
    url(r'^genre/(?P<genre_id>[0-9]+)/chart', views.GenreChart.as_view()),
    url(r'^genre/(?P<genre_id>[0-9]+)/table/(?P<page>\d+)$',
        views.GenreTable.as_view()),
]
