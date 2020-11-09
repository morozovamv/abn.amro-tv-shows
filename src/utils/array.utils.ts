export const getUnique = (list: Array<string>): Array<string> => {
	let uniqItems = new Set<string>();
	list.forEach((item) => uniqItems.add(item));

	return Array.from(uniqItems);
};
