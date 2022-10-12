from inventory_report.inventory.inventory_iterator import InventoryIterator
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


class InventoryRefactor:
    def __init__(self, class_to_compose) -> None:
        self.data = []
        self.importer = class_to_compose

    def __iter__(self):
        return InventoryIterator(self.data)

    def import_data(self, path, mode):
        new_data = self.importer.import_data(path)
        self.data = [*self.data, *new_data]
        if mode == 'simples' and self.data:
            report: str = SimpleReport.generate(self.data)
            return report

        if mode == 'completo' and self.data:
            report: str = CompleteReport.generate(self.data)
            return report
