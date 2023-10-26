
const languageDef = {
    "displayName":    "Latex",      
    "name":           "latex",
    "mimeTypes":      ["text/latex","text/tex"],
    "fileExtensions": ["tex","sty","cls"],
    
    "lineComment":      "% ",   
      
    "builtin": [
      "addcontentsline", "addtocontents", "addtocounter", "address", "addtolength", "addvspace", "alph", "appendix",
      "arabic", "author", "backslash", "baselineskip", "baselinestretch", "bf", "bibitem", "bigskipamount", "bigskip",
      "boldmath", "boldsymbol", "cal", "caption", "cdots", "centering", "chapter", "circle", "cite", "cleardoublepage",
      "clearpage", "cline", "closing", "color", "copyright", "dashbox", "date", "ddots", "documentclass", "dotfill", "em",
      "emph", "ensuremath", "epigraph", "euro", "fbox", "flushbottom", "fnsymbol", "footnote", "footnotemark",
      "footnotesize", "footnotetext", "frac", "frame", "framebox", "frenchspacing", "hfill", "hline", "href", "hrulefill",
      "hspace", "huge", "Huge", "hyphenation", "include", "includegraphics", "includeonly", "indent", "input", "it", "item",
      "kill", "label", "large", "Large", "LARGE", "LaTeX", "LaTeXe", "ldots", "left", "lefteqn", "line", "linebreak",
      "linethickness", "linewidth", "listoffigures", "listoftables", "location", "makebox", "maketitle", "markboth",
      "mathcal", "mathop", "mbox", "medskip", "multicolumn", "multiput", "newcommand", "newcolumntype", "newcounter",
      "newenvironment", "newfont", "newlength", "newline", "newpage", "newsavebox", "newtheorem", "nocite", "noindent",
      "nolinebreak", "nonfrenchspacing", "normalsize", "nopagebreak", "not", "onecolumn", "opening", "oval", "overbrace",
      "overline", "pagebreak", "pagenumbering", "pageref", "pagestyle", "par", "paragraph", "parbox", "parindent", "parskip",
      "part", "protect", "providecommand", "put", "raggedbottom", "raggedleft", "raggedright", "raisebox", "ref",
      "renewcommand", "right", "rm", "roman", "rule", "savebox", "sbox", "sc", "scriptsize", "section", "setcounter",
      "setlength", "settowidth", "sf", "shortstack", "signature", "sl", "slash", "small", "smallskip", "sout", "space", "sqrt",
      "stackrel", "stepcounter", "subparagraph", "subsection", "subsubsection", "tableofcontents", "telephone", "TeX",
      "textbf", "textcolor", "textit", "textmd", "textnormal", "textrm", "textsc", "textsf", "textsl", "texttt", "textup",
      "textwidth", "textheight", "thanks", "thispagestyle", "tiny", "title", "today", "tt", "twocolumn", "typeout", "typein",
      "uline", "underbrace", "underline", "unitlength", "usebox", "usecounter", "uwave", "value", "vbox", "vcenter", "vdots",
      "vector", "verb", "vfill", "vline", "vphantom", "vspace",
      
      "RequirePackage", "NeedsTeXFormat", "usepackage", "input", "include", "documentclass", "documentstyle",
      "def","edef","defcommand","if","ifdim","ifnum","ifx","fi","else","begingroup","endgroup",
      "definecolor","textcolor","color",
      "eifstrequal","eeifstrequal"
    ],
    "tokenizer": {
      "root": [
        ["(\\\\begin)(\\s*)(\\{)([\\w\\-\\*\\@]+)(\\})", 
            ["keyword.predefined","white","@brackets",{ "token": "tag.env-$4", "bracket": "@open" },"@brackets"]],
        ["(\\\\end)(\\s*)(\\{)([\\w\\-\\*\\@]+)(\\})", 
            ["keyword.predefined","white","@brackets",{ "token": "tag.env-$4", "bracket": "@close" }, "@brackets" ]],          
        ["\\\\[^a-zA-Z@]", "keyword" ],  
        ["\\@[a-zA-Z@]+", "keyword.at" ],  
        ["\\\\([a-zA-Z@]+)", { "cases": {
          "$1@builtin": "keyword.predefined",
          "@default": "keyword" 
        }}],  
        { "include": "@whitespace" },
        ["[{}()\\[\\]]", "@brackets"],
        ["#+\\d", "number.arg"],
        ["\\-?(?:\\d+(?:\\.\\d+)?|\\.\\d+)\\s*(?:em|ex|pt|pc|sp|cm|mm|in)", "number.len"]
      ],
  
      "whitespace": [
        ["[ \\t\\r\\n]+", "white"],
        ["%.*$",    "comment"]
      ]
    }
  }

  const defaultDocument = `\\documentclass[11pt]{article}

  \\usepackage{sectsty}
  \\usepackage{graphicx}
  
  % Margins
  \\topmargin=-0.45in
  \\evensidemargin=0in
  \\oddsidemargin=0in
  \\textwidth=6.5in
  \\textheight=9.0in
  \\headsep=0.25in
  
  \\title{ Title}
  \\author{ Author }
  \\date{\\today}
  
  \\begin{document}
  \\maketitle	
  \\pagebreak
  
  % Optional TOC
  % \\tableofcontents
  % \\pagebreak
  
  %--Paper--
  
  \\section{Section 1}
  
  Lorem Impsum
  
  
  \\pagebreak
  \\section{Section 2}
  Lorem Ipsum \\\\
  
  %--/Paper--
  
  \\end{document}`

  export {languageDef, defaultDocument} ; 