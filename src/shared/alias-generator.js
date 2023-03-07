// Generate a random user alias in the format [genre]-[animal]-123
export const generateAlias = () => {
	const genres = [
		'Action',
		'Adventure',
		'Comedy',
		'Drama',
		'Horror',
		'Mystery',
		'Romance',
		'Sci-Fi',
		'Thriller'
	];
	const animals = [
		'Ant',
		'Bear',
		'Cat',
		'Dog',
		'Elephant',
		'Fox',
		'Giraffe',
		'Hippo',
		'Iguana',
		'Jaguar',
		'Kangaroo',
		'Lion',
		'Monkey',
		'Narwhal',
		'Octopus',
		'Penguin',
		'Raccoon',
		'Squirrel',
		'Tiger',
		'Unicorn',
		'Vulture',
		'Walrus',
		'Xenops',
		'Yak',
		'Zebra'
	];
	const randomGenre = genres[Math.floor(Math.random() * genres.length)];
	const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
	const randomNumber = Math.floor(Math.random() * 900) + 100;
	return `${randomGenre}-${randomAnimal}-${randomNumber}`;
};
