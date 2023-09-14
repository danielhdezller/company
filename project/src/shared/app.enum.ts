/**
 * The enumeration that represents a list of db specs for different types of fields
 *
 * @export
 * @enum {number}
 */
export enum APP_DB_SPECS {
  TINY_TEXT = 10,
  SHORT_TEXT = 50,
  MEDIUM_TEXT = 100,
  LONG_TEXT = 500,

  // The max size allowed for a field that contains a sha256 hash.
  // How long is the SHA256 hash?
  // https://stackoverflow.com/questions/2240973/how-long-is-the-sha256-hash
  // 256 bits => 64 characters and add a small margin.
  SHA_256_LENGTH = 80,

  // The max size allowed for a phone.
  // How long is a phone number?
  // eslint-disable-next-line max-len
  // https://en.wikipedia.org/wiki/Telephone_numbering_plan#:~:text=The%20International%20Telecommunication%20Union%20(ITU,15%20digits%20to%20telephone%20numbers.
  // 15 characters and add a small margin.
  MAX_PHONE_LENGTH = 20,

  // The max size allowed for a email.
  // How long is a email?
  // eslint-disable-next-line max-len
  // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
  MAX_EMAIL_LENGTH = 64,

  // The max size allowed for a URL.
  // How long is a URL?
  // eslint-disable-next-line max-len
  // https://www.geeksforgeeks.org/maximum-length-of-a-url-in-different-browsers/#:~:text=Google%20Chrome%20allows%20the%20maximum,size%202MB(2048%20characters).&text=In%20Firefox%20the%20length%20of,no%20longer%20displays%20the%20URL.
  MAX_URL_LENGTH = 2048,
}
