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
    },
    level: "EM",
    module: "1",
    class: "A"
  };
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Enrollment with duplicated student is not allowed'));
});

test("Should generate enrollment code", () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "422.228.220-09",
    },
    level: "EM",
    module: "1",
    class: "A"
  };
  const enrollment = enrollStudent.execute(enrollmentRequest);
  expect(enrollment.code).toBe('2021EM1A0001');
});

test("Should not enroll student below minimum age", () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "422.228.220-09",
      birthDate: "2020-03-12"
    },
    level: "EM",
    module: "1",
    class: "A"
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Student below minimum age"));
});

test("Should not enroll student over class capacity", () => {
  const enrollStudent = new EnrollStudent();
  enrollStudent.execute({
    student: {
      name: "Ana Maria",
      cpf: "422.228.220-09",
      birthDate: "2002-03-12"
    },
    level: "EM",
    module: "1",
    class: "A"
  });
  enrollStudent.execute({
    student: {
      name: "Joao Pedro",
      cpf: "831.351.100-10",
      birthDate: "2002-03-23"
    },
    level: "EM",
    module: "1",
    class: "A"
  });
  const enrollmentRequest = {
    student: {
      name: "Jose Carlos",
      cpf: "740.250.890-09",
      birthDate: "2001-06-18"
    },
    level: "EM",
    module: "1",
    class: "A"
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class is over capacity"));
});
