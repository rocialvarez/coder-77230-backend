const socket = io();

const list = document.getElementById("productsList");
const form = document.getElementById("productForm");

socket.on("products", (products) => {
  list.innerHTML = "";
  products.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.title} - ${p.price}
      <button onclick="deleteProduct('${p.id}')">X</button>
    `;
    list.appendChild(li);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    title: form.title.value,
    price: form.price.value
  };

  socket.emit("addProduct", data);
  form.reset();
});

function deleteProduct(id) {
  if (!id) {
    console.error("Error: Producto sin id.");
    return;
  }
  socket.emit("deleteProduct", id);
}

