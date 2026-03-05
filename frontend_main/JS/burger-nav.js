document.addEventListener('DOMContentLoaded', () => {
  const hamb = document.querySelector("#hamb");
  const popup = document.querySelector("#popup");
  const body = document.body;
  const background = document.querySelector(".body__back");

  hamb.addEventListener("click", hambHandler);

  function hambHandler(e) {
    e.preventDefault();
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    body.classList.toggle("noscroll");
    background.classList.toggle("be");
    renderPopup();
  };

  function renderPopup() {
    popup.appendChild(menu);
  };

  const links = Array.from(menu.children);

  links.forEach((link) => {
    link.addEventListener("click", closeOnClick);
  });

  function closeOnClick() {
    popup.classList.remove("open");
    hamb.classList.remove("active");
    body.classList.remove("noscroll");
  };

  background.addEventListener("click", closeOnBack);

  function closeOnBack() {
    popup.classList.remove("open");
    hamb.classList.remove("active");
    body.classList.remove("noscroll");
    background.classList.remove("be");
  };
});
