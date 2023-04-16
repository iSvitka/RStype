import { ISetGameResultData } from "../components/Result/types"

export const setGameResultData = async (data: ISetGameResultData) => {
    const response = await fetch('https://rstype-backend-production.up.railway.app/set_game', {
        // mode: 'no-cors',
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(data)
    })

    return response.ok
}