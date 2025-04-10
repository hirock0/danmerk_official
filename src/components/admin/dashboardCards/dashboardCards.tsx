import { FaShoppingCart, FaGift, FaUser } from 'react-icons/fa';

const cards = [
  { label: 'Sign Copy Order', count: 1, color: 'bg-green-500', icon: <FaUser /> },
  { label: 'Server Copy Order', count: 5, color: 'bg-pink-500', icon: <FaShoppingCart /> },
  { label: 'NID Card Order', count: 1, color: 'bg-blue-500', icon: <FaShoppingCart /> },
  { label: 'Grameen (Bio)', count: 1, color: 'bg-red-700', icon: <FaGift /> },
  { label: 'Banglalink (Bio)', count: 0, color: 'bg-blue-900', icon: <FaGift /> },
  { label: 'Robi/Airtel (Bio)', count: 0, color: 'bg-purple-600', icon: <FaGift /> },
  { label: 'Teletalk (Bio)', count: 0, color: 'bg-gray-700', icon: <FaGift /> },
  { label: 'NID To All Number', count: 0, color: 'bg-yellow-500', icon: <FaUser /> },
  { label: 'NID To GP All Number', count: 1, color: 'bg-green-600', icon: <FaShoppingCart /> },
  { label: 'NID To BL All Number', count: 0, color: 'bg-pink-600', icon: <FaShoppingCart /> },
  { label: 'NID To Robi/Airtel All Number', count: 0, color: 'bg-blue-400', icon: <FaShoppingCart /> },
  { label: 'Call List 3 Month', count: 1, color: 'bg-red-800', icon: <FaShoppingCart /> },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`rounded-lg text-white p-4 flex flex-col justify-between shadow ${card.color}`}
        >
          <div className="text-3xl">{card.count}</div>
          <div className="flex justify-between items-center mt-2">
            <div>{card.label}</div>
            <div className="text-xl opacity-80">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
