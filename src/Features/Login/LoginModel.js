import supabase from '../../Middleware/Supabase';

const loginEmail = async (email, password) => {
    let response = await fetch('https://nodejsdeployowl.et.r.appspot.com/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'email': email,
            'password': password
        }),
        redirect: 'follow',
        credentials: 'same-origin'
    });

    const responseBody = await response.text();
    const res = JSON.parse(responseBody)

    if(response.status == 200){
        const session = res.session

        const access_token = session.access_token;
        const refresh_token = session.refresh_token;

        const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token
        });
        
        if (error) {
            throw error;
        }
    }

    return res
}

const loginOauth = async (provider) => {
    let response = await fetch(`https://nodejsdeployowl.et.r.appspot.com/oauth/${provider}/web`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        redirect: 'follow',
        credentials: 'include'
    })

    const responseBody = await response.json();
    if(responseBody.url){
        window.location.href = responseBody.url
    }

}

export {loginEmail, loginOauth}