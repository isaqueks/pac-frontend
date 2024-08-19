import Swal from "sweetalert2";


export const defaultErrorHandler = <T>(successHandler: (d: T) => any) => {
    return {
        next: successHandler,
        error: err => {
            Swal.fire({
                icon: 'error',
                title: 'Um erro ocorreu',
                text: err?.error?.message || err?.message || String(err)
            })
        }
    };
}