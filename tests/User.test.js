const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const userController = require("../controllers/usercontroller");

// Mock external dependencies
jest.mock("jsonwebtoken");
jest.mock("bcryptjs");
jest.mock("../models");

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("should register a new user successfully", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
        isAdmin: false,
      };
      const mockUser = { id: 1, ...req.body };

      User.create.mockResolvedValue(mockUser);
      bcrypt.hash.mockResolvedValue("hashedPassword");
      jwt.sign.mockReturnValue("mockedToken");

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User has been successfully registered!",
          user: expect.objectContaining(mockUser),
          sessionToken: "mockedToken",
        })
      );
    });

    it("should return 400 if email or password is missing", async () => {
      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Email and password are required");
    });

    it("should return 409 if email is already in use", async () => {
      req.body = { email: "existing@example.com", password: "password123" };
      User.findOne.mockResolvedValue({ id: 1, email: "existing@example.com" });

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email already in use",
      });
    });
  });

  describe("POST /login", () => {
    it("should log in a user successfully", async () => {
      req.body = { email: "test@example.com", password: "password123" };
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashedPassword",
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mockedToken");

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          loginUser: expect.objectContaining(mockUser),
          message: "User successfully logged in!",
          sessionToken: "mockedToken",
        })
      );
    });

    it("should return 401 for invalid credentials", async () => {
      req.body = { email: "test@example.com", password: "wrongpassword" };
      User.findOne.mockResolvedValue(null);

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Login failed" });
    });

    it("should return 400 if email or password is missing", async () => {
      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Email and password are required");
    });
  });
});
