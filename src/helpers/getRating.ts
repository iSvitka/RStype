import { UserRatingInfo } from "../components/RatingPage/types"


export const getRating = async () => {
    const response: UserRatingInfo[] = await fetch(`https://rstype-backend-production.up.railway.app/get_rating`,
    {
        // mode: 'no-cors'
    }).then(res => res.json())
    return response
}