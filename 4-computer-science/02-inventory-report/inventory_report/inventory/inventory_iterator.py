class InventoryIterator:
    def __init__(self, data=[]) -> None:
        self.iter_data = iter(data)

    def __iter__(self, new_data):
        self.iter_data = iter(new_data)
        return self.iter_data

    def __next__(self):
        return next(self.iter_data)
