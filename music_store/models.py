from __future__ import unicode_literals

from django.db import models
from django.db import connection


class Album(models.Model):
    id = models.IntegerField(db_column='AlbumId', primary_key=True)
    title = models.TextField(db_column='Title')
    artist = models.ForeignKey('Artist',
                               db_column='ArtistId',
                               on_delete=models.CASCADE,
                               )

    class Meta:
        db_table = 'Album'


class ArtistManager(models.Manager):
    def avg_song_length_by_genre(self, genre_id):
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT a.Name, AVG(t.Milliseconds)
                FROM Album b, Artist a,Track t
                WHERE a.ArtistId = b.ArtistId
                AND t.AlbumId = b.AlbumId
                AND t.GenreId  = %s
                GROUP BY a.Name, t.GenreId
                ORDER BY a.Name DESC""" % genre_id)
            result_list = []
            for row in cursor.fetchall():
                result_list.append({'name': row[0], 'avg': row[1]})
        return result_list


class Artist(models.Model):
    id = models.IntegerField(db_column='ArtistId', primary_key=True)
    name = models.TextField(db_column='Name', blank=True, null=True)
    objects = ArtistManager()

    class Meta:
        db_table = 'Artist'


class Customer(models.Model):
    id = models.IntegerField(db_column='CustomerId', primary_key=True)
    firstname = models.TextField(db_column='FirstName')
    lastname = models.TextField(db_column='LastName')
    company = models.TextField(db_column='Company', blank=True, null=True)
    address = models.TextField(db_column='Address', blank=True, null=True)
    city = models.TextField(db_column='City', blank=True, null=True)
    state = models.TextField(db_column='State', blank=True, null=True)
    country = models.TextField(db_column='Country', blank=True, null=True)
    postalcode = models.TextField(db_column='PostalCode', blank=True, null=True)
    phone = models.TextField(db_column='Phone', blank=True, null=True)
    fax = models.TextField(db_column='Fax', blank=True, null=True)
    email = models.TextField(db_column='Email')

    employee = models.ForeignKey(
        'Employee',
        db_column='SupportRepId',
        on_delete=models.CASCADE,
    )

    class Meta:
        db_table = 'Customer'


class Employee(models.Model):
    id = models.IntegerField(db_column='EmployeeId', primary_key=True)
    lastname = models.TextField(db_column='LastName')
    firstname = models.TextField(db_column='FirstName')
    title = models.TextField(db_column='Title', blank=True, null=True)
    reportsto = models.IntegerField(db_column='ReportsTo', blank=True,
                                    null=True)
    birthdate = models.DateTimeField(db_column='BirthDate', blank=True,
                                     null=True)
    hiredate = models.DateTimeField(db_column='HireDate', blank=True, null=True)
    address = models.TextField(db_column='Address', blank=True, null=True)
    city = models.TextField(db_column='City', blank=True, null=True)
    state = models.TextField(db_column='State', blank=True, null=True)
    country = models.TextField(db_column='Country', blank=True, null=True)
    postalcode = models.TextField(db_column='PostalCode', blank=True, null=True)
    phone = models.TextField(db_column='Phone', blank=True, null=True)
    fax = models.TextField(db_column='Fax', blank=True, null=True)
    email = models.TextField(db_column='Email', blank=True, null=True)

    class Meta:
        db_table = 'Employee'


class Genre(models.Model):
    id = models.IntegerField(db_column='GenreId', primary_key=True)
    name = models.TextField(db_column='Name', blank=True, null=True)

    class Meta:
        db_table = 'Genre'


class Invoice(models.Model):
    id = models.IntegerField(db_column='InvoiceId', primary_key=True)

    customer = models.ForeignKey(
        'Customer',
        db_column='CustomerId',
        on_delete=models.CASCADE,
    )
    invoicedate = models.DateTimeField(
        db_column='InvoiceDate')
    billingaddress = models.TextField(db_column='BillingAddress', blank=True,
                                      null=True)
    billingcity = models.TextField(db_column='BillingCity', blank=True,
                                   null=True)
    billingstate = models.TextField(db_column='BillingState', blank=True,
                                    null=True)
    billingcountry = models.TextField(db_column='BillingCountry', blank=True,
                                      null=True)
    billingpostalcode = models.TextField(db_column='BillingPostalCode',
                                         blank=True,
                                         null=True)
    total = models.TextField(
        db_column='Total')

    class Meta:
        db_table = 'Invoice'


class Invoiceline(models.Model):
    id = models.IntegerField(db_column='InvoiceLineId', primary_key=True)

    invoice = models.ForeignKey('Invoice',
                                db_column='InvoiceId',
                                on_delete=models.CASCADE,
                                )

    track = models.ForeignKey('Track',
                              db_column='TrackId',
                              on_delete=models.CASCADE,
                              )

    unitprice = models.TextField(
        db_column='UnitPrice')
    quantity = models.IntegerField(
        db_column='Quantity')

    class Meta:
        db_table = 'InvoiceLine'


class Mediatype(models.Model):
    id = models.IntegerField(db_column='MediaTypeId', primary_key=True)
    name = models.TextField(db_column='Name', blank=True, null=True)

    class Meta:
        db_table = 'MediaType'


class Playlist(models.Model):
    id = models.IntegerField(db_column='PlaylistId', primary_key=True)
    name = models.TextField(db_column='Name', blank=True, null=True)

    class Meta:
        db_table = 'Playlist'


class Playlisttrack(models.Model):
    playlistid = models.IntegerField(db_column='PlaylistId', primary_key=True)
    trackid = models.IntegerField(db_column='TrackId', primary_key=True)

    class Meta:
        db_table = 'PlaylistTrack'
        unique_together = (
            ('playlistid', 'trackid'), ('playlistid', 'trackid'),)


class TrackManager(models.Manager):
    def genre_table(self, genre_id,):
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT  t.Name, a.Name, b.Title, t.Milliseconds
                FROM Album b, Artist a,Track t
                WHERE a.ArtistId = b.ArtistId
                AND t.AlbumId = b.AlbumId
                AND t.GenreId  = %s
                ORDER BY t.Name DESC""" % genre_id)
            result_list = []
            for row in cursor.fetchall():
                result_list.append({
                    'song': row[0],
                    'artist': row[1],
                    'album': row[2],
                    'ms': row[3]
                })
        return result_list


class Track(models.Model):
    id = models.IntegerField(db_column='TrackId', primary_key=True)
    name = models.TextField(
        db_column='Name')

    album = models.ForeignKey('Album',
                              db_column='AlbumId',
                              on_delete=models.CASCADE,
                              )

    mediatype = models.ForeignKey('Mediatype',
                                  db_column='MediaTypeId',
                                  on_delete=models.CASCADE,
                                  )

    genre = models.ForeignKey('Genre',
                              db_column='GenreId',
                              on_delete=models.CASCADE,
                              )

    composer = models.TextField(db_column='Composer', blank=True, null=True)

    milliseconds = models.IntegerField(db_column='Milliseconds')
    bytes = models.IntegerField(db_column='Bytes', blank=True, null=True)
    unitprice = models.TextField(db_column='UnitPrice')
    objects = TrackManager()

    class Meta:
        db_table = 'Track'
