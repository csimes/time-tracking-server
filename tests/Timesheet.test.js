const request = require("supertest");
const express = require("express");
const timesheetController = require("./timesheetcontroller");
const { Timesheet } = require("../models");

jest.mock("../models", () => ({
  Timesheet: {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use("/timesheet", timesheetController);

describe("Timesheet Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
});
