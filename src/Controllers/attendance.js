const { User, Epresence} = require("../../models");

exports.getData = async (req, res) => {
    try {
      const allAbsen = await Epresence.findAll({
        where: {
          id_users: req.user.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "id"],
        },
      });
  
      res.status(200).send({
        status: "success",
        message: "Success get data",
        data: {
            id_users: allAbsen.id_users,
            name: allAbsen.name,
            waktu: allAbsen.waktu
        }
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).send({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  };

  
exports.addData = async (req, res) => {
  try {
    const epresenceData = req.body;

    const getIn = await Epresence.create({
      ...epresenceData,
      id_users: req.idUser,
      is_approve: false,
      waktu: new Date(),
    });

    let absenMasuk = await Epresence.findOne({
      where: {
        id: getIn.id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "id"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "user", "id_users", "id"],
      },
    });

    res.status(200).send({
      status: "success",
      message: "Succesfully",
      data: {
        type: absenMasuk.type,
        waktu:
          absenMasuk.waktu.toISOString().slice(0, 10) +
          " " +
          absenMasuk.waktu.toLocaleTimeString("en-US", {
            hour12: false,
          }),
      },
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.approveData = async (req, res) => {
    try {
      const { body } = req;
  
      const isUserValid = await User.findOne({
        where: {
          id: req.user.id
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });
  
      if (isUserValid.name === "Supervisor") {
        await Epresence.update(body, {
          where: {
            id: req.params.id,
          },
        });
  
        const dataApprove = await Epresence.findOne({
          where: {
            id: req.params.id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
        res.status(200).send({
          status: "success",
          message: "Data Approved",
          data: {
              type: dataApprove.type,
              is_approve: dataApprove.is_approve,
              waktu: dataApprove.waktu,
              id_users: dataApprove.id_users
          }
        });
      } else {
        res.status(403).send({
          status: "Failed",
          message: "Aprrove Failed",
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).send({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  };



