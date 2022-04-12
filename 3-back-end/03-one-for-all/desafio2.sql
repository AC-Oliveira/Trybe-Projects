CREATE VIEW estatisticas_musicais AS
SELECT COUNT(t1.musica_id) AS `cancoes`, COUNT(DISTINCT t2.artista_nome) AS `artistas`, COUNT(DISTINCT t3.album_id) AS `albuns`
FROM Musicas AS t1, Artistas AS t2, Albuns AS t3
WHERE t1.album_id = t3.album_id AND t2.artista_id = t3.artista_id;
