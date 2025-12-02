// src/utils/logout.js
/**
 * logout - limpia credenciales y redirige al login.
 * Si pasas `navigateFn` (from react-router's useNavigate) lo usará,
 * si no, usará window.location.href como fallback.
 */
export function logout(navigateFn) {
  try {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
  } catch (e) {
    // no hacer nada si localStorage falla
    console.warn("logout: error clearing localStorage", e);
  }

  if (typeof navigateFn === "function") {
    navigateFn("/login");
  } else {
    // usar replace para no dejar la ruta anterior en el historial
    window.location.replace("/login");
  }
}
