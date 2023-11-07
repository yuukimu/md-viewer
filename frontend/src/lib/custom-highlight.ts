import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import go from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import kotlin from "highlight.js/lib/languages/kotlin";
import powershell from "highlight.js/lib/languages/powershell";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import yaml from "highlight.js/lib/languages/yaml";
import "highlight.js/styles/monokai.css";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("go", go);
hljs.registerLanguage("java", java);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("python", python);
hljs.registerLanguage("powershell", powershell);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("yaml", yaml);

export default hljs;
