import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import {useRef} from "react";
const { useEffect } = React;

interface ICodeEditor {
    value?: string;
    theme?: string;
    language?: string;
    width?: number;
    heigth?: number;
    options?: any;
    onChange?: (value: string, e) => void;
    editorWillMount?: (monaco) => void;
    editorDidMount?: (editor, monaco) => void;
}

export function CodeEditor(props: ICodeEditor) {

    const editorWillMount = (editor, monaco) => {
        setTimeout(() => {
            editor.getAction('editor.action.formatDocument')._run();
        })
    }

    return <MonacoEditor
        // ref={_ref}
        width={props.width || '100%'}
        height={props.heigth || '100%'}
        language={props.language || "javascript"}
        theme={props.theme || "vs-dark"}
        value={props.value}
        options={props.options || {}}
        onChange={props.onChange}
        editorWillMount={props.editorWillMount}
        editorDidMount={editorWillMount}
    />
}