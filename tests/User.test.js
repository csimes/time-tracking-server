const { setupTestDatabase, teardownTestDatabase } = require("./setup");
const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

let sequelize;

beforeAll(async () => {
  sequelize = await setupTestDatabase();
});

afterAll(async () => {
  await teardownTestDatabase(sequelize);
});

// Mock the User model and other dependencies
jest.mock("../models");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/", require("../controllers/usercontroller"));

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("should register a new user successfully", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashedPassword",
        isAdmin: false,
      };

      User.create.mockResolvedValue(mockUser);
      bcrypt.hash.mockResolvedValue("hashedPassword");
      jwt.sign.mockReturnValue("mockedToken");

      const response = await request(app).post("/register").send({
        email: "TEST@example.com",
        password: "password123",
        isAdmin: false,
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        "User has been successfully registered!"
      );
      expect(response.body.user).toEqual(expect.objectContaining(mockUser));
      expect(response.body.sessionToken).toBe("mockedToken");

      expect(User.create).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "hashedPassword",
        isAdmin: false,
      });
    });

    it("should return 400 if email or password is missing", async () => {
      const response = await request(app).post("/register").send({});

      expect(response.status).toBe(400);
      expect(response.text).toBe("Email and password are required");
    });

    it("should return 409 if email is already in use", async () => {
      User.findOne.mockResolvedValue({ id: 1, email: "test@example.com" });

      const response = await request(app).post("/register").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("Email already in use");
    });
  });

  describe("POST /login", () => {
    it("should log in a user successfully", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashedPassword",
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mockedToken");

      const response = await request(app).post("/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User successfully logged in!");
      expect(response.body.loginUser).toEqual(
        expect.objectContaining(mockUser)
      );
      expect(response.body.sessionToken).toBe("mockedToken");
    });

    it("should return 401 for invalid credentials", async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app).post("/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Login failed");
    });

    it("should return 400 if email or password is missing", async () => {
      const response = await request(app).post("/login").send({});

      expect(response.status).toBe(400);
      expect(response.text).toBe("Email and password are required");
    });
  });
});
