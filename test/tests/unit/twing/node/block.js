const TwingTestMockCompiler = require('../../../../mock/compiler');
const TwingNodeText = require('../../../../../lib/twing/node/text').TwingNodeText;
const TwingNodeBlock = require('../../../../../lib/twing/node/block').TwingNodeBlock;
const TwingNodeType = require('../../../../../lib/twing/node').TwingNodeType;

const tap = require('tap');

tap.test('node/block', function (test) {
    test.test('constructor', function (test) {
        let body = new TwingNodeText('foo', 1, 1);
        let node = new TwingNodeBlock('foo', body, 1, 1);

        test.same(node.getNode('body'), body);
        test.same(node.getAttribute('name'), 'foo');
        test.same(node.getType(), TwingNodeType.BLOCK);
        test.same(node.getTemplateLine(), 1);
        test.same(node.getTemplateColumn(), 1);

        test.end();
    });

    test.test('compile', function (test) {
        let body = new TwingNodeText('foo', 1, 1);
        let node = new TwingNodeBlock('foo', body, 1, 1);
        let compiler = new TwingTestMockCompiler();

        test.same(compiler.compile(node).getSource(), `// line 1, column 1
block_foo(context, blocks = new Map()) {
    Twing.echo(\`foo\`);
}

`);

        test.end();
    });

    test.end();
});
