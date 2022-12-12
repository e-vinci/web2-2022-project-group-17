const clearPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = document.createElement('h4');
  pageTitle.innerText = title;
  main.appendChild(pageTitle);
};

const renderImage = (url, className, height, div) => {
  const image = document.createElement('img');
  image.className = className;
  image.src = url;
  image.height = height;
  const imageWrapper = document.querySelector(div);
  imageWrapper.append(image);
}

export { clearPage, renderPageTitle, renderImage };
