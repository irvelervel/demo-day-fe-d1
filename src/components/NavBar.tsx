import Container from 'react-bootstrap/esm/Container'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

const NavBar = ({ history }: RouteComponentProps) => (
  <Container>
    <div className="d-flex justify-content-between my-5">
      <Link to="/">
        <img src="/assets/strivelogo_03.png" className="strive-logo" height={50} alt="strive-logo" />
      </Link>
      {!localStorage.getItem('demoday_logged_in') && (
        <button className="login" onClick={() => history.push('/login')}>
          Login
        </button>
      )}
      {localStorage.getItem('demoday_logged_in') && (
        <button className="login" onClick={() => history.push('/profile/me')}>
          Profile
        </button>
      )}
    </div>
  </Container>
)

export default withRouter(NavBar)
