import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserId } from '../hooks/useGetUserId'

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([])
  const userId = useGetUserId()

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/recipes/savedRecipes/${userId}`)
        setSavedRecipes(response.data.savedRecipes)
      } catch (err) {
        console.error(err)
      }
    }

    fetchSavedRecipes()
  }, [])

  return (
    <div className="container">
      <h2>Saved Recipes</h2>
      <ul className='recipes-list'>
        {savedRecipes.map((recipe) => (
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
          </li>
        ))}
      </ul>
    </div>
  )
}