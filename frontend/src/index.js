import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './stylesheets/main.css';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import Navbar from './Components/Navbar/Navbar';
import Router from './Components/Router/Router';
import Footer from './Components/Footer/Footer';

Navbar();

Router();

Footer();