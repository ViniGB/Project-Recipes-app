const copy = require('clipboard-copy');

const handleUrlCopy = (pathname, currId, setLinkCopied) => {
  const URL = pathname.includes('foods')
    ? `http://localhost:3000/foods/${currId}`
    : `http://localhost:3000/drinks/${currId}`;
  copy(URL);
  setLinkCopied(true);
};

export default handleUrlCopy;
