/* =====================================================
   FAVORITOS DESDE LA TIENDA
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const normalizeId = value => "product-" + String(value || "")
    .toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

  const read = () => JSON.parse(localStorage.getItem("petcareFavorites") || "[]");
  const save = list => localStorage.setItem("petcareFavorites", JSON.stringify(list));

  document.querySelectorAll("[data-favorite-toggle]").forEach(button => {
    const card = button.closest(".product-card");
    if (!card) return;
    const id = card.dataset.id || normalizeId(card.querySelector(".product-title")?.textContent);
    button.dataset.favoriteId = id;

    const sync = () => {
      const exists = read().some(item => item.id === id);
      button.classList.toggle("active", exists);
      button.innerHTML = exists
        ? '<i class="fa-solid fa-heart" aria-hidden="true"></i>'
        : '<i class="fa-regular fa-heart" aria-hidden="true"></i>';
      button.title = exists ? "Quitar de favoritos" : "Agregar a favoritos";
      button.setAttribute("aria-label", button.title);
    };

    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      let list = read();
      const index = list.findIndex(item => item.id === id);

      if (index >= 0) {
        list.splice(index, 1);
      } else {
        const title = card.querySelector(".product-title")?.textContent.trim() || "Producto";
        const price = parseFloat((card.querySelector(".product-price")?.textContent || "0").replace(/[^0-9.]/g,"")) || 0;
        const image = card.querySelector("img.product-img")?.getAttribute("src") || "";
        const category = card.querySelector("img.product-img")?.dataset.category || "Productos";
        list.push({ id, name:title, title, category, description:"Producto PetCare", price, image, img:image, rating:5, reviews:0 });
      }

      save(list);
      sync();
    });

    sync();
  });
});
