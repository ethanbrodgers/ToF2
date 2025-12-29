import React from 'react';

// the text color for each notice type
const typeColors = {
    loading: "#2535EB",
    error: "#F32121",
    success: "#0DED05"
}

/**
 * Creates a displayed message to be used in AddCardPanel. Fades away 4 seconds after creation.
 * 
 * @param {Object} props - object props
 * @param {string} props.children - The text of the notice, placed in between the <AddCardNotice> tags
 * @param {"loading" | "error" | "success"} props.type - The type of notice.
 * Determines the color of the displayed message.
 */
export default function AddCardNotice({type, children}: {type: "loading" | "error" | "success", children: string, key?: any}) {
    // state var: whether or not has started fading
    const [fading, setFading] = React.useState(false);

    // start fading after 4-sec timeout
    setTimeout(() => {setFading(true)}, 4000);

    return ( <p className="transition-all duration-1000" style={{
        "color": typeColors[type],
        "opacity": (fading) ? 0 : "100%"
    }}>
        {children}
    </p> );
}
