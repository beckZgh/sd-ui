
function preventDefault(e){
    e && e.preventDefault();
}

export default function(){
    try {

        if(window.addEventListener){
            window.addEventListener('error', preventDefault);
            window.addEventListener('unhandledrejection', preventDefault);
        } else {
            window.onerror(preventDefault);
        }
    } catch(e) {
        throw new Error(e);
    }
}
