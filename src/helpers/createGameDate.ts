import { Game } from "../components/AccountPage/types";
import { getDay, getHoursString, getMinutesString, getMonth, getYear } from "./dateAndTimeTransformations";

export function createGameData(gameInfo: Game) {
    const wpmString = gameInfo.wpm.toString();
    const accString = `${gameInfo.accuracy ? gameInfo.accuracy : 0}%`;
    const charsString = gameInfo.chars.join('/');
    const modeString = `${gameInfo.mode.includes('seconds') ? 'time' : 'words'} ${parseInt(gameInfo.mode, 10)}`;
    const dateString = `${getDay(new Date(gameInfo.date))} ${getMonth(new Date(gameInfo.date))} ${getYear(new Date(gameInfo.date))}/${getHoursString(new Date(gameInfo.date).getHours() * 3600)}:${getMinutesString(new Date(gameInfo.date).getMinutes() * 60)}`

    return {wpmString, accString, charsString, modeString, dateString}
}