import axios from "@/lib/axios";
import SubCategory  from "./SubCategory";

/**
 * POST /categories
 * Creates a new category and returns the freshly‑created row.
 */
export async function createSubCategory(name: SubCategory) {
    console.log("createCategory", name);
    const { data } = await axios.post("/sub-category", { name });
    console.log("createCategory response", data);
    return data;
}
/**
 * PUT /categories/:id
 * Updates an existing category and returns the updated row.
 */
export async function updateSubCategory(name:SubCategory,id:string) {
    console.log("updateCategory", name, id);
    const { data } = await axios.patch(`/sub-category/${id}`, { name });
    console.log("updateCategory response", data);
    return data;
}

/**
 * DELETE /categories/:id
 * Deletes a category and returns the deleted row.
 */
export async function deleteSubCategory(id: string) {
    console.log("deleteCategory", id);
    const { data } = await axios.delete(`/sub-category/${id}`);
    console.log("deleteCategory response", data);
    return data;
}
/**
 * get/categories/:id
 * get a category and returns the get row.
 */
export async function getSubCategory(id: string) {
    console.log("getsubCategory", id);
    const { data } = await axios.get(`/sub-category/${id}`);
    console.log("getsubCategory response", data);
    return data;
}
/**
 * GET /categories
 * Returns all categories.
 */
export async function getallSubCategory() {
    console.log("getallCategory");
    const { data } = await axios.get("/sub-category");
    console.log("getallCategory response", data);
    return data ;
}
/**
 * GET /categories (count)
 * Returns all categories.
 */
export async function countDocumentSubCategory(id: string) {
    console.log("countDocumentSubCategory");
    const { data } = await axios.get(`/sub-category/${id}/document-count`);
    console.log("countDocumentSubCategory response", data.documents);
    return data.documents ;
}

