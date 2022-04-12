SELECT UPPER(CONCAT_WS(' ', t2.FIRST_NAME, t2.LAST_NAME)) AS `Nome completo`,
t1.START_DATE AS `Data de início`,
t2.SALARY AS `Salário`
FROM hr.job_history AS t1
JOIN hr.employees AS t2
ON t1.EMPLOYEE_ID = t2.EMPLOYEE_ID
WHERE MONTH(t1.START_DATE) BETWEEN 1 AND 3
ORDER BY `Nome completo` ASC, `Data de início` ASC;
