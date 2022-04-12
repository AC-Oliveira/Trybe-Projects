from src.sorting import sort_by

max_salary_test = [
    {"max_salary": 15, },
    {"max_salary": 10, },
    {"max_salary": 10, },
    {"max_salary": 20, },
    {"max_salary": 100, },
]


def test_sort_by_criteria():
    sort_by(max_salary_test, "max_salary")
    assert max_salary_test[0]["max_salary"] == 100
