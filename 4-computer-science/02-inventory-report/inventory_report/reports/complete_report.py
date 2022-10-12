from inventory_report.reports.simple_report import SimpleReport


class CompleteReport(SimpleReport):
    @classmethod
    def generate(cls, report):
        stock = super().companies_stock(cls, report)
        previous_report = super().generate(report)
        new_report = f"{previous_report}\nProdutos estocados por empresa: \n"

        for company in stock:
            new_report += f"- {company}: {stock[company]}\n"

        return new_report
