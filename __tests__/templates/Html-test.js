import React from 'react';
import renderer from 'react-test-renderer';
import Html from '../../src/templates/Html';

describe('HTML template', () => {
  it('should render document structure correctly', () => {
    const tree = renderer.create(
      <Html
        scripts={[
          'common.js',
          'app.js',
        ]}
        styles={[
          'common.css',
          'app.css',
        ]}
        title="Fresto"
      >
        Content goes here
      </Html>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
