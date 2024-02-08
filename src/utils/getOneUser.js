export function getOneUser(allUserData, usernameGetArg) {
  return allUserData["members"].find((user) => {
    return user.name &&
      usernameGetArg &&
      user.name.replaceAll(" ", "-").toLowerCase() ===
        usernameGetArg.replaceAll(" ", "-").toLowerCase();
  });
}
