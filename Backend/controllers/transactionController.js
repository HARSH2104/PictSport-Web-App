const { where } = require("sequelize");
const db = require("../models/server");
const { use } = require("../routes/userRoutes");

const addTransaction = async (req, res) => {
  let transac = {
    quantity: req.body.quantity,
    registration_id: req.body.registration_id,
    itemName: req.body.itemName,
    userId: req.body.userId,
    itemId: req.body.itemId,
  };

  const insertInTrans = await db.transactions.create(transac);

  //updating item table

  const cnt = await db.products.findOne({
    where: {
      id: req.body.itemId,
    },
  });

  const newCnt = cnt.quantity - req.body.quantity;
  const updatedItems = await db.products.update(
    { quantity: newCnt },
    {
      where: {
        id: req.body.itemId,
      },
    }
  );

  // updating bookings table
  const alreadybooked = await db.bookings.findOne({
    where: {
      itemId: req.body.itemId,
      userId: req.body.userId,
    },
  });

  // console.log(alreadybooked);

  if (alreadybooked != null) {
    const newval = alreadybooked.quantity + req.body.quantity;
    const updateAlreadyBooked = await db.bookings.update(
      { quantity: newval },
      {
        where: {
          itemId: req.body.itemId,
          userId: req.body.userId,
        },
      }
    );
  } else {
    let bookingobj = {
      quantity: req.body.quantity,
      userId: req.body.userId,
      itemId: req.body.itemId,
    };

    const insertInBook = await db.bookings.create(bookingobj);
  }

  res.status(201).send({ msg: "booking done" });
};

const returnTransac = async (req, res) => {
  const itemId = req.body.itemId;
  const userId = req.body.userId;
  const quant = req.body.quantity;

  //add in transaction table
  let info = {
    quantity: quant,
    borrow_date: null,
    return_date: Date.now(),
    registration_id: req.body.registration_id,
    itemName: req.body.itemName,
    userId: req.body.userId,
    itemId: req.body.itemId,
  };
  const transacobj = await db.transactions.create(info);

  // console.log(req.body);
  //update items table
  const itemObj = await db.products.findOne({
    where: {
      id: itemId,
    },
  });

  const newCnt = itemObj.quantity + quant;
  const updatedTrans = await db.products.update(
    { quantity: newCnt },
    {
      where: {
        id: req.body.itemId,
      },
    }
  );

  // update bookings table
  const obj = await db.bookings.findOne({
    where: {
      userId: userId,
      itemId: itemId,
    },
  });

  const newcntbooked = obj.quantity - quant;
  if (newcntbooked == 0) {
    const delobj = await db.bookings.destroy({
      where: {
        userId: userId,
        itemId: itemId,
      },
    });
  } else {
    const updateobj = await db.bookings.update(
      { quantity: newcntbooked },
      {
        where: {
          itemId: itemId,
          userId: userId,
        },
      }
    );
  }

  res.status(200).send({ msg: "done transaction" });
};

const getAllTransByItemId = async (req, res) => {
  const itemId = req.params.id;
  const obj = await db.transactions.findAll({
    where: {
      itemId: itemId,
    },
    order: [["updatedAt"]],
  });

  res.status(200).send(obj);
};

const getAllTransByuserId = async (req, res) => {
  const userId = req.params.id;
  const obj = await db.transactions.findAll({
    where: {
      userId: userId,
    },
    order: [["updatedAt"]],
  });

  res.status(200).send(obj);
};

module.exports = {
  addTransaction,
  returnTransac,
  getAllTransByItemId,
  getAllTransByuserId,
};
