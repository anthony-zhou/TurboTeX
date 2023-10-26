import { Dispatch, SetStateAction } from "react";
import MonacoEditor from 'react-monaco-editor';
import { languageDef } from "./config/editor_config";

type CodeEditorProps = {
    code: string;
    setCode: Dispatch<SetStateAction<string>>
}

const editorWillMount = (monaco: any) => {
    if (!monaco.languages.getLanguages().some(({ id }) => id === 'latex')) {
      // Register a new language
      monaco.languages.register({ id: 'latex' })
      // Register a tokens provider for the language
      monaco.languages.setMonarchTokensProvider('latex', languageDef)
    //   // Set the editing configuration for the language
    //   monaco.languages.setLanguageConfiguration('estimatemd', configuration)
    }
  }

export default function CodeEditor({code, setCode}: CodeEditorProps) {
    return  <MonacoEditor className="absolute !h-[80vh]" language="latex" editorWillMount={editorWillMount} onChange={(value) => setCode(value ?? '')} />

}