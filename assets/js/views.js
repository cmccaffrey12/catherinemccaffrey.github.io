(function () {
  const profile = document.getElementById("profile-card");
  const publications = document.getElementById("publications-card");

  if (!profile || !publications) {
    return;
  }

  function showPublications() {
    profile.classList.add("view-hidden");
    publications.classList.remove("view-hidden");
    document.title = "Publications | Catherine McCaffrey";
  }

  function showHome() {
    publications.classList.add("view-hidden");
    profile.classList.remove("view-hidden");
    document.title = "Catherine McCaffrey";
  }

  function sync() {
    if (window.location.hash === "#publications") {
      showPublications();
    } else {
      showHome();
    }
  }

  window.addEventListener("hashchange", sync);
  sync();
})();
