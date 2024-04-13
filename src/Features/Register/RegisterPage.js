import loading from '../../Assets/loading.gif'
import image from '../../Assets/login.png'
import { useState, useEffect } from 'react'
import {registerEmail} from './RegisterModel'
import CheckUserLoggedIn from '../../Hooks/CheckUser'

export default function RegisterPage(){

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');
    const[errorText, setErrorText] = useState('');
    const[successText , setSuccessText] = useState('');
    const[isLoading, setLoading] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    } 
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangePassword2 = (e) => {
        setPassword2(e.target.value)
    }

    const handleRegister = async (email, password) => {
        setErrorText('');
        setSuccessText('');

        if(password != password2){
            setErrorText("Password Isn't Matching")
            return
        }

        setLoading(true)
        let response = await registerEmail(email, password)
        setLoading(false)

        if(response.status == "success"){
            window.location.href = `/verification?email=${email}`
        }else{
            setErrorText(response.message)
        }
    }

    useEffect(() => {
        const check = async () => {
            const isLoggedIn = await CheckUserLoggedIn();
            if (isLoggedIn) {
                window.location.href = '/';
            }
        }
        check();
    }, [])

    return(
        <div className="py-12 px-4 lg:py-20 lg:px-8 bg-OWL-base h-screen md:flex md:justify-center md:items-center ">
            <div className='hidden md:block'>
                <img src={image} alt='test' className='md:max-w-sm lg:max-w-md lg:max-h-full'/>
            </div>
           <div className="flex flex-col gap-1 lg:gap-2 justify-center md:justify-start w-full md:w-1/2 ">
                <div>
                    <span className="text-2xl lg:text-4xl font-semibold">Daftar akun</span>
                    <span className="text-2xl lg:text-4xl font-bold"> OWL.</span>
                </div>
                <p className="text-base lg:text-lg ">Silahkan masukkan informasi akun kamu.</p>
                <div className="flex flex-col gap-4 mt-4">
                    <input type="email" value={email} onChange={onChangeEmail} className="border-gray-400 border rounded-md py-1 lg:py-2 px-3 placeholder-black placeholder-opacity-70" placeholder="Email"/>
                    <input type="password" password={password} onChange={onChangePassword} className="border-gray-400 border rounded-md py-1 lg:py-2 px-3 placeholder-black placeholder-opacity-70" placeholder="Password"/>
                    <input type="password" password={password2} onChange={onChangePassword2} className="border-gray-400 border rounded-md py-1 lg:py-2 px-3 placeholder-black placeholder-opacity-70" placeholder="Confirm Password"/>
                </div>
                {errorText ? <p className='text-red-500 text-center'>{errorText}</p> : <></>}
                {successText ? <p className='text-green-500 text-center'>{successText}</p> : <></>}
                <button onClick={() => handleRegister(email, password)} className="bg-orange-400 p-1 rounded-md font-light mt-2 lg:mt-4 lg:text-lg">
                {
                    isLoading ? <img src={loading} className='m-auto h-6 lg:h-7'/> : <>Register</>
                }
                </button>
                <hr className="my-4"/>
                <div className="text-center text-sm">
                    <span>Sudah punya akun? </span>
                    <a href='/login'>
                        <span className="text-blue-300">Masuk disini</span>
                    </a>
                </div>
           </div>
        </div>
    )
}
