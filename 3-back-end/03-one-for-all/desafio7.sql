CREATE VIEW perfil_artistas AS
SELECT teste.artista, t1.album_nome AS `album`, teste.seguidores 
FROM Albuns AS t1, (
SELECT t1.artista_id AS `id`, t1.artista_nome AS `artista`, COUNT(t2.artista_id) AS `seguidores` 
FROM Artistas AS t1, Seguidos AS t2
WHERE t1.artista_id = t2.artista_id
GROUP BY t2.artista_id
ORDER BY `seguidores` DESC
) AS teste
WHERE teste.id = t1.artista_id
ORDER BY `seguidores` DESC, `artista` ASC;