import csv
import json
import re
import xml.etree.ElementTree as ET
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


def inventory_xml(dataset):
    data = []

    for record in dataset:
        data.append({child.tag: child.text for child in record})

    return data


class Inventory:
    @classmethod
    def import_data(cls, path: str, method: str):
        data = cls.file_open(path)

        if method == 'simples' and data:
            report: str = SimpleReport.generate(data)
            return report

        if method == 'completo' and data:
            report: str = CompleteReport.generate(data)
            return report

    @classmethod
    def file_open(cls, path):
        match = re.findall("(\.[a-z]*)", path)[0]

        if match == '.csv':
            with open(path) as file:
                data = list(csv.DictReader(file))
            return data

        if match == '.json':
            file = open(path)
            data = json.load(file)
            return data

        if match == '.xml':
            tree = ET.parse(path)
            root = tree.getroot()
            data = inventory_xml(root)
            return data
