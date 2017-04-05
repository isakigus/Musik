class Paginator(object):
    page_size = 10

    def __init__(self, total_items, page):
        self.total = total_items
        self.page = int(page)

        self.pages = (self.total // self.page_size)

        if self.total % self.page_size != 0:
            self.pages += 1

        self.limit1 = (self.page - 1) * self.page_size
        self.limit2 = self.page * self.page_size

        self.next = self.page + 1 if self.page < self.pages else self.page
        self.prev = self.page - 1 if self.page > 1 else 1

        half_size = int(self.page_size / 2)

        self.pages_data = []

        if 0 < self.page <= self.pages:
            for i in range(self.page_size + 1):
                page_num = self.page - half_size + i
                if self.pages >= page_num > 0:
                    self.pages_data.append(page_num)
