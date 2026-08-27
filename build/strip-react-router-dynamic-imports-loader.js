const REACT_ROUTER_DYNAMIC_IMPORT = /\bimport\s*\(/g;

module.exports = function stripReactRouterDynamicImports(source) {
    if (!source.includes('webpackIgnore') && !source.includes('import(')) {
        return source;
    }

    return [
        'const __jellyfinUnsupportedReactRouterDynamicImport = (module) => Promise.reject(new Error(`React Router route module imports are not supported by this build: ${module}`));',
        source.replace(REACT_ROUTER_DYNAMIC_IMPORT, '__jellyfinUnsupportedReactRouterDynamicImport(')
    ].join('\n');
};
