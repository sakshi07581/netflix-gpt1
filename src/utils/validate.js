export const validateData = (email, password) => {
  const isEmailValidate = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValidate =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
      password
    );

    if(!isEmailValidate) return "Email is not valid"
    if(!isPasswordValidate) return "Password is not valid"

    return null
};
