import { Meteor } from 'meteor/meteor';

import '../imports/api/user.jsx';
import '../imports/api/fare.jsx';
import '../imports/api/quotation.jsx';

Meteor.startup(() => {
    Cloudinary.config({
        cloud_name: 'carbroker',
        api_key: '823132537589914',
        api_secret: 'cFe0gD5h9E7uR-8-TRC1bFlDFGY'
    });
});
