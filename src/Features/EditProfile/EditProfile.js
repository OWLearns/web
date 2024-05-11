import React, { useEffect, useState, useRef } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import CheckUserLoggedIn from '../../Hooks/CheckUser';
import profileBlank from '../../Assets/profileBlank.jpg';
import Footer from '../../Components/Footer/Footer';
import supabase from '../../Middleware/Supabase'


export default function EditProfile() {
    const [isLoading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [showOnProfileLocation, setShowOnProfileLocation] = useState(false);
    const [showOnProfileTitle, setShowOnProfileTilte] = useState(false);
    const inputRef = useRef(null);
    const data = useLoaderData();


    useEffect(() => {
        const check = async () => {
            const isLoggedIn = await CheckUserLoggedIn();
            if (isLoggedIn) {
                setLoading(false);
            } else {
                window.location.href = '/login';
            }
        }
        check();
    }, []);

    useEffect(() => {
        setFormData({
            username: data.profile.user.username || '',
            location: data.profile.user.location || '',
            bio: data.profile.user.biodata || '',
            title: data.profile.user.title || ''
        });
        setShowOnProfileLocation(data.showOnProfileLocation || false);
        setShowOnProfileTilte(data.showOnProfileTitle || false);
    }, [data]);


    const handelChange = (e) => {
        const { name, value } = e.target;
        const newValue = value.trim() === '' ? null : value;
        setFormData({ ...formData, [name]: newValue })
        console.log(e.target.value)


    }


    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === "showOnProfileLocation") {
            setShowOnProfileLocation(checked);
        } else if (name === "showOnProfileTitle") {
            setShowOnProfileTilte(checked);
        }
    }
    const handleImageClick = () => {
        inputRef.current.click();

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImagePreview(e.target.files[0]);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Item = {
            avatar: imagePreview,
            username: formData.username,
            location: formData.location,
            bio: formData.biodata,
            showOnProfileLocation: showOnProfileLocation,
            showOnProfileTitle: showOnProfileTitle,
            title: formData.title
        }
        console.log(Item)

    //  try {
        
    //     const getSession = await supabase.auth.getSession();
    //     const access_token = getSession.data.session.access_token;
    //     const response = await fetch('https://nodejsdeployowl.et.r.appspot.com/editProfile', {
    //         method: 'PATCH',
    //         body: JSON.stringify({
    //             Item: Item,
    //             access_token: access_token
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         credentials: 'include',
    //         redirect: 'follow'
    //     });
        
        
    //     if (!response.ok) {
    //        console.log('Failed to fetch profile data');
    //     }
        
    //     const responseData = await response.json();
    //     console.log(responseData);
        
    //  } catch (error) {
    //     console.log('Error fetching profile data:', error);
        
    //  }


     
        

    
    


    }






    if (isLoading) {
        return <>Loading</>;
    } else {
        return (
            <>
                <div className="bg-OWL-base p-6 lg:px-24 xl:px-44">
                    <div className="mt-20 p-32 py-20 relative">
                        <div className="absolute bg-gradient-to-br from-OWL-dark-blue to-OWL-mid-blue w-full top-0 left-0 h-52 rounded-3xl  " />
                        <div className="z-10 relative flex justify-between">
                            <div className="" onClick={handleImageClick}>
                                {imagePreview ? (
                                    <img src={URL.createObjectURL(imagePreview)} className="rounded-full h-52 border-4 border-OWL-base" />
                                ) : (

                                    <img src={data.profile.user.avatar == null ? profileBlank : data.profile.user.avatar} className="rounded-full h-52 border-4 border-OWL-base" />
                                )}

                                <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-2xl font-semibold '>Full Name</label>
                        <input type='text' value={formData.username || ''} className='text-sm border-2 rounded-3xl sm:w-1/3 w-1/3 px-4 py-2 mt-4' onChange={handelChange} name='username' />
                        <label className='text-2xl font-semibold mt-4'>Location</label>
                        <input type='text' value={data.location} className='text-sm border-2 rounded-3xl sm:w-1/3 w-1/3 px-4 py-2 mt-4 mb-2' onChange={handelChange} name='location' />
                        <div className="flex">
                            <input type="checkbox" checked={showOnProfileLocation} onChange={handleCheckboxChange} name="showOnProfileLocation" />
                            <p className="text-sm">&nbsp;Show on profile</p>
                        </div>
                        <label className='text-2xl font-semibold mt-4'>Bio</label>
                        <input type='text' value={formData.biodata} className='text-sm border-2 rounded-3xl sm:w-1/3 w-1/3 px-4 py-2 mt-4' onChange={handelChange} name='bio' />
                        <label className='text-2xl font-semibold mt-4'>Title</label>
                        <input type='text' value={data.title} className='text-sm border-2 rounded-3xl sm:w-1/3 w-1/3 px-4 py-2 mt-4 mb-2' onChange={handelChange} name='title' />
                        <div className="flex">
                            <input type="checkbox" checked={showOnProfileTitle} onChange={handleCheckboxChange} name="showOnProfileTitle" />
                            <p className="text-sm">&nbsp;Show on profile</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-5 mt-5'>
                        <button className='text-sm text-center border-2 text-blue-400 border-blue-400 rounded-3xl px-4 py-2 w-full hover:bg-blue-600 hover:text-white '>Cancel</button>
                        <button className='text-sm text-center border-2 text-blue-400 border-blue-400 rounded-3xl px-4 py-2 w-full  hover:bg-blue-600 hover:text-white' onClick={handleSubmit}> Save</button>

                    </div>

                </div>
                <Footer />
            </>
        );
    }
}

export const fetchProfileData = async () => {
    try {
        const getSession = await supabase.auth.getSession();
        const access_token = getSession.data.session.access_token;
        const response = await fetch('https://nodejsdeployowl.et.r.appspot.com/profile', {
            method: 'POST',
            body: JSON.stringify({
                access_token: access_token
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
         
              return data;

        } else {
            console.log('Failed to fetch profile data');
        }
    } catch (error) {
        console.log('Error fetching profile data:', error);
    }
}