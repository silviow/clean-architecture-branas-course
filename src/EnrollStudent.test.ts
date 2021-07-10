import EnrollStudent from "./EnrollStudent";

test("Should not enroll without a valid student name", () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: "Ana",
    }
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Invalid name'));
});

test("Should not enroll without a valid student cpf", () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "213.345.654-10"
    }
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Invalid cpf'));
});

test("Should not enroll duplicate student", () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "422.228.220-09"
    }
  };
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Enrollment with duplicated student is not allowed'));
});
