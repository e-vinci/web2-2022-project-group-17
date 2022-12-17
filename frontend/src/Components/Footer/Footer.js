const Footer = () => {
  const footer = document.querySelector('footer');
  footer.innerHTML = `
  <div class="footer content p-3">
    <p>SPA créé par Nguyen Ngoc et Queguineur Tanguy</p>
    <p>Toutes les images utilisées sur le site sont libres pour un usage personnel</p>
  </div>
  `;
};

export default Footer;