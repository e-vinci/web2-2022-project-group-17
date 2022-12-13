import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import LeaderboardPage from '../Pages/LeaderboardPage';
import Logout from '../Logout/Logout';
import BestScoresPage from '../Pages/BestScoresPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/leaderboard': LeaderboardPage,
  '/bestScores': BestScoresPage,
  '/logout': Logout,
};

export default routes;
