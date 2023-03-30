import { useContext, useState } from "react";
import cn from 'classnames';
import { ScType, SeType, VolType } from "./types";
import pageStyles from '../SettingsPage/styles.module.scss';
import { SetGroupBut } from "../../generics/SetGroupBut/SetGroupBut";
import { SettingsInterface } from "../../helpers/defaultSettings";
import { updateSettings } from "../../helpers/updateSettings";
import { PageContext } from "../../context/PageContext/PageContext";

export function SettingSound() {
    const {token} = useContext(PageContext)
    const settings: SettingsInterface = JSON.parse(localStorage.getItem('settings') || '{}');
    const soundSettings = settings.sound;

    const [isOpen, setIsOpen] = useState(true);
    const [volState, setVolState] = useState<VolType>(soundSettings.soundVolume);
    const [scState, setScState] = useState<ScType>(soundSettings.playSoundOnClick);
    const [seState, setSeState] = useState<SeType>(soundSettings.playSoundOnError);

    const toggleVolState = (target: VolType) => {
        if(target !== volState) {
            soundSettings.soundVolume = target;
            updateSettings({sound: soundSettings}, token, settings)
            setVolState(target);
        }
    }
    const toggleScState = (target: ScType) => {
        if(target !== scState) {
            soundSettings.playSoundOnClick = target;
            updateSettings({sound: soundSettings}, token, settings)
            setScState(target)
        }
    }
    const toggleSeState = (target: SeType) => {
        if(target !== seState) {
            soundSettings.playSoundOnError = target;
            updateSettings({sound: soundSettings}, token, settings)
            setSeState(target)
        }
    }

    return(
        <>
            <SetGroupBut setIsOpen={setIsOpen} isOpen={isOpen} type='sound'>sound</SetGroupBut>
            {isOpen
            ? <div className={pageStyles.setGroupCont} id="soundGroup">
                <div className={pageStyles.setGroupContentCont}>
                    <div className={pageStyles.setGroupContentTitleCont}>
                        <h3 className={pageStyles.setGroupContentTitle}><span>·</span>sound volume:</h3>
                        <p className={pageStyles.setGroupContentDescription}>Change to volume of sound effects.</p>
                    </div>
                    <div className={pageStyles.setGroupContentButCont}>
                        <button 
                            className={cn({[pageStyles.activeButton]: volState === 'quite'}, 
                            pageStyles.button)} type="button" onClick={() => toggleVolState('quite')}>quite</button>
                        <button 
                            className={cn({[pageStyles.activeButton]: volState === 'medium'}, 
                            pageStyles.button)} type="button" onClick={() => toggleVolState('medium')}>medium</button>
                        <button 
                            className={cn({[pageStyles.activeButton]: volState === 'loud'}, 
                            pageStyles.button)} type="button" onClick={() => toggleVolState('loud')}>loud</button>
                    </div>
                </div>
                <div className={pageStyles.setGroupContentCont}>
                    <div className={pageStyles.setGroupContentTitleCont}>
                        <h3 className={pageStyles.setGroupContentTitle}><span>·</span>play sound on click:</h3>
                        <p className={pageStyles.setGroupContentDescription}>Plays a short sound when you press a key.</p>
                    </div>
                    <div className={pageStyles.setGroupContentButCont}>
                        <button 
                            className={cn({[pageStyles.activeButton]: scState === 'off'}, 
                            pageStyles.button)} type="button" onClick={() => toggleScState('off')}>off</button>
                        <button 
                            className={cn({[pageStyles.activeButton]: scState === 'on'}, 
                            pageStyles.button)} type="button" onClick={() => toggleScState('on')}>beep</button>
                    </div>
                </div>
                <div className={pageStyles.setGroupContentCont}>
                    <div className={pageStyles.setGroupContentTitleCont}>
                        <h3 className={pageStyles.setGroupContentTitle}><span>·</span>play sound on error:</h3>
                        <p className={pageStyles.setGroupContentDescription}>Plays a short sound if you press an incorrect key or press space too early.</p>
                    </div>
                    <div className={pageStyles.setGroupContentButCont}>
                        <button 
                            className={cn({[pageStyles.activeButton]: seState === 'off'}, 
                            pageStyles.button)} type="button" onClick={() => toggleSeState('off')}>off</button>
                        <button 
                            className={cn({[pageStyles.activeButton]: seState === 'on'}, 
                            pageStyles.button)} type="button" onClick={() => toggleSeState('on')}>on</button>
                    </div>
                </div>
            </div>
            : null
            }
        </>
    )
}