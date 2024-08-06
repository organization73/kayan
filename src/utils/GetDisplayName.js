import subCategories from "../dummyData/SubCategories";

const getDisplayName = (category) => {
	const subCategory = subCategories.find((sub) => sub.value === category);
	return subCategory ? subCategory.name : category;
};

export default getDisplayName;
