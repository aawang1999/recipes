import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="navlink" to={'/'}>Home</Link>
      <Link className="navlink" to={'/create-recipe'}>Create Recipe</Link>
      <Link className="navlink" to={'/saved-recipes'}>Saved Recipes</Link>
      <Link className="navlink" to={'/auth'}>Login or Register</Link>
    </div>
  )
}