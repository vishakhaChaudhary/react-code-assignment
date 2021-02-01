class BaseHelper {
    /**
   * @desc To convert the word first alphabet in uppercase
   * @param string
   *
   * @return string
   *
   */
    getFirstLetterUpperCase = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export default new BaseHelper();
