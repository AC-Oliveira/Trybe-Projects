db.produtos.updateMany({}, { $set: { criadoPor: "Ronald McDonald" } });
db.produtos.find({}, { criadoPor: 1, _id: 0, nome: 1 });
