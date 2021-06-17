import { User } from '../typings/User'
import Card from 'react-bootstrap/Card'

interface StudentCardProps {
  user: User
}

const StudentCard = ({ user }: StudentCardProps) => (
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
            {user.availableToRelocation ? (
              <button className="hired" disabled={true}>
                ✔ Hired
              </button>
            ) : (
              <button className="contact">Connect</button>
            )}
          </>
        </div>
      </Card.Text>
    </Card.Body>
  </Card>
)

export default StudentCard
