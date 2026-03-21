import React from "react";

export default function ShoppingList({ shoppingList }) {
  const grouped = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  if (!shoppingList.length) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Shopping List</h2>

      <div className="space-y-4">
        {Object.keys(grouped).map((category) => (
          <div key={category} className="border rounded-lg p-3">
            <h3 className="font-bold mb-2">{category}</h3>

            <div className="space-y-1">
              {grouped[category].map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-gray-600">
                    {item.total_amount} {item.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}