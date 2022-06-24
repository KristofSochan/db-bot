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
  return false;
}

export function warning(html) {
  Alert.fire({
    icon: 'warning',
    html
  });
  return false;
}

export function info(html) {
  Alert.fire({
    icon: 'info',
    html
  });
  return false;
}

export function success(html) {
  Alert.fire({
    icon: 'success',
    html
  });
  return true;
}
