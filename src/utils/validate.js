export const checkValidData = (email, password) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );

  if (!isEmailValid) return "Invalid email format.";
  if (!isPasswordValid)
    return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";

  return null;
};

export default checkValidData;
