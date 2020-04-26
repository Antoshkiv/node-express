document.querySelectorAll('.price').forEach((node) => {
  node.textContent = new Intl.NumberFormat('en-En', {
    currency: 'usd',
    style: 'currency',
  }).format(node.textContent);
});
