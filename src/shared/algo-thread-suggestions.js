// Assume that we have access to an array of threads, each of which belongs to a specific genre, and each thread has an array of posts.

// Calculate the average rating for each thread
const threadRatings = threads.map((thread) => {
	const totalRating = thread.posts.reduce((acc, post) => acc + post.rating, 0);
	const avgRating = totalRating / thread.posts.length;
	return { threadId: thread.id, rating: avgRating };
});

// Sort the threads by their rating in descending order
threadRatings.sort((a, b) => b.rating - a.rating);

// Create an array of recommended threads, one per genre
const recommendedThreads = [];

// Keep track of the genres we've already recommended a thread for
const usedGenres = new Set();

// Loop through the sorted threadRatings array and add a thread for each genre, until we've recommended a thread for each genre or we run out of threads
for (let i = 0; i < threadRatings.length && recommendedThreads.length < genres.length; i++) {
	const thread = threads.find((thread) => thread.id === threadRatings[i].threadId);
	if (!usedGenres.has(thread.genre)) {
		recommendedThreads.push(thread);
		usedGenres.add(thread.genre);
	}
}

// The recommendedThreads array now contains one thread for each genre, sorted by their rating in descending order
