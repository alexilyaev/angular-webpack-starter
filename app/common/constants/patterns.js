export const PATTERNS = {
  // Reference - http://www.w3.org/TR/html5/forms.html#e-mail-state-(type=email)
  // eslint-disable-next-line max-len
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  // 1 digit, 1 letter, minimum 8 chars and maximum 12 chars
  password: /^(?=.*\d)(?=.*[a-zA-Z]).{8,12}$/
};
