const request = require("supertest");
const app = require("../index");

describe("Student API", () => {
  let studentId;
  let token;

  test("Sign up a new student", async () => {
    const response = await request(app)
      .post("/students/signup")
      .send({
        firstName: "John",
        lastName: "Doe",
        age: 21,
        gender: "Male",
        email: "john.doe@example.com",
        phone: "1234567890",
        address: "123 Main St",
        academicDetails: { GPA: 3.5 },
        documents: ["doc1.pdf"],
        password: "StrongPassword123!",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("student");
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
  });

  test("Login a student", async () => {
    const response = await request(app).post("/students/login").send({
      email: "john.doe@example.com",
      password: "StrongPassword123!",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("student");
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
  });

  test("Get all students", async () => {
    const response = await request(app)
      .get("/students/")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Get student by ID", async () => {
    const response = await request(app)
      .get("/students/1234567890abcdef12345678") // Use a valid ID from your DB
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", "john.doe@example.com");
  });

  test("Update student by ID", async () => {
    const response = await request(app)
      .put("/students/1234567890abcdef12345678") // Use a valid ID
      .set("Authorization", `Bearer ${token}`)
      .send({ address: "456 Another St" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("address", "456 Another St");
  });

  test("Delete student by ID", async () => {
    const response = await request(app)
      .delete("/students/1234567890abcdef12345678") // Use a valid ID
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Student deleted successfully"
    );
  });
});
