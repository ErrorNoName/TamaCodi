interface CodeAnalysis {
  isValid: boolean;
  quality: number;
  complexity: number;
  language: string;
  cleanCode: string;
  suggestions: string[];
}

const LANGUAGE_PATTERNS = {
  javascript: {
    patterns: [
      /(const|let|var|function|=>|import|export|class|async|await)/,
      /\.(map|filter|reduce|forEach)\(/,
      /console\.(log|error|warn)/
    ],
    keywords: ['const', 'let', 'var', 'function', 'class', 'export', 'import']
  },
  typescript: {
    patterns: [
      /(interface|type|enum|namespace|declare|implements|extends)/,
      /<[A-Z][^>]+>/,
      /:\s*(string|number|boolean|any|void|never)/
    ],
    keywords: ['interface', 'type', 'enum', 'implements', 'extends']
  },
  python: {
    patterns: [
      /(def|class|import|from|if __name__|print|lambda|async def)/,
      /(try|except|finally|raise|with|as)/,
      /\s*(True|False|None|self)\s*/
    ],
    keywords: ['def', 'class', 'import', 'from', 'lambda', 'async']
  },
  java: {
    patterns: [
      /(public|private|protected|class|interface|extends|implements)/,
      /(void|String|int|boolean|double|float)\s+\w+\s*\(/,
      /System\.(out|err)\.(println|print)/
    ],
    keywords: ['public', 'private', 'class', 'void', 'String', 'int']
  },
  cpp: {
    patterns: [
      /#include\s*[<"][\w\.]+[>"]/,
      /(std::|cout|cin|endl|vector|string)/,
      /\b(int|void|char|bool|float|double)\s+\w+\s*\(/
    ],
    keywords: ['include', 'using', 'namespace', 'std', 'cout', 'cin']
  },
  html: {
    patterns: [/(<\/?[a-z][\s\S]*>)/i],
    keywords: ['html', 'head', 'body', 'div', 'span', 'p']
  },
  css: {
    patterns: [/({[\s\S]*}|@media|@keyframes)/],
    keywords: ['class', 'id', 'margin', 'padding', 'color']
  },
  sql: {
    patterns: [/(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|JOIN|WHERE|GROUP BY)/i],
    keywords: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE']
  },
  ruby: {
    patterns: [
      /(def|class|module|require|include|attr_)/,
      /\b(puts|print|raise|rescue|ensure)\b/,
      /\.(map|select|reject|each|inject)\s*{|do/
    ],
    keywords: ['def', 'class', 'module', 'require', 'include']
  }
};

const IMPROVEMENT_SUGGESTIONS = {
  general: [
    "Consider adding more descriptive variable names",
    "Think about edge cases in your logic",
    "Documentation is key for maintainability",
    "Could benefit from more modular structure",
    "Consider adding error handling"
  ],
  javascript: [
    "Consider using modern ES6+ features",
    "Think about performance optimizations",
    "Add TypeScript for better type safety",
    "Consider breaking down complex functions"
  ],
  python: [
    "Follow PEP 8 style guidelines",
    "Consider using type hints",
    "Think about using list comprehensions",
    "Add docstrings for better documentation"
  ],
  java: [
    "Consider design patterns application",
    "Think about inheritance hierarchy",
    "Add unit tests for robustness",
    "Consider using streams for collections"
  ]
};

function detectLanguage(code: string): string {
  let bestMatch = { lang: 'unknown', score: 0 };
  
  for (const [lang, config] of Object.entries(LANGUAGE_PATTERNS)) {
    let score = 0;
    // Check patterns
    config.patterns.forEach(pattern => {
      if (pattern.test(code)) score += 2;
    });
    // Check keywords
    config.keywords?.forEach(keyword => {
      if (code.includes(keyword)) score += 1;
    });
    if (score > bestMatch.score) {
      bestMatch = { lang, score };
    }
  }
  
  return bestMatch.lang;
}

function generateSuggestions(language: string, quality: number): string[] {
  const suggestions: string[] = [];
  
  // Always add some general suggestions
  suggestions.push(...IMPROVEMENT_SUGGESTIONS.general
    .sort(() => Math.random() - 0.5)
    .slice(0, 2));
  
  // Add language-specific suggestions
  if (IMPROVEMENT_SUGGESTIONS[language]) {
    suggestions.push(...IMPROVEMENT_SUGGESTIONS[language]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2));
  }
  
  return suggestions;
}

function removeComments(code: string, language: string): string {
  switch (language) {
    case 'javascript':
      return code
        .replace(/\/\*[\s\S]*?\*\//g, '') // Multi-line comments
        .replace(/\/\/.*/g, ''); // Single-line comments
    case 'python':
      return code
        .replace(/'''[\s\S]*?'''/g, '') // Multi-line strings/comments
        .replace(/#.*/g, ''); // Single-line comments
    case 'html':
      return code.replace(/<!--[\s\S]*?-->/g, '');
    case 'css':
      return code.replace(/\/\*[\s\S]*?\*\//g, '');
    default:
      return code;
  }
}

export function analyzeCode(code: string): CodeAnalysis {
  const language = detectLanguage(code);
  const cleanCode = removeComments(code, language);
  
  // Simple code analysis
  const lines = cleanCode.split('\n').filter(line => line.trim());
  
  // Check for basic syntax validity
  const isValid = !cleanCode.includes('!!!') && 
    lines.every(line => {
      try {
        new Function(line);
        return true;
      } catch {
        return false;
      }
    });

  // Calculate code quality (0-1)
  const quality = Math.min(1, lines.length / 10);

  // Generate improvement suggestions
  const suggestions = generateSuggestions(language, quality);

  // Calculate complexity (0-1)
  const complexity = Math.min(1, 
    lines.filter(line => 
      /function|class|if|for|while|switch/.test(line)
    ).length / 5
  );

  return {
    isValid,
    quality,
    complexity,
    language,
    cleanCode,
    suggestions
  };
}