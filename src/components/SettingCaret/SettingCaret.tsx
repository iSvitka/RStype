import { useContext, useState } from "react";
import cn from 'classnames';
import pageStyles from '../SettingsPage/styles.module.scss';
import styles from './styles.module.scss';
import { CSmType, CStType, CaretSettings} from "./types";
import { SetGroupBut } from "../../generics/SetGroupBut/SetGroupBut";
import { SettingsInterface } from "../../helpers/defaultSettings";
import { PageContext } from "../../context/PageContext/PageContext";
import { updateSettings } from "../../helpers/updateSettings";

export function SettingCaret() {
    const {token} = useContext(PageContext)
    const settings: SettingsInterface = JSON.parse(localStorage.getItem('settings') || '{}');
    const caretSettings: CaretSettings = settings.caret;

    const [isOpen, setIsOpen] = useState(true);
    const [cSmState, setCSmState] = useState<CSmType>(caretSettings.smoothCaret);
    const [cStState, setCStState] = useState<CStType>(caretSettings.caretStyle);

    const toggleCSmState = (target: CSmType) => {
        if(target !== cSmState) {
            caretSettings.smoothCaret = target;
            updateSettings({caret: caretSettings}, token, settings)
            setCSmState(target);
        }
    }
    const toggleCStState = (target: CStType) => {
        if(target !== cStState) {
            caretSettings.caretStyle = target;
            updateSettings({caret: caretSettings}, token, settings)
            setCStState(target)
        }
    }

    return(
        <>
            <SetGroupBut setIsOpen={setIsOpen} isOpen={isOpen} type='caret'>caret</SetGroupBut>
            {isOpen
            ? <div className={pageStyles.setGroupCont} id="caretGroup">
                <div className={pageStyles.setGroupContentCont}>
                    <div className={pageStyles.setGroupContentTitleCont}>
                        <h3 className={pageStyles.setGroupContentTitle}><span>·</span>flickering caret:</h3>
                        <p className={pageStyles.setGroupContentDescription}>Change the state of the caret to flickering mode.z</p>
                    </div>
                    <div className={pageStyles.setGroupContentButCont}>
                        <button 
                            className={cn({[pageStyles.activeButton]: cSmState === 'off'}, 
                            pageStyles.button)} type="button" onClick={() => toggleCSmState('off')}>off</button>
                        <button 
                            className={cn({[pageStyles.activeButton]: cSmState === 'on'}, 
                            pageStyles.button)} type="button" onClick={() => toggleCSmState('on')}>on</button>
                    </div>
                </div>
                <div className={pageStyles.setGroupContentCont}>
                    <div className={pageStyles.setGroupContentTitleCont}>
                        <h3 className={pageStyles.setGroupContentTitle}><span>·</span>caret style:</h3>
                        <p className={pageStyles.setGroupContentDescription}>Change the style of the caret during the test.</p>
                    </div>
                    <div className={pageStyles.setGroupContentButCont}>
                        <button 
                            className={cn({[pageStyles.activeButton]: cStState === 'default'}, 
                            pageStyles.button)} type="button" onClick={() => toggleCStState('default')}>|</button>
                        <button 
                            className={cn({[pageStyles.activeButton]: cStState === 'underscore'}, 
                            pageStyles.button)} type="button" onClick={() => toggleCStState('underscore')}>_</button>
                        <button
                            className={cn({[pageStyles.activeButton]: cStState === 'empty'}, 
                            pageStyles.button)} type="button" onClick={() => toggleCStState('empty')} aria-label="emptyCaret"><span className={styles.emptyCaret}/></button>
                        <button 
                            className={cn({[pageStyles.activeButton]: cStState === 'filled'}, 
                            pageStyles.button)} type="button" onClick={() => toggleCStState('filled')} aria-label="filledCaret"><span className={styles.filledCaret}/></button>
                    </div>
                </div>
            </div>
            : null
            }
        </>
    )
}