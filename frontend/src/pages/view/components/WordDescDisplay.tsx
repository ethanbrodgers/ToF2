import React from 'react';
import ExSentence from './ExSentence';

/*
In Word.tsx; displays the description of a word when expanded
children: the text of the definition in the format: {
        "text": ["one string for each paragraph"],
        "ex": [
          { "en": "English text of example", "targ": "target text of example" }
        ]
      }
*/
export default function WordDefinitionDisplay({children}: {children: any}) {
    return ( <div>
        <p>Description:</p>
        <p>{children.text}</p>
        <p>Examples:</p>
        {children.ex.map((ex: any, i: number) =>
            <ExSentence key={i}>{ex}</ExSentence>
        )}
    </div> );
}
