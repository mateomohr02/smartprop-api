const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const {
  registerUser,
  loginUser,
  authenticateToken,
} = require("../services/auth/auth.service");

// Controlador para /signup
const signUp = catchAsync(async (req, res, next) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: "success",
    message: "User registered successfully.",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Controlador para /login
const login = catchAsync(async (req, res, next) => {
  const tenant = req.tenant;

  if (!tenant.active) {
    throw new AppError("Client deactivated. Please contact sales.", 403);
  }

  const { token } = await loginUser(req.body, tenant.id);

  res.status(200).json({
    status: "success",
    data: { token },
  });
});

// Middleware para verificar JWT y asignar req.user
const authentication = catchAsync(async (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  const user = await authenticateToken(token);
  req.user = user;
  next();
});

// Middleware para limitar acceso por tipo de usuario
const restrictTo = (...userTypes) => {
  return (req, res, next) => {
    if (!userTypes.includes(req.user.userType)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }
    next();
  };
};

module.exports = {
  signUp,
  login,
  authentication,
  restrictTo,
};
