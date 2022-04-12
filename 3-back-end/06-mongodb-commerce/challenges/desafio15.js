db.produtos.find({
  nome: { $regex: /Mc/i } },
  { nome: 1 }).count();
