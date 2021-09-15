const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const { User } = require('../../models');

// sign up
exports.signup = async (req, res) => {
    try {
      const { email, password } = req.body;
      let dataSignup = req.body;
  
      const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        npp: joi.string().required(),
        password: joi.string().min(8).required(),
      });

      const { error } = schema.validate(dataSignup);

    if (error) {
      return res.status(400).send({
        status: 400,
        message: error.details[0].message,
      });
    }
  
      const checkEmail = await User.findOne({
        where: {
          email,
        },
      });

      if (checkEmail) {
        return res.status(500).send({
          status: "failed",
          message: "Email Already Registered",
        });
      }
  
      const SALT = 10;
      const hashedPasword = await bcrypt.hash(password, SALT);
  
      const dataUser = await User.create({
        ...dataSignup,
        password: hashedPasword,
      });
  
      const token = jwt.sign(
        {
          id: dataUser.id,
        },
        process.env.SECRET_KEY
      );
  
      res.status(200).send({
        status: "Success",
        message: "Successfully registered",
        data: {
          name: dataUser.name,
          email: dataUser.email,
          npp: dataUser.npp,
          token,
        },
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).send({
        status: "failed",
        message: "internal server error",
      });
    }
  };
  
  
  //sign in
  exports.signin = async (req, res) => {
    try {
      const dataSignin = req.body;
      const { email, password } = dataSignin;
  
      const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
      });
  
      const { error } = loginSchema.validate(dataSignin);
  
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.details[0].message,
        });
      }
  
      let resultUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!resultUser) {
        return res.status(401).json({
          status: 401,
          message: `Email Or Password don't match`,
        });
      }

      const isValidPassword = bcrypt.compareSync(password, resultUser.password);
  
      if (!isValidPassword) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid Credentials',
        });
      }
      const token = jwt.sign(
        { 
            id: resultUser.id
        },
        process.env.SECRET_KEY,
      );
  
      res.status(200).json({
        status: 200,
        message: 'Successfully Login',
        data: {
          name: resultUser.name,
          email: resultUser.email,
          token,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  };
  