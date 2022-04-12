CREATE VIEW top_3_artistas AS 
SELECT t2.artista_nome AS `artista`, COUNT(t1.artista_id) AS `seguidores` FROM Seguidos AS t1, Artistas AS t2
WHERE t1.artista_id = t2.artista_id
GROUP BY artista_nome
ORDER BY `seguidores` DESC, `artista`
LIMIT 3;