import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/monokai.css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import kotlin from 'highlight.js/lib/languages/kotlin';
import bash from 'highlight.js/lib/languages/bash';
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('yaml', yaml);

export default hljs;