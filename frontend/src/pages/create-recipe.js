import { useState } from "react"
import axios from 'axios'
import { useGetUserId } from "../hooks/useGetUserId"
import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'

export const CreateRecipe = () => {
  const userId = useGetUserId()
  const navigate = useNavigate()
  const [cookies, _] = useCookies(["access_token"])
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setRecipe({ ...recipe, [name]: value })
  }

  const handleIngredientChange = (e, id) => {
    const { value } = e.target
    const ingredients = recipe.ingredients
    ingredients[id] = value
    setRecipe({ ...recipe, ingredients })
  }

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5500/recipes", recipe, {
        headers: { authorization: cookies.access_token }
      })
      alert('Recipe created.')
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      <h2 className="create-recipe-title">Create Recipe</h2>
      <form className="create-recipe-form" action="" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, id) => (
          <input
            key={id}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, id)}
          />
        ))}
        <button className="add-button" type="button" onClick={addIngredient}>Add</button>
        <label htmlFor="instructions">Instructions</label>
        <textarea type="text" id="instructions" name="instructions" onChange={handleChange}></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
        <label htmlFor="cookingTime">Cooking Time</label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />
        <button className="submit-button" type="submit">Create</button>
      </form>
    </div>
  )
}