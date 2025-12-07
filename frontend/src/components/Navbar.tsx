import React from 'react';
import NavbarLink from "./NavbarLink";

const LINKS = ["View", "Memorize", "Practice"];

// The navbar
export default function Navbar({}: {}) {
    return ( <div className="flex border-gray-500 border-b-2 bg-green-400">
        <p className="text-lg border-gray-500 border-r-2 p-4">ToF2</p>
        {LINKS.map((text, i) => 
            <NavbarLink key={i}>{text}</NavbarLink>
        )}
    </div> );
}
