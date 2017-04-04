from django.views import View
from django.http import JsonResponse
from music_store.models import Genre, Track, Artist


class Genres(View):
    def get(self, request):
        data = {genre.id: genre.name for genre in Genre.objects.all()}
        return JsonResponse(data)


class GenreChart(View):
    def get(self, request, genre_id):
        data = {'data': Artist.objects.avg_song_length_by_genre(genre_id)}
        return JsonResponse(data)


class GenreTable(View):
    def get(self, request, genre_id, page):
        tracks = Track.objects.genre_table(genre_id)
        total = len(tracks)
        page = int(page)
        page_size = 10
        pages = total // page_size

        l1 = (page - 1) * page_size
        l2 = page * page_size

        next = page + 1 if page < pages else page
        prev = page - 1 if page > 1 else 1

        left = page if page - page_size / 2 < 0 else page_size / 2
        right = pages - page if pages - page < page_size / 2 else page_size / 2

        data = [t for t in tracks][l1:l2]
        pages_data = [page - left + 1 + i for i in range(int(left))]
        pages_data += [page + 1 + i for i in range(int(right))]

        return JsonResponse(
            {'data': data,
             'pagination': {'page': page,
                            'pages': pages,
                            'page_data': pages_data,
                            'next': next,
                            'prev': prev}
             })
