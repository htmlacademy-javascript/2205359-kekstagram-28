import { getData} from './server-data.js';
import { addPictures } from './render-pictures.js';
import { addFilterListeners } from './filter.js';
import { showAlert } from './notifications.js';

const getPictures = () => {
  getData()
    .then((response) => {
      addPictures(response);
      addFilterListeners(response, addPictures);
    })
    .catch((err) => showAlert(err.message));
};


export {getPictures};

