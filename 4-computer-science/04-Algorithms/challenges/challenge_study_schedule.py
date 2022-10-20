def study_schedule(permanence_period, target_time):
    try:
        assert isinstance(target_time, int)
        counter = 0
        for period in permanence_period:
            assert isinstance(period[0], int)
            assert isinstance(period[1], int)
            study_schedule = list(range(period[0], period[1] + 1))
            if target_time in study_schedule:
                counter += 1
        return counter
    except AssertionError:
        return None
