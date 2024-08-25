const request = require("supertest");
const app = require("../index");

describe("Authority API", () => {
  let token; // Variable to store authentication token

  test("Sign up a new authority", async () => {
    const response = await request(app).post("/authorities/signup").send({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "0987654321",
      role: "Reviewer",
      password: "StrongPassword123!",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("authority");
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
  });

  test("Login an authority", async () => {
    const response = await request(app).post("/authorities/login").send({
      email: "jane.smith@example.com",
      password: "StrongPassword123!",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("authority");
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
  });

  test("Get all authorities", async () => {
    const response = await request(app)
      .get("/authorities/")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Get authority by ID", async () => {
    // Use a valid authority ID from your database
    const response = await request(app)
      .get("/authorities/valid-authority-id")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", "jane.smith@example.com");
  });

  test("Update authority by ID", async () => {
    // Use a valid authority ID from your database
    const response = await request(app)
      .put("/authorities/valid-authority-id")
      .set("Authorization", `Bearer ${token}`)
      .send({ phone: "1112223333" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("phone", "1112223333");
  });

  test("Delete authority by ID", async () => {
    // Use a valid authority ID from your database
    const response = await request(app)
      .delete("/authorities/valid-authority-id")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Authority deleted successfully"
    );
  });

  test("Assign applications", async () => {
    const response = await request(app)
      .post("/authorities/valid-authority-id/assign-applications")
      .set("Authorization", `Bearer ${token}`)
      .send({ applicationIds: ["app1", "app2"] });

    expect(response.status).toBe(200);
    expect(response.body.assignedApplications).toContain("app1");
    expect(response.body.assignedApplications).toContain("app2");
  });

  test("Update application status", async () => {
    const response = await request(app)
      .post("/authorities/valid-authority-id/update-application-status")
      .set("Authorization", `Bearer ${token}`)
      .send({
        applicationId: "app1",
        status: "Approved",
        comments: "Good application",
      });

    expect(response.status).toBe(200);
    expect(response.body.actions).toContainEqual({
      applicationId: "app1",
      status: "Approved",
      comments: "Good application",
    });
  });
});
