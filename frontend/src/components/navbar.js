import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userId")
    navigate('/auth')
  }

  return (
    <div className="navbar">
      <Link className="navlink" to={'/'}>Home</Link>
      <Link className="navlink" to={'/create-recipe'}>Create Recipe</Link>
      <Link className="navlink" to={'/saved-recipes'}>Saved Recipes</Link>
      {!cookies.access_token ? (
        <Link className="navlink" to={'/auth'}>Login or Register</Link>
      ) : (
        <button className="logout" onClick={logout}>Log Out</button>
      )}
    </div>
  )
}