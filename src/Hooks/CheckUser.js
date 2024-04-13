import supabase from '../Middleware/Supabase';

const CheckUserLoggedIn = async () => {
    try {
        const { data: { user: userSession } } = await supabase.auth.getUser();
        if (userSession) {
            return true;
        }

        throw new Error('No user session');
    } catch (error) {
        return false;
    }
}

export default CheckUserLoggedIn;
