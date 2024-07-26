const yup = require("yup");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");
const domain = require("../utilities/domain");

const registerSchema = yup.object().shape({
  userName: yup.string().min(3).max(30).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
});

let from = process.env.EMAIL_FROM;
TOKEN_VALID_MIN = 120;
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: from,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.getRegister = async (req, res, next) => {
  console.log("GET /auth/register");
  res.render("auth/register", {
    pageTitle: "Register",
    path: "/register",
    isAuthenticated: false,
  });
};

exports.postRegister = async (req, res, next) => {
  const { userName, email, password, confirmPassword } = req.body;
  console.log(userName, email, password, confirmPassword);

  try {
    //validate data
    await registerSchema.validate({
      userName,
      email,
      password,
    });
    if (password !== confirmPassword) {
      const error = new Error("Passwords do not match");
      error.statusCode = 422;
      throw error;
    }

    //check if admin already exists
    const admin = await Admin.findOne({ email });
    if (admin) {
      const error = new Error("This email already in use.");
      error.statusCode = 422;
      throw error;
    }
    const admin2 = await Admin.findOne({ userName });
    if (admin2) {
      const error = new Error("This user name already in use.");
      error.statusCode = 422;
      throw error
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //send confirmation email
    // const token = crypto.randomBytes(32).toString("hex");

    //create admin object
    const newAdmin = new Admin({
      userName,
      email,
      password: hashedPassword,
      // confirmToken: token,
      // confirmTokenExpiration: Date.now() + TOKEN_VALID_MIN * 60 * 1000,
    });

    // //send confirmation email
    // const info = await transporter.sendMail({
    //   from: `"kayan🛋️"`,
    //   to: email,
    //   subject: "تأكيد التسجيل ✔",
    //   text: "مرحباً بك!",
    //   html: `<h2>عزيزي ${userName}</h2>

    //   <p>من أجل التأكد من أنك قد قدمت عنوان بريد إلكتروني صحيح</p>
    //   <p>يرجى النقر على الرابط أدناه لتأكيد التسجيل: <a href='${domain(
    //     req
    //   )}/verify/${token}'> التحقق </a> </p>
    //   <p>إذا لم تقم بالتسجيل في منصتنا، يرجى تجاهل هذا البريد الإلكتروني.</p>
    //   <p>شكراً لتعاونك.</p>
    //   <p>مع خالص التحية،</p>
    //   <p>فريق العمل</p>
    //   `,
    // });
    // console.log("Message sent: %s", info.messageId);

    const result = await newAdmin.save();
    console.log(result);
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getLogin = async (req, res, next) => {
  const register = req.query.register;
  console.log("register:", register);
  console.log("loading login page");
  res.render("auth/login", {
    pageTitle: "login",
    path: "/login",
    isAuthenticated: false,
    register: register,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(process.env.JWT_SECRET);

  try {
    //check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      throw error;
    }

    //check password match
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    //create cookies
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    admin.authenticationToken = token;
    admin.authenticationTokenExpiration =
      Date.now() + 1000 * 60 * TOKEN_VALID_MIN;
    await admin.save();
    console.log(admin);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * TOKEN_VALID_MIN,
    });
    res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getForgetPassword = async (req, res, next) => {
  console.log("GET /auth/reset-password");
  res.render("auth/forget-password", {
    pageTitle: "Reset Password",
    isAuthenticated: false,
    path: "/reset-password",
  });
};

exports.postForgetPassword = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  try {
    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 422;
      throw error;
    }
    //check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      throw error;
    }

    //send confirmation email
    const token = crypto.randomBytes(32).toString("hex");

    //create admin object
    admin.resetToken = token;
    admin.resetTokenExpiration = Date.now() + TOKEN_VALID_MIN * 60 * 1000;

    //send confirmation email
    const info = await transporter.sendMail({
      from: `"kayan🛋️"`,
      to: email,
      subject: "إعادة تعيين كلمة المرور ✔",
      text: "مرحباً بك!",
      html: `<h2>عزيزي ${admin.userName}</h2>
       <p>لإعادة تعيين كلمة المرور الخاصة بك، يرجى النقر على الرابط أدناه: <a href='${domain(
         req
       )}/reset-password/${token}'> إعادة تعيين كلمة المرور </a> </p>
       <p>إذا لم تقم بطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد الإلكتروني.</p>
       <p>شكراً لتعاونك.</p>
       <p>مع خالص التحية،</p>
       <p>فريق العمل</p>
       `,
    });
    console.log("Message sent: %s", info.messageId);

    await admin.save();

    res.status(200).json({
      message: "Reset password link was sent successfully check your emails.",
    });
  } catch (error) {
    next(error);
  }
};

exports.getResetPassword = async (req, res, next) => {
  const token = req.params.token;
  try {
    const admin = await Admin.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!admin) {
      const error = new Error("Invalid token");
      error.statusCode = 401;
      throw error;
    }

    console.log("GET /auth/reset-password");
    res.render("auth/reset-password", {
      pageTitle: "Reset Password",
      isAuthenticated: false,
      path: "/reset-password",
      token,
      adminId: admin._id,
    });
  } catch (error) {
    next(error);
  }
};

exports.postResetPassword = async (req, res, next) => {
  const { adminId, token, password, confirmPassword } = req.body;
  try {
    //validate the date
    if (!adminId || !token || !password || !confirmPassword) {
      const error = new Error("All fields are required");
      error.statusCode = 422;
      throw error;
    }
    if (password !== confirmPassword) {
      const error = new Error("Passwords do not match");
      error.statusCode = 422;
      throw error;
    }

    //check if admin exists
    const admin = await Admin.findOne({
      _id: adminId,
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!admin) {
      const error = new Error("Invalid token");
      error.statusCode = 401;
      throw error;
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    admin.password = hashedPassword;
    admin.resetToken = undefined;
    admin.resetTokenExpiration = undefined;
    await admin.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

exports.postLogout = async (req, res, next) => {
  console.log("POST /auth/logout");
  res.clearCookie("token");
  res.redirect("/api/login");
};
