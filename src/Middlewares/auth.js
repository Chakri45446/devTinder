const adminAuth = (req, res, next) => {
  console.log("Admin Auth is getting Checked");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Admin is not Authorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User Auth is getting Checked");
  const token = "xyzad";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("User is not Authorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
