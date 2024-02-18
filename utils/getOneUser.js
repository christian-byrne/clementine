export function getOneUser(allUserData, usernameGetArg) {
  return allUserData.find((user) => {
    return user.nameSystem &&
      usernameGetArg &&
      user.nameSystem ===
        usernameGetArg.replaceAll(/\s/g, "-").toLowerCase();
  });
}
