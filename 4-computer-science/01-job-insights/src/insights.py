from src.jobs import read


def get_unique_job_types(path):
    jobs_info: list = read(path)
    jobs_types: list = []
    for jobs in jobs_info:
        if jobs["job_type"] not in jobs_types:
            jobs_types.append(jobs["job_type"])
    return jobs_types


def filter_by_job_type(jobs: list, job_type: str) -> list:
    filtered_jobs: list = list(
        filter(lambda job_: job_["job_type"] == job_type, jobs)
    )
    return filtered_jobs


def get_unique_industries(path):
    industries: list = []
    jobs_info: list = read(path)
    for data in jobs_info:
        if data["industry"] not in industries and len(data["industry"]) != 0:
            industries.append(data["industry"])
    return industries


def filter_by_industry(jobs: list, industry: str) -> list:
    filtered_jobs: list = []
    for job_ in jobs:
        if job_["industry"] == industry:
            filtered_jobs.append(job_)
    return filtered_jobs


def get_max_salary(path: str) -> int:
    salary_list: list = []
    jobs_data: list = read(path)
    for data in jobs_data:
        if data["max_salary"].isnumeric():
            salary_list.append(int(data["max_salary"]))
    salary_list.sort(reverse=True)
    return salary_list[0]


def get_min_salary(path: str) -> int:
    salary_list: list = []
    jobs_info: list = read(path)
    for data in jobs_info:
        if data["min_salary"].isnumeric():
            salary_list.append(int(data["min_salary"]))
    salary_list.sort()
    return salary_list[0]


def matches_salary_range(job: dict, salary: int) -> bool:
    min_ = "min_salary"
    max_ = "max_salary"

    if(job.get(min_) is None or job.get(max_) is None):
        raise(
            ValueError('job["min_salary"] or job["max_salary"] doesn"t exists')
        )

    if(
        not isinstance(job["min_salary"], int)
            or
            not isinstance(job["max_salary"], int)
    ):
        raise(
            ValueError(
                'job["min_salary"] or job["max_salary"] aren"t valid integers'
                )
        )

    if(job["min_salary"] > job["max_salary"]):
        raise(
            ValueError('job["min_salary"] is greather than job["max_salary"]')
        )

    if(not isinstance(salary, int)):
        raise(ValueError("`salary` isn't a valid integer"))

    in_range = (
        True if job["min_salary"] <= salary <= job["max_salary"] else False
    )
    return in_range


def filter_by_salary_range_aux(job: dict, salary: int) -> bool:  # type: ignore
    try:
        in_range = matches_salary_range(job, salary)
        return in_range
    except ValueError:
        pass


def filter_by_salary_range(jobs: list, salary: int) -> list:
    filtered_jobs = list(
        filter(lambda job_: filter_by_salary_range_aux(job_, salary), jobs)
    )

    return filtered_jobs
