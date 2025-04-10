import { FaFileAlt, FaServer, FaIdCard, FaFingerprint, FaPhone, FaMapMarkerAlt, FaUserLock, FaCheck, FaBan, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
const menu = [
  { label: 'Sign Copy Order', icon: <FaFileAlt />, count: 1, href: '/admin/dashboard/sign-copy' },
  { label: 'Server Copy Order', icon: <FaServer />, count: 5, href: '/admin/dashboard/sign-copy' },
  { label: 'NID Card Order', icon: <FaIdCard />, count: 1, href: '/admin/dashboard/sign-copy' },
  { label: 'Biometric Order', icon: <FaFingerprint />, count: 2, href: '/admin/dashboard/sign-copy' },
  { label: 'NID To Number', icon: <FaIdCard />, count: 1, href: '/admin/dashboard/sign-copy' },
  { label: 'Call List Order', icon: <FaPhone />, count: 3, href: '/admin/dashboard/sign-copy' },
  { label: 'Location Order', icon: <FaMapMarkerAlt />, count: 5, href: '/admin/dashboard/sign-copy' },
  { label: 'Bkash Info Order', icon: <FaFingerprint />, count: 2, href: '/admin/dashboard/sign-copy' },
  { label: 'Zero Return Order', icon: <FaUserLock />, count: 2, href: '/admin/dashboard/sign-copy' },
  { label: 'User Pass Set', icon: <FaUserLock />, count: 2, href: '/admin/dashboard/sign-copy' },
  { label: 'Success Order', icon: <FaCheck />, href: '/admin/dashboard/sign-copy' },
  { label: 'Canceled Order', icon: <FaBan />, href: '/admin/dashboard/sign-copy' },
  { label: 'Logout', icon: <FaSignOutAlt />, href: '/admin/dashboard/sign-copy' },
];

export default function AdminSidebar() {
  return (
    <div className="bg-white border-r w-64 h-screen p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-blue-700">OUR-DENMARK</h1>
      <nav className="flex flex-col gap-2">
        {menu.map((item, i) => (
          <Link key={i} href={item.href}>
            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer">
              <div className="flex gap-2 items-center">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2">
                  {item.count}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
