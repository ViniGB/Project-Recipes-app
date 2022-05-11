const copy = require('clipboard-copy');

const handleUrlCopy = (pathname, currId, setIsOpen) => {
  const URL = pathname.includes('foods')
    ? `http://localhost:3000/foods/${currId}`
    : `http://localhost:3000/drinks/${currId}`;
  copy(URL);
  setIsOpen(true);
};

export default handleUrlCopy;
