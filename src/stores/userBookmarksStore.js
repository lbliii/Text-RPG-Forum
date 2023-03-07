import { writable } from 'svelte/store';
import { getUserThreadBookmarks, getUserThreadBookmark, createUserThreadBookmark, deleteUserThreadBookmark } from '../shared/actions.js';
import { handleError } from '../shared/helpers.js';

// Fetch, Add, Edit, Remove

const createUserBookmarksStore = () => {
    const store = writable([]);

    const { subscribe, set, update } = store;

    const fetchUserBookmarks = async (user_id) => {
        try {
            const bookmarks = await getUserThreadBookmarks(user_id);
            
            // add the array of bookmarks to the store
            set(bookmarks);
            return bookmarks;
        } catch (error) {
            handleError(error);
        }
    }

    const fetchUserBookmark = async (thread_id, user_id) => {
			try {

				const bookmark = await getUserThreadBookmark(thread_id, user_id);

                if (bookmark) {
                    return true 
                } else {
                    return false
                }
			} catch (error) {
				handleError(error);
			}
		};

    const addUserBookmark = async (thread_id, user_id) => {
			try {
				const bookmark = await createUserThreadBookmark(thread_id, user_id);
				update((bookmarks) => {
					bookmarks[bookmark.id] = bookmark;
					return bookmarks;
				});
			} catch (error) {
				handleError(error);
			}
		};

    const removeUserBookmark = async (thread_id, user_id) => {
			try {
				await deleteUserThreadBookmark(thread_id, user_id);

                userBookmarksStore.update((bookmarks) => bookmarks.filter((b) => b.id !== b.id));
			} catch (error) {
				handleError(error);
			}
		};

    return {
        subscribe,
        fetchUserBookmarks,
        fetchUserBookmark,
        addUserBookmark,
        removeUserBookmark,
        update,
    }

};

export const userBookmarksStore = createUserBookmarksStore();