CREATE VIEW faturamento_atual AS 
SELECT MIN(t1.preço) AS `faturamento_minimo`, MAX(t1.preço) AS `faturamento_maximo`,
ROUND(SUM(t2.total) / COUNT(t2.usuario_id), 2) AS `faturamento_medio`,
SUM(t2.total) AS `faturamento_total`
FROM Planos AS t1, (
	SELECT t1.plano_id, t2.preço AS `total`, t1.usuario_id
	FROM Usuarios AS t1, Planos AS t2
	WHERE t1.plano_id = t2.plano_id
) AS t2
WHERE t1.plano_id = t2.plano_id;