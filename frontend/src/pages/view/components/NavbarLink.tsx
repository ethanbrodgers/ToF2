import React from 'react';

// A single link in the navbar
// children: the text to display on the link
export default function NavbarLink({ children }: { children: React.ReactNode }) {
    return <p className="text-blue-700 text-lg p-4 cursor-pointer hover:underline hover:text-blue-900">{children}</p>
}
