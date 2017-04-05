from django.test import TestCase
from music_store.util import Paginator


# Create your tests here.
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

        print(pag.pages_data)

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
