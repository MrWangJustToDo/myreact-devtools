"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6068],{76068:function(e,n,t){t.r(n);var a=t(47503);let o=Object.freeze(JSON.parse('{"displayName":"Cairo","name":"cairo","patterns":[{"begin":"\\\\b(if).*\\\\(","beginCaptures":{"1":{"name":"keyword.control.if"},"2":{"name":"entity.name.condition"}},"contentName":"source.cairo0","end":"\\\\}","endCaptures":{"0":{"name":"keyword.control.end"}},"name":"meta.control.if","patterns":[{"include":"source.cairo0"}]},{"begin":"\\\\b(with)\\\\s+(.+)\\\\s*\\\\{","beginCaptures":{"1":{"name":"keyword.control.with"},"2":{"name":"entity.name.identifiers"}},"contentName":"source.cairo0","end":"\\\\}","endCaptures":{"0":{"name":"keyword.control.end"}},"name":"meta.control.with","patterns":[{"include":"source.cairo0"}]},{"begin":"\\\\b(with_attr)\\\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\\\s*[({]","beginCaptures":{"1":{"name":"keyword.control.with_attr"},"2":{"name":"entity.name.function"}},"contentName":"source.cairo0","end":"\\\\}","endCaptures":{"0":{"name":"keyword.control.end"}},"name":"meta.control.with_attr","patterns":[{"include":"source.cairo0"}]},{"match":"\\\\belse\\\\b","name":"keyword.control.else"},{"match":"\\\\b(call|jmp|ret|abs|rel|if)\\\\b","name":"keyword.other.opcode"},{"match":"\\\\b(ap|fp)\\\\b","name":"keyword.other.register"},{"match":"\\\\b(const|let|local|tempvar|felt|as|from|import|static_assert|return|assert|cast|alloc_locals|with|with_attr|nondet|dw|codeoffset|new|using|and)\\\\b","name":"keyword.other.meta"},{"match":"\\\\b(SIZEOF_LOCALS|SIZE)\\\\b","name":"markup.italic"},{"match":"//[^\\n]*\\n","name":"comment.line.sharp"},{"match":"\\\\b[a-zA-Z_][a-zA-Z0-9_]*:\\\\s*$","name":"entity.name.function"},{"begin":"\\\\b(func)\\\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\\\s*[({]","beginCaptures":{"1":{"name":"storage.type.function.cairo"},"2":{"name":"entity.name.function"}},"contentName":"source.cairo0","end":"\\\\}","endCaptures":{"0":{"name":"storage.type.function.cairo"}},"name":"meta.function.cairo","patterns":[{"include":"source.cairo0"}]},{"begin":"\\\\b(struct|namespace)\\\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\\\s*\\\\{","beginCaptures":{"1":{"name":"storage.type.function.cairo"},"2":{"name":"entity.name.function"}},"contentName":"source.cairo0","end":"\\\\}","endCaptures":{"0":{"name":"storage.type.function.cairo"}},"name":"meta.function.cairo","patterns":[{"include":"source.cairo0"}]},{"match":"\\\\b[+-]?[0-9]+\\\\b","name":"constant.numeric.decimal"},{"match":"\\\\b[+-]?0x[0-9a-fA-F]+\\\\b","name":"constant.numeric.hexadecimal"},{"match":"\'[^\']*\'","name":"string.quoted.single"},{"match":"\\"[^\\"]*\\"","name":"string.quoted.double"},{"begin":"%{","beginCaptures":{"0":{"name":"punctuation.section.embedded.begin.python"}},"contentName":"source.python","end":"%}","endCaptures":{"0":{"name":"punctuation.section.embedded.end.python"},"1":{"name":"source.python"}},"name":"meta.embedded.block.python","patterns":[{"include":"source.python"}]}],"scopeName":"source.cairo0","embeddedLangs":["python"]}'));n.default=[...a.default,o]}}]);