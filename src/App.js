import { useState } from 'react';

import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {auth} from './Firebase';

import "./App.css";

function App() {
    const [registerloading, setregisterloading] = useState(false);
    const [loginloading, setloginloading] = useState(false);
    const [registerEmail, setregisterEmail] = useState('');
    const [registerpPassword, setregisterPassword] = useState('');
    const [loginEmail, setloginEmail] = useState('');
    const [loginPassword, setloginPassword] = useState('');

    const [user, setuser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setuser(currentUser);
    })

    async function register() {
        setregisterloading(true);
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerpPassword);
            console.log(user)
        } catch (err) {
            console.log(err.message);
        }
        setregisterloading(false);
    }
    async function login() {
        setloginloading(true);
        try{
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user)
        } catch (err) {
            console.log(err.message);
        }
        setloginloading(false);
    }
    async function logout() {
        await signOut(auth);
        console.log('Logged Out');
    }

    return (
        <>
            <div>
                <h1>Register</h1>
                <input 
                    type='email' 
                    placeholder='Email...'
                    onChange={(e) => setregisterEmail(e.target.value)} 
                />
                <input 
                    type='password'
                    placeholder='Password...'
                    onChange={(e) => setregisterPassword(e.target.value)}
                />
                <button disabled={registerloading} onClick={register}>Sign Up</button>
            </div>
            <div>
                <h1>Login</h1>
                <input 
                    type='email' 
                    placeholder='Email...'
                    onChange={(e) => setloginEmail(e.target.value)} 
                />
                <input 
                    type='password'
                    placeholder='Password...'
                    onChange={(e) => setloginPassword(e.target.value)}
                />
                <button disabled={loginloading} onClick={login}>Log IN</button>
            </div>
            <div>
                <h1>Log Out</h1>
                {user?.email}
                <button onClick={logout} >Log Out</button>
            </div>
        </>
    );
}

export default App;