from . import models
from . import serializers
from rest_framework import viewsets


class AlbumViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows album to be viewed or edited.
    """
    queryset = models.Album.objects.all()
    serializer_class = serializers.AlbumSerializer


class ArtistViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows artist to be viewed or edited.
    """
    queryset = models.Artist.objects.all()
    serializer_class = serializers.ArtistSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Customer to be viewed or edited.
    """
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows employee to be viewed or edited.
    """
    queryset = models.Employee.objects.all()
    serializer_class = serializers.EmployeeSerializer


class GenreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows genre to be viewed or edited.
    """
    queryset = models.Genre.objects.all()
    serializer_class = serializers.GenreSerializer


class InvoiceSiewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows invoice to be viewed or edited.
    """
    queryset = models.Invoice.objects.all()
    serializer_class = serializers.InvoiceSerializer


class InvoicelineViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows invoice line to be viewed or edited.
    """
    queryset = models.Invoiceline.objects.all()
    serializer_class = serializers.InvoicelineSerializer


class MediatypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Mediatype to be viewed or edited.
    """
    queryset = models.Mediatype.objects.all()
    serializer_class = serializers.MediatypeSerializer


class PlaylistViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Playlist to be viewed or edited.
    """
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer


class PlaylisttrackViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Playlisttrack to be viewed or edited.
    """
    queryset = models.Playlisttrack.objects.all()
    serializer_class = serializers.PlaylisttrackSerializer


class TrackViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Track to be viewed or edited.
    """
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
