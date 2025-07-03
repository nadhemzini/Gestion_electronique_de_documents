import SubCategory from "../SubCategory/SubCategory";

export default interface Category {
     id: string;
    name: string;
    subCategories: SubCategory[];
    
}