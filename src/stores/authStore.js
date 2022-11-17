import {writable} from 'svelte/store';
 
export const user = writable({
    active: false,
    id: '',
    email: '',
});
