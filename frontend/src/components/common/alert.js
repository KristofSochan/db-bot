import Swal from 'sweetalert2';

export const Alert = Swal.mixin({
  confirmButtonColor: '#1677ed'
});

export function error(html, err) {
  Alert.fire({
    icon: 'error',
    html
  });
  if (err) console.error(err);
}

export function warning(html) {
  Alert.fire({
    icon: 'warning',
    html
  });
}

export function info(html) {
  Alert.fire({
    icon: 'info',
    html
  });
}

export function success(html) {
  Alert.fire({
    icon: 'success',
    html
  });
}
