export default function VerificationPage(){

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    return(
        <div className="w-screen h-screen flex justify-center items-center bg-OWL-base p-4">
            <div className="bg-white border-gray-300 px-6 py-10 rounded-xl border-2 shadow-md max-w-md">
                <p className="font-bold text-2xl">Verifikasi Email</p>
                <p className="text-sm mt-2 font-medium text-gray-500">
                    Kami telah mengirimkan email konfirmasi ke {email}. Silahkan klik tautan konfirmasi
                    dalam email tersebut untuk mengaktifkan akun Anda. Jika Anda tidak menemukan email dari owl@gmail.com, 
                    mohon periksa folder Spam dan Junk Anda.
                </p>
            </div>
        </div>
    );
}