import _ from 'lodash';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window._ = _;
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '6a1d8dc597e062e6bf6e', // Your actual Pusher key
    cluster: 'ap1',
    forceTLS: true, // Gumamit ng TLS (https) for hosted Pusher
});