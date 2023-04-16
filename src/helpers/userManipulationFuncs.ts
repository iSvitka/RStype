import { SettingsInterface } from "./defaultSettings"

export const getSettings = async (token: string) => {
    const settings: SettingsInterface = await fetch(`https://rstype-backend-production.up.railway.app/get_settings`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json())

    return settings
}

export const setSettings = async (token: string, setGroup: Partial<SettingsInterface>) => {
    const response = await fetch(`https://rstype-backend-production.up.railway.app/set_settings`, {
        // mode: 'no-cors',
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type":  "application/json"
        },
        body: JSON.stringify(setGroup)
    }).then(res => res.json())
    return response;
}