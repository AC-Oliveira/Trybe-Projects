db.voos.find(
  {
    "aeroportoOrigem.sigla": "SBGR",
"aeroportoDestino.sigla": "KJFK",
    $or: [{ "empresa.nome": "AMERICAN AIRLINES" }, { "empresa.nome": "DELTA AIRLINES" }],
    }, { vooId: 1, _id: 0 },
).limit(1);