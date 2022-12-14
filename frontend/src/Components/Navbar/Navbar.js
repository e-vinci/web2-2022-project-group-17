// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import { renderImage } from '../../utils/render';
import logoImage from '../../img/logo.png';
import Navigate from '../Router/Navigate';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  renderNavbar();
  
};

function renderNavbar() {
  getAuthenticatedUser();
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const nonAuthenticatedUserNavbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid navbar-container">
          <a class="navbar-brand d-flex align-items-center" href="#" data-uri="/">
            <div class="logo ms-3 me-1"></div>
            ZOMBIE SURVIVORS
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav fs-5 me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link left-item ms-5 p-0" href="#" data-uri="/game">Jeu</a>
              </li>
              <li class="nav-item">
                <a class="nav-link left-item ms-5 p-0" href="#" data-uri="/leaderboard">Classement</a>
              </li>                        
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="btn btn-primary nav-link auth-btn px-3" href="#" data-uri="/login">Connexion</a>
              </li>   
              <li class="nav-item ms-3">
                <a class="btn btn-primary nav-link auth-btn me-3 px-3" href="#" data-uri="/register">S'enregistrer</a>
              </li>                         
            </ul>
          </div>
        </div>
      </nav>
  `;
  const authenticatedUserNavbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid navbar-container">
          
          <a class="navbar-brand d-flex align-items-center" href="#" data-uri="/">
            <div class="logo ms-3 me-1"></div>
            Zombie Survivors
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav fs-5 me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link left-item ms-5 p-0" href="#" data-uri="/game">Jeu</a>
              </li>
              <li class="nav-item">
                <a class="nav-link left-item ms-5 p-0" href="#" data-uri="/leaderboard">Classement</a>
              </li>     
              <li class="nav-item">
                <a class="nav-link left-item ms-5 p-0" href="#" data-uri="/bestScores">Mes meilleurs scores</a>
              </li>                    
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="btn btn-danger nav-link auth-btn me-3 px-3" href="#" data-uri="/logout">Logout</a>
              </li>                        
            </ul>
          </div>
        </div>
      </nav>
  `
  navbarWrapper.innerHTML = isAuthenticated() ? authenticatedUserNavbar : nonAuthenticatedUserNavbar;

  renderImage(logoImage,'logo-img-div', 40, '.logo');

  const logo = document.querySelector('.logo');
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    Navigate('/');
  })
}


export default Navbar;
