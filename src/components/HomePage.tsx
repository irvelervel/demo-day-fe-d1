import { RouteComponentProps } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { User } from '../typings/User'
import StudentCard from './StudentCard'
import { isAdmin } from '../lib/helpers'

const HomePage = (routerProps: RouteComponentProps) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        let response = await fetch(process.env.REACT_APP_BE_URL + '/students' + (!isAdmin() ? '?approved=true' : ''), {
          credentials: 'include',
        })
        if (response.ok) {
          let data = await response.json()
          setUsers(data.students)
        } else {
          console.log('error')
        }
      } catch (error) {
        console.log('error')
      }
    }
    getUsers()
  }, [])

  return (
    <Container style={{ marginTop: '100px' }}>
      <Row>
        {users.map((user: User) => (
          <Col key={user._id} lg={6} className={!user.profilePic ? 'd-none student-column' : 'student-column'}>
            <StudentCard user={user} {...routerProps} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default HomePage
