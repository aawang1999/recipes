import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserId } from '../hooks/useGetUserId'
import { useCookies } from 'react-cookie'

export const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [cookies, _] = useCookies(["access_token"])
  const userId = useGetUserId()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5500/recipes")
        setRecipes(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/recipes/savedRecipes/ids/${userId}`)
        setSavedRecipes(response.data.savedRecipes)
      } catch (err) {
        console.error(err)
      }
    }

    fetchRecipes()
    fetchSavedRecipes()
  }, [])

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put("http://localhost:5500/recipes", {
        recipeId,
        userId
      }, {
        headers: { authorization: cookies.access_token }
      })
      setSavedRecipes(response.data.savedRecipes)
    } catch (err) {
      console.error(err)
    }
  }

  const isRecipeSaved = (id) => {
    return savedRecipes.includes(id)
  }

  return (
    <div className="container">
      <h2>Recipes</h2>
      <ul className='recipes-list'>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {savedRecipes.includes(recipe._id) && <h3>Saved</h3>}
            <div>
              <h3>{recipe.name}</h3>
            </div>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt="" />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            <button disabled={isRecipeSaved(recipe._id)} onClick={() => saveRecipe(recipe._id)}>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}