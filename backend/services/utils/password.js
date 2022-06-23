import bcrypt from 'bcrypt';

async function verify(password, passwordEncrypted) {
  return new Promise(async (resolve, reject) => {
    bcrypt.compare(password, passwordEncrypted, function(err, result) {
      if (err) return reject();
      resolve(result);
    });
  });
}

async function hash(password) {
  return new Promise(async (resolve, reject) => {
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) return reject();
      resolve(hash);
    });
  });
}

export default {
  verify,
  hash
}