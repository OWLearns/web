import supabase from '../Middleware/Supabase';

const LogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if(error){
        throw error;
    }
    window.location.href = '/login';
}

export default LogOut