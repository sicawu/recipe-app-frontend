import React from "react";

export default function ShoppingList({ shoppingList }) {
  const categoryOrder = ['Produce', 'Dairy', 'Meat', 'Bakery', 'Pantry', 'Other'];
  const grouped = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
  const sortedGroups = Object.keys(grouped).sort((a, b) => {
    const priA = categoryOrder.indexOf(a);
    const priB = categoryOrder.indexOf(b);
    if (priA === -1 && priB === -1) return a.localeCompare(b);
    if (priA === -1) return 1;
    if (priB === -1) return -1;
    return priA - priB;
  }).reduce((acc, cat) => {
    acc[cat] = grouped[cat].sort((a, b) => a.name.localeCompare(b.name));
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
                    {item.total_amount.toFixed(1)} {item.unit}
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
