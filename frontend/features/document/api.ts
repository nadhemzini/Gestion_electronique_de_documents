export async function getDocsBySubCategory(id: string) {
  const res = await fetch(`/api/documents/sub-category/${id}`, {
    next: { revalidate: 0 },        
  });

  
  if (!res.ok) throw new Error('Failed to load documents');
  return res.json() as Promise<Document[]>;  
}


import axios from '@/lib/axios'; // or wherever your Axios instance is

// Delete ONE document by ID
export async function deleteOneDocument (id: string) {

  const data = await axios.delete(`/documents/${id}`);
  console.log("deleteOneDocument response", data);
  return data; 
  
}

// Delete MULTIPLE documents by IDs
export async function deleteManyDocuments  (ids: string[]) {

  const data  = await axios.delete(`/documents`, { data: { ids } });
  console.log("deleteManyDocuments response", data);
  return data;
}

// merge MULTIPLE documents by IDs
export async function mergeManyDocuments  (ids: string[]) {

  const data  = await axios.post(`/documents/merge`, { data: { ids } });
  console.log("mergeManyDocuments response", data);
  return data;
}



