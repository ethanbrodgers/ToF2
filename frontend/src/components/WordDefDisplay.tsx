import React from 'react';

/*
In Word.tsx; displays the definition of a word when expanded
children: the text of the definition
*/
export default function WordDefDisplay({children}: {children: any}) {
    return ( <div>
        <p>Definition:</p>
        <p>{children}</p>
    </div> );
}
