
import { Link } from 'react-router-dom';

function SideMenu() {
  return (
    <div className="bg-light vh-100 p-3" style={{ width: '250px' }}>
      <h4>Navigator</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/organizations">Organizations</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/articles">Articles</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/comments">Comments</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideMenu;