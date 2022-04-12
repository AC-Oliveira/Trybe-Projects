db.produtos.updateMany({},
  { $push: 
    { tags: 
      { $each: ["combo", "tasty"], $sort: 1 },
    },
  });

db.produtos.find({}, { tags: 1, _id: 0, nome: 1 });
