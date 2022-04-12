CREATE VIEW historico_reproducao_usuarios AS
SELECT t1.usuario, t2.musica_nome AS `nome` FROM Usuarios AS t1, Musicas AS t2, Historico AS t3
WHERE t1.usuario_id = t3.usuario_id AND t2.musica_id = t3.musica_id
ORDER BY `usuario`, `nome`;
