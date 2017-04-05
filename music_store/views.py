from django.views import View
from django.http import JsonResponse
from music_store.models import Genre, Track, Artist
from music_store.util import Paginator


class Genres(View):
    """ View class that return Json encoded list of music genres available"""
    def get(self, request):
        """ """
        data = {genre.id: genre.name for genre in Genre.objects.all()}
        return JsonResponse(data)


class GenreChart(View):
    def get(self, request, genre_id):
        data = {'data': Artist.objects.avg_song_length_by_genre(genre_id)}
        return JsonResponse(data)


class GenreTable(View):
    def get(self, request, genre_id, page):
        tracks = Track.objects.genre_table(genre_id)
        paginator = Paginator(len(tracks), page)

        return JsonResponse(
            {'data': [t for t in tracks][paginator.limit1:paginator.limit2],
             'pagination': {'page': paginator.page,
                            'pages': paginator.pages,
                            'page_data': paginator.pages_data,
                            'next': paginator.next,
                            'prev': paginator.prev}
             })
