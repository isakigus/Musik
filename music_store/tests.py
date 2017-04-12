from django.test import TestCase, Client
from music_store.util import Paginator
from music_store.models import Track, Artist

try:
    from unittest.mock import MagicMock
except ImportError:
    from mock import MagicMock

client = Client()


class TestModels(TestCase):
    def test_tracks_query(self):
        query_result = {'avg': 262851.6153846154, 'name': 'Velvet Revolver'}
        Track.objects.genre_table = MagicMock(return_value=query_result)
        Track.objects.genre_table(2)
        Track.objects.genre_table.assert_called_with(2)

    def test_avg_song_length_by_genre_query(self):
        query_result = {'avg': 262851.6153846154, 'name': 'Velvet Revolver'}
        Artist.objects.avg_song_length_by_genre = MagicMock(
            return_value=query_result)
        Artist.objects.avg_song_length_by_genre(1)
        Artist.objects.avg_song_length_by_genre.assert_called_with(1)


class TestViews(TestCase):
    def test_get_genres_list_response(self):
        response = self.client.get('/genres')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('application/json' in str(response._headers))

    def test_get_genre_chart_response(self):
        response = self.client.get('/genre/1/chart')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('application/json' in str(response._headers))

    def test_get_genre_table_response(self):
        response = self.client.get('/genre/1/table/2')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('application/json' in str(response._headers))

    def test_get_genres_list_response_redirect(self):
        response = self.client.get('/genres22/')
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/app/index.html')


class TestPaginator(TestCase):
    def test_pages_20_items(self):
        pag = Paginator(20, 1)

        self.assertEquals(pag.page, 1)
        self.assertEquals(pag.pages, 2)
        self.assertEquals(pag.limit1, 0)
        self.assertEquals(pag.limit2, 10)
        self.assertEquals(pag.pages_data, [1, 2])

    def test_pages_5_items(self):
        pag = Paginator(5, 1)

        self.assertEquals(pag.page, 1)
        self.assertEquals(pag.pages, 1)
        self.assertEquals(pag.limit1, 0)
        self.assertEquals(pag.limit2, 10)
        self.assertEquals(pag.pages_data, [1])

    def test_pages_501_items(self):
        pag = Paginator(501, 23)

        self.assertEquals(pag.page, 23)
        self.assertEquals(pag.pages, 51)
        self.assertEquals(pag.limit1, 220)
        self.assertEquals(pag.limit2, 230)
        self.assertEquals(pag.next, 24)
        self.assertEquals(pag.prev, 22)
        self.assertEquals(pag.pages_data,
                          [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28])

    def test_pages_last_item(self):
        pag = Paginator(501, 51)

        self.assertEquals(pag.page, 51)
        self.assertEquals(pag.pages, 51)
        self.assertEquals(pag.limit1, 500)
        self.assertEquals(pag.limit2, 510)
        self.assertEquals(pag.next, 51)
        self.assertEquals(pag.prev, 50)
        self.assertEquals(pag.pages_data, [46, 47, 48, 49, 50, 51])

    def test_pages_last_item_overflow(self):
        pag = Paginator(501, 55)

        self.assertEquals(pag.page, 55)
        self.assertEquals(pag.pages, 51)
        self.assertEquals(pag.limit1, 540)
        self.assertEquals(pag.limit2, 550)
        self.assertEquals(pag.next, 55)
        self.assertEquals(pag.prev, 54)
        self.assertEquals(pag.pages_data, [])

    def test_pages_first_item(self):
        pag = Paginator(501, 1)

        self.assertEquals(pag.page, 1)
        self.assertEquals(pag.pages, 51)
        self.assertEquals(pag.limit1, 0)
        self.assertEquals(pag.limit2, 10)
        self.assertEquals(pag.next, 2)
        self.assertEquals(pag.prev, 1)
        self.assertEquals(pag.pages_data, [1, 2, 3, 4, 5, 6])
