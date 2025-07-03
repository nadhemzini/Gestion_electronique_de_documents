import axios from "@/lib/axios";
import Category  from "./Category";

/**
 * POST /categories
 * Creates a new category and returns the freshly‑created row.
 */
export async function createCategory(name: string) {
    console.log("createCategory", name);
    const { data } = await axios.post("/category", { name });
    console.log("createCategory response", data);
    return data;
}
/**
 * PUT /categories/:id
 * Updates an existing category and returns the updated row.
 */
export async function updateCategory(name:string,id:string) {
    console.log("updateCategory", name, id);
    const { data } = await axios.patch(`/category/${id}`, { name });
    console.log("updateCategory response", data);
    return data;
    
}
/**
 * DELETE /categories/:id
 * Deletes a category and returns the deleted row.
 */
export async function deleteCategory(id: string) {
    console.log("deleteCategory", id);
    const { data } = await axios.delete(`/category/${id}`);
    console.log("deleteCategory response", data);
    return data;
}
/**
 * GET /categories
 * Returns all categories.
 */
export async function getallCategory() {
    console.log("getallCategory");
    const { data } = await axios.get("/category");
    console.log("getallCategory response", data);
    return data as Category[];
}

