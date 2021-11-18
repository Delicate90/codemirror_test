import { useEffect, useRef } from 'react'
import './CodeMirror.css';
import codemirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import emmet from '@emmetio/codemirror-plugin';

emmet(codemirror);

const CodeMirror = ()=> {

    const dom = useRef(null);
    const editor = useRef(null);

    useEffect(()=>{
        if (!editor.current) init();
    }, [editor])

    const init = ()=> {
        editor.current = codemirror(dom.current, {
            lineNumbers: true,
            autofocus: true,
            line: true,
            indentWithTabs: true,
            smartIndent: true,
            tabSize: 2,
            hintOptions: {
                completeSingle: false
            },
            mode: 'htmlmixed',
            keyMap: 'sublime',
            extraKeys: {
                "Ctrl": "autocomplete",
                "Tab": "emmetExpandAbbreviation",
                "Esc": "emmetResetAbbreviation",
                "Enter": "emmetInsertLineBreak"
            }
        });
        editor.current.on("keypress", ()=> {
            editor.current.showHint();
        })
        resize();
    }

    const resize = ()=> {
        const {clientWidth, clientHeight} = dom.current;
        editor.current.setSize(clientWidth, clientHeight);
    }

    return (
        <div ref={dom} className="container"/>
    )
}

export default CodeMirror