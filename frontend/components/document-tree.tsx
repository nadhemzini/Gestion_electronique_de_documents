"use client"

import { ChevronDown, ChevronRight, Folder, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { use, useEffect, useState } from "react"
import { getallCategory } from "@/features/category/api"
import Category from "@/features/category/Category"
import { countDocumentSubCategory } from "@/features/SubCategory/api"

interface DocumentTreeProps {
  selectedCategory: string
  onCategorySelect: (category: string) => void
}


export function DocumentTree({ selectedCategory, onCategorySelect }: DocumentTreeProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["documents-a-classer"])

  const [categories, setCategories] = useState<Category[]> ([])
// Initialize categories state as an empty array
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getallCategory();
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Fetch categories on component mount
console.log("categories", categories)
  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }


  
  useEffect(() => {
    const fetchCountDoc = async (id:string) => {
      try {
        const data = await countDocumentSubCategory(id);
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
          <span>Classification automatique des documents</span>
        </div>
      </div>

      <div className="space-y-1">
        {categories.map((category) => (
          <div key={category.id}>
            <Button
              variant="ghost"
              className={`w-full justify-start p-2 h-auto text-left ${
                selectedCategory === category.id ? "bg-teal-50 text-teal-700" : ""
              }`}
              onClick={() => {
                if (category.subCategories) {
                  toggleExpanded(category.id)
                } else {
                  onCategorySelect(category.id)
                }
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  {category.subCategories ? (
                    expandedItems.includes(category.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )
                  ) : (
                    <Folder className="w-4 h-4" />
                  )}
                  <span className="text-sm">{category.name}</span>
                </div>
                <Badge variant="secondary" className="bg-teal-500 text-white text-xs">
                  {/* {category.count} */}
                </Badge>
              </div>
            </Button>

            {category.subCategories && expandedItems.includes(category.id) && (
              <div className="ml-6 space-y-1">
                {category.subCategories.map((child) => (
                  <Button
                    key={child.id}
                    variant="ghost"
                    className={`w-full justify-start p-2 h-auto text-left ${
                      selectedCategory === child.id ? "bg-orange-50 text-orange-700" : ""
                    }`}
                    onClick={() => onCategorySelect(child.id)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{child.name}</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          selectedCategory === child.id ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                       {child._count?.documents}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
