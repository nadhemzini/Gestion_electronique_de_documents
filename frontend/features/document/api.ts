export async function getDocsBySubCategory(id: string) {
  const res = await fetch(`/api/documents/sub-category/${id}`, {
    next: { revalidate: 0 },        
  });

  
  if (!res.ok) throw new Error('Failed to load documents');
  return res.json() as Promise<Document[]>;  
}
