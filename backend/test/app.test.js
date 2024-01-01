const request = require("supertest");
const app = require("../app");

describe("POST /addtodo", () => {
  describe("given title,description and assignee", () => {
    const sample = {
      title: "Accelevent",
      description: "manage",
      assignee: "Shreyash",
    };
    test("should response with status code(200)", async () => {
      const response = await request(app).post("/addtodo").send(sample);
      expect(200);
    });
  });
  describe("titel,desc and assignee not present", () => {
    test("should response with status code(404)", async () => {
      const response = await request(app).post("/addtodo").send("");
      expect(404);
    });
  });
});

///

describe("GET todos", () => {
  describe("fetch seccuss", () => {
    test("should respond with SC(200)", async () => {
      const response = await request(app).get("todo/todos");
      expect(200);
    });
  });
});

///

describe("DELETE todo", () => {
  describe("delete fail", () => {
    test("shoulld delete by id", async () => {
      const response = await request(app).delete("delete-todo/sefew");
      expect(404);
    });
  });

  describe("delete seccuss", () => {
    test("shoulld delete by id", async () => {
      const response = await request(app).delete("delete-todo/:taskId");
      expect(200);
    });
  });
});

///

describe("PATCH todo", () => {
  describe("Edit fail", () => {
    test("shoulld edit by id", async () => {
      const response = await request(app).patch("/edit-todo/sdhuhuhj");
      console.log(response.body, "messssagggeeeeefvnsldiuvnweij");
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual("server error");
    });
  });

  describe("edit seccuss", () => {
    test("shoulld edit by id", async () => {
      const response = await request(app).patch("/edit-todo/:id");
      expect(200);
      expect(response.params).not.toEqual("undefined");
    });
  });
});

///
