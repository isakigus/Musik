from rest_framework import serializers
from . import models


class AlbumSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Album
        fields = '__all__'


class ArtistSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Artist
        fields = '__all__'


class CustomerSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Customer
        fields = '__all__'


class EmployeeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Employee
        fields = '__all__'


class GenreSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Genre
        fields = '__all__'


class InvoiceSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Invoice
        fields = '__all__'


class InvoicelineSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Invoiceline
        fields = '__all__'


class MediatypeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Mediatype
        fields = '__all__'


class PlaylistSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Playlist
        fields = '__all__'


class PlaylisttrackSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Playlisttrack
        fields = '__all__'


class TrackSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Track
        fields = '__all__'
