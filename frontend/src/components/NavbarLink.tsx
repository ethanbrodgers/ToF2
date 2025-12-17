import React from 'react';
import { Link } from 'react-router';

// A single link in the navbar
// children: the text to display on the link
export default function NavbarLink({ path, children }: { path: string, children: React.ReactNode, key?: any }) {
    return <Link className="text-blue-700 text-lg p-4 cursor-pointer hover:underline hover:text-blue-900" to={path}>{children}</Link>
}
