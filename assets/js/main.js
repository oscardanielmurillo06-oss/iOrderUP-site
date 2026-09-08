(function () {
  var CONFIG = window.IORDERUP_CONFIG || {};

  // Fill in plain text content from config, e.g. <span data-config="contactEmail"></span>
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var key = el.getAttribute("data-config");
    if (CONFIG[key] !== undefined) {
      el.textContent = CONFIG[key];
    }
  });

  // Build href links from config, e.g. <a data-config-href="mailto:contactEmail">
  document.querySelectorAll("[data-config-href]").forEach(function (el) {
    var spec = el.getAttribute("data-config-href").split(":");
    var scheme = spec[0];
    var key = spec[1];
    if (CONFIG[key] !== undefined) {
      el.setAttribute("href", scheme + ":" + CONFIG[key]);
    }
  });

  // Demo line: only render a tel: link once a real number is configured;
  // otherwise show the "coming soon" state and disable the link.
  document.querySelectorAll("[data-demo-phone]").forEach(function (el) {
    if (CONFIG.demoPhoneRaw) {
      el.textContent = CONFIG.demoPhoneDisplay;
      el.setAttribute("href", "tel:" + CONFIG.demoPhoneRaw);
      el.classList.remove("is-disabled");
    } else {
      el.textContent = CONFIG.demoPhoneDisplay || "Demo line — coming soon";
      el.removeAttribute("href");
      el.classList.add("is-disabled");
    }
  });

  // Demo request form. CONFIG.demoFormEndpoint is the single place to
  // connect this to a real inbox later (see config.js). Until it's set,
  // we never fake a successful submission — we just tell the visitor
  // how to reach us directly. Status text comes from i18n.js so it always
  // matches the visitor's selected language.
  var demoForm = document.getElementById("demo-form");
  if (demoForm) {
    var demoFormNote = document.getElementById("demo-form-note");
    var demoFormSubmit = demoForm.querySelector('button[type="submit"]');
    var email = CONFIG.contactEmail || "";
    var phone = CONFIG.contactPhoneDisplay || "";
    var t = function (key) {
      return window.IORDERUP_I18N ? window.IORDERUP_I18N.t(key) : "";
    };

    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!demoFormNote) return;

      if (!CONFIG.demoFormEndpoint) {
        demoFormNote.textContent =
          t("home.formStatus.notConnectedPrefix") + email +
          (phone ? t("home.formStatus.orCall") + phone : "") +
          t("home.formStatus.notConnectedSuffix");
        demoFormNote.classList.add("is-visible");
        return;
      }

      var formData = new FormData(demoForm);
      if (demoFormSubmit) demoFormSubmit.disabled = true;
      demoFormNote.textContent = t("home.formStatus.sending");
      demoFormNote.classList.add("is-visible");

      fetch(CONFIG.demoFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          demoFormNote.textContent = t("home.formStatus.success");
          demoForm.reset();
        })
        .catch(function () {
          demoFormNote.textContent =
            t("home.formStatus.errorPrefix") + email +
            (phone ? t("home.formStatus.orCall") + phone : "") +
            t("home.formStatus.errorSuffix");
        })
        .finally(function () {
          if (demoFormSubmit) demoFormSubmit.disabled = false;
        });
    });
  }

  // Mobile navigation toggle
  document.querySelectorAll(".nav-toggle").forEach(function (toggle) {
    var menu = toggle.parentElement.querySelector(".nav-links");
    if (!menu) return;
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  });
})();
