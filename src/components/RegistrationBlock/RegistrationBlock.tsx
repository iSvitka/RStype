import { useContext, useState } from "react"
import { redirect } from "react-router-dom";
import cn from 'classnames'
import styles from './styles.module.scss'
import { tryLogin, tryRegister } from "../../helpers/regLogFunctions";
import { PageContext } from "../../context/PageContext/PageContext";
import { setSettings } from "../../helpers/userManipulationFuncs";
import { SettingsInterface } from "../../helpers/defaultSettings";

export function RegistrationBlock() {
    const {setLoaded} = useContext(PageContext)
    const [nameState, setNameState] = useState('');
    const [nameErrorState, setNameErrorState] = useState(false);
    const [passState, setPassState] = useState('');
    const [passErrorState, setPassErrorState] = useState(false);
    const [errorState, setErrorState] = useState('')

    const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameState(event.target.value);
        setNameErrorState(false);
        setErrorState('');
    }
    const passChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassState(event.target.value);
        setPassErrorState(false);
        setErrorState('');
    }
    const validateInputs = () => {
        if(nameState.length < 4) {
            setNameErrorState(true)
            if(passState.length < 6) {
                setPassErrorState(true)
                return false
            }
            return false
        }
        if(passState.length < 6) {
            setPassErrorState(true)
            return false
        }
        return true
    }

    const register = () => {
        if(validateInputs()) {
            tryRegister(nameState, passState).then(res => {
                tryLogin(res.username, res.password).then((token) => {
                    const settings: SettingsInterface = JSON.parse( localStorage.getItem('settings') || '{}');
                    setSettings(token.token, settings);
                }).then(() => {
                    setLoaded(false)
                    redirect('/rs-clone/')
                })
            }).catch((err: Error) => {
                setErrorState(err.message)
            })
        }
    }

    return (
        <>
            {!!errorState.length && <span className={styles.errorSpan}>{errorState}</span>}
            <input className={cn(styles.input, styles.inputName)} 
                type="text" 
                placeholder="username" 
                value={nameState} 
                onChange={nameChange}
                minLength={4} maxLength={10}/>
            <span className={cn(styles.nameSpan, {[styles.error]: nameErrorState})}>Enter username(minLength = 4, maxLength = 10)</span>
            <input className={cn(styles.input, styles.inputPass)} 
                type="password" 
                placeholder="password" 
                value={passState} 
                onChange={passChange}
                minLength={6} maxLength={10}/>
            <span className={cn(styles.passSpan, {[styles.error]: passErrorState})}>Enter password(minLength = 6, maxLength = 10)</span>
            <button className={styles.registerButt} type="button" onClick={() => register()}>register</button>
        </>
    )
}