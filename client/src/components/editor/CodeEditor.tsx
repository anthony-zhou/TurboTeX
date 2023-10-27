'use client';

import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as Y from 'yjs';
// TODO: remove this ts-ignore once https://github.com/yjs/y-websocket/pull/138 gets merged.
// @ts-ignore
import { WebsocketProvider } from 'y-websocket';

import { MonacoBinding } from 'y-monaco';
import { languageDef } from './config/editor_config';

type CodeEditorProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>
};

const ydocument = new Y.Doc();
// eslint-disable-next-line no-restricted-globals
const provider = new WebsocketProvider(`${location.protocol === 'http:' ? 'ws:' : 'wss:'}//localhost:1234`, 'monaco', ydocument);

export default function CodeEditor({ code, setCode }: CodeEditorProps) {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: monaco.editor.IStandaloneEditorConstructionOptions = {
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
      const type = ydocument.getText('monaco');

      const monacoBinding = new MonacoBinding(
        type,
        editor.getModel()!,
        new Set([editor]),
        provider.awareness,
      );
      console.log(monacoBinding.editors);
    }
  }, [editor]);

  return <div className="h-[80vh]" ref={editorRef} />;
}
