import { User } from '../typings/User'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { isAdmin, isCompany } from '../lib/helpers'
import { RouteComponentProps } from 'react-router-dom'
import { ifError } from 'assert'

interface StudentCardProps extends RouteComponentProps {
  user: User
}

const StudentCard = ({ user, history }: StudentCardProps) => {
  // PUT
  // /students/:id/approve

  // { approved: true }
  // { approved: false }

  const approveUser = async (value: boolean) => {
    try {
      let response = await fetch(process.env.REACT_APP_BE_URL + '/students/' + user._id + '/approve', {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({ approved: value }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        alert('ok!')
      } else {
        alert('not ok!')
      }
    } catch (error) {
      alert('not ok!')
      console.log(ifError)
    }
  }

  return (
    <Card className="student-card">
      <img src={user.profilePic as string} alt="user-avatar" className="profile-image" />
      <Card.Body>
        <Card.Title>
          <div className="name">{user.firstName?.toUpperCase()}</div>
          <div className="role">{user.desiredPosition || 'Web Developer'}</div>
          <div className="location">
            {user.located}
            {user.availableToRelocation && <>{'// relocation: ' + user.availableToRelocation}</>}
          </div>
        </Card.Title>
        <Card.Text as="div">
          <div className="text">{user.oneLiner}</div>
          <div className="links">
            <>
              <div>
                {user.linkedinURL && (
                  <a href={user.linkedinURL} target="_blank" rel="noreferrer">
                    <img src="assets/linkedin_icon.png" alt="linkedin logo" />
                  </a>
                )}
                {user.portfolioURL && (
                  <a href={user.portfolioURL} target="_blank" rel="noreferrer">
                    <img
                      src="/assets/resume.png"
                      style={{
                        background: '#01ff84',
                        borderRadius: '50%',
                      }}
                      alt="resume logo"
                    />
                  </a>
                )}
                {user.githubURL && (
                  <a href={user.githubURL} target="_blank" rel="noreferrer">
                    <img
                      style={{
                        background: '#01ff84',
                        borderRadius: '50%',
                      }}
                      src="/assets/github.png"
                      alt="github logo"
                    />
                  </a>
                )}
                {user.capstoneURL && (
                  <a href={user.capstoneURL} target="_blank" rel="noreferrer">
                    <img src="/assets/portfolio_icon.png" alt="portfolio logo" />
                  </a>
                )}
                {user.youtubeURL && (
                  <a href={user.youtubeURL} target="_blank" rel="noreferrer">
                    <img src="/assets/play02.png" alt="video" />
                  </a>
                )}
              </div>
              {isCompany() && <button className="contact">Connect</button>}
            </>
          </div>
          {isAdmin() && (
            <div className="d-flex justify-content-between mt-4">
              <div>
                <Button variant={user.approved ? 'success' : 'light'} onClick={() => approveUser(true)}>
                  <span>✅</span>
                </Button>
                <Button variant={!user.approved ? 'danger' : 'light'} onClick={() => approveUser(false)}>
                  <span>❌</span>
                </Button>
              </div>
              <div>
                <Button variant="success" onClick={() => history.push('/profile/' + user._id)}>
                  EDIT PROFILE
                </Button>
              </div>
            </div>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default StudentCard
