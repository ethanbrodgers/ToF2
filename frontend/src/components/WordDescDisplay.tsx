import React from 'react';

/*
In Word.tsx; displays the description of a word when expanded
children: the text of the definition in the format: {
        "text": ["one string for each paragraph"],
        "ex": [
          { "en": "English text of example", "target": "target text of example" }
        ]
      }
*/
export default function WordDefinitionDisplay({children}: {children: any}) {
    return ( <div>
        <p>Description:</p>
        <p>{children.text}</p>
        <p>Examples:</p>
        {children.ex.map((ex: any, i: number) =>
            <div key={i}>
                <p className="text-green-400">{ex.target}</p>
                <p>{ex.en}</p>
            </div>
        )}
    </div> );
}
