const db = require("../models/server");

const getAllBookings = async (req, res) => {
  const bookings = await db.bookings.findAll({
    include: [
      {
        model: db.user,
        attributes: ["name", "email", "registration_id"], // Specify user attributes you want to retrieve
      },
      {
        model: db.products,
        attributes: ["name"], // Specify item attributes you want to retrieve
      },
    ],
  });

  res.send(bookings);
};

module.exports = {
  getAllBookings,
};
