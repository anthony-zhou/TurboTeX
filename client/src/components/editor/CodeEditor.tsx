'use client';

import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

import { MonacoBinding } from 'y-monaco';
import { languageDef } from './config/editor_config';

type CodeEditorProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>
};

export default function CodeEditor({ code, setCode }: CodeEditorProps) {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      value: code,
      language: 'latex',
    };
    if (!editor) {
      const myEditor = monaco.editor.create(editorRef.current!, options);
      if (!monaco.languages.getLanguages().some(({ id }: { id: string }) => id === 'latex')) {
        monaco.languages.register({ id: 'latex' });
        // @ts-ignore
        monaco.languages.setMonarchTokensProvider('latex', languageDef);
      }

      myEditor.getModel()?.onDidChangeContent((_) => {
        setCode(myEditor.getValue());
      });

      setEditor(myEditor);
    }
    return () => { editor?.dispose(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef]);

  useEffect(() => {
    if (editor) {
      const ydocument = new Y.Doc();
      const provider = new WebsocketProvider(`${location.protocol === 'http:' ? 'ws:' : 'wss:'}//localhost:1234`, 'monaco', ydocument);
      const type = ydocument.getText('monaco');
      const monacoBinding = new MonacoBinding(
        type,
        editor.getModel(),
        new Set([editor]),
        provider.awareness,
      );
    }
  }, [editor]);

  return <div className="h-[80vh]" ref={editorRef} />;
}
