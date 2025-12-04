
export function logout(navigateFn) {
  try {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
  } catch (e) {
    console.warn("logout: error clearing localStorage", e);
  }

  if (typeof navigateFn === "function") {
    navigateFn("/login");
  } else {
    window.location.replace("/login");
  }
}
