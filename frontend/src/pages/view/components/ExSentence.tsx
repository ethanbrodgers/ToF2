/**
 * Example sentence for a rule, word, etc.
 * 
 * @param {Object} props - component props
 * 
 * @param {Object} props.children - the example sentence
 * 
 * @param {string} props.children.en - example sentence in English
 * 
 * @param {string} props.children.targ - example sentence in the target language
 */
export default function ExSentence({children: {en, targ, positive} }: {children: {en: string, targ: string, positive?: boolean}, key?: any}) {
    return ( <div>
        <p className={(positive === false) ? "text-red-400" : "text-green-400"}>{targ}</p>
        <p>{en}</p>
    </div> );
}
